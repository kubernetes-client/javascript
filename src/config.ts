import fs from 'node:fs';
import https from 'node:https';
import http from 'node:http';
import yaml from 'js-yaml';
import net from 'node:net';
import path from 'node:path';

import { Headers, RequestInit } from 'node-fetch';
import { RequestContext } from './api.js';
import { Authenticator } from './auth.js';
import { AzureAuth } from './azure_auth.js';
import {
    Cluster,
    ConfigOptions,
    Context,
    exportCluster,
    exportContext,
    exportUser,
    newClusters,
    newContexts,
    newUsers,
    User,
} from './config_types.js';
import { ExecAuth } from './exec_auth.js';
import { FileAuth } from './file_auth.js';
import { GoogleCloudPlatformAuth } from './gcp_auth.js';
import {
    AuthMethodsConfiguration,
    Configuration,
    createConfiguration,
    SecurityAuthentication,
    ServerConfiguration,
} from './gen/index.js';
import { OpenIDConnectAuth } from './oidc_auth.js';
import WebSocket from 'isomorphic-ws';
import child_process from 'node:child_process';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { HttpProxyAgent, HttpProxyAgentOptions, HttpsProxyAgent, HttpsProxyAgentOptions } from 'hpagent';

const SERVICEACCOUNT_ROOT: string = '/var/run/secrets/kubernetes.io/serviceaccount';
const SERVICEACCOUNT_CA_PATH: string = SERVICEACCOUNT_ROOT + '/ca.crt';
const SERVICEACCOUNT_TOKEN_PATH: string = SERVICEACCOUNT_ROOT + '/token';
const SERVICEACCOUNT_NAMESPACE_PATH: string = SERVICEACCOUNT_ROOT + '/namespace';

// fs.existsSync was removed in node 10
function fileExists(filepath: string): boolean {
    try {
        fs.accessSync(filepath);
        return true;
    } catch {
        // Ignore errors.
        return false;
    }
}

// TODO: the empty interface breaks the linter, but this type
// will be needed later to get the object and cache features working again
export interface ApiType {}

export class KubeConfig implements SecurityAuthentication {
    private authenticators: Authenticator[] = [
        new AzureAuth(),
        new GoogleCloudPlatformAuth(),
        new ExecAuth(),
        new FileAuth(),
        new OpenIDConnectAuth(),
    ];

    // List of custom authenticators that can be added by the user
    private custom_authenticators: Authenticator[] = [];

    // Optionally add additional external authenticators, you must do this
    // before you load a kubeconfig file that references them.
    public addAuthenticator(authenticator: Authenticator): void {
        this.custom_authenticators.push(authenticator);
    }

    /**
     * The list of all known clusters
     */
    public 'clusters': Cluster[];

    /**
     * The list of all known users
     */
    public 'users': User[];

    /**
     * The list of all known contexts
     */
    public 'contexts': Context[];

    /**
     * The name of the current context
     */
    public 'currentContext': string;

    constructor() {
        this.contexts = [];
        this.clusters = [];
        this.users = [];
    }

    public getContexts(): Context[] {
        return this.contexts;
    }

    public getClusters(): Cluster[] {
        return this.clusters;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public getCurrentContext(): string {
        return this.currentContext;
    }

    public setCurrentContext(context: string): void {
        this.currentContext = context;
    }

    public getContextObject(name: string): Context | null {
        if (!this.contexts) {
            return null;
        }
        return findObject(this.contexts, name, 'context');
    }

    public getCurrentCluster(): Cluster | null {
        const context = this.getCurrentContextObject();
        if (!context) {
            return null;
        }
        return this.getCluster(context.cluster);
    }

    public getCluster(name: string): Cluster | null {
        return findObject(this.clusters, name, 'cluster');
    }

    public getCurrentUser(): User | null {
        const ctx = this.getCurrentContextObject();
        if (!ctx) {
            return null;
        }
        return this.getUser(ctx.user);
    }

    public getUser(name: string): User | null {
        return findObject(this.users, name, 'user');
    }

    public loadFromFile(file: string, opts?: Partial<ConfigOptions>): void {
        const rootDirectory = path.dirname(file);
        this.loadFromString(fs.readFileSync(file).toString('utf-8'), opts);
        this.makePathsAbsolute(rootDirectory);
    }

    public async applyToFetchOptions(opts: https.RequestOptions): Promise<RequestInit> {
        await this.applyToHTTPSOptions(opts);
        const headers = new Headers();
        for (const [key, val] of Object.entries(opts.headers || {})) {
            if (Array.isArray(val)) {
                val.forEach((innerVal) => {
                    headers.append(key, innerVal);
                });
            } else if (typeof val === 'number' || typeof val === 'string') {
                headers.set(key, val.toString());
            }
        }
        if (opts.auth) {
            headers.set('Authorization', 'Basic ' + Buffer.from(opts.auth).toString('base64'));
        }
        return {
            agent: opts.agent,
            headers,
            method: opts.method,
            timeout: opts.timeout,
        } as RequestInit;
    }

    public async applyToHTTPSOptions(opts: https.RequestOptions | WebSocket.ClientOptions): Promise<void> {
        const user = this.getCurrentUser();
        const cluster = this.getCurrentCluster();

        await this.applyOptions(opts);

        if (user && user.username) {
            // The ws docs say that it accepts anything that https.RequestOptions accepts,
            // but Typescript doesn't understand that idea (yet) probably could be fixed in
            // the typings, but for now just cast to any
            (opts as any).auth = `${user.username}:${user.password}`;
        }

        const agentOptions: https.AgentOptions = {};

        // Copy AgentOptions from RequestOptions
        agentOptions.ca = opts.ca;
        agentOptions.cert = opts.cert;
        agentOptions.key = opts.key;
        agentOptions.pfx = opts.pfx;
        agentOptions.passphrase = opts.passphrase;
        agentOptions.rejectUnauthorized = opts.rejectUnauthorized;
        // The ws docs say that it accepts anything that https.RequestOptions accepts,
        // but Typescript doesn't understand that idea (yet) probably could be fixed in
        // the typings, but for now just cast to any
        agentOptions.timeout = (opts as any).timeout;
        agentOptions.servername = (opts as any).servername;
        agentOptions.ciphers = opts.ciphers;
        agentOptions.honorCipherOrder = opts.honorCipherOrder;
        agentOptions.ecdhCurve = opts.ecdhCurve;
        agentOptions.clientCertEngine = opts.clientCertEngine;
        agentOptions.crl = opts.crl;
        agentOptions.dhparam = opts.dhparam;
        agentOptions.secureOptions = opts.secureOptions;
        agentOptions.secureProtocol = opts.secureProtocol;
        agentOptions.sessionIdContext = opts.sessionIdContext;

        opts.agent = this.createAgent(cluster, agentOptions);
    }

    /**
     * Applies SecurityAuthentication to RequestContext of an API Call from API Client
     * @param context
     */
    public async applySecurityAuthentication(context: RequestContext): Promise<void> {
        const cluster = this.getCurrentCluster();
        const user = this.getCurrentUser();

        const agentOptions: https.AgentOptions = {};
        const httpsOptions: https.RequestOptions = {};

        await this.applyOptions(httpsOptions);

        if (cluster && cluster.skipTLSVerify) {
            agentOptions.rejectUnauthorized = false;
        }

        if (cluster && cluster.tlsServerName) {
            agentOptions.servername = cluster.tlsServerName;
        }

        if (user && user.username) {
            const auth = Buffer.from(`${user.username}:${user.password}`).toString('base64');
            context.setHeaderParam('Authorization', `Basic ${auth}`);
        }

        // Copy headers from httpsOptions to RequestContext
        const headers = httpsOptions.headers || {};
        Object.entries(headers).forEach(([key, value]) => {
            context.setHeaderParam(key, `${value}`);
        });

        // Copy AgentOptions from RequestOptions
        agentOptions.ca = httpsOptions.ca;
        agentOptions.cert = httpsOptions.cert;
        agentOptions.key = httpsOptions.key;
        agentOptions.pfx = httpsOptions.pfx;
        agentOptions.passphrase = httpsOptions.passphrase;
        agentOptions.rejectUnauthorized = httpsOptions.rejectUnauthorized;

        context.setAgent(this.createAgent(cluster, agentOptions));
    }

    /**
     * Returns name of this security authentication method
     * @returns string
     */
    public getName(): string {
        return 'kubeconfig authentication';
    }

    public loadFromString(config: string, opts?: Partial<ConfigOptions>): void {
        const obj = yaml.load(config) as any;
        this.clusters = newClusters(obj.clusters, opts);
        this.contexts = newContexts(obj.contexts, opts);
        this.users = newUsers(obj.users, opts);
        this.currentContext = obj['current-context'];
    }

    public loadFromOptions(options: any): void {
        this.clusters = options.clusters;
        this.contexts = options.contexts;
        this.users = options.users;
        this.currentContext = options.currentContext;
    }

    public loadFromClusterAndUser(cluster: Cluster, user: User): void {
        this.clusters = [cluster];
        this.users = [user];
        this.currentContext = 'loaded-context';
        this.contexts = [
            {
                cluster: cluster.name,
                user: user.name,
                name: this.currentContext,
            } as Context,
        ];
    }

    public loadFromCluster(pathPrefix: string = ''): void {
        const host = process.env.KUBERNETES_SERVICE_HOST;
        const port = process.env.KUBERNETES_SERVICE_PORT;
        const clusterName = 'inCluster';
        const userName = 'inClusterUser';
        const contextName = 'inClusterContext';

        let scheme = 'https';
        if (port === '80' || port === '8080' || port === '8001') {
            scheme = 'http';
        }

        // Wrap raw IPv6 addresses in brackets.
        let serverHost = host;
        if (host && net.isIPv6(host)) {
            serverHost = `[${host}]`;
        }

        this.clusters = [
            {
                name: clusterName,
                caFile: `${pathPrefix}${SERVICEACCOUNT_CA_PATH}`,
                server: `${scheme}://${serverHost}:${port}`,
                skipTLSVerify: false,
            },
        ];
        this.users = [
            {
                name: userName,
                authProvider: {
                    name: 'tokenFile',
                    config: {
                        tokenFile: `${pathPrefix}${SERVICEACCOUNT_TOKEN_PATH}`,
                    },
                },
            },
        ];
        const namespaceFile = `${pathPrefix}${SERVICEACCOUNT_NAMESPACE_PATH}`;
        let namespace: string | undefined;
        if (fileExists(namespaceFile)) {
            namespace = fs.readFileSync(namespaceFile).toString('utf-8');
        }
        this.contexts = [
            {
                cluster: clusterName,
                name: contextName,
                user: userName,
                namespace,
            },
        ];
        this.currentContext = contextName;
    }

    public mergeConfig(config: KubeConfig, preserveContext: boolean = false): void {
        if (!preserveContext && config.currentContext) {
            this.currentContext = config.currentContext;
        }
        config.clusters.forEach((cluster: Cluster) => {
            this.addCluster(cluster);
        });
        config.users.forEach((user: User) => {
            this.addUser(user);
        });
        config.contexts.forEach((ctx: Context) => {
            this.addContext(ctx);
        });
    }

    public addCluster(cluster: Cluster): void {
        if (!this.clusters) {
            this.clusters = [];
        }
        this.clusters.forEach((c: Cluster, ix: number) => {
            if (c.name === cluster.name) {
                throw new Error(`Duplicate cluster: ${c.name}`);
            }
        });
        this.clusters.push(cluster);
    }

    public addUser(user: User): void {
        if (!this.users) {
            this.users = [];
        }
        this.users.forEach((c: User, ix: number) => {
            if (c.name === user.name) {
                throw new Error(`Duplicate user: ${c.name}`);
            }
        });
        this.users.push(user);
    }

    public addContext(ctx: Context): void {
        if (!this.contexts) {
            this.contexts = [];
        }
        this.contexts.forEach((c: Context, ix: number) => {
            if (c.name === ctx.name) {
                throw new Error(`Duplicate context: ${c.name}`);
            }
        });
        this.contexts.push(ctx);
    }

    public loadFromDefault(
        opts?: Partial<ConfigOptions>,
        contextFromStartingConfig: boolean = false,
        platform: string = process.platform,
    ): void {
        if (process.env.KUBECONFIG && process.env.KUBECONFIG.length > 0) {
            const files = process.env.KUBECONFIG.split(path.delimiter).filter((filename: string) => filename);
            this.loadFromFile(files[0], opts);
            for (let i = 1; i < files.length; i++) {
                const kc = new KubeConfig();
                kc.loadFromFile(files[i], opts);
                this.mergeConfig(kc, contextFromStartingConfig);
            }
            return;
        }
        const home = findHomeDir(platform);
        if (home) {
            const config = path.join(home, '.kube', 'config');
            if (fileExists(config)) {
                this.loadFromFile(config, opts);
                return;
            }
        }
        if (platform === 'win32') {
            try {
                const envKubeconfigPathResult = child_process.spawnSync('wsl.exe', [
                    'bash',
                    '-c',
                    'printenv KUBECONFIG',
                ]);
                if (envKubeconfigPathResult.status === 0 && envKubeconfigPathResult.stdout.length > 0) {
                    const result = child_process.spawnSync('wsl.exe', [
                        'cat',
                        envKubeconfigPathResult.stdout.toString('utf8'),
                    ]);
                    if (result.status === 0) {
                        this.loadFromString(result.stdout.toString('utf8'), opts);
                        return;
                    }
                }
            } catch {
                // Falling back to default kubeconfig
            }
            try {
                const configResult = child_process.spawnSync('wsl.exe', ['cat', '~/.kube/config']);
                if (configResult.status === 0) {
                    this.loadFromString(configResult.stdout.toString('utf8'), opts);
                    const result = child_process.spawnSync('wsl.exe', ['wslpath', '-w', '~/.kube']);
                    if (result.status === 0) {
                        this.makePathsAbsolute(result.stdout.toString('utf8'));
                    }
                    return;
                }
            } catch {
                // Falling back to alternative auth
            }
        }

        if (fileExists(SERVICEACCOUNT_TOKEN_PATH)) {
            this.loadFromCluster();
            return;
        }

        this.loadFromClusterAndUser(
            { name: 'cluster', server: 'http://localhost:8080' } as Cluster,
            { name: 'user' } as User,
        );
    }

    public makeApiClient<T extends ApiType>(apiClientType: ApiConstructor<T>): T {
        const cluster = this.getCurrentCluster();
        if (!cluster) {
            throw new Error('No active cluster!');
        }
        const authConfig: AuthMethodsConfiguration = {
            default: this,
        };
        const baseServerConfig: ServerConfiguration<{}> = new ServerConfiguration<{}>(cluster.server, {});
        const config: Configuration = createConfiguration({
            baseServer: baseServerConfig,
            authMethods: authConfig,
        });

        const apiClient = new apiClientType(config);

        return apiClient;
    }

    public makePathsAbsolute(rootDirectory: string): void {
        this.clusters.forEach((cluster: Cluster) => {
            if (cluster.caFile) {
                cluster.caFile = makeAbsolutePath(rootDirectory, cluster.caFile);
            }
        });
        this.users.forEach((user: User) => {
            if (user.certFile) {
                user.certFile = makeAbsolutePath(rootDirectory, user.certFile);
            }
            if (user.keyFile) {
                user.keyFile = makeAbsolutePath(rootDirectory, user.keyFile);
            }
        });
    }

    public exportConfig(): string {
        const configObj = {
            apiVersion: 'v1',
            kind: 'Config',
            clusters: this.clusters.map(exportCluster),
            users: this.users.map(exportUser),
            contexts: this.contexts.map(exportContext),
            preferences: {},
            'current-context': this.getCurrentContext(),
        };

        return JSON.stringify(configObj);
    }

    private getCurrentContextObject(): Context | null {
        return this.getContextObject(this.currentContext);
    }

    private createAgent(
        cluster: Cluster | null,
        agentOptions: https.AgentOptions,
    ): https.Agent | SocksProxyAgent | HttpProxyAgent | HttpsProxyAgent {
        let agent: https.Agent | SocksProxyAgent | HttpProxyAgent | HttpsProxyAgent;

        if (cluster && cluster.proxyUrl) {
            if (cluster.proxyUrl.startsWith('socks')) {
                agent = new SocksProxyAgent(cluster.proxyUrl, agentOptions);
            } else if (cluster.server.startsWith('https')) {
                const httpsProxyAgentOptions: HttpsProxyAgentOptions = agentOptions as HttpsProxyAgentOptions;
                httpsProxyAgentOptions.proxy = cluster.proxyUrl;
                agent = new HttpsProxyAgent(httpsProxyAgentOptions);
            } else if (cluster.server.startsWith('http')) {
                const httpProxyAgentOptions: HttpProxyAgentOptions = agentOptions as HttpProxyAgentOptions;
                httpProxyAgentOptions.proxy = cluster.proxyUrl;
                agent = new HttpProxyAgent(httpProxyAgentOptions);
            } else {
                throw new Error('Unsupported proxy type');
            }
        } else if (cluster?.server?.startsWith('http:') && cluster.skipTLSVerify) {
            agent = new http.Agent(agentOptions);
        } else if (cluster?.server?.startsWith('http:') && !cluster.skipTLSVerify) {
            throw new Error('HTTP protocol is not allowed when skipTLSVerify is not set or false');
        } else {
            agent = new https.Agent(agentOptions);
        }
        return agent;
    }

    private applyHTTPSOptions(opts: https.RequestOptions | WebSocket.ClientOptions): void {
        const cluster = this.getCurrentCluster();
        const user = this.getCurrentUser();
        if (!user) {
            return;
        }

        if (cluster != null && cluster.skipTLSVerify) {
            opts.rejectUnauthorized = false;
        }
        if (cluster != null && cluster.tlsServerName) {
            // WebSocket.ClientOptions types are missing the servername
            (opts as any).servername = cluster.tlsServerName;
        }
        const ca = cluster != null ? bufferFromFileOrString(cluster.caFile, cluster.caData) : null;
        if (ca) {
            opts.ca = ca;
        }
        const cert = bufferFromFileOrString(user.certFile, user.certData);
        if (cert) {
            opts.cert = cert;
        }
        const key = bufferFromFileOrString(user.keyFile, user.keyData);
        if (key) {
            opts.key = key;
        }

        if (user.impersonateUser != null) {
            opts.headers ??= {};
            opts.headers['Impersonate-User'] = user.impersonateUser;
        }
    }

    private async applyAuthorizationHeader(
        opts: https.RequestOptions | WebSocket.ClientOptions,
    ): Promise<void> {
        const user = this.getCurrentUser();
        if (!user) {
            return;
        }
        let authenticator = this.authenticators.find((elt: Authenticator) => {
            return elt.isAuthProvider(user);
        });

        if (!authenticator) {
            authenticator = this.custom_authenticators.find((elt: Authenticator) => {
                return elt.isAuthProvider(user);
            });
        }

        if (!opts.headers) {
            opts.headers = {};
        }
        if (authenticator) {
            await authenticator.applyAuthentication(user, opts);
        }

        if (user.token) {
            opts.headers.Authorization = `Bearer ${user.token}`;
        }
    }

    private async applyOptions(opts: https.RequestOptions | WebSocket.ClientOptions): Promise<void> {
        this.applyHTTPSOptions(opts);
        await this.applyAuthorizationHeader(opts);
    }
}

export type ApiConstructor<T extends ApiType> = new (config: Configuration) => T;

export function makeAbsolutePath(root: string, file: string): string {
    if (!root || path.isAbsolute(file)) {
        return file;
    }
    return path.join(root, file);
}

// This is public really only for testing.
export function bufferFromFileOrString(file?: string, data?: string): Buffer | null {
    if (file) {
        return fs.readFileSync(file);
    }
    if (data) {
        return Buffer.from(data, 'base64');
    }
    return null;
}

function dropDuplicatesAndNils(a: string[]): string[] {
    return a.reduce((acceptedValues, currentValue) => {
        // Good-enough algorithm for reducing a small (3 items at this point) array into an ordered list
        // of unique non-empty strings.
        if (currentValue && !acceptedValues.includes(currentValue)) {
            return acceptedValues.concat(currentValue);
        } else {
            return acceptedValues;
        }
    }, [] as string[]);
}

// Only public for testing.
export function findHomeDir(platform: string = process.platform): string | null {
    if (platform !== 'win32') {
        if (process.env.HOME) {
            try {
                fs.accessSync(process.env.HOME);
                return process.env.HOME;
            } catch {
                // Ignore errors.
            }
        }
        return null;
    }
    // $HOME is always favoured, but the k8s go-client prefers the other two env vars
    // differently depending on whether .kube/config exists or not.
    const homeDrivePath =
        process.env.HOMEDRIVE && process.env.HOMEPATH
            ? path.join(process.env.HOMEDRIVE, process.env.HOMEPATH)
            : '';
    const homePath = process.env.HOME || '';
    const userProfile = process.env.USERPROFILE || '';
    const favourHomeDrivePathList: string[] = dropDuplicatesAndNils([homePath, homeDrivePath, userProfile]);
    const favourUserProfileList: string[] = dropDuplicatesAndNils([homePath, userProfile, homeDrivePath]);
    // 1. the first of %HOME%, %HOMEDRIVE%%HOMEPATH%, %USERPROFILE% containing a `.kube\config` file is returned.
    for (const dir of favourHomeDrivePathList) {
        try {
            fs.accessSync(path.join(dir, '.kube', 'config'));
            return dir;
        } catch {
            // Ignore errors.
        }
    }
    // 2. ...the first of %HOME%, %USERPROFILE%, %HOMEDRIVE%%HOMEPATH% that exists and is writeable is returned
    for (const dir of favourUserProfileList) {
        try {
            fs.accessSync(dir, fs.constants.W_OK);
            return dir;
        } catch {
            // Ignore errors.
        }
    }
    // 3. ...the first of %HOME%, %USERPROFILE%, %HOMEDRIVE%%HOMEPATH% that exists is returned.
    for (const dir of favourUserProfileList) {
        try {
            fs.accessSync(dir);
            return dir;
        } catch {
            // Ignore errors.
        }
    }
    // 4. if none of those locations exists, the first of
    // %HOME%, %USERPROFILE%, %HOMEDRIVE%%HOMEPATH% that is set is returned.
    return favourUserProfileList[0] || null;
}

export interface Named {
    name: string;
}

// Only really public for testing...
export function findObject<T extends Named>(list: T[], name: string, key: string): T | null {
    if (!list) {
        return null;
    }
    for (const obj of list) {
        if (obj.name === name) {
            if (obj[key]) {
                obj[key].name = name;
                return obj[key];
            }
            return obj;
        }
    }
    return null;
}
