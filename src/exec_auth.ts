import * as shell from 'shelljs';

import { Authenticator } from './auth';
import { User } from './config_types';

export class ExecAuth implements Authenticator {
    private readonly tokenCache: { [key: string]: any } = {};

    public isAuthProvider(user: User) {
        return user.authProvider.name === 'exec' ||
            (user.authProvider.config && user.authProvider.config.exec);
    }

    public getToken(user: User): string | null {
        // TODO: Handle client cert auth here, requires auth refactor.
        // See https://kubernetes.io/docs/reference/access-authn-authz/authentication/#input-and-output-formats
        // for details on this protocol.
        // TODO: Add a unit test for token caching.
        const cachedToken = this.tokenCache[user.name];
        if (cachedToken) {
            const date = Date.parse(cachedToken.status.expirationTimestamp);
            if (date < Date.now()) {
                return `Bearer ${cachedToken.status.token}`;
            }
            this.tokenCache[user.name] = null;
        }
        const config = user.authProvider.config;
        if (!config.exec.command) {
            throw new Error('No command was specified for exec authProvider!');
        }
        let cmd = config.exec.command;
        if (config.exec.args) {
            cmd = `${cmd} ${config.exec.args.join(' ')}`;
        }
        let opts: shell.ExecOpts;
        if (config.exec.env) {
            const env = {};
            config.exec.env.forEach((elt) => env[elt.name] = elt.value);
            opts = { env };
        }
        const result = shell.exec(cmd, opts);
        if (result.code === 0) {
            const obj = JSON.parse(result.stdout);
            this.tokenCache[user.name] = obj;
            return `Bearer ${obj.status.token}`;
        }
        throw new Error(result.stderr);
    }
}
