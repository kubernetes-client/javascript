import execa = require('execa');

import { Authenticator } from './auth';
import { User } from './config_types';

export class ExecAuth implements Authenticator {
    private readonly tokenCache: { [key: string]: any } = {};
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

    public getToken(user: User): string | null {
        // TODO: Handle client cert auth here, requires auth refactor.
        // See https://kubernetes.io/docs/reference/access-authn-authz/authentication/#input-and-output-formats
        // for details on this protocol.
        // TODO: Add a unit test for token caching.
        const cachedToken = this.tokenCache[user.name];
        if (cachedToken) {
            const date = Date.parse(cachedToken.status.expirationTimestamp);
            if (date > Date.now()) {
                return `Bearer ${cachedToken.status.token}`;
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
        if (result.code === 0) {
            const obj = JSON.parse(result.stdout);
            this.tokenCache[user.name] = obj;
            return `Bearer ${obj.status.token}`;
        }
        throw new Error(result.stderr);
    }
}
