import { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';

import { Authenticator } from './auth';
import { User } from './config_types';

import child_process from 'node:child_process';

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
    private execFn: (
        command: string,
        args?: readonly string[],
        options?: child_process.SpawnOptionsWithoutStdio,
    ) => child_process.ChildProcessWithoutNullStreams = child_process.spawn;

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

    public async applyAuthentication(user: User, opts: https.RequestOptions): Promise<void> {
        const credential = await this.getCredential(user);
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
                opts.headers = {} as OutgoingHttpHeaders;
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

    private async getCredential(user: User): Promise<Credential | null> {
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

        return new Promise((resolve, reject) => {
            let stdoutData: string = '';
            let stderrData: string = '';
            let savedError: Error | undefined = undefined;

            const subprocess = this.execFn(exec.command, exec.args, opts);
            subprocess.stdout.setEncoding('utf8');
            subprocess.stderr.setEncoding('utf8');

            subprocess.stdout.on('data', (data: Buffer | string) => {
                stdoutData += data.toString('utf8');
            });

            subprocess.stderr.on('data', (data) => {
                stderrData += data.toString('utf8');
            });

            subprocess.on('error', (error) => {
                savedError = error;
                throw error;
            });

            subprocess.on('close', (code) => {
                if (savedError) {
                    reject(savedError);
                    return;
                }
                if (code !== 0) {
                    reject(new Error(stderrData));
                    return;
                }
                try {
                    const obj = JSON.parse(stdoutData) as Credential;
                    this.tokenCache[user.name] = obj;
                    resolve(obj);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}
