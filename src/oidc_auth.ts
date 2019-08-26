import https = require('https');
import { Client, Issuer } from 'openid-client';
import request = require('request');

import { Authenticator } from './auth';
import { User } from './config_types';

export class OpenIDConnectAuth implements Authenticator {
    // public for testing purposes.
    private currentTokenExpiration = 0;
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
    ) {
        const token = await this.getToken(user, overrideClient);
        if (token) {
            opts.headers!.Authorization = `Bearer ${token}`;
        }
    }

    private async getToken(user: User, overrideClient?: Client): Promise<string | null> {
        if (
            !user.authProvider.config ||
            !user.authProvider.config['id-token'] ||
            !user.authProvider.config['client-id'] ||
            !user.authProvider.config['client-secret'] ||
            !user.authProvider.config['refresh-token'] ||
            !user.authProvider.config['idp-issuer-url']
        ) {
            return null;
        }
        const client = overrideClient ? overrideClient : await this.getClient(user);
        return this.refresh(user, client);
    }

    private async refresh(user: User, client: Client): Promise<string> {
        if (Date.now() / 1000 > this.currentTokenExpiration) {
            const newToken = await client.refresh(user.authProvider.config['refresh-token']);
            user.authProvider.config['id-token'] = newToken.id_token;
            this.currentTokenExpiration = newToken.expires_at || 0;
        }
        return user.authProvider.config['id-token'];
    }

    private async getClient(user: User) {
        const oidcIssuer = await Issuer.discover(user.authProvider.config['idp-issuer-url']);
        return new oidcIssuer.Client({
            client_id: user.authProvider.config['client-id'],
            client_secret: user.authProvider.config['client-secret'],
        });
    }
}
