import proc from 'node:child_process';
import https from 'node:https';
import * as jsonpath from 'jsonpath-plus';

import { Authenticator } from './auth.js';
import { User } from './config_types.js';

/* FIXME: maybe we can extend the User and User.authProvider type to have a proper type.
Currently user.authProvider has `any` type and so we don't have a type for user.authProvider.config.
We therefore define its type here
*/
interface Config {
    expiry?: string;
    ['cmd-args']?: string;
    ['cmd-path']?: string;
    ['token-key']: string;
    ['expiry-key']: string;
    ['access-token']?: string;
    ['expires-on']?: string;
}
export class AzureAuth implements Authenticator {
    public isAuthProvider(user: User): boolean {
        if (!user || !user.authProvider) {
            return false;
        }
        return user.authProvider.name === 'azure';
    }

    public async applyAuthentication(user: User, opts: https.RequestOptions): Promise<void> {
        const token = this.getToken(user);
        if (token) {
            opts.headers!['Authorization'] = `Bearer ${token}`;
        }
    }

    private getToken(user: User): string | null {
        const config = user.authProvider.config;
        if (this.isExpired(config)) {
            this.updateAccessToken(config);
        }
        return config['access-token'];
    }

    private isExpired(config: Config): boolean {
        const token = config['access-token'];
        const expiry = config.expiry;
        const expiresOn = config['expires-on'];

        if (!token) {
            return true;
        }
        if (!expiry && !expiresOn) {
            return false;
        }

        const expiresOnDate = expiresOn ? new Date(parseInt(expiresOn, 10) * 1000) : undefined;
        const expiration = expiry ? Date.parse(expiry) : expiresOnDate!.getTime();
        if (expiration < Date.now()) {
            return true;
        }
        return false;
    }

    private updateAccessToken(config: Config): void {
        let cmd = config['cmd-path'];
        if (!cmd) {
            throw new Error('Token is expired!');
        }
        // Wrap cmd in quotes to make it cope with spaces in path
        cmd = `"${cmd}"`;
        const args = config['cmd-args'];
        if (args) {
            cmd = cmd + ' ' + args;
        }
        // TODO: Cache to file?
        // TODO: do this asynchronously
        let output: any;
        try {
            output = proc.execSync(cmd);
        } catch (err) {
            throw new Error('Failed to refresh token: ' + err);
        }

        const resultObj = JSON.parse(output);

        const tokenPathKeyInConfig = config['token-key'];
        const expiryPathKeyInConfig = config['expiry-key'];

        // Format in file is {<query>}, so slice it out and add '$'
        const tokenPathKey = '$' + tokenPathKeyInConfig.slice(1, -1);
        const expiryPathKey = '$' + expiryPathKeyInConfig.slice(1, -1);

        config['access-token'] = jsonpath.JSONPath({ path: tokenPathKey, json: resultObj });
        config.expiry = jsonpath.JSONPath({ path: expiryPathKey, json: resultObj });
    }
}
