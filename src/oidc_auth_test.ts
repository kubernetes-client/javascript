import { expect } from 'chai';
import * as request from 'request';

import { User } from './config_types';
import { OpenIDConnectAuth } from './oidc_auth';

describe('OIDCAuth', () => {
    const auth = new OpenIDConnectAuth();
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

    it('get a token if present', async () => {
        const token = 'some token';
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': token,
                },
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
    });

    it('get null if token missing', async () => {
        const user = {
            authProvider: {
                name: 'oidc',
                config: {},
            },
        } as User;

        const opts = {} as request.Options;
        opts.headers = [];
        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.be.undefined;
    });
});
