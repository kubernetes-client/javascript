import * as fs from 'fs';
import * as u from 'underscore';
import { ExtensionsV1beta1RollbackConfig } from './api';

export interface Cluster {
    readonly name: string;
    readonly caData?: string;
    readonly caFile?: string;
    readonly server: string;
    readonly skipTLSVerify: boolean;
}

export function newClusters(a: any): Cluster[] {
    return u.map(a, clusterIterator());
}

function clusterIterator(): u.ListIterator<any, Cluster> {
    return (elt: any, i: number, list: u.List<any>): Cluster => {
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
    };
}

export interface User {
    readonly name: string;
    readonly certData?: string;
    readonly certFile?: string;
    readonly exec?: any;
    readonly keyData?: string;
    readonly keyFile?: string;
    readonly authProvider?: any;
    readonly token?: string;
    readonly username?: string;
    readonly password?: string;
}

export function newUsers(a: any): User[] {
    return u.map(a, userIterator());
}

function userIterator(): u.ListIterator<any, User> {
    return (elt: any, i: number, list: u.List<any>): User => {
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

export function newContexts(a: any): Context[] {
    return u.map(a, contextIterator());
}

function contextIterator(): u.ListIterator<any, Context> {
    return (elt: any, i: number, list: u.List<any>): Context => {
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
    };
}
