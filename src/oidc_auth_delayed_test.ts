import { expect } from 'chai';
import * as request from 'request';
import { base64url } from 'rfc4648';
import { TextEncoder } from 'util';

import { User } from './config_types';
import { DelayedOpenIDConnectAuth } from './oidc_auth_delayed';

function encode(value: string): string {
    return base64url.stringify(new TextEncoder().encode(value));
}

function makeJWT(header: string, payload: object, signature: string): string {
    return encode(header) + '.' + encode(JSON.stringify(payload)) + '.' + encode(signature);
}

describe('OIDCAuth', () => {
    var auth: DelayedOpenIDConnectAuth;
    beforeEach(() => {
        auth = new DelayedOpenIDConnectAuth();
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
        await auth.applyAuthentication(user, opts, {
            refresh: () => {
                return {
                    id_token: 'fakeToken',
                    refresh_token: 'fakerToken',
                };
            },
        });
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
});
