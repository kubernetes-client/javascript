import { expect } from 'chai';
import * as requestlib from 'request';
import { join } from 'path';

import { User, Cluster } from './config_types';
import { AzureAuth } from './azure_auth';
import { KubeConfig } from './config';

describe('AzureAuth', () => {
    var auth: AzureAuth;
    beforeEach(() => {
        auth = new AzureAuth();
    });

    it('should be true for azure user', () => {
        const user = {
            authProvider: {
                name: 'azure',
            },
        } as User;

        expect(auth.isAuthProvider(user)).to.equal(true);
    });

    it('should be false for other user', () => {
        const user = {
            authProvider: {
                name: 'gcp',
            },
        } as User;

        expect(auth.isAuthProvider(user)).to.equal(false);
    });

    it('should be false for null user.authProvider', () => {
        const user = {} as User;

        expect(auth.isAuthProvider(user)).to.equal(false);
    });

    it('should populate from auth provider', async () => {
        const config = new KubeConfig();
        const token = 'token';
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'access-token': token,
                        expiry: 'Fri Aug 24 07:32:05 PDT 3018',
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;

        await config.applyToRequest(opts);
        expect(opts.headers).to.not.be.undefined;
        if (opts.headers) {
            expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
        }
        opts.headers = [];
        opts.headers.Host = 'foo.com';
        await config.applyToRequest(opts);
        expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
    });

    it('should populate from auth provider without expirty', async () => {
        const config = new KubeConfig();
        const token = 'token';
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'access-token': token,
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;

        await config.applyToRequest(opts);
        expect(opts.headers).to.not.be.undefined;
        if (opts.headers) {
            expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
        }
    });

    it('should populate rejectUnauthorized=false when skipTLSVerify is set', async () => {
        const config = new KubeConfig();
        const token = 'token';
        config.loadFromClusterAndUser(
            { skipTLSVerify: true } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'access-token': token,
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;

        await config.applyToRequest(opts);
        expect(opts.rejectUnauthorized).to.equal(false);
    });

    it('should not set rejectUnauthorized if skipTLSVerify is not set', async () => {
        // This test is just making 100% sure we validate certs unless we explictly set
        // skipTLSVerify = true
        const config = new KubeConfig();
        const token = 'token';
        config.loadFromClusterAndUser(
            {} as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'access-token': token,
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;

        await config.applyToRequest(opts);
        expect(opts.rejectUnauthorized).to.equal(undefined);
    });

    it('should throw with expired token and no cmd', () => {
        const config = new KubeConfig();
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        expiry: 'Aug 24 07:32:05 PDT 2017',
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;

        return expect(config.applyToRequest(opts)).to.eventually.be.rejectedWith('Token is expired!');
    });

    it('should throw with bad command', () => {
        const config = new KubeConfig();
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'access-token': 'token',
                        expiry: 'Aug 24 07:32:05 PDT 2017',
                        'cmd-path': 'non-existent-command',
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;
        return expect(config.applyToRequest(opts)).to.eventually.be.rejectedWith(/Failed to refresh token/);
    });

    it('should exec when no cmd and token is not expired', async () => {
        const config = new KubeConfig();
        const expireOn = new Date().getTime() / 1000 + 1000;
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'access-token': 'token',
                        'expires-on': expireOn.toString(),
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;
        await config.applyToRequest(opts);
    });

    it('should exec with expired token', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const config = new KubeConfig();
        const token = 'token';
        const responseStr = `{"token":{"accessToken":"${token}"}}`;
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        expiry: 'Aug 24 07:32:05 PDT 2017',
                        'cmd-path': 'echo',
                        'cmd-args': `'${responseStr}'`,
                        'token-key': '{.token.accessToken}',
                        'expiry-key': '{.token.token_expiry}',
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;
        await config.applyToRequest(opts);
        expect(opts.headers).to.not.be.undefined;
        if (opts.headers) {
            expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
        }
    });
    it('should exec without access-token', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const config = new KubeConfig();
        const token = 'token';
        const responseStr = `{"token":{"accessToken":"${token}"}}`;
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'cmd-path': 'echo',
                        'cmd-args': `'${responseStr}'`,
                        'token-key': '{.token.accessToken}',
                        'expiry-key': '{.token.token_expiry}',
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;
        await config.applyToRequest(opts);
        expect(opts.headers).to.not.be.undefined;
        if (opts.headers) {
            expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
        }
    });
    it('should exec without access-token', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const config = new KubeConfig();
        const token = 'token';
        const responseStr = `{"token":{"accessToken":"${token}"}}`;
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'cmd-path': 'echo',
                        'cmd-args': `'${responseStr}'`,
                        'token-key': '{.token.accessToken}',
                        'expiry-key': '{.token.token_expiry}',
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;
        await config.applyToRequest(opts);
        expect(opts.headers).to.not.be.undefined;
        if (opts.headers) {
            expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
        }
    });
    it('should exec succesfully with spaces in cmd', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const config = new KubeConfig();
        const token = 'token';
        const responseStr = `{"token":{"accessToken":"${token}"}}`;
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'cmd-path': join(__dirname, '..', 'test', 'echo space.js'),
                        'cmd-args': `'${responseStr}'`,
                        'token-key': '{.token.accessToken}',
                        'expiry-key': '{.token.token_expiry}',
                    },
                },
            } as User,
        );
        const opts = {} as requestlib.Options;
        await config.applyToRequest(opts);
        expect(opts.headers).to.not.be.undefined;
        if (opts.headers) {
            expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
        }
    });
});
