import fs = require('fs');
import https = require('https');
import path = require('path');

import base64 = require('base-64');
import execa = require('execa');
import yaml = require('js-yaml');
// workaround for issue https://github.com/dchester/jsonpath/issues/96
import jsonpath = require('jsonpath/jsonpath.min');
import request = require('request');
import shelljs = require('shelljs');

import api = require('./api');
import { Cluster, Context, newClusters, newContexts, newUsers, User } from './config_types';

export class KubeConfig {

    // Only really public for testing...
    public static findObject(list: any[], name: string, key: string) {
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
        return KubeConfig.findObject(this.contexts, name, 'context');
    }

    public getCurrentCluster(): Cluster | null {
        const context = this.getCurrentContextObject();
        if (!context) {
            return null;
        }
        return this.getCluster(context.cluster);
    }

    public getCluster(name: string): Cluster {
        return KubeConfig.findObject(this.clusters, name, 'cluster');
    }

    public getCurrentUser() {
        return this.getUser(this.getCurrentContextObject().user);
    }

    public getUser(name: string): User {
        return KubeConfig.findObject(this.users, name, 'user');
    }

    public loadFromFile(file: string) {
        this.loadFromString(fs.readFileSync(file, 'utf8'));
    }

    public applytoHTTPSOptions(opts: https.RequestOptions) {
        const user = this.getCurrentUser();

        this.applyOptions(opts);

        if (user.username) {
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

        if (user.username) {
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
        if (process.env.HOME) {
            const config = path.join(process.env.HOME, '.kube', 'config');
            if (fs.existsSync(config)) {
                this.loadFromFile(config);
                return;
            }
        }
        if (process.platform === 'win32' && shelljs.which('wsl.exe')) {
            const result = shelljs.exec('wsl.exe cat $HOME/.kube/config', { silent: true });
            if (result.code === 0) {
                this.loadFromString(result.stdout);
                return;
            }
        }

        if (fs.existsSync(Config.SERVICEACCOUNT_TOKEN_PATH)) {
            this.loadFromCluster();
            return;
        }

        this.loadFromClusterAndUser(
            {name: 'cluster', server: 'http://localhost:8080'} as Cluster,
            {name: 'user'} as User,
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

    private bufferFromFileOrString(file?: string, data?: string): Buffer | null {
        if (file) {
            return fs.readFileSync(file);
        }
        if (data) {
            return Buffer.from(base64.decode(data), 'utf-8');
        }
        return null;
    }

    private applyHTTPSOptions(opts: request.Options | https.RequestOptions) {
        const cluster = this.getCurrentCluster();
        const user = this.getCurrentUser();

        const ca = cluster != null ? this.bufferFromFileOrString(cluster.caFile, cluster.caData) : null;
        if (ca) {
            opts.ca = ca;
        }
        const cert = this.bufferFromFileOrString(user.certFile, user.certData);
        if (cert) {
            opts.cert = cert;
        }
        const key = this.bufferFromFileOrString(user.keyFile, user.keyData);
        if (key) {
            opts.key = key;
        }
    }

    private applyAuthorizationHeader(opts: request.Options | https.RequestOptions) {
        const user = this.getCurrentUser();
        let token: string | null = null;

        if (user.authProvider && user.authProvider.config) {
            const config = user.authProvider.config;
            // This should probably be extracted as auth-provider specific plugins...
            token = 'Bearer ' + config['access-token'];
            const expiry = config.expiry;

            if (expiry) {
                const expiration = Date.parse(expiry);
                if (expiration < Date.now()) {
                    if (config['cmd-path']) {
                        const args = config['cmd-args'] ? [config['cmd-args']] : [];
                        // TODO: Cache to file?
                        // TODO: do this asynchronously
                        let result: execa.ExecaReturns;

                        try {
                            result = execa.sync(config['cmd-path'], args);
                        } catch (err) {
                            throw new Error('Failed to refresh token: ' + err.message);
                        }

                        const output = result.stdout.toString();
                        const resultObj = JSON.parse(output);

                        let pathKey = config['token-key'];
                        // Format in file is {<query>}, so slice it out and add '$'
                        pathKey = '$' + pathKey.slice(1, -1);

                        config['access-token'] = jsonpath.query(resultObj, pathKey);
                        token = 'Bearer ' + config['access-token'];
                    } else {
                        throw new Error('Token is expired!');
                    }
                }
            }

        }

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
    public static SERVICEACCOUNT_ROOT =
    '/var/run/secrets/kubernetes.io/serviceaccount';
    public static SERVICEACCOUNT_CA_PATH =
    Config.SERVICEACCOUNT_ROOT + '/ca.crt';
    public static SERVICEACCOUNT_TOKEN_PATH =
    Config.SERVICEACCOUNT_ROOT + '/token';

    public static fromFile(filename: string): api.Core_v1Api {
        return Config.apiFromFile(filename, api.Core_v1Api);
    }

    public static fromCluster(): api.Core_v1Api {
        return Config.apiFromCluster(api.Core_v1Api);
    }

    public static defaultClient(): api.Core_v1Api {
        return Config.apiFromDefaultClient(api.Core_v1Api);
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
