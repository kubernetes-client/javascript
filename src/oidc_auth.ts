import https from 'node:https';
import * as oidc from 'openid-client';
import { base64url } from 'rfc4648';

import { Authenticator } from './auth.js';
import { User } from './config_types.js';
import { bufferFromFileOrString } from './config.js';

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
    readonly config: oidc.Configuration;
    public constructor(c: oidc.Configuration) {
        this.config = c;
    }

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
        opts: https.RequestOptions,
        overrideClient?: any,
    ): Promise<void> {
        const token = await this.getToken(user, overrideClient);
        if (token) {
            opts.headers!['Authorization'] = `Bearer ${token}`;
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
        // Check if custom IDP CA is provided
        const idpCaFile = user.authProvider.config['idp-certificate-authority'];
        const idpCaData = user.authProvider.config['idp-certificate-authority-data'];
        const ca = bufferFromFileOrString(idpCaFile, idpCaData);

        let configuration: oidc.Configuration;

        if (ca) {
            // Create a custom https agent with the IDP CA certificate
            const agent = new https.Agent({ ca });

            // Create custom fetch function that uses the agent
            // We need to implement a proper fetch-compatible function using Node.js https module
            const customFetchFn = async (url: string, options: any): Promise<Response> => {
                // Parse the URL
                const urlObj = new URL(url);

                // Create request options with the custom agent
                const requestOptions: https.RequestOptions = {
                    hostname: urlObj.hostname,
                    port: urlObj.port,
                    path: urlObj.pathname + urlObj.search,
                    method: options?.method || 'GET',
                    headers: options?.headers || {},
                    agent: agent,
                };

                return new Promise((resolve, reject) => {
                    const req = https.request(requestOptions, (res) => {
                        const chunks: Buffer[] = [];

                        res.on('data', (chunk) => {
                            chunks.push(chunk);
                        });

                        res.on('end', () => {
                            const body = Buffer.concat(chunks);
                            // Create a Response-like object that satisfies the Response interface
                            const response = {
                                ok: res.statusCode! >= 200 && res.statusCode! < 300,
                                status: res.statusCode!,
                                statusText: res.statusMessage || '',
                                headers: new Headers(res.headers as Record<string, string>),
                                url: url,
                                type: 'basic' as const,
                                redirected: false,
                                body: null,
                                bodyUsed: false,
                                json: async () => JSON.parse(body.toString()),
                                text: async () => body.toString(),
                                arrayBuffer: async () =>
                                    body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength),
                                blob: async () => {
                                    throw new Error('blob() not implemented');
                                },
                                formData: async () => {
                                    throw new Error('formData() not implemented');
                                },
                                bytes: async () => new Uint8Array(body),
                                clone: () => {
                                    throw new Error('clone() not implemented');
                                },
                            } as unknown as Response;
                            resolve(response);
                        });
                    });

                    req.on('error', reject);

                    if (options?.body) {
                        req.write(options.body);
                    }

                    req.end();
                });
            };

            // Use customFetch for discovery and subsequent requests
            configuration = await oidc.discovery(
                user.authProvider.config['idp-issuer-url'],
                user.authProvider.config['client-id'],
                undefined,
                undefined,
                { [oidc.customFetch]: customFetchFn },
            );
        } else {
            configuration = await oidc.discovery(
                user.authProvider.config['idp-issuer-url'],
                user.authProvider.config['client-id'],
            );
        }

        return new OidcClient(configuration);
    }
}
