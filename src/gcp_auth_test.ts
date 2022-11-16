import { expect } from 'chai';
import * as requestlib from 'request';
import { join } from 'path';

import { User, Cluster } from './config_types';
import { GoogleCloudPlatformAuth } from './gcp_auth';
import { KubeConfig } from './config';

describe('GoogleCloudPlatformAuth', () => {
    var auth: GoogleCloudPlatformAuth;
    beforeEach(() => {
        auth = new GoogleCloudPlatformAuth();
    });

    it('should be true for gcp user', () => {
        const user = {
            authProvider: {
                name: 'gcp',
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

    it('should populate from auth provider', async () => {
        const config = new KubeConfig();
        const token = 'token';
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'gcp',
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
                    name: 'gcp',
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
                    name: 'gcp',
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
                    name: 'gcp',
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
                    name: 'gcp',
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
                    name: 'gcp',
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
                    name: 'gcp',
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
                    name: 'gcp',
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
                    name: 'gcp',
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
                    name: 'gcp',
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

    it('should throw if tried to run JavaScript inside the token key', async () => {
        const token = 'token';
        const responseStr = `{"token":{"accessToken":"${token}"}}`;

        const user = {
            authProvider: {
                name: 'gcp',
                config: {
                    'cmd-path': join(__dirname, '..', 'test', 'echo space.js'),
                    'cmd-args': `'${responseStr}'`,
                    'expiry-key': '{.token.token_expiry}',

                    // The problematic token
                    'token-key': '{..[?(' + '(function a(arr){' + 'a([...arr, ...arr])' + '})([1]);)]}',
                },
            },
        } as User;

        await expect(auth.applyAuthentication(user, {})).to.eventually.be.rejectedWith(
            'Eval [?(expr)] prevented in JSONPath expression.',
        );
    });
});
