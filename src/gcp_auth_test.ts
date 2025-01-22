import { beforeEach, describe, it } from 'node:test';
import { rejects, strictEqual } from 'node:assert';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { User, Cluster } from './config_types.js';
import { GoogleCloudPlatformAuth } from './gcp_auth.js';
import { KubeConfig } from './config.js';
import { HttpMethod, RequestContext } from './gen/index.js';
import { Agent } from 'node:https';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('GoogleCloudPlatformAuth', () => {
    const testUrl1 = 'https://test-gcp.com';
    let auth: GoogleCloudPlatformAuth;
    beforeEach(() => {
        auth = new GoogleCloudPlatformAuth();
    });

    it('should be true for gcp user', () => {
        const user = {
            authProvider: {
                name: 'gcp',
            },
        } as User;

        strictEqual(auth.isAuthProvider(user), true);
    });

    it('should be false for other user', () => {
        const user = {
            authProvider: {
                name: 'azure',
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
                    name: 'gcp',
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
        requestContext.setUrl('http://www.foo.com');
        //opts.headers.Host = 'foo.com';
        await config.applySecurityAuthentication(requestContext);
        strictEqual(requestContext.getHeaders()['Authorization'], `Bearer ${token}`);
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
                    name: 'gcp',
                    config: {
                        'access-token': token,
                    },
                },
            } as User,
        );
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);

        // @ts-expect-error
        const agent: Agent = requestContext.getAgent();
        strictEqual(agent.options.rejectUnauthorized, false);
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        strictEqual(requestContext.getHeaders()['rejectUnauthorized'], undefined);
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        return rejects(config.applySecurityAuthentication(requestContext), {
            message: 'Token is expired!',
        });
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
        const requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        return rejects(config.applySecurityAuthentication(requestContext), /Failed to refresh token/);
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
        const token = 'token';
        const responseStr = `{"token":{"accessToken":"${token}"}}`;
        config.loadFromClusterAndUser(
            { skipTLSVerify: false } as Cluster,
            {
                authProvider: {
                    name: 'gcp',
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
