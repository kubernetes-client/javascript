import { use, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { join } from 'path';

import { User, Cluster } from './config_types';
import { AzureAuth } from './azure_auth';
import { KubeConfig } from './config';
import { HttpMethod, RequestContext } from '.';

use(chaiAsPromised);

describe('AzureAuth', () => {
    const testUrl1 = 'https://test1.com';
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        expect(requestContext.getHeaders()).to.not.be.undefined;
        expect(requestContext.getHeaders()['Authorization']).to.equal(`Bearer ${token}`);

        requestContext.setHeaderParam('Host', 'foo.com');
        await config.applySecurityAuthentication(requestContext);
        expect(requestContext.getHeaders().Authorization).to.equal(`Bearer ${token}`);
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        expect(requestContext.getHeaders()).to.not.be.undefined;
        expect(requestContext.getHeaders()['Authorization']).to.equal(`Bearer ${token}`);
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        // @ts-ignore
        expect(requestContext.getAgent().options.rejectUnauthorized).to.equal(false);
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        await config.applySecurityAuthentication(requestContext);
        // @ts-ignore
        expect(requestContext.getAgent().options.rejectUnauthorized).to.equal(undefined);
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        return expect(config.applySecurityAuthentication(requestContext)).to.eventually.be.rejectedWith(
            'Token is expired!',
        );
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);

        return expect(config.applySecurityAuthentication(requestContext)).to.eventually.be.rejectedWith(
            /Failed to refresh token/,
        );
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);
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

        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);

        expect(requestContext.getHeaders()).to.not.be.undefined;
        expect(requestContext.getHeaders()['Authorization']).to.equal(`Bearer ${token}`);
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);

        expect(requestContext.getHeaders()).to.not.be.undefined;
        expect(requestContext.getHeaders()['Authorization']).to.equal(`Bearer ${token}`);
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
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);

        expect(requestContext.getHeaders()).to.not.be.undefined;
        expect(requestContext.getHeaders()['Authorization']).to.equal(`Bearer ${token}`);
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
                        'cmd-path': join(__dirname, '..', 'test', 'echo space.js'),
                        'cmd-args': `'${responseStr}'`,
                        'token-key': '{.token.accessToken}',
                        'expiry-key': '{.token.token_expiry}',
                    },
                },
            } as User,
        );
        let requestContext = new RequestContext(testUrl1, HttpMethod.GET);
        await config.applySecurityAuthentication(requestContext);

        expect(requestContext.getHeaders()).to.not.be.undefined;
        expect(requestContext.getHeaders()['Authorization']).to.equal(`Bearer ${token}`);
    });
});
