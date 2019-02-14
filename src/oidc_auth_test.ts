import { expect } from 'chai';

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

    it('get a token if present', () => {
        const token = 'some token';
        const user = {
            authProvider: {
                name: 'oidc',
                config: {
                    'id-token': token,
                },
            },
        } as User;

        expect(auth.getToken(user)).to.equal(`Bearer ${token}`);
    });

    it('get null if token missing', () => {
        const user = {
            authProvider: {
                name: 'oidc',
                config: {},
            },
        } as User;

        expect(auth.getToken(user)).to.equal(null);
    });
});
