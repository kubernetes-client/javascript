import * as fs from 'fs';
import * as _ from 'underscore';

export enum ActionOnInvalid {
    THROW = 'throw',
    FILTER = 'filter',
}

export interface ConfigOptions {
    onInvalidEntry: ActionOnInvalid;
}

function defaultNewConfigOptions(): ConfigOptions {
    return {
        onInvalidEntry: ActionOnInvalid.THROW,
    };
}

export interface Cluster {
    readonly name: string;
    readonly caData?: string;
    caFile?: string;
    readonly server: string;
    readonly skipTLSVerify: boolean;
}

export function newClusters(a: any, opts?: Partial<ConfigOptions>): Cluster[] {
    const options = Object.assign(defaultNewConfigOptions(), opts || {});

    return _.compact(_.map(a, clusterIterator(options.onInvalidEntry)));
}

export function exportCluster(cluster: Cluster): any {
    return {
        name: cluster.name,
        cluster: {
            server: cluster.server,
            'certificate-authority-data': cluster.caData,
            'certificate-authority': cluster.caFile,
            'insecure-skip-tls-verify': cluster.skipTLSVerify,
        },
    };
}

function clusterIterator(onInvalidEntry: ActionOnInvalid): _.ListIterator<any, Cluster | null> {
    return (elt: any, i: number, list: _.List<any>): Cluster | null => {
        try {
            if (!elt.name) {
                throw new Error(`clusters[${i}].name is missing`);
            }
            if (!elt.cluster) {
                throw new Error(`clusters[${i}].cluster is missing`);
            }
            if (!elt.cluster.server) {
                throw new Error(`clusters[${i}].cluster.server is missing`);
            }
            return {
                caData: elt.cluster['certificate-authority-data'],
                caFile: elt.cluster['certificate-authority'],
                name: elt.name,
                server: elt.cluster.server,
                skipTLSVerify: elt.cluster['insecure-skip-tls-verify'] === true,
            };
        } catch (err) {
            switch (onInvalidEntry) {
                case ActionOnInvalid.FILTER:
                    return null;
                default:
                case ActionOnInvalid.THROW:
                    throw err;
            }
        }
    };
}

export interface User {
    readonly name: string;
    readonly certData?: string;
    certFile?: string;
    readonly exec?: any;
    readonly keyData?: string;
    keyFile?: string;
    readonly authProvider?: any;
    readonly token?: string;
    readonly username?: string;
    readonly password?: string;
}

export function newUsers(a: any, opts?: Partial<ConfigOptions>): User[] {
    const options = Object.assign(defaultNewConfigOptions(), opts || {});

    return _.compact(_.map(a, userIterator(options.onInvalidEntry)));
}

export function exportUser(user: User): any {
    return {
        name: user.name,
        user: {
            'auth-provider': user.authProvider,
            'client-certificate-data': user.certData,
            'client-certificate': user.certFile,
            exec: user.exec,
            'client-key-data': user.keyData,
            'client-key': user.keyFile,
            token: user.token,
            password: user.password,
            username: user.username,
        },
    };
}

function userIterator(onInvalidEntry: ActionOnInvalid): _.ListIterator<any, User | null> {
    return (elt: any, i: number, list: _.List<any>): User | null => {
        try {
            if (!elt.name) {
                throw new Error(`users[${i}].name is missing`);
            }
            return {
                authProvider: elt.user ? elt.user['auth-provider'] : null,
                certData: elt.user ? elt.user['client-certificate-data'] : null,
                certFile: elt.user ? elt.user['client-certificate'] : null,
                exec: elt.user ? elt.user.exec : null,
                keyData: elt.user ? elt.user['client-key-data'] : null,
                keyFile: elt.user ? elt.user['client-key'] : null,
                name: elt.name,
                token: findToken(elt.user),
                password: elt.user ? elt.user.password : null,
                username: elt.user ? elt.user.username : null,
            };
        } catch (err) {
            switch (onInvalidEntry) {
                case ActionOnInvalid.FILTER:
                    return null;
                default:
                case ActionOnInvalid.THROW:
                    throw err;
            }
        }
    };
}

function findToken(user: User | undefined): string | undefined {
    if (user) {
        if (user.token) {
            return user.token;
        }
        if (user['token-file']) {
            return fs.readFileSync(user['token-file']).toString();
        }
    }
}

export interface Context {
    readonly cluster: string;
    readonly user: string;
    readonly name: string;
    readonly namespace?: string;
}

export function newContexts(a: any, opts?: Partial<ConfigOptions>): Context[] {
    const options = Object.assign(defaultNewConfigOptions(), opts || {});

    return _.compact(_.map(a, contextIterator(options.onInvalidEntry)));
}

export function exportContext(ctx: Context): any {
    return {
        name: ctx.name,
        context: ctx,
    };
}

function contextIterator(onInvalidEntry: ActionOnInvalid): _.ListIterator<any, Context | null> {
    return (elt: any, i: number, list: _.List<any>): Context | null => {
        try {
            if (!elt.name) {
                throw new Error(`contexts[${i}].name is missing`);
            }
            if (!elt.context) {
                throw new Error(`contexts[${i}].context is missing`);
            }
            if (!elt.context.cluster) {
                throw new Error(`contexts[${i}].context.cluster is missing`);
            }
            return {
                cluster: elt.context.cluster,
                name: elt.name,
                user: elt.context.user || undefined,
                namespace: elt.context.namespace || undefined,
            };
        } catch (err) {
            switch (onInvalidEntry) {
                case ActionOnInvalid.FILTER:
                    return null;
                default:
                case ActionOnInvalid.THROW:
                    throw err;
            }
        }
    };
}
