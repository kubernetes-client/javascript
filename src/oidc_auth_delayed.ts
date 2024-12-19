import https = require('https');
import request = require('request');

import { Authenticator } from './auth';
import { User } from './config_types';

export class DelayedOpenIDConnectAuth implements Authenticator {
    private delegate?: Authenticator;

    public constructor() {
        this.delegate = undefined;
    }

    public isAuthProvider(user: User): boolean {
        if (!user.authProvider) {
            return false;
        }
        return user.authProvider.name === 'oidc';
    }

    /**
     * Setup the authentication header for oidc authed clients
     * @param user user info
     * @param opts request options
     * @param overrideClient for testing, a preconfigured oidc client
     */
    public async applyAuthentication(
        user: User,
        opts: request.Options | https.RequestOptions,
        overrideClient?: any,
    ): Promise<void> {
        const oidc = await import('./oidc_auth');
        return new oidc.OpenIDConnectAuth().applyAuthentication(user, opts, overrideClient);
    }
}
