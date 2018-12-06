// workaround for issue https://github.com/dchester/jsonpath/issues/96
import jsonpath = require('jsonpath/jsonpath.min');
import * as shelljs from 'shelljs';

import { Authenticator } from './auth';
import { User } from './config_types';

export class CloudAuth implements Authenticator {
    public isAuthProvider(user: User): boolean {
        return user.authProvider.name === 'azure' ||
            user.authProvider.name === 'gcp';
    }

    public getToken(user: User): string | null {
        const config = user.authProvider.config;
        // This should probably be extracted as auth-provider specific plugins...
        let token: string = 'Bearer ' + config['access-token'];
        const expiry = config.expiry;

        if (expiry) {
            const expiration = Date.parse(expiry);
            if (expiration < Date.now()) {
                if (config['cmd-path']) {
                    const args = config['cmd-args'];
                    // TODO: Cache to file?
                    // TODO: do this asynchronously
                    let result: any;
                    try {
                        let cmd = config['cmd-path'];
                        if (args) {
                            cmd = `${cmd} ${args}`;
                        }
                        result = shelljs.exec(cmd);
                        if (result.code !== 0) {
                            throw new Error(`Failed to refresh token: ${result.stderr}`);
                        }
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
        return token;
    }
}
