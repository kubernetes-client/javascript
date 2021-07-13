import { readFileSync } from 'fs';
import * as https from 'https';
import { dirname, join } from 'path';

import { expect } from 'chai';
import mockfs = require('mock-fs');
import * as path from 'path';
import * as requestlib from 'request';

import * as filesystem from 'fs';
import { fs } from 'mock-fs';
import * as os from 'os';
import { CoreV1Api } from './api';
import { bufferFromFileOrString, findHomeDir, findObject, KubeConfig, makeAbsolutePath } from './config';
import { Cluster, newClusters, newContexts, newUsers, User, ActionOnInvalid } from './config_types';
import { isUndefined } from 'util';

const kcFileName = 'testdata/kubeconfig.yaml';
const kc2FileName = 'testdata/kubeconfig-2.yaml';
const kcDupeCluster = 'testdata/kubeconfig-dupe-cluster.yaml';
const kcDupeContext = 'testdata/kubeconfig-dupe-context.yaml';
const kcDupeUser = 'testdata/kubeconfig-dupe-user.yaml';

const kcNoUserFileName = 'testdata/empty-user-kubeconfig.yaml';
const kcInvalidContextFileName = 'testdata/empty-context-kubeconfig.yaml';
const kcInvalidClusterFileName = 'testdata/empty-cluster-kubeconfig.yaml';

/* tslint:disable: no-empty */
describe('Config', () => {});

function validateFileLoad(kc: KubeConfig) {
    // check clusters
    const clusters = kc.getClusters();
    expect(clusters.length).to.equal(2, 'there are 2 clusters');
    const cluster1 = clusters[0];
    const cluster2 = clusters[1];
    expect(cluster1.name).to.equal('cluster1');
    expect(cluster1.caData).to.equal('Q0FEQVRB');
    expect(cluster1.server).to.equal('http://example.com');
    expect(cluster2.name).to.equal('cluster2');
    expect(cluster2.caData).to.equal('Q0FEQVRBMg==');
    expect(cluster2.server).to.equal('http://example2.com');
    expect(cluster2.skipTLSVerify).to.equal(true);

    // check users
    const users = kc.getUsers();
    expect(users.length).to.equal(3, 'there are 3 users');
    const user1 = users[0];
    const user2 = users[1];
    const user3 = users[2];
    expect(user1.name).to.equal('user1');
    expect(user1.certData).to.equal('VVNFUl9DQURBVEE=');
    expect(user1.keyData).to.equal('VVNFUl9DS0RBVEE=');
    expect(user2.name).to.equal('user2');
    expect(user2.certData).to.equal('VVNFUjJfQ0FEQVRB');
    expect(user2.keyData).to.equal('VVNFUjJfQ0tEQVRB');
    expect(user3.name).to.equal('user3');
    expect(user3.username).to.equal('foo');
    expect(user3.password).to.equal('bar');

    // check contexts
    const contexts = kc.getContexts();
    expect(contexts.length).to.equal(3, 'there are three contexts');
    const context1 = contexts[0];
    const context2 = contexts[1];
    const context3 = contexts[2];
    expect(context1.name).to.equal('context1');
    expect(context1.user).to.equal('user1');
    expect(context1.namespace).to.equal(undefined);
    expect(context1.cluster).to.equal('cluster1');
    expect(context2.name).to.equal('context2');
    expect(context2.user).to.equal('user2');
    expect(context2.namespace).to.equal('namespace2');
    expect(context2.cluster).to.equal('cluster2');
    expect(context3.name).to.equal('passwd');
    expect(context3.user).to.equal('user3');
    expect(context3.cluster).to.equal('cluster2');

    expect(kc.getCurrentContext()).to.equal('context2');
}

describe('KubeConfig', () => {
    it('should return null on no contexts', () => {
        const kc = new KubeConfig() as any;
        kc.contexts = undefined;
        expect(kc.getContextObject('non-existent')).to.be.null;
    });
    describe('findObject', () => {
        it('should return null on undefined', () => {
            expect(findObject(undefined as any, 'foo', 'bar')).to.equal(null);
        });
        it('should find objects', () => {
            interface MyNamed {
                name: string;
                some: any;
                cluster: any;
            }
            const list: MyNamed[] = [
                {
                    name: 'foo',
                    cluster: {
                        some: 'sub-object',
                    },
                    some: 'object',
                } as MyNamed,
                {
                    name: 'bar',
                    some: 'object',
                    cluster: {
                        some: 'sub-object',
                    },
                } as MyNamed,
            ];

            // Validate that if the named object ('cluster' in this case) is inside we pick it out
            const obj1 = findObject(list, 'foo', 'cluster');
            expect(obj1).to.not.equal(null);
            if (obj1) {
                expect(obj1.some).to.equal('sub-object');
            }
            // Validate that if the named object is missing, we just return the full object
            const obj2 = findObject(list, 'bar', 'context');
            expect(obj2).to.not.equal(null);
            if (obj2) {
                expect(obj2.some).to.equal('object');
            }
            // validate that we do the right thing if it is missing
            const obj3 = findObject(list, 'nonexistent', 'context');
            expect(obj3).to.equal(null);
        });
    });

    describe('loadFromClusterAndUser', () => {
        it('should load from cluster and user', () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'http://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;

            kc.loadFromClusterAndUser(cluster, user);

            const clusterOut = kc.getCurrentCluster();
            expect(clusterOut).to.equal(cluster);

            const userOut = kc.getCurrentUser();
            expect(userOut).to.equal(user);
        });
    });

    describe('clusterConstructor', () => {
        it('should load from options', () => {
            const cluster = {
                name: 'foo',
                server: 'http://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;

            const context = {
                name: 'my-context',
                user: user.name,
                cluster: cluster.name,
            };

            const kc = new KubeConfig();
            kc.loadFromOptions({
                clusters: [cluster],
                users: [user],
                contexts: [context],
                currentContext: context.name,
            });

            const clusterOut = kc.getCurrentCluster();
            expect(clusterOut).to.equal(cluster);

            const userOut = kc.getCurrentUser();
            expect(userOut).to.equal(user);
        });
    });

    describe('loadFromFile', () => {
        it('should load the kubeconfig file properly', () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);
            validateFileLoad(kc);
        });
        it('should fail to load a missing kubeconfig file', () => {
            const kc = new KubeConfig();
            expect(kc.loadFromFile.bind('missing.yaml')).to.throw();
        });

        describe('filter vs throw tests', () => {
            it('works for invalid users', () => {
                const kc = new KubeConfig();
                kc.loadFromFile(kcNoUserFileName, { onInvalidEntry: ActionOnInvalid.FILTER });
                expect(kc.getUsers().length).to.be.eq(2);
            });
            it('works for invalid contexts', () => {
                const kc = new KubeConfig();
                kc.loadFromFile(kcInvalidContextFileName, { onInvalidEntry: ActionOnInvalid.FILTER });
                expect(kc.getContexts().length).to.be.eq(2);
            });
            it('works for invalid clusters', () => {
                const kc = new KubeConfig();
                kc.loadFromFile(kcInvalidClusterFileName, { onInvalidEntry: ActionOnInvalid.FILTER });
                expect(kc.getClusters().length).to.be.eq(1);
            });
        });
    });

    describe('export', () => {
        it('should export and re-import correctly', () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);
            const output = kc.exportConfig();
            const newConfig = new KubeConfig();
            newConfig.loadFromString(output);
            validateFileLoad(kc);
        });
    });

    describe('loadEmptyUser', () => {
        it('should load a kubeconfig with an empty user', () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcNoUserFileName);
        });
    });

    describe('applyHTTPSOptions', () => {
        it('should apply cert configs', () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);

            const opts: https.RequestOptions = {};
            kc.applytoHTTPSOptions(opts);

            expect(opts).to.deep.equal({
                headers: {},
                ca: new Buffer('CADATA2', 'utf-8'),
                cert: new Buffer('USER2_CADATA', 'utf-8'),
                key: new Buffer('USER2_CKDATA', 'utf-8'),
                rejectUnauthorized: false,
            });
        });
        it('should apply password', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);
            kc.setCurrentContext('passwd');

            const opts: requestlib.Options = {
                url: 'https://company.com',
            };
            await kc.applyToRequest(opts);
            expect(opts).to.deep.equal({
                headers: {},
                ca: new Buffer('CADATA2', 'utf-8'),
                auth: {
                    username: 'foo',
                    password: 'bar',
                },
                url: 'https://company.com',
                strictSSL: false,
                rejectUnauthorized: false,
            });
        });
    });

    describe('loadClusterConfigObjects', () => {
        it('should fail if name is missing from cluster', () => {
            expect(() => {
                newClusters([
                    {
                        name: 'some-cluster',
                        cluster: {
                            server: 'some.server.com',
                        },
                    },
                    {
                        foo: 'bar',
                    },
                ]);
            }).to.throw('clusters[1].name is missing');
        });
        it('should fail if cluster is missing from cluster', () => {
            expect(() => {
                newClusters([
                    {
                        name: 'some-cluster',
                        cluster: {
                            server: 'some.server.com',
                        },
                    },
                    {
                        name: 'bar',
                    },
                ]);
            }).to.throw('clusters[1].cluster is missing');
        });
        it('should fail if cluster.server is missing from cluster', () => {
            expect(() => {
                newClusters([
                    {
                        name: 'some-cluster',
                        cluster: {
                            server: 'some.server.com',
                        },
                    },
                    {
                        name: 'bar',
                        cluster: {},
                    },
                ]);
            }).to.throw('clusters[1].cluster.server is missing');
        });
    });

    describe('loadUserConfigObjects', () => {
        it('should fail if name is missing from user', () => {
            expect(() => {
                newUsers([
                    {
                        name: 'some-user',
                        user: {},
                    },
                    {
                        foo: 'bar',
                    },
                ]);
            }).to.throw('users[1].name is missing');
        });
        it('should load correctly with just name', () => {
            const name = 'some-name';
            const users = newUsers([
                {
                    name,
                },
            ]);
            expect(name).to.equal(users[0].name);
        });
        it('should load token correctly', () => {
            const name = 'some-name';
            const token = 'token';
            const users = newUsers([
                {
                    name,
                    user: {
                        token: 'token',
                    },
                },
            ]);
            expect(name).to.equal(users[0].name);
            expect(token).to.equal(users[0].token);
        });
        it('should load token file correctly', () => {
            const name = 'some-name';
            const token = 'token-file-data';
            mockfs({
                '/path/to/fake/dir': {
                    'token.txt': token,
                },
            });
            const users = newUsers([
                {
                    name,
                    user: {
                        'token-file': '/path/to/fake/dir/token.txt',
                    },
                },
            ]);
            mockfs.restore();
            expect(name).to.equal(users[0].name);
            expect(token).to.equal(users[0].token);
        });
        it('should load extra auth stuff correctly', () => {
            const authProvider = 'authProvider';
            const certData = 'certData';
            const certFile = 'certFile';
            const keyData = 'keyData';
            const keyFile = 'keyFile';
            const password = 'password';
            const username = 'username';
            const name = 'some-name';
            const users = newUsers([
                {
                    name,
                    user: {
                        'auth-provider': authProvider,
                        'client-certificate-data': certData,
                        'client-certificate': certFile,
                        'client-key-data': keyData,
                        'client-key': keyFile,
                        password,
                        username,
                    },
                },
            ]);
            expect(authProvider).to.equal(users[0].authProvider);
            expect(certData).to.equal(users[0].certData);
            expect(certFile).to.equal(users[0].certFile);
            expect(keyData).to.equal(users[0].keyData);
            expect(keyFile).to.equal(users[0].keyFile);
            expect(password).to.equal(users[0].password);
            expect(username).to.equal(users[0].username);
            expect(name).to.equal(users[0].name);
        });
    });

    describe('findHome', () => {
        it('should load from HOME if present', () => {
            const currentHome = process.env.HOME;
            const expectedHome = 'foobar';
            process.env.HOME = expectedHome;
            const dir = join(process.env.HOME, '.kube');
            const arg = {};
            arg[dir] = { config: 'data' };
            mockfs(arg);

            const home = findHomeDir();

            mockfs.restore();
            process.env.HOME = currentHome;

            expect(home).to.equal(expectedHome);
        });
    });

    describe('win32HomeDirTests', () => {
        let originalPlatform: string;
        const originalEnvVars: any = {};

        before(() => {
            originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'win32',
            });
            originalEnvVars.HOME = process.env.HOME;
            originalEnvVars.USERPROFILE = process.env.USERPROFILE;
            originalEnvVars.HOMEDRIVE = process.env.HOMEDRIVE;
            originalEnvVars.HOMEPATH = process.env.HOMEPATH;

            delete process.env.HOME;
            delete process.env.USERPROFILE;
            delete process.env.HOMEDRIVE;
            delete process.env.HOMEPATH;
        });

        after(() => {
            Object.defineProperty(process, 'platform', {
                value: originalPlatform,
            });

            process.env.HOME = originalEnvVars.HOME;
            process.env.USERPROFILE = originalEnvVars.USERPROFILE;
            process.env.HOMEDRIVE = originalEnvVars.HOMEDRIVE;
            process.env.HOMEPATH = originalEnvVars.HOMEPATH;
        });

        it('should return null if no home is present', () => {
            const dir = findHomeDir();
            expect(dir).to.equal(null);
        });

        it('should load from HOMEDRIVE/HOMEPATH if present', () => {
            process.env.HOMEDRIVE = 'foo';
            process.env.HOMEPATH = 'bar';
            const dir = join(process.env.HOMEDRIVE, process.env.HOMEPATH);
            const arg = {};
            arg[dir] = { config: 'data' };
            mockfs(arg);

            const home = findHomeDir();

            mockfs.restore();
            expect(home).to.equal(dir);
        });

        it('should load from USERPROFILE if present', () => {
            const dir = 'someplace';

            process.env.HOMEDRIVE = 'foo';
            process.env.HOMEPATH = 'bar';
            process.env.USERPROFILE = dir;
            const arg = {};
            arg[dir] = { config: 'data' };
            mockfs(arg);

            const home = findHomeDir();

            mockfs.restore();
            expect(home).to.equal(dir);
        });
    });

    describe('loadContextConfigObjects', () => {
        it('should fail if name is missing from context', () => {
            expect(() => {
                newContexts([
                    {
                        name: 'some-cluster',
                        context: {
                            cluster: 'foo',
                            user: 'bar',
                        },
                    },
                    {
                        foo: 'bar',
                    },
                ]);
            }).to.throw('contexts[1].name is missing');
        });
        it('should fail if context is missing from context', () => {
            expect(() => {
                newContexts([
                    {
                        name: 'some-cluster',
                        context: {
                            cluster: 'foo',
                            user: 'bar',
                        },
                    },
                    {
                        name: 'bar',
                    },
                ]);
            }).to.throw('contexts[1].context is missing');
        });
        it('should fail if context is missing from context', () => {
            expect(() => {
                newContexts([
                    {
                        name: 'some-cluster',
                        context: {
                            cluster: 'foo',
                            user: 'bar',
                        },
                    },
                    {
                        name: 'bar',
                        context: {
                            user: 'user',
                        },
                    },
                ]);
            }).to.throw('contexts[1].context.cluster is missing');
        });
    });

    describe('auth options', () => {
        it('should populate basic-auth for https', async () => {
            const config = new KubeConfig();
            const user = 'user';
            const passwd = 'password';

            config.loadFromClusterAndUser({} as Cluster, { username: user, password: passwd } as User);
            const opts = {} as https.RequestOptions;
            await config.applytoHTTPSOptions(opts);

            expect(opts.auth).to.equal(`${user}:${passwd}`);
        });
        it('should populate options for request', async () => {
            const config = new KubeConfig();
            const user = 'user';
            const passwd = 'password';

            config.loadFromClusterAndUser(
                {
                    skipTLSVerify: true,
                } as Cluster,
                {
                    username: user,
                    password: passwd,
                } as User,
            );
            const opts = {} as requestlib.Options;

            await config.applyToRequest(opts);

            /* tslint:disable no-unused-expression*/
            expect(opts.auth).to.not.be.undefined;
            if (opts.auth) {
                expect(opts.auth.username).to.equal(user);
                expect(opts.auth.password).to.equal(passwd);
            }
            expect(opts.strictSSL).to.equal(false);
        });
        it('should not populate strict ssl', async () => {
            const config = new KubeConfig();

            config.loadFromClusterAndUser({ skipTLSVerify: false } as Cluster, {} as User);
            const opts = {} as requestlib.Options;

            await config.applyToRequest(opts);

            expect(opts.strictSSL).to.equal(undefined);
        });
        it('should populate from token', async () => {
            const config = new KubeConfig();
            const token = 'token';
            config.loadFromClusterAndUser(
                { skipTLSVerify: false } as Cluster,
                {
                    token,
                } as User,
            );
            const opts = {} as requestlib.Options;

            await config.applyToRequest(opts);
            expect(opts.headers).to.not.be.undefined;
            if (opts.headers) {
                expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
            }
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
            return expect(config.applyToRequest(opts)).to.eventually.be.rejectedWith(
                /Failed to refresh token/,
            );
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
                        name: 'azure', // applies to gcp too as they are both handled by CloudAuth class
                        config: {
                            'cmd-path': path.join(__dirname, '..', 'test', 'echo space.js'),
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
        it('should exec with exec auth and env vars', async () => {
            // TODO: fix this test for Windows
            if (process.platform === 'win32') {
                return;
            }
            const config = new KubeConfig();
            const token = 'token';
            const responseStr = `{"status": { "token": "${token}" }}`;
            config.loadFromClusterAndUser(
                { skipTLSVerify: false } as Cluster,
                {
                    authProvider: {
                        name: 'exec',
                        config: {
                            exec: {
                                command: 'echo',
                                args: [`${responseStr}`],
                                env: [
                                    {
                                        name: 'foo',
                                        value: 'bar',
                                    },
                                ],
                            },
                        },
                    },
                } as User,
            );
            // TODO: inject the exec command here and validate env vars?
            const opts = {} as requestlib.Options;
            await config.applyToRequest(opts);
            expect(opts.headers).to.not.be.undefined;
            if (opts.headers) {
                expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
            }
        });
        it('should exec with exec auth', async () => {
            // TODO: fix this test for Windows
            if (process.platform === 'win32') {
                return;
            }
            const config = new KubeConfig();
            const token = 'token';
            const responseStr = `{
                "apiVersion": "client.authentication.k8s.io/v1beta1",
                "kind": "ExecCredential",
                "status": {
                  "token": "${token}"
                }
              }`;
            config.loadFromClusterAndUser(
                { skipTLSVerify: false } as Cluster,
                {
                    authProvider: {
                        name: 'exec',
                        config: {
                            exec: {
                                command: 'echo',
                                args: [`${responseStr}`],
                            },
                        },
                    },
                } as User,
            );
            // TODO: inject the exec command here?
            const opts = {} as requestlib.Options;
            await config.applyToRequest(opts);
            expect(opts.headers).to.not.be.undefined;
            if (opts.headers) {
                expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
            }
        });
        it('should exec with exec auth (other location)', async () => {
            // TODO: fix this test for Windows
            if (process.platform === 'win32') {
                return;
            }
            const config = new KubeConfig();
            const token = 'token';
            const responseStr = `{
                "apiVersion": "client.authentication.k8s.io/v1beta1",
                "kind": "ExecCredential",
                "status": {
                  "token": "${token}"
                }
              }`;
            config.loadFromClusterAndUser(
                { skipTLSVerify: false } as Cluster,
                {
                    exec: {
                        command: 'echo',
                        args: [`${responseStr}`],
                    },
                } as User,
            );
            // TODO: inject the exec command here?
            const opts = {} as requestlib.Options;
            await config.applyToRequest(opts);
            expect(opts.headers).to.not.be.undefined;
            if (opts.headers) {
                expect(opts.headers.Authorization).to.equal(`Bearer ${token}`);
            }
        });
        it('should cache exec with name', async () => {
            // TODO: fix this test for Windows
            if (process.platform === 'win32') {
                return;
            }
            const config = new KubeConfig();
            const token = 'token';
            const responseStr = `{
                "apiVersion": "client.authentication.k8s.io/v1beta1",
                "kind": "ExecCredential",
                "status": {
                  "token": "${token}"
                }
              }`;
            config.loadFromClusterAndUser(
                { skipTLSVerify: false } as Cluster,
                {
                    name: 'exec',
                    exec: {
                        command: 'echo',
                        args: [`${responseStr}`],
                    },
                } as User,
            );
            // TODO: inject the exec command here?
            const opts = {} as requestlib.Options;
            await config.applyToRequest(opts);
            expect((KubeConfig as any).authenticators[1].tokenCache['exec']).to.deep.equal(
                JSON.parse(responseStr),
            );
        });

        it('should throw with no command.', () => {
            const config = new KubeConfig();
            config.loadFromClusterAndUser(
                { skipTLSVerify: false } as Cluster,
                {
                    authProvider: {
                        name: 'exec',
                        config: {
                            exec: {},
                        },
                    },
                } as User,
            );
            const opts = {} as requestlib.Options;
            return expect(config.applyToRequest(opts)).to.eventually.be.rejectedWith(
                'No command was specified for exec authProvider!',
            );
        });
    });

    describe('load from multi $KUBECONFIG', () => {
        it('should load from multiple files', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kc2FileName;

            const kc = new KubeConfig();
            kc.loadFromDefault();

            // 2 in the first config, 1 in the second config
            expect(kc.clusters.length).to.equal(3);
            expect(kc.users.length).to.equal(6);
            expect(kc.contexts.length).to.equal(4);
            expect(kc.getCurrentContext()).to.equal('contextA');
        });
        it('should preserve starting file context', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kc2FileName;

            const kc = new KubeConfig();
            kc.loadFromDefault({}, true);

            expect(kc.getCurrentContext()).to.equal('context2');
        });
        it('should throw with duplicate clusters', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kcDupeCluster;

            const kc = new KubeConfig();
            expect(() => kc.loadFromDefault()).to.throw('Duplicate cluster: cluster1');
        });

        it('should throw with duplicate contexts', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kcDupeContext;

            const kc = new KubeConfig();
            expect(() => kc.loadFromDefault()).to.throw('Duplicate context: context1');
        });

        it('should throw with duplicate users', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kcDupeUser;

            const kc = new KubeConfig();
            expect(() => kc.loadFromDefault()).to.throw('Duplicate user: user1');
        });

        it('should ignore extra path delimiters', () => {
            process.env.KUBECONFIG = path.delimiter + kcFileName + path.delimiter;

            const kc = new KubeConfig();
            kc.loadFromDefault();

            expect(kc.clusters.length).to.equal(2);
            expect(kc.users.length).to.equal(3);
            expect(kc.contexts.length).to.equal(3);
            expect(kc.getCurrentContext()).to.equal('context2');
        });
    });

    function platformPath(path: string) {
        if (process.platform !== 'win32') {
            return path;
        }
        return path.replace(/\//g, '\\');
    }

    describe('MakeAbsolutePaths', () => {
        it('make paths absolute', () => {
            const kc = new KubeConfig();
            kc.addCluster({
                name: 'testCluster',
                server: `https://localhost:9889`,
                skipTLSVerify: true,
                caFile: 'foo/bar.crt',
            });
            kc.addUser({
                token: 'token',
                username: 'username',
                name: 'testUser',
                certFile: 'user/user.crt',
                keyFile: 'user/user.key',
            });
            kc.makePathsAbsolute('/tmp');
            expect(kc.clusters[0].caFile).to.equal(platformPath('/tmp/foo/bar.crt'));
            expect(kc.users[0].certFile).to.equal(platformPath('/tmp/user/user.crt'));
            expect(kc.users[0].keyFile).to.equal(platformPath('/tmp/user/user.key'));
        });
        it('should correctly make absolute paths', () => {
            const relative = 'foo/bar';
            const absolute = '/tmp/foo/bar';
            const root = '/usr/';

            expect(makeAbsolutePath(root, relative)).to.equal(platformPath('/usr/foo/bar'));
            expect(makeAbsolutePath(root, absolute)).to.equal(absolute);
        });
    });

    describe('loadFromDefault', () => {
        it('should load from $KUBECONFIG', () => {
            process.env.KUBECONFIG = kcFileName;
            const kc = new KubeConfig();
            kc.loadFromDefault();

            delete process.env.KUBECONFIG;

            validateFileLoad(kc);
        });

        it('should load from $HOME/.kube/config', () => {
            const currentHome = process.env.HOME;
            process.env.HOME = 'foobar';
            const data = readFileSync(kcFileName);
            const dir = join(process.env.HOME, '.kube');
            const arg = {};
            arg[dir] = { config: data };
            mockfs(arg);

            const kc = new KubeConfig();
            kc.loadFromDefault();
            mockfs.restore();
            process.env.HOME = currentHome;

            validateFileLoad(kc);
        });

        it('should load from cluster', () => {
            // TODO: fix this test for Windows
            if (process.platform === 'win32') {
                return;
            }
            const token = 'token';
            const cert = 'cert';
            const namespace = 'myNamespace';
            mockfs({
                '/var/run/secrets/kubernetes.io/serviceaccount': {
                    'ca.crt': cert,
                    token,
                    namespace,
                },
            });

            process.env.KUBERNETES_SERVICE_HOST = 'kubernetes';
            process.env.KUBERNETES_SERVICE_PORT = '443';
            const kc = new KubeConfig();
            kc.loadFromDefault();
            mockfs.restore();

            delete process.env.KUBERNETES_SERVICE_HOST;
            delete process.env.KUBERNETES_SERVICE_PORT;

            const cluster = kc.getCurrentCluster();
            expect(cluster).to.not.be.null;
            if (!cluster) {
                return;
            }
            expect(cluster.caFile).to.equal('/var/run/secrets/kubernetes.io/serviceaccount/ca.crt');
            expect(cluster.server).to.equal('https://kubernetes:443');
            const user = kc.getCurrentUser();
            expect(user).to.not.be.null;
            if (user) {
                expect(user.authProvider.config.tokenFile).to.equal(
                    '/var/run/secrets/kubernetes.io/serviceaccount/token',
                );
            }
            const contextName = kc.getCurrentContext();
            const currentContext = kc.getContextObject(contextName);
            expect(currentContext).to.not.be.null;
            if (currentContext) {
                expect(currentContext.namespace).to.equal('myNamespace');
            }
        });

        it('should load from cluster with http port', () => {
            // TODO: fix this test for Windows
            if (process.platform === 'win32') {
                return;
            }
            const token = 'token';
            const cert = 'cert';
            mockfs({
                '/var/run/secrets/kubernetes.io/serviceaccount': {
                    'ca.crt': cert,
                    token,
                },
            });

            process.env.KUBERNETES_SERVICE_HOST = 'kubernetes';
            process.env.KUBERNETES_SERVICE_PORT = '80';
            const kc = new KubeConfig();
            kc.loadFromDefault();
            mockfs.restore();
            delete process.env.KUBERNETES_SERVICE_HOST;
            delete process.env.KUBERNETES_SERVICE_PORT;

            const cluster = kc.getCurrentCluster();
            expect(cluster).to.not.be.null;
            if (!cluster) {
                return;
            }
            expect(cluster.server).to.equal('http://kubernetes:80');
        });

        it('should load from cluster with ipv6', () => {
            // TODO: fix this test for Windows
            if (process.platform === 'win32') {
                return;
            }
            const token = 'token';
            const cert = 'cert';
            mockfs({
                '/var/run/secrets/kubernetes.io/serviceaccount': {
                    'ca.crt': cert,
                    token,
                },
            });

            process.env.KUBERNETES_SERVICE_HOST = '::1234:5678';
            process.env.KUBERNETES_SERVICE_PORT = '80';
            const kc = new KubeConfig();
            kc.loadFromDefault();
            mockfs.restore();
            delete process.env.KUBERNETES_SERVICE_HOST;
            delete process.env.KUBERNETES_SERVICE_PORT;

            const cluster = kc.getCurrentCluster();
            expect(cluster).to.not.be.null;
            if (!cluster) {
                return;
            }
            expect(cluster.server).to.equal('http://[::1234:5678]:80');
        });

        it('should default to localhost', () => {
            // TODO: fix this test for Windows
            if (process.platform === 'win32') {
                return;
            }
            const currentHome = process.env.HOME;
            process.env.HOME = '/non/existent';
            const kc = new KubeConfig();
            kc.loadFromDefault();
            process.env.HOME = currentHome;

            const cluster = kc.getCurrentCluster();
            expect(cluster).to.not.be.null;
            if (!cluster) {
                return;
            }
            expect(cluster.name).to.equal('cluster');
            expect(cluster.server).to.equal('http://localhost:8080');

            const user = kc.getCurrentUser();
            expect(user).to.not.be.null;
            if (user) {
                expect(user.name).to.equal('user');
            }
        });
    });

    describe('makeAPIClient', () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        it('should be able to make an api client', () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);

            const client = kc.makeApiClient(CoreV1Api);
            expect(client instanceof CoreV1Api).to.equal(true);
        });
    });

    describe('EmptyConfig', () => {
        const emptyConfig = new KubeConfig();
        it('should throw if you try to make a client', () => {
            expect(() => emptyConfig.makeApiClient(CoreV1Api)).to.throw('No active cluster!');
        });

        it('should get a null current cluster', () => {
            expect(emptyConfig.getCurrentCluster()).to.equal(null);
        });

        it('should get empty user', () => {
            expect(emptyConfig.getCurrentUser()).to.equal(null);
        });

        it('should get empty cluster', () => {
            expect(emptyConfig.getCurrentCluster()).to.equal(null);
        });

        it('should get empty context', () => {
            expect(emptyConfig.getCurrentContext()).to.be.undefined;
        });

        it('should apply to request', async () => {
            const opts = {} as requestlib.Options;
            await emptyConfig.applyToRequest(opts);
        });
    });

    describe('Programmatic', () => {
        it('should be able to generate a valid config from code', () => {
            const kc = new KubeConfig();
            (kc as any).clusters = undefined;
            kc.addCluster({
                name: 'testCluster',
                server: `https://localhost:9889`,
                skipTLSVerify: true,
            });
            (kc as any).users = undefined;
            kc.addUser({
                token: 'token',
                username: 'username',
                name: 'testUser',
            });
            (kc as any).contexts = undefined;
            kc.addContext({
                cluster: 'testCluster',
                name: 'test',
                user: 'testUser',
            });
            kc.setCurrentContext('test');

            expect(kc.getCurrentCluster()!.name).to.equal('testCluster');
            expect(kc.getCurrentUser()!.username).to.equal('username');
        });
    });

    describe('BufferOrFile', () => {
        it('should load from root if present', () => {
            const data = 'some data for file';
            const arg: any = {
                configDir: {
                    config: data,
                },
            };
            mockfs(arg);
            const inputData = bufferFromFileOrString('configDir/config');
            expect(inputData).to.not.equal(null);
            if (inputData) {
                expect(inputData.toString()).to.equal(data);
            }
            mockfs.restore();
        });
        it('should load from a file if present', () => {
            const data = 'some data for file';
            const arg: any = {
                config: data,
            };
            mockfs(arg);
            const inputData = bufferFromFileOrString('config');
            expect(inputData).to.not.equal(null);
            if (inputData) {
                expect(inputData.toString()).to.equal(data);
            }
            mockfs.restore();
        });
    });
});
