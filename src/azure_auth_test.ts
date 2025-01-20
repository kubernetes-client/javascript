import { rejects, strictEqual } from 'node:assert';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { User, Cluster } from './config_types.js';
import { AzureAuth } from './azure_auth.js';
import { KubeConfig } from './config.js';
import { HttpMethod, RequestContext } from './index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('AzureAuth', () => {
    const testUrl1 = 'https://test1.com';
    let auth: AzureAuth;
    beforeEach(() => {
        auth = new AzureAuth();
    });

    it('should be true for azure user', () => {
        const user = {
            authProvider: {
                name: 'azure',
            },
        } as User;

        strictEqual(auth.isAuthProvider(user), true);
    });

    it('should be false for other user', () => {
        const user = {
            authProvider: {
                name: 'gcp',
            },
        } as User;

        strictEqual(auth.isAuthProvider(user), false);
    });

    it('should be false for null user.authProvider', () => {
        const user = {} as User;

        strictEqual(auth.isAuthProvider(user), false);
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        strictEqual(requestContext.getHeaders()?.['Authorization'], `Bearer ${token}`);

        requestContext.setHeaderParam('Host', 'foo.com');
        await config.applySecurityAuthentication(requestContext);
        strictEqual(requestContext.getHeaders().Authorization, `Bearer ${token}`);
    });

    it('should populate from auth provider without expiry', async () => {
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        strictEqual(requestContext.getHeaders()?.['Authorization'], `Bearer ${token}`);
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        // @ts-expect-error
        strictEqual(requestContext.getAgent().options.rejectUnauthorized, false);
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        // @ts-expect-error
        strictEqual(requestContext.getAgent().options.rejectUnauthorized, undefined);
    });

    it('should throw with expired token and no cmd', async () => {
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await rejects(config.applySecurityAuthentication(requestContext), {
            message: 'Token is expired!',
        });
    });

    it('should throw with bad command', async () => {
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await rejects(config.applySecurityAuthentication(requestContext), {
            message: /Failed to refresh token/,
        });
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);
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

        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);

        strictEqual(requestContext.getHeaders()?.['Authorization'], `Bearer ${token}`);
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);

        strictEqual(requestContext.getHeaders()?.['Authorization'], `Bearer ${token}`);
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);

        strictEqual(requestContext.getHeaders()?.['Authorization'], `Bearer ${token}`);
    });
    it('should exec succesfully with spaces in cmd', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const config = new KubeConfig();
        const token = 'test-token';
        const responseStr = `{"token":{"accessToken":"${token}"}}`;
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'azure',
                    config: {
                        'cmd-path': join(__dirname, 'test', 'echo space.js'),
                        'cmd-args': `'${responseStr}'`,
                        'token-key': '{.token.accessToken}',
                        'expiry-key': '{.token.token_expiry}',
                    },
                },
            } as User,
        );
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);

        strictEqual(requestContext.getHeaders()?.['Authorization'], `Bearer ${token}`);
    });
});
