import https = require('https');
import { Client, Issuer } from 'openid-client';
import request = require('request');
import { base64url } from 'rfc4648';
import { TextDecoder } from 'util';

import { Authenticator, Token } from './auth';
import { User } from './config_types';

interface JwtObj {
    header: any;
    payload: any;
    signature: string;
}

export class OpenIDConnectAuth implements Authenticator {
    public static decodeJWT(token: string): JwtObj | null {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        const header = JSON.parse(new TextDecoder().decode(base64url.parse(parts[0], { loose: true })));
        const payload = JSON.parse(new TextDecoder().decode(base64url.parse(parts[1], { loose: true })));
        const signature = parts[2];

        return {
            header,
            payload,
            signature,
        };
    }

    public static expirationFromToken(token: string): number {
        const jwt = OpenIDConnectAuth.decodeJWT(token);
        if (!jwt) {
            return 0;
        }
        return jwt.payload.exp;
    }

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
    ) : Promise<boolean> {
        const token = await this.getToken(user, overrideClient);
        if (token.token) {
            opts.headers!.Authorization = `Bearer ${token.token}`;
        }
        return token.refreshed;
    }

    private async getToken(user: User, overrideClient?: Client): Promise<Token> {
        if (!user.authProvider.config) {
            return {
                token: null,
                refreshed: false,
            } as Token;
        }
        if (!user.authProvider.config['client-secret']) {
            user.authProvider.config['client-secret'] = '';
        }
        if (!user.authProvider.config || !user.authProvider.config['id-token']) {
            return {
                token: null,
                refreshed: false,
            } as Token;
        }
        return this.refresh(user, overrideClient);
    }

    private async refresh(user: User, overrideClient?: Client): Promise<Token> {
        var refreshed = false;
        if (this.currentTokenExpiration === 0) {
            this.currentTokenExpiration = OpenIDConnectAuth.expirationFromToken(
                user.authProvider.config['id-token'],
            );
        }
        if (Date.now() / 1000 > this.currentTokenExpiration) {
            if (
                !user.authProvider.config['client-id'] ||
                !user.authProvider.config['refresh-token'] ||
                !user.authProvider.config['idp-issuer-url']
            ) {
                return {
                    token: null,
                    refreshed: false,
                } as Token;
            }

            const client = overrideClient ? overrideClient : await this.getClient(user);
            const newToken = await client.refresh(user.authProvider.config['refresh-token']);
            user.authProvider.config['id-token'] = newToken.id_token;
            user.authProvider.config['refresh-token'] = newToken.refresh_token;
            this.currentTokenExpiration = newToken.expires_at || 0;
            refreshed = true;
        }
        return {
            token: user.authProvider.config['id-token'],
            refreshed
        };
    }

    private async getClient(user: User) {
        const oidcIssuer = await Issuer.discover(user.authProvider.config['idp-issuer-url']);
        return new oidcIssuer.Client({
            client_id: user.authProvider.config['client-id'],
            client_secret: user.authProvider.config['client-secret'],
        });
    }
}
