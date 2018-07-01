import https = require('https');
import request = require('request');
import api = require('./api');
import { Cluster, User, Context } from './config_types';
export declare class KubeConfig {
    'clusters': Cluster[];
    'users': User[];
    'contexts': Context[];
    'currentContext': string;
    constructor();
    getContexts(): Context[];
    getClusters(): Cluster[];
    getUsers(): User[];
    getCurrentContext(): string;
    setCurrentContext(context: string): void;
    static findObject(list: Object[], name: string, key: string): any;
    private getCurrentContextObject;
    getContextObject(name: string): any;
    getCurrentCluster(): Cluster;
    getCluster(name: string): Cluster;
    getCurrentUser(): User;
    getUser(name: string): User;
    loadFromFile(file: string): void;
    private bufferFromFileOrString;
    private applyHTTPSOptions;
    private applyAuthorizationHeader;
    private applyOptions;
    applytoHTTPSOptions(opts: https.RequestOptions): void;
    applyToRequest(opts: request.Options): void;
    loadFromString(config: string): void;
}
export declare class Config {
    static SERVICEACCOUNT_ROOT: string;
    static SERVICEACCOUNT_CA_PATH: string;
    static SERVICEACCOUNT_TOKEN_PATH: string;
    static fromFile(filename: string): api.Core_v1Api;
    static fromCluster(): api.Core_v1Api;
    static defaultClient(): api.Core_v1Api;
}
