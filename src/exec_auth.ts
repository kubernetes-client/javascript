import * as shell from 'shelljs';

import { Authenticator, Credentials } from './auth';
import { User } from './config_types';

export class ExecAuth extends Authenticator {
    private execFn: (cmd: string, opts: shell.ExecOpts) => shell.ShellReturnValue = shell.exec;

    public isAuthProvider(user: User) {
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
            user.authProvider.name === 'exec' || (user.authProvider.config && user.authProvider.config.exec)
        );
    }

    public getCredentials(user: User) {
        // TODO: Add a unit test for token caching.
        // TODO: Move caching logic into base class
        const cached = this.cache[user.name];
        if (cached) {
            if (cached.expirationTimestamp) {
                const date = Date.parse(cached.expirationTimestamp);
                if (date > Date.now()) {
                    return cached;
                }
                delete this.cache[user.name];
            } else {
                return cached;
            }
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
        let cmd = exec.command;
        if (exec.args) {
            cmd = `${cmd} ${exec.args.join(' ')}`;
        }
        let opts: shell.ExecOpts = { silent: true };
        if (exec.env) {
            const env = process.env;
            exec.env.forEach((elt) => (env[elt.name] = elt.value));
            opts = { ...opts, env };
        }
        const result = this.execFn(cmd, opts);
        if (result.code === 0) {
            const obj = JSON.parse(result.stdout);
            const creds = obj.status;

            // Explicitly setting types here, for type-safety
            if (creds.token) {
                this.cache[user.name] = {
                    type: 'token',
                    ...creds,
                };
            } else if (creds.clientKeyData) {
                this.cache[user.name] = {
                    type: 'client-cert',
                    ...creds,
                };
            }

            return this.cache[user.name];
        }
        throw new Error(result.stderr);
    }
}
