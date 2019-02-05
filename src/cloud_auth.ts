// workaround for issue https://github.com/dchester/jsonpath/issues/96
import jsonpath = require('jsonpath/jsonpath.min');
import * as shelljs from 'shelljs';

import { Authenticator } from './auth';
import { User } from './config_types';

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
export class CloudAuth implements Authenticator {
    public isAuthProvider(user: User): boolean {
        return user.authProvider.name === 'azure' || user.authProvider.name === 'gcp';
    }

    public getToken(user: User): string | null {
        const config = user.authProvider.config;
        if (this.isExpired(config)) {
            this.updateAccessToken(config);
        }
        return 'Bearer ' + config['access-token'];
    }

    private isExpired(config: Config) {
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

    private updateAccessToken(config: Config) {
        if (!config['cmd-path']) {
            throw new Error('Token is expired!');
        }
        const args = config['cmd-args'];
        // TODO: Cache to file?
        // TODO: do this asynchronously
        let result: any;
        try {
            let cmd = config['cmd-path'];
            if (args) {
                cmd = `${cmd} ${args}`;
            }
            result = shelljs.exec(cmd, { silent: true });
            if (result.code !== 0) {
                throw new Error(result.stderr);
            }
        } catch (err) {
            throw new Error('Failed to refresh token: ' + err.message);
        }

        const output = result.stdout.toString();
        const resultObj = JSON.parse(output);

        const tokenPathKeyInConfig = config['token-key'];
        const expiryPathKeyInConfig = config['expiry-key'];

        // Format in file is {<query>}, so slice it out and add '$'
        const tokenPathKey = '$' + tokenPathKeyInConfig.slice(1, -1);
        const expiryPathKey = '$' + expiryPathKeyInConfig.slice(1, -1);

        config['access-token'] = jsonpath.query(resultObj, tokenPathKey);
        config.expiry = jsonpath.query(resultObj, expiryPathKey);
    }
}
