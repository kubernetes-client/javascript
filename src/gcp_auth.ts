import * as proc from 'child_process';
import https = require('https');
import request = require('request');

import { Authenticator } from './auth';
import { User } from './config_types';
import { jsonpath } from './json_path';

/* FIXME: maybe we can extend the User and User.authProvider type to have a proper type.
Currently user.authProvider has `any` type and so we don't have a type for user.authProvider.config.
We therefore define its type here
*/
interface Config {
    expiry: string;
    ['cmd-args']?: string;
    ['cmd-path']?: string;
    ['token-key']: string;
    ['expiry-key']: string;
    ['access-token']?: string;
}
export class GoogleCloudPlatformAuth implements Authenticator {
    public isAuthProvider(user: User): boolean {
        if (!user || !user.authProvider) {
            return false;
        }
        return user.authProvider.name === 'gcp';
    }

    public async applyAuthentication(
        user: User,
        opts: request.Options | https.RequestOptions,
    ): Promise<void> {
        const token = this.getToken(user);
        if (token) {
            opts.headers!.Authorization = `Bearer ${token}`;
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
        if (!token) {
            return true;
        }
        if (!expiry) {
            return false;
        }

        const expiration = Date.parse(expiry);
        if (expiration < Date.now()) {
            return true;
        }
        return false;
    }

    private updateAccessToken(config: Config): void {
        const cmd = config['cmd-path'];
        if (!cmd) {
            throw new Error('Token is expired!');
        }
        const args = (config['cmd-args'] ? config['cmd-args'].split(' ') : []).map((arg: string): string => {
            if (arg[0] === "'" || arg[0] === '"') {
                return arg.substring(1, arg.length - 1);
            }
            return arg;
        });
        // TODO: Cache to file?
        // TODO: do this asynchronously
        let output: any;
        try {
            output = proc.execFileSync(cmd, args);
        } catch (err) {
            throw new Error('Failed to refresh token: ' + (err as Error).message);
        }

        const resultObj = JSON.parse(output);

        const tokenPathKeyInConfig = config['token-key'];
        const expiryPathKeyInConfig = config['expiry-key'];

        // Format in file is {<query>}, so slice it out and add '$'
        const tokenPathKey = '$' + tokenPathKeyInConfig.slice(1, -1);
        const expiryPathKey = '$' + expiryPathKeyInConfig.slice(1, -1);

        config['access-token'] = jsonpath(tokenPathKey, resultObj);
        config.expiry = jsonpath(expiryPathKey, resultObj);
    }
}
