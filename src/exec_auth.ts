import * as shell from 'shelljs';

import { Authenticator } from './auth';
import { User } from './config_types';

export class ExecAuth implements Authenticator {
    public isAuthProvider(user: User) {
        return user.authProvider.name === 'exec' ||
            (user.authProvider.config && user.authProvider.config.exec);
    }

    public getToken(user: User): string | null {
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
            return `Bearer ${obj.token}`;
        }
        throw new Error(result.stderr);
    }
}
