import fs = require('fs');
import https = require('https');
import path = require('path');

import yaml = require('js-yaml');
import request = require('request');
import shelljs = require('shelljs');

import * as api from './api';
import { Authenticator } from './auth';
import { CloudAuth } from './cloud_auth';
import { Cluster, Context, newClusters, newContexts, newUsers, User } from './config_types';
import { ExecAuth } from './exec_auth';

// fs.existsSync was removed in node 10
function fileExists(filepath: string): boolean {
    try {
        fs.accessSync(filepath);
        return true;
        // tslint:disable-next-line:no-empty
    } catch (ignore) {}
    return false;
}

export class KubeConfig {
    private static authenticators: Authenticator[] = [new CloudAuth(), new ExecAuth()];

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

    /**
     * Root directory for a config file driven config. Used for loading relative cert paths.
     */
    public 'rootDirectory': string;

    public getContexts() {
        return this.contexts;
    }

    public getClusters() {
        return this.clusters;
    }

    public getUsers() {
        return this.users;
    }

    public getCurrentContext() {
        return this.currentContext;
    }

    public setCurrentContext(context: string) {
        this.currentContext = context;
    }

    public getContextObject(name: string) {
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

    public loadFromFile(file: string) {
        this.rootDirectory = path.dirname(file);
        this.loadFromString(fs.readFileSync(file, 'utf8'));
    }

    public applytoHTTPSOptions(opts: https.RequestOptions) {
        const user = this.getCurrentUser();

        this.applyOptions(opts);

        if (user && user.username) {
            opts.auth = `${user.username}:${user.password}`;
        }
    }

    public applyToRequest(opts: request.Options) {
        const cluster = this.getCurrentCluster();
        const user = this.getCurrentUser();

        this.applyOptions(opts);

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

    public loadFromString(config: string) {
        const obj = yaml.safeLoad(config) as any;
        if (obj.apiVersion !== 'v1') {
            throw new TypeError('unknown version: ' + obj.apiVersion);
        }
        this.clusters = newClusters(obj.clusters);
        this.contexts = newContexts(obj.contexts);
        this.users = newUsers(obj.users);
        this.currentContext = obj['current-context'];
    }

    public loadFromOptions(options: any) {
        this.clusters = options.clusters;
        this.contexts = options.contexts;
        this.users = options.users;
        this.currentContext = options.currentContext;
    }

    public loadFromClusterAndUser(cluster: Cluster, user: User) {
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

    public loadFromCluster(pathPrefix: string = '') {
        const host = process.env.KUBERNETES_SERVICE_HOST;
        const port = process.env.KUBERNETES_SERVICE_PORT;
        const clusterName = 'inCluster';
        const userName = 'inClusterUser';
        const contextName = 'inClusterContext';

        let scheme = 'https';
        if (port === '80' || port === '8080' || port === '8001') {
            scheme = 'http';
        }

        this.clusters = [
            {
                name: clusterName,
                caFile: `${pathPrefix}${Config.SERVICEACCOUNT_CA_PATH}`,
                server: `${scheme}://${host}:${port}`,
                skipTLSVerify: false,
            },
        ];
        this.users = [
            {
                name: userName,
                token: fs.readFileSync(`${pathPrefix}${Config.SERVICEACCOUNT_TOKEN_PATH}`).toString(),
            },
        ];
        this.contexts = [
            {
                cluster: clusterName,
                name: contextName,
                user: userName,
            },
        ];
        this.currentContext = contextName;
    }

    public loadFromDefault() {
        if (process.env.KUBECONFIG && process.env.KUBECONFIG.length > 0) {
            this.loadFromFile(process.env.KUBECONFIG);
            return;
        }
        const home = findHomeDir();
        if (home) {
            const config = path.join(home, '.kube', 'config');
            if (fileExists(config)) {
                this.loadFromFile(config);
                return;
            }
        }
        if (process.platform === 'win32' && shelljs.which('wsl.exe')) {
            // TODO: Handle if someome set $KUBECONFIG in wsl here...
            const result = shelljs.exec('wsl.exe cat $HOME/.kube/config', {
                silent: true,
            });
            if (result.code === 0) {
                this.loadFromString(result.stdout);
                return;
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

    public makeApiClient<T extends ApiType>(apiClientType: ApiConstructor<T>) {
        const cluster = this.getCurrentCluster();
        if (!cluster) {
            throw new Error('No active cluster!');
        }
        const apiClient = new apiClientType(cluster.server);
        apiClient.setDefaultAuthentication(this);

        return apiClient;
    }

    private getCurrentContextObject() {
        return this.getContextObject(this.currentContext);
    }

    private applyHTTPSOptions(opts: request.Options | https.RequestOptions) {
        const cluster = this.getCurrentCluster();
        const user = this.getCurrentUser();
        if (!user) {
            return;
        }

        if (cluster != null && cluster.skipTLSVerify) {
            opts.rejectUnauthorized = false;
        }
        const ca =
            cluster != null
                ? bufferFromFileOrString(this.rootDirectory, cluster.caFile, cluster.caData)
                : null;
        if (ca) {
            opts.ca = ca;
        }
        const cert = bufferFromFileOrString(this.rootDirectory, user.certFile, user.certData);
        if (cert) {
            opts.cert = cert;
        }
        const key = bufferFromFileOrString(this.rootDirectory, user.keyFile, user.keyData);
        if (key) {
            opts.key = key;
        }
    }

    private applyAuthorizationHeader(opts: request.Options | https.RequestOptions) {
        const user = this.getCurrentUser();
        if (!user) {
            return;
        }
        let token: string | null = null;

        KubeConfig.authenticators.forEach((authenticator: Authenticator) => {
            if (authenticator.isAuthProvider(user)) {
                token = authenticator.getToken(user);
            }
        });

        if (user.token) {
            token = 'Bearer ' + user.token;
        }

        if (token) {
            if (!opts.headers) {
                opts.headers = [];
            }
            opts.headers.Authorization = token;
        }
    }

    private applyOptions(opts: request.Options | https.RequestOptions) {
        this.applyHTTPSOptions(opts);
        this.applyAuthorizationHeader(opts);
    }
}

export interface ApiType {
    setDefaultAuthentication(config: api.Authentication);
}

export interface ApiConstructor<T extends ApiType> {
    new (server: string): T;
}

// This class is deprecated and will eventually be removed.
export class Config {
    public static SERVICEACCOUNT_ROOT = '/var/run/secrets/kubernetes.io/serviceaccount';
    public static SERVICEACCOUNT_CA_PATH = Config.SERVICEACCOUNT_ROOT + '/ca.crt';
    public static SERVICEACCOUNT_TOKEN_PATH = Config.SERVICEACCOUNT_ROOT + '/token';

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

// This is public really only for testing.
export function bufferFromFileOrString(root?: string, file?: string, data?: string): Buffer | null {
    if (file) {
        if (!path.isAbsolute(file) && root) {
            file = path.join(root, file);
        }
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
    for (const obj of list) {
        if (obj.name === name) {
            if (obj[key]) {
                return obj[key];
            }
            return obj;
        }
    }
    return null;
}
