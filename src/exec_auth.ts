import execa = require('execa');
import https = require('https');
import request = require('request');

import { Authenticator } from './auth';
import { User } from './config_types';

export interface CredentialStatus {
    readonly token: string;
    readonly clientCertificateData: string;
    readonly clientKeyData: string;
    readonly expirationTimestamp: string;
}

export interface Credential {
    readonly status: CredentialStatus;
}

export class ExecAuth implements Authenticator {
    private readonly tokenCache: { [key: string]: Credential | null } = {};
    private execFn: (cmd: string, args: string[], opts: execa.SyncOptions) => execa.ExecaSyncReturnValue =
        execa.sync;

    public isAuthProvider(user: User): boolean {
        if (!user) {
            return false;
        }
        if (user.exec) {
            return true;
        }
        if (!user.authProvider) {
            return false;
        }
        return (
            user.authProvider.name === 'exec' || !!(user.authProvider.config && user.authProvider.config.exec)
        );
    }

    public async applyAuthentication(
        user: User,
        opts: request.Options | https.RequestOptions,
    ): Promise<void> {
        const credential = this.getCredential(user);
        if (!credential) {
            return;
        }
        if (credential.status.clientCertificateData) {
            opts.cert = credential.status.clientCertificateData;
        }
        if (credential.status.clientKeyData) {
            opts.key = credential.status.clientKeyData;
        }
        const token = this.getToken(credential);
        if (token) {
            if (!opts.headers) {
                opts.headers = [];
            }
            opts.headers!.Authorization = `Bearer ${token}`;
        }
    }

    private getToken(credential: Credential): string | null {
        if (!credential) {
            return null;
        }
        if (credential.status.token) {
            return credential.status.token;
        }
        return null;
    }

    private getCredential(user: User): Credential | null {
        // TODO: Add a unit test for token caching.
        const cachedToken = this.tokenCache[user.name];
        if (cachedToken) {
            const date = Date.parse(cachedToken.status.expirationTimestamp);
            if (date > Date.now()) {
                return cachedToken;
            }
            this.tokenCache[user.name] = null;
        }
        let exec: any = null;
        if (user.authProvider && user.authProvider.config) {
            exec = user.authProvider.config.exec;
        }
        if (user.exec) {
            exec = user.exec;
        }
        if (!exec) {
            return null;
        }
        if (!exec.command) {
            throw new Error('No command was specified for exec authProvider!');
        }
        let opts = {};
        if (exec.env) {
            const env = process.env;
            exec.env.forEach((elt) => (env[elt.name] = elt.value));
            opts = { ...opts, env };
        }
        const result = this.execFn(exec.command, exec.args, opts);
        if (result.exitCode === 0) {
            const obj = JSON.parse(result.stdout) as Credential;
            this.tokenCache[user.name] = obj;
            return obj;
        }
        throw new Error(result.stderr);
    }
}
