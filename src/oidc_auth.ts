import https = require('https');
import * as oidc from 'openid-client';
import { ClientMetadata } from 'openid-client';
import request = require('request');
import { base64url } from 'rfc4648';
import { TextDecoder } from 'util';

import { Authenticator } from './auth';
import { User } from './config_types';

interface JwtObj {
    header: any;
    payload: any;
    signature: string;
}

interface Token {
    id_token: string;
    refresh_token: string;
    expires_at: number;
}

interface Client {
    refresh(token: string): Promise<Token>;
}

class OidcClient implements Client {
    public constructor(readonly config: oidc.Configuration) {}

    public async refresh(token: string): Promise<Token> {
        const newToken = await oidc.refreshTokenGrant(this.config, token);
        return {
            id_token: newToken.id_token,
            refresh_token: newToken.refresh_token,
            expires_at: newToken.expiresIn(),
        } as Token;
    }
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
    private currentTokenExpiration: number = 0;
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
        const token = await this.getToken(user, overrideClient);
        if (token) {
            opts.headers!.Authorization = `Bearer ${token}`;
        }
    }

    private async getToken(user: User, overrideClient?: Client): Promise<string | null> {
        if (!user.authProvider.config) {
            return null;
        }
        if (!user.authProvider.config['client-secret']) {
            user.authProvider.config['client-secret'] = '';
        }
        if (!user.authProvider.config || !user.authProvider.config['id-token']) {
            return null;
        }
        return this.refresh(user, overrideClient);
    }

    private async refresh(user: User, overrideClient?: Client): Promise<string | null> {
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
                return null;
            }

            const client = overrideClient ? overrideClient : await this.getClient(user);
            const newToken = await client.refresh(user.authProvider.config['refresh-token']);
            user.authProvider.config['id-token'] = newToken.id_token;
            user.authProvider.config['refresh-token'] = newToken.refresh_token;
            this.currentTokenExpiration = newToken.expires_at;
        }
        return user.authProvider.config['id-token'];
    }

    private async getClient(user: User): Promise<Client> {
        const metadata: ClientMetadata = {
            client_id: user.authProvider.config['client-id'],
            client_secret: user.authProvider.config['client-secret'],
        };
        if (!user.authProvider.config['client-secret']) {
            metadata.token_endpoint_auth_method = 'none';
        }
        const configuration = await oidc.discovery(
            user.authProvider.config['idp-issuer-url'],
            user.authProvider.config['client-id'],
            metadata,
        );
        return new OidcClient(configuration);
    }
}
