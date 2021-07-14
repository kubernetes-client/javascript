import execa = require('execa');
import fs = require('fs');
import https = require('https');
import yaml = require('js-yaml');
import net = require('net');
import path = require('path');

import request = require('request');
import shelljs = require('shelljs');

import * as api from './api';
import { Authenticator } from './auth';
import { CloudAuth } from './cloud_auth';
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
} from './config_types';
import { ExecAuth } from './exec_auth';
import { FileAuth } from './file_auth';
import { OpenIDConnectAuth } from './oidc_auth';

// fs.existsSync was removed in node 10
function fileExists(filepath: string): boolean {
    try {
        fs.accessSync(filepath);
        return true;
    } catch (ignore) {
        return false;
    }
}

export class KubeConfig {
    private static authenticators: Authenticator[] = [
        new CloudAuth(),
        new ExecAuth(),
        new FileAuth(),
        new OpenIDConnectAuth(),
    ];

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
        this.loadFromString(fs.readFileSync(file, 'utf8'), opts);
        this.makePathsAbsolute(rootDirectory);
    }

    public async applytoHTTPSOptions(opts: https.RequestOptions): Promise<void> {
        const user = this.getCurrentUser();

        await this.applyOptions(opts);

        if (user && user.username) {
            opts.auth = `${user.username}:${user.password}`;
        }
    }

    public async applyToRequest(opts: request.Options): Promise<void> {
        const cluster = this.getCurrentCluster();
        const user = this.getCurrentUser();

        await this.applyOptions(opts);

        if (cluster && cluster.skipTLSVerify) {
            opts.strictSSL = false;
        }

        if (user && user.username) {
            opts.auth = {
                password: user.password,
                username: user.username,
            };
        }
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
                caFile: `${pathPrefix}${Config.SERVICEACCOUNT_CA_PATH}`,
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
                        tokenFile: `${pathPrefix}${Config.SERVICEACCOUNT_TOKEN_PATH}`,
                    },
                },
            },
        ];
        const namespaceFile = `${pathPrefix}${Config.SERVICEACCOUNT_NAMESPACE_PATH}`;
        let namespace: string | undefined;
        if (fileExists(namespaceFile)) {
            namespace = fs.readFileSync(namespaceFile, 'utf8');
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
        if (!preserveContext) {
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

    public loadFromDefault(opts?: Partial<ConfigOptions>, contextFromStartingConfig: boolean = false): void {
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
        const home = findHomeDir();
        if (home) {
            const config = path.join(home, '.kube', 'config');
            if (fileExists(config)) {
                this.loadFromFile(config, opts);
                return;
            }
        }
        if (process.platform === 'win32' && shelljs.which('wsl.exe')) {
            try {
                const envKubeconfigPathResult = execa.sync('wsl.exe', ['bash', '-ic', 'printenv KUBECONFIG']);
                if (envKubeconfigPathResult.exitCode === 0 && envKubeconfigPathResult.stdout.length > 0) {
                    const result = execa.sync('wsl.exe', ['cat', envKubeconfigPathResult.stdout]);
                    if (result.exitCode === 0) {
                        this.loadFromString(result.stdout, opts);
                        return;
                    }
                    if (result.exitCode === 0) {
                        this.loadFromString(result.stdout, opts);
                        return;
                    }
                }
            } catch (err) {
                // Falling back to default kubeconfig
            }
            try {
                const result = execa.sync('wsl.exe', ['cat', '~/.kube/config']);
                if (result.exitCode === 0) {
                    this.loadFromString(result.stdout, opts);
                    return;
                }
            } catch (err) {
                // Falling back to alternative auth
            }
        }

        if (fileExists(Config.SERVICEACCOUNT_TOKEN_PATH)) {
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
        const apiClient = new apiClientType(cluster.server);
        apiClient.setDefaultAuthentication(this);

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

    private applyHTTPSOptions(opts: request.Options | https.RequestOptions): void {
        const cluster = this.getCurrentCluster();
        const user = this.getCurrentUser();
        if (!user) {
            return;
        }

        if (cluster != null && cluster.skipTLSVerify) {
            opts.rejectUnauthorized = false;
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
    }

    private async applyAuthorizationHeader(opts: request.Options | https.RequestOptions): Promise<void> {
        const user = this.getCurrentUser();
        if (!user) {
            return;
        }
        const authenticator = KubeConfig.authenticators.find((elt: Authenticator) => {
            return elt.isAuthProvider(user);
        });

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

    private async applyOptions(opts: request.Options | https.RequestOptions): Promise<void> {
        this.applyHTTPSOptions(opts);
        await this.applyAuthorizationHeader(opts);
    }
}

export interface ApiType {
    defaultHeaders: any;
    setDefaultAuthentication(config: api.Authentication): void;
}

type ApiConstructor<T extends ApiType> = new (server: string) => T;

// This class is deprecated and will eventually be removed.
export class Config {
    public static SERVICEACCOUNT_ROOT: string = '/var/run/secrets/kubernetes.io/serviceaccount';
    public static SERVICEACCOUNT_CA_PATH: string = Config.SERVICEACCOUNT_ROOT + '/ca.crt';
    public static SERVICEACCOUNT_TOKEN_PATH: string = Config.SERVICEACCOUNT_ROOT + '/token';
    public static SERVICEACCOUNT_NAMESPACE_PATH: string = Config.SERVICEACCOUNT_ROOT + '/namespace';

    public static fromFile(filename: string): api.CoreV1Api {
        return Config.apiFromFile(filename, api.CoreV1Api);
    }

    public static fromCluster(): api.CoreV1Api {
        return Config.apiFromCluster(api.CoreV1Api);
    }

    public static defaultClient(): api.CoreV1Api {
        return Config.apiFromDefaultClient(api.CoreV1Api);
    }

    public static apiFromFile<T extends ApiType>(filename: string, apiClientType: ApiConstructor<T>): T {
        const kc = new KubeConfig();
        kc.loadFromFile(filename);
        return kc.makeApiClient(apiClientType);
    }

    public static apiFromCluster<T extends ApiType>(apiClientType: ApiConstructor<T>): T {
        const kc = new KubeConfig();
        kc.loadFromCluster();

        const cluster = kc.getCurrentCluster();
        if (!cluster) {
            throw new Error('No active cluster!');
        }

        const k8sApi = new apiClientType(cluster.server);
        k8sApi.setDefaultAuthentication(kc);

        return k8sApi;
    }

    public static apiFromDefaultClient<T extends ApiType>(apiClientType: ApiConstructor<T>): T {
        const kc = new KubeConfig();
        kc.loadFromDefault();
        return kc.makeApiClient(apiClientType);
    }
}

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

// Only public for testing.
export function findHomeDir(): string | null {
    if (process.env.HOME) {
        try {
            fs.accessSync(process.env.HOME);
            return process.env.HOME;
            // tslint:disable-next-line:no-empty
        } catch (ignore) {}
    }
    if (process.platform !== 'win32') {
        return null;
    }
    if (process.env.HOMEDRIVE && process.env.HOMEPATH) {
        const dir = path.join(process.env.HOMEDRIVE, process.env.HOMEPATH);
        try {
            fs.accessSync(dir);
            return dir;
            // tslint:disable-next-line:no-empty
        } catch (ignore) {}
    }
    if (process.env.USERPROFILE) {
        try {
            fs.accessSync(process.env.USERPROFILE);
            return process.env.USERPROFILE;
            // tslint:disable-next-line:no-empty
        } catch (ignore) {}
    }
    return null;
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
