// workaround for issue https://github.com/dchester/jsonpath/issues/96
import jsonpath = require('jsonpath/jsonpath.min');
import * as shelljs from 'shelljs';

import { Authenticator } from './auth';
import { User } from './config_types';

export class CloudAuth implements Authenticator {
    public isAuthProvider(user: User): boolean {
        return (
            user.authProvider.name === 'azure' ||
            user.authProvider.name === 'gcp'
        );
    }

    public getToken(user: User): string | null {
        const config = user.authProvider.config;
        if (this.isExpired(config)) {
            this.updateAccessToken(config);
        }
        return 'Bearer ' + config['access-token'];
    }

    private isExpired(config) {
        const token = config['access-token']
        const expiry = config.expiry;
        if (!token) {
            return true;
        }
        if(!expiry) {
            return false
        }

        const expiration = Date.parse(expiry);
        if (expiration < Date.now()) {
            return true;
        }
        return false;
    }

    private updateAccessToken(config) {
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
            result = shelljs.exec(cmd, {silent: true});
            if (result.code !== 0) {
                throw new Error(result.stderr);
            }
        } catch (err) {
            throw new Error('Failed to refresh token: ' + err.message);
        }

        const output = result.stdout.toString();
        const resultObj = JSON.parse(output);

        let tokenPathKey = config['token-key'];

        let expiryPathKey = config['token-key'];
        // Format in file is {<query>}, so slice it out and add '$'
        tokenPathKey = '$' + tokenPathKey.slice(1, -1);
        expiryPathKey = '$' + expiryPathKey.slice(1, -1);

        config['access-token'] = jsonpath.query(resultObj, tokenPathKey);
        config['expiry'] = jsonpath.query(resultObj, expiryPathKey);
    }
}
