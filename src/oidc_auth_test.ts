import { expect } from 'chai';
import * as request from 'request';
import { base64url } from 'rfc4648';
import { TextEncoder } from 'util';

import { User } from './config_types';
import { OpenIDConnectAuth } from './oidc_auth';

function encode(value: string): string {
    return base64url.stringify(new TextEncoder().encode(value));
}

function makeJWT(header: string, payload: object, signature: string): string {
    return encode(header) + '.' + encode(JSON.stringify(payload)) + '.' + encode(signature);
}

describe('OIDCAuth', () => {
    var auth: OpenIDConnectAuth;
    beforeEach(() => {
        auth = new OpenIDConnectAuth();
    });

    it('should correctly parse a JWT', () => {
        const jwt = OpenIDConnectAuth.decodeJWT(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.5mhBHqs5_DTLdINd9p5m7ZJ6XD0Xc55kIaCRY5r6HRA',
        );
        expect(jwt).to.not.be.null;
    });

    it('should correctly parse time from token', () => {
        const time = Math.floor(Date.now() / 1000);
        const token = makeJWT('{}', { exp: time }, 'fake');
        const timeOut = OpenIDConnectAuth.expirationFromToken(token);

        expect(timeOut).to.equal(time);
    });

    it('should be true for oidc user', () => {
        const user = {
            authProvider: {
                name: 'oidc',
            },
        } as User;

        expect(auth.isAuthProvider(user)).to.equal(true);
    });

    it('should be false for other user', () => {
        const user = {
            authProvider: {
                name: 'azure',
            },
        } as User;

        expect(auth.isAuthProvider(user)).to.equal(false);
    });

    it('should be false for null user.authProvider', () => {
        const user = {} as User;

        expect(auth.isAuthProvider(user)).to.equal(false);
    });

    it('authorization should be undefined if token missing', async () => {
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'client-id': 'id',
                    'client-secret': 'clientsecret',
                    'refresh-token': 'refreshtoken',
                    'idp-issuer-url': 'https://www.google.com/',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.be.undefined;
    });

    it('authorization should be undefined if client-id missing', async () => {
        const past = 100;
        const token = makeJWT('{}', { exp: past }, 'fake');
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': token,
                    'client-secret': 'clientsecret',
                    'refresh-token': 'refreshtoken',
                    'idp-issuer-url': 'https://www.google.com/',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.be.undefined;
    });

    it('authorization should be work if client-secret missing', async () => {
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': 'fakeToken',
                    'client-id': 'id',
                    'refresh-token': 'refreshtoken',
                    'idp-issuer-url': 'https://www.google.com/',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        (auth as any).currentTokenExpiration = Date.now() / 1000 + 1000;
        await auth.applyAuthentication(user, opts, {});
        expect(opts.headers.Authorization).to.equal('Bearer fakeToken');
    });

    it('authorization should be undefined if refresh-token missing', async () => {
        const past = 100;
        const token = makeJWT('{}', { exp: past }, 'fake');
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': token,
                    'client-id': 'id',
                    'client-secret': 'clientsecret',
                    'idp-issuer-url': 'https://www.google.com/',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.be.undefined;
    });

    it('authorization should work if refresh-token missing but token is unexpired', async () => {
        const future = Date.now() / 1000 + 1000000;
        const token = makeJWT('{}', { exp: future }, 'fake');
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': token,
                    'client-id': 'id',
                    'client-secret': 'clientsecret',
                    'idp-issuer-url': 'https://www.google.com/',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
    });

    it('authorization should be undefined if idp-issuer-url missing', async () => {
        const past = 100;
        const token = makeJWT('{}', { exp: past }, 'fake');
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': token,
                    'client-id': 'id',
                    'client-secret': 'clientsecret',
                    'refresh-token': 'refreshtoken',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        await auth.applyAuthentication(user, opts, {});
        expect(opts.headers.Authorization).to.be.undefined;
    });

    it('return token when it is still active', async () => {
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': 'fakeToken',
                    'client-id': 'id',
                    'client-secret': 'clientsecret',
                    'refresh-token': 'refreshtoken',
                    'idp-issuer-url': 'https://www.google.com/',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        (auth as any).currentTokenExpiration = Date.now() / 1000 + 1000;
        await auth.applyAuthentication(user, opts, {});
        expect(opts.headers.Authorization).to.equal('Bearer fakeToken');
    });

    it('return new token when the current expired', async () => {
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': 'fakeToken',
                    'client-id': 'id',
                    'client-secret': 'clientsecret',
                    'refresh-token': 'refreshtoken',
                    'idp-issuer-url': 'https://www.google.com/',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        (auth as any).currentTokenExpiration = Date.now() / 1000 - 5000;
        const newExpiration = Date.now() / 1000 + 120;
        await auth.applyAuthentication(user, opts, {
            refresh: async (token) => {
                return {
                    expires_at: newExpiration,
                    id_token: 'newToken',
                    refresh_token: 'newRefreshToken',
                };
            },
        });
        expect(opts.headers.Authorization).to.equal('Bearer newToken');
        expect((auth as any).currentTokenExpiration).to.equal(newExpiration);
        // Check also the new refresh token sticks in the user config
        expect(user.authProvider.config['refresh-token']).to.equal('newRefreshToken');
    });

    it('return a new token when the its the first time we see this user', async () => {
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': 'fakeToken',
                    'client-id': 'id',
                    'client-secret': 'clientsecret',
                    'refresh-token': 'refreshtoken',
                    'idp-issuer-url': 'https://www.google.com/',
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        const newExpiration = Date.now() / 1000 + 120;
        (auth as any).currentTokenExpiration = 0;
        await auth.applyAuthentication(user, opts, {
            refresh: async (token) => {
                return {
                    expires_at: newExpiration,
                    id_token: 'newToken',
                };
            },
        });
        expect(opts.headers.Authorization).to.equal('Bearer newToken');
        expect((auth as any).currentTokenExpiration).to.equal(newExpiration);
    });
});
