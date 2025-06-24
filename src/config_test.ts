import { after, before, beforeEach, describe, it, mock } from 'node:test';
import assert, {
    deepEqual,
    deepStrictEqual,
    notStrictEqual,
    rejects,
    strictEqual,
    throws,
} from 'node:assert';
import child_process from 'node:child_process';
import { readFileSync } from 'node:fs';
import https from 'node:https';
import http from 'node:http';
import { Agent, RequestOptions } from 'node:https';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import mockfs from 'mock-fs';

import { Authenticator } from './auth.js';
import { Headers } from 'node-fetch';
import { HttpMethod } from './index.js';
import { assertRequestAgentsEqual, assertRequestOptionsEqual } from './test/match-buffer.js';
import { CoreV1Api, RequestContext } from './api.js';
import { bufferFromFileOrString, findHomeDir, findObject, KubeConfig, makeAbsolutePath } from './config.js';
import { ActionOnInvalid, Cluster, newClusters, newContexts, newUsers, User } from './config_types.js';
import { ExecAuth } from './exec_auth.js';
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent';
import { SocksProxyAgent } from 'socks-proxy-agent';

const kcFileName = 'testdata/kubeconfig.yaml';
const kc2FileName = 'testdata/kubeconfig-2.yaml';
const kcDupeCluster = 'testdata/kubeconfig-dupe-cluster.yaml';
const kcDupeContext = 'testdata/kubeconfig-dupe-context.yaml';
const kcDupeUser = 'testdata/kubeconfig-dupe-user.yaml';
const kcProxyUrl = 'testdata/kubeconfig-proxy-url.yaml';

const kcNoUserFileName = 'testdata/empty-user-kubeconfig.yaml';
const kcInvalidContextFileName = 'testdata/empty-context-kubeconfig.yaml';
const kcInvalidClusterFileName = 'testdata/empty-cluster-kubeconfig.yaml';
const kcTlsServerNameFileName = 'testdata/tls-server-name-kubeconfig.yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Config', () => {});

function validateFileLoad(kc: KubeConfig) {
    // check clusters
    const clusters = kc.getClusters();
    strictEqual(clusters.length, 2, 'there are 2 clusters');
    const cluster1 = clusters[0];
    const cluster2 = clusters[1];
    strictEqual(cluster1.name, 'cluster1');
    strictEqual(cluster1.caData, 'Q0FEQVRB');
    strictEqual(cluster1.server, 'http://example.com');
    strictEqual(cluster1.proxyUrl, 'socks5://localhost:1181');
    strictEqual(cluster2.name, 'cluster2');
    strictEqual(cluster2.caData, 'Q0FEQVRBMg==');
    strictEqual(cluster2.server, 'http://example2.com');
    strictEqual(cluster2.skipTLSVerify, true);

    // check users
    const users = kc.getUsers();
    strictEqual(users.length, 3, 'there are 3 users');
    const user1 = users[0];
    const user2 = users[1];
    const user3 = users[2];
    strictEqual(user1.name, 'user1');
    strictEqual(user1.certData, 'VVNFUl9DQURBVEE=');
    strictEqual(user1.keyData, 'VVNFUl9DS0RBVEE=');
    strictEqual(user2.name, 'user2');
    strictEqual(user2.certData, 'VVNFUjJfQ0FEQVRB');
    strictEqual(user2.keyData, 'VVNFUjJfQ0tEQVRB');
    strictEqual(user3.name, 'user3');
    strictEqual(user3.username, 'foo');
    strictEqual(user3.password, 'bar');

    // check contexts
    const contexts = kc.getContexts();
    strictEqual(contexts.length, 3, 'there are three contexts');
    const context1 = contexts[0];
    const context2 = contexts[1];
    const context3 = contexts[2];
    strictEqual(context1.name, 'context1');
    strictEqual(context1.user, 'user1');
    strictEqual(context1.namespace, undefined);
    strictEqual(context1.cluster, 'cluster1');
    strictEqual(context2.name, 'context2');
    strictEqual(context2.user, 'user2');
    strictEqual(context2.namespace, 'namespace2');
    strictEqual(context2.cluster, 'cluster2');
    strictEqual(context3.name, 'passwd');
    strictEqual(context3.user, 'user3');
    strictEqual(context3.cluster, 'cluster2');

    strictEqual(kc.getCurrentContext(), 'context2');
}

describe('KubeConfig', () => {
    it('should return null on no contexts', () => {
        const kc = new KubeConfig() as any;
        kc.contexts = undefined;
        strictEqual(kc.getContextObject('non-existent'), null);
    });
    describe('findObject', () => {
        it('should return null on undefined', () => {
            strictEqual(findObject(undefined as any, 'foo', 'bar'), null);
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
            notStrictEqual(obj1, null);
            strictEqual(obj1!.some, 'sub-object');
            // Validate that if the named object is missing, we just return the full object
            const obj2 = findObject(list, 'bar', 'context');
            notStrictEqual(obj2, null);
            strictEqual(obj2!.some, 'object');
            // validate that we do the right thing if it is missing
            const obj3 = findObject(list, 'nonexistent', 'context');
            strictEqual(obj3, null);
        });
    });

    describe('loadFromCluster', () => {
        it('should load from cluster', () => {
            process.env.KUBERNETES_SERVICE_HOST = 'example.com';
            process.env.KUBERNETES_SERVICE_PORT = '8080';

            const kc = new KubeConfig();
            kc.loadFromCluster();
            const expectedCluster = {
                caFile: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
                name: 'inCluster',
                server: 'http://example.com:8080',
                skipTLSVerify: false,
            };

            process.env.KUBERNETES_SERVICE_HOST = undefined;
            process.env.KUBERNETES_SERVICE_PORT = undefined;

            strictEqual(kc.getCurrentContext(), 'inClusterContext');
            deepEqual(kc.getCurrentCluster(), expectedCluster);
            deepEqual(kc.getCluster(kc.getContextObject(kc.getCurrentContext())!.cluster), expectedCluster);
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
            strictEqual(clusterOut, cluster);

            const userOut = kc.getCurrentUser();
            strictEqual(userOut, user);
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
            strictEqual(clusterOut, cluster);

            const userOut = kc.getCurrentUser();
            strictEqual(userOut, user);
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
            throws(() => kc.loadFromFile('missing.yaml'));
        });

        describe('filter vs throw tests', () => {
            it('works for invalid users', () => {
                const kc = new KubeConfig();
                kc.loadFromFile(kcNoUserFileName, { onInvalidEntry: ActionOnInvalid.FILTER });
                strictEqual(kc.getUsers().length, 2);
            });
            it('works for invalid contexts', () => {
                const kc = new KubeConfig();
                kc.loadFromFile(kcInvalidContextFileName, { onInvalidEntry: ActionOnInvalid.FILTER });
                strictEqual(kc.getContexts().length, 2);
            });
            it('works for invalid clusters', () => {
                const kc = new KubeConfig();
                kc.loadFromFile(kcInvalidClusterFileName, { onInvalidEntry: ActionOnInvalid.FILTER });
                strictEqual(kc.getClusters().length, 1);
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

    describe('applytoFetchOptions', () => {
        it('should apply cert configs', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);
            kc.setCurrentContext('passwd');

            const opts: https.RequestOptions = {
                method: 'POST',
                timeout: 5,
                headers: {
                    number: 5,
                    string: 'str',
                    empty: undefined,
                    list: ['a', 'b'],
                },
            };
            const requestInit = await kc.applyToFetchOptions(opts);
            const expectedCA = Buffer.from('CADATA2', 'utf-8');
            const expectedAgent = new https.Agent({
                ca: expectedCA,
                rejectUnauthorized: false,
            });

            strictEqual(requestInit.method, 'POST');
            // timeout has been removed from the spec.
            strictEqual((requestInit as any).timeout, 5);
            const headers = requestInit.headers as Headers;
            strictEqual(Array.from(headers).length, 4);
            strictEqual(headers.get('Authorization'), 'Basic Zm9vOmJhcg==');
            strictEqual(headers.get('list'), 'a, b');
            strictEqual(headers.get('number'), '5');
            strictEqual(headers.get('string'), 'str');
            assertRequestAgentsEqual(requestInit.agent as Agent, expectedAgent);
        });
    });

    describe('applyHTTPSOptions', () => {
        it('should apply tls-server-name to https.RequestOptions', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcTlsServerNameFileName);

            const requestContext = new RequestContext('https://kube.example.com', HttpMethod.GET);
            const opts: https.RequestOptions = {};
            await kc.applyToHTTPSOptions(opts);
            await kc.applySecurityAuthentication(requestContext);

            const expectedAgent = new https.Agent({
                ca: Buffer.from('CADATA2', 'utf-8'),
                cert: Buffer.from('USER_CADATA', 'utf-8'),
                key: Buffer.from('USER_CKDATA', 'utf-8'),
                passphrase: undefined,
                pfx: undefined,
                rejectUnauthorized: false,
                servername: 'kube.example2.com',
            });

            const expectedOptions: https.RequestOptions = {
                headers: {},
                rejectUnauthorized: false,
                servername: 'kube.example2.com',
                agent: expectedAgent,
            };

            assertRequestOptionsEqual(opts, expectedOptions);
            strictEqual((requestContext.getAgent()! as any).options.servername, 'kube.example2.com');
        });
        it('should apply cert configs', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);

            const opts: https.RequestOptions = {};
            await kc.applyToHTTPSOptions(opts);

            const expectedAgent = new https.Agent({
                ca: Buffer.from('CADATA2', 'utf-8'),
                cert: Buffer.from('USER2_CADATA', 'utf-8'),
                key: Buffer.from('USER2_CKDATA', 'utf-8'),
                passphrase: undefined,
                pfx: undefined,
                rejectUnauthorized: false,
            });

            const expectedOptions: https.RequestOptions = {
                headers: {},
                rejectUnauthorized: false,
                agent: expectedAgent,
            };

            assertRequestOptionsEqual(opts, expectedOptions);
        });
        it('should apply password', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);
            kc.setCurrentContext('passwd');
            const testServerName1 = 'https://company.com';

            const opts: RequestOptions = {
                servername: 'https://company.com',
            };
            const rc = new RequestContext(testServerName1, HttpMethod.GET);
            await kc.applySecurityAuthentication(rc);
            await kc.applyToHTTPSOptions(opts);
            const expectedCA = Buffer.from('CADATA2', 'utf-8');
            const expectedAgent = new https.Agent({
                ca: expectedCA,
                cert: undefined,
                key: undefined,
                passphrase: undefined,
                pfx: undefined,
                rejectUnauthorized: false,
            });
            const expectedOptions: https.RequestOptions = {
                auth: 'foo:bar',
                headers: {},
                rejectUnauthorized: false,
                servername: 'https://company.com',
                agent: expectedAgent,
            };

            assertRequestOptionsEqual(opts, expectedOptions);
        });
        it('should apply socks proxy', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcProxyUrl);
            kc.setCurrentContext('contextA');

            const testServerName = 'https://example.com';
            const rc = new RequestContext(testServerName, HttpMethod.GET);

            await kc.applySecurityAuthentication(rc);
            const expectedCA = Buffer.from('CADAT@', 'utf-8');
            const expectedProxyHost = 'example';
            const expectedProxyPort = 1187;

            strictEqual(rc.getAgent() instanceof SocksProxyAgent, true);
            const agent = rc.getAgent() as SocksProxyAgent;
            strictEqual(agent.options.ca?.toString(), expectedCA.toString());
            strictEqual(agent.proxy.host, expectedProxyHost);
            strictEqual(agent.proxy.port, expectedProxyPort);
        });
        it('should apply https proxy', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcProxyUrl);
            kc.setCurrentContext('contextB');

            const testServerName = 'https://example.com';
            const rc = new RequestContext(testServerName, HttpMethod.GET);

            await kc.applySecurityAuthentication(rc);
            const expectedCA = Buffer.from('CADAT@', 'utf-8');
            const expectedProxyHref = 'http://example:9443/';

            strictEqual(rc.getAgent() instanceof HttpsProxyAgent, true);
            const agent = rc.getAgent() as HttpsProxyAgent;
            strictEqual(agent.options.ca?.toString(), expectedCA.toString());
            strictEqual((agent as any).proxy.href, expectedProxyHref);
        });
        it('should apply http proxy', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcProxyUrl);
            kc.setCurrentContext('contextC');

            const testServerName = 'https://example.com';
            const rc = new RequestContext(testServerName, HttpMethod.GET);

            await kc.applySecurityAuthentication(rc);
            const expectedCA = Buffer.from('CADAT@', 'utf-8');
            const expectedProxyHref = 'http://example:8080/';

            strictEqual(rc.getAgent() instanceof HttpProxyAgent, true);
            const agent = rc.getAgent() as HttpProxyAgent;
            strictEqual((agent as any).options.ca?.toString(), expectedCA.toString());
            strictEqual((agent as any).proxy.href, expectedProxyHref);
        });
        it('should throw an error if proxy-url is provided but the server protocol is not http or https', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcProxyUrl);
            kc.setCurrentContext('contextD');

            const testServerName = 'https://example.com';
            const rc = new RequestContext(testServerName, HttpMethod.GET);

            return rejects(kc.applySecurityAuthentication(rc), {
                message: 'Unsupported proxy type',
            });
        });
        it('should apply http agent if cluster.server starts with http and no proxy-url is provided', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcProxyUrl);
            kc.setCurrentContext('contextE');

            const testServerName = 'http://example.com';
            const rc = new RequestContext(testServerName, HttpMethod.GET);

            await kc.applySecurityAuthentication(rc);

            strictEqual(rc.getAgent() instanceof http.Agent, true);
        });
        it('should throw an error if cluster.server starts with http, no proxy-url is provided and insecure-skip-tls-verify is not set', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcProxyUrl);
            kc.setCurrentContext('contextF');

            const testServerName = 'http://example.com';
            const rc = new RequestContext(testServerName, HttpMethod.GET);

            await assert.rejects(kc.applySecurityAuthentication(rc), Error);
        });
        it('should apply https agent if cluster.server starts with https and no proxy-url is provided', async () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcProxyUrl);
            kc.setCurrentContext('contextG');

            const testServerName = 'https://example.com';
            const rc = new RequestContext(testServerName, HttpMethod.GET);

            await kc.applySecurityAuthentication(rc);

            strictEqual(rc.getAgent() instanceof https.Agent, true);
        });
    });

    describe('loadClusterConfigObjects', () => {
        it('should fail if name is missing from cluster', () => {
            throws(
                () => {
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
                },
                { message: 'clusters[1].name is missing' },
            );
        });
        it('should fail if cluster is missing from cluster', () => {
            throws(
                () => {
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
                },
                { message: 'clusters[1].cluster is missing' },
            );
        });
        it('should fail if cluster.server is missing from cluster', () => {
            throws(
                () => {
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
                },
                { message: 'clusters[1].cluster.server is missing' },
            );
        });
    });

    describe('loadUserConfigObjects', () => {
        it('should fail if name is missing from user', () => {
            throws(
                () => {
                    newUsers([
                        {
                            name: 'some-user',
                            user: {},
                        },
                        {
                            foo: 'bar',
                        },
                    ]);
                },
                { message: 'users[1].name is missing' },
            );
        });
        it('should load correctly with just name', () => {
            const name = 'some-name';
            const users = newUsers([
                {
                    name,
                },
            ]);
            strictEqual(name, users[0].name);
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
            strictEqual(name, users[0].name);
            strictEqual(token, users[0].token);
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
            strictEqual(name, users[0].name);
            strictEqual(token, users[0].token);
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
            strictEqual(authProvider, users[0].authProvider);
            strictEqual(certData, users[0].certData);
            strictEqual(certFile, users[0].certFile);
            strictEqual(keyData, users[0].keyData);
            strictEqual(keyFile, users[0].keyFile);
            strictEqual(password, users[0].password);
            strictEqual(username, users[0].username);
            strictEqual(name, users[0].name);
        });
        it('should load impersonation information', () => {
            const users = newUsers([
                {
                    name: 'some-name-1',
                    user: {
                        as: 'impersonated-user',
                    },
                },
                {
                    name: 'some-name-2',
                    user: {},
                },
            ]);
            strictEqual('some-name-1', users[0].name);
            strictEqual('impersonated-user', users[0].impersonateUser);
            strictEqual('some-name-2', users[1].name);
            strictEqual(undefined, users[1].impersonateUser);
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

            strictEqual(home, expectedHome);
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

        it('should return null if no home-ish env vars are set', () => {
            const dir = findHomeDir();
            strictEqual(dir, null);
        });

        describe('look for an existing .kube/config', () => {
            let allDirs;
            let homeDrive;
            beforeEach(() => {
                allDirs = {};
                process.env.HOME = 'home';
                process.env.HOMEDRIVE = 'drive';
                process.env.HOMEPATH = 'a-path';
                process.env.USERPROFILE = 'a-userprofile';
                homeDrive = join(process.env.HOMEDRIVE, process.env.HOMEPATH);
                allDirs[process.env.HOME] = {};
                allDirs[homeDrive] = {};
                allDirs[process.env.USERPROFILE] = {};
            });
            it('should load from HOME if present', () => {
                const dir = process.env.HOME as string;
                allDirs[dir]['.kube'] = { config: 'data' };
                mockfs(allDirs);

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, dir);
            });
            it('should favor HOME when present', () => {
                const dir = process.env.HOME as string;
                allDirs[dir]['.kube'] = { config: 'data' };
                allDirs[homeDrive]['.kube'] = { config: 'data' };
                allDirs[process.env.USERPROFILE as string]['.kube'] = { config: 'data' };
                mockfs(allDirs);

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, dir);
            });

            it('should load from HOMEDRIVE/HOMEPATH if present', () => {
                const dir = homeDrive;
                allDirs[dir]['.kube'] = { config: 'data' };
                mockfs(allDirs);

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, dir);
            });

            it('should favor HOMEDRIVE/HOMEPATH over USERPROFILE', () => {
                const dir = homeDrive;
                allDirs[dir]['.kube'] = { config: 'data' };
                allDirs[process.env.USERPROFILE as string]['.kube'] = { config: 'data' };
                mockfs(allDirs);

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, dir);
            });

            it('should load from USERPROFILE if present', () => {
                const dir = process.env.USERPROFILE as string;
                allDirs[dir]['.kube'] = { config: 'data' };
                mockfs(allDirs);

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, dir);
            });
        });

        // Just test for existence,but this will include the writeability order
        describe('look for an existing directory', () => {
            let allDirs;
            let homeDrive;
            beforeEach(() => {
                allDirs = {};
                process.env.HOME = 'home';
                process.env.HOMEDRIVE = 'drive';
                process.env.HOMEPATH = 'a-path';
                process.env.USERPROFILE = 'a-userprofile';
                homeDrive = join(process.env.HOMEDRIVE, process.env.HOMEPATH);
            });
            it('should load from HOME if present', () => {
                allDirs[process.env.HOME as string] = 'data';
                allDirs[homeDrive] = 'data';
                allDirs[process.env.USERPROFILE as string] = 'data';
                const dir = process.env.HOME;
                mockfs(allDirs);

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, dir);
            });
            it('should load from USERPROFILE if present', () => {
                allDirs[homeDrive] = 'data';
                allDirs[process.env.USERPROFILE as string] = 'data';
                mockfs(allDirs);

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, process.env.USERPROFILE);
            });
            it('should load from homeDrive if present', () => {
                allDirs[homeDrive] = 'data';
                mockfs(allDirs);

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, homeDrive);
            });
            it('should return HOME when no home-ish directories are present', () => {
                mockfs({});

                const home = findHomeDir();

                mockfs.restore();
                strictEqual(home, process.env.HOME);
            });
        });
    });

    describe('loadContextConfigObjects', () => {
        it('should fail if name is missing from context', () => {
            throws(
                () => {
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
                },
                { message: 'contexts[1].name is missing' },
            );
        });
        it('should fail if context is missing from context', () => {
            throws(
                () => {
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
                },
                { message: 'contexts[1].context is missing' },
            );
        });
        it('should fail if context is missing from context', () => {
            throws(
                () => {
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
                },
                { message: 'contexts[1].context.cluster is missing' },
            );
        });
    });

    describe('auth options', () => {
        it('should populate basic-auth for https', async () => {
            const config = new KubeConfig();
            const user = 'user';
            const passwd = 'password';

            config.loadFromClusterAndUser({} as Cluster, { username: user, password: passwd } as User);
            const opts = {} as https.RequestOptions;
            await config.applyToHTTPSOptions(opts);

            strictEqual(opts.auth, `${user}:${passwd}`);
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
            const opts = {} as RequestOptions;

            await config.applyToHTTPSOptions(opts);

            strictEqual(opts.auth, `${user}:${passwd}`);
            strictEqual(opts.rejectUnauthorized, false);
        });
        it('should not populate strict ssl', async () => {
            const config = new KubeConfig();

            config.loadFromClusterAndUser({ skipTLSVerify: false } as Cluster, {} as User);
            const opts = {} as RequestOptions;

            await config.applyToHTTPSOptions(opts);

            strictEqual(opts.rejectUnauthorized, undefined);
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
            const opts = {} as RequestOptions;

            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;

            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
            opts.headers = {};
            opts.headers.Host = 'foo.com';
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;

            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;

            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.rejectUnauthorized, false);
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
            const opts = {} as RequestOptions;

            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.rejectUnauthorized, undefined);
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
            const opts = {} as RequestOptions;

            return rejects(config.applyToHTTPSOptions(opts), {
                message: 'Token is expired!',
            });
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
            const opts = {} as RequestOptions;
            return rejects(config.applyToHTTPSOptions(opts), /Failed to refresh token/);
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
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
                            'expires-on': '1590757517834',
                            'cmd-path': 'echo',
                            'cmd-args': `'${responseStr}'`,
                            'token-key': '{.token.accessToken}',
                            'expiry-key': '{.token.token_expiry}',
                        },
                    },
                } as User,
            );
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
                            'cmd-path': path.join(__dirname, 'test', 'echo space.js'),
                            'cmd-args': `'${responseStr}'`,
                            'token-key': '{.token.accessToken}',
                            'expiry-key': '{.token.token_expiry}',
                        },
                    },
                } as User,
            );
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Authorization'], `Bearer ${token}`);
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
            const opts = {} as RequestOptions;
            await config.applyToHTTPSOptions(opts);
            const execAuthenticator = (config as any).authenticators.find(
                (authenticator) => authenticator instanceof ExecAuth,
            );
            deepStrictEqual(execAuthenticator.tokenCache.exec, JSON.parse(responseStr));
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
            const opts = {} as RequestOptions;
            return rejects(config.applyToHTTPSOptions(opts), {
                message: 'No command was specified for exec authProvider!',
            });
        });
    });

    describe('load from multi $KUBECONFIG', () => {
        it('should load from multiple files', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kc2FileName;

            const kc = new KubeConfig();
            kc.loadFromDefault();

            // 2 in the first config, 1 in the second config
            strictEqual(kc.clusters.length, 3);
            strictEqual(kc.users.length, 6);
            strictEqual(kc.contexts.length, 4);
            strictEqual(kc.getCurrentContext(), 'contextA');
        });
        it('should preserve starting file context', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kc2FileName;

            const kc = new KubeConfig();
            kc.loadFromDefault({}, true);

            strictEqual(kc.getCurrentContext(), 'context2');
        });
        it('should throw with duplicate clusters', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kcDupeCluster;

            const kc = new KubeConfig();
            throws(() => kc.loadFromDefault(), { message: 'Duplicate cluster: cluster1' });
        });

        it('should throw with duplicate contexts', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kcDupeContext;

            const kc = new KubeConfig();
            throws(() => kc.loadFromDefault(), { message: 'Duplicate context: context1' });
        });

        it('should throw with duplicate users', () => {
            process.env.KUBECONFIG = kcFileName + path.delimiter + kcDupeUser;

            const kc = new KubeConfig();
            throws(() => kc.loadFromDefault(), { message: 'Duplicate user: user1' });
        });

        it('should ignore extra path delimiters', () => {
            process.env.KUBECONFIG = path.delimiter + kcFileName + path.delimiter;

            const kc = new KubeConfig();
            kc.loadFromDefault();

            strictEqual(kc.clusters.length, 2);
            strictEqual(kc.users.length, 3);
            strictEqual(kc.contexts.length, 3);
            strictEqual(kc.getCurrentContext(), 'context2');
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
                server: 'https://localhost:9889',
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
            strictEqual(kc.clusters[0].caFile, platformPath('/tmp/foo/bar.crt'));
            strictEqual(kc.users[0].certFile, platformPath('/tmp/user/user.crt'));
            strictEqual(kc.users[0].keyFile, platformPath('/tmp/user/user.key'));
        });
        it('should correctly make absolute paths', () => {
            const relative = 'foo/bar';
            const absolute = '/tmp/foo/bar';
            const root = '/usr/';

            strictEqual(makeAbsolutePath(root, relative), platformPath('/usr/foo/bar'));
            strictEqual(makeAbsolutePath(root, absolute), absolute);
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
            strictEqual(cluster!.caFile, '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt');
            strictEqual(cluster!.server, 'https://kubernetes:443');
            const user = kc.getCurrentUser();
            strictEqual(
                user!.authProvider.config.tokenFile,
                '/var/run/secrets/kubernetes.io/serviceaccount/token',
            );

            const contextName = kc.getCurrentContext();
            const currentContext = kc.getContextObject(contextName);
            strictEqual(currentContext!.namespace, 'myNamespace');
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
            strictEqual(cluster!.server, 'http://kubernetes:80');
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
            strictEqual(cluster!.server, 'http://[::1234:5678]:80');
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
            strictEqual(cluster!.name, 'cluster');
            strictEqual(cluster!.server, 'http://localhost:8080');

            const user = kc.getCurrentUser();
            strictEqual(user!.name, 'user');
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
            strictEqual(client instanceof CoreV1Api, true);
        });
    });

    describe('EmptyConfig', () => {
        const emptyConfig = new KubeConfig();
        it('should throw if you try to make a client', () => {
            throws(() => emptyConfig.makeApiClient(CoreV1Api), { message: 'No active cluster!' });
        });

        it('should get a null current cluster', () => {
            strictEqual(emptyConfig.getCurrentCluster(), null);
        });

        it('should get empty user', () => {
            strictEqual(emptyConfig.getCurrentUser(), null);
        });

        it('should get empty cluster', () => {
            strictEqual(emptyConfig.getCurrentCluster(), null);
        });

        it('should get empty context', () => {
            strictEqual(emptyConfig.getCurrentContext(), undefined);
        });

        it('should apply to request', async () => {
            const opts = {} as RequestOptions;
            await emptyConfig.applyToHTTPSOptions(opts);
        });
    });

    describe('Programmatic', () => {
        it('should be able to generate a valid config from code', () => {
            const kc = new KubeConfig();
            (kc as any).clusters = undefined;
            kc.addCluster({
                name: 'testCluster',
                server: 'https://localhost:9889',
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

            strictEqual(kc.getCurrentCluster()!.name, 'testCluster');
            strictEqual(kc.getCurrentUser()!.username, 'username');
        });
    });

    describe('BufferOrFile', () => {
        let originalEnv;

        before(() => {
            // The code being tested here references process.env and can fail
            // if run on a machine with certain environment variable settings.
            originalEnv = process.env;
            process.env = {};
        });

        after(() => {
            process.env = originalEnv;
        });

        it('should load from root if present', () => {
            const data = 'some data for file';
            const arg: any = {
                configDir: {
                    config: data,
                },
            };
            mockfs(arg);
            const inputData = bufferFromFileOrString('configDir/config');
            strictEqual(inputData!.toString(), data);
            mockfs.restore();
        });
        it('should load from a file if present', () => {
            const data = 'some data for file';
            const arg: any = {
                config: data,
            };
            mockfs(arg);
            const inputData = bufferFromFileOrString('config');
            strictEqual(inputData!.toString(), data);
            mockfs.restore();
        });
        it('should try to load from WSL on Windows with wsl.exe not working', () => {
            const kc = new KubeConfig();
            const commands: { command: string; args: string[] }[] = [];
            mock.method(child_process, 'spawnSync', (cmd: string, args: string[]) => {
                commands.push({ command: cmd, args });
                return { status: 1, stderr: 'some error' };
            });
            kc.loadFromDefault(undefined, false, 'win32');
            strictEqual(commands.length, 2);
            for (let i = 0; i < commands.length; i++) {
                strictEqual(commands[i].command, 'wsl.exe');
            }
        });
        it('should try to load from WSL on Windows with $KUBECONFIG', () => {
            const kc = new KubeConfig();
            const test_path = 'C:\\Users\\user\\.kube\\config';
            const configData = readFileSync(kcFileName);
            const commands: { command: string; args: string[] }[] = [];
            const results: { status: number; stderr: string; stdout: string }[] = [
                { status: 0, stderr: '', stdout: test_path },
                { status: 0, stderr: '', stdout: configData.toString() },
            ];
            let ix = 0;
            mock.method(child_process, 'spawnSync', (cmd: string, args: string[]) => {
                commands.push({ command: cmd, args });
                return results[ix++];
            });
            kc.loadFromDefault(undefined, false, 'win32');
            strictEqual(commands.length, 2);
            for (let i = 0; i < commands.length; i++) {
                strictEqual(commands[i].command, 'wsl.exe');
            }
            validateFileLoad(kc);
        });
        it('should try to load from WSL on Windows without $KUBECONFIG', () => {
            const kc = new KubeConfig();
            const configData = readFileSync(kcFileName);
            const commands: { command: string; args: string[] }[] = [];
            const results: { status: number; stderr: string; stdout: string }[] = [
                { status: 1, stderr: 'Some Error', stdout: '' },
                { status: 0, stderr: '', stdout: configData.toString() },
                { status: 0, stderr: '', stdout: 'C:\\wsldata\\.kube' },
            ];
            let ix = 0;
            mock.method(child_process, 'spawnSync', (cmd: string, args: string[]) => {
                commands.push({ command: cmd, args });
                return results[ix++];
            });
            kc.loadFromDefault(undefined, false, 'win32');
            strictEqual(commands.length, 3);
            for (let i = 0; i < commands.length; i++) {
                strictEqual(commands[i].command, 'wsl.exe');
            }
            validateFileLoad(kc);
        });

        it('should inject a custom Authenticator', async () => {
            class CustomAuthenticator implements Authenticator {
                public isAuthProvider(user: User): boolean {
                    return user.authProvider === 'custom';
                }

                public async applyAuthentication(user: User, opts: RequestOptions): Promise<void> {
                    if (user.authProvider === 'custom') {
                        // Simulate token retrieval
                        const token = 'test-token';
                        opts.headers = opts.headers || {};
                        opts.headers['Authorization'] = `Bearer ${token}`;
                    } else {
                        throw new Error('No custom configuration found');
                    }
                }
            }

            const customAuthenticator = new CustomAuthenticator();
            const kc = new KubeConfig();
            kc.addAuthenticator(customAuthenticator);

            const cluster: Cluster = {
                name: 'test-cluster',
                server: 'https://localhost:6443',
                skipTLSVerify: false,
            };
            const user: User = {
                name: 'test-user',
                authProvider: 'custom',
            };

            kc.loadFromClusterAndUser(cluster, user);

            const opts: RequestOptions = {};
            await kc.applyToHTTPSOptions(opts);

            strictEqual(opts.headers!['Authorization'], 'Bearer test-token');
        });
    });

    describe('Impersonation', () => {
        it('injects Impersonate-User header', async () => {
            const kc = new KubeConfig();
            const cluster: Cluster = {
                name: 'test-cluster',
                server: 'https://localhost:6443',
                skipTLSVerify: false,
            };
            const user: User = {
                name: 'test-user',
                authProvider: 'custom',
                impersonateUser: 'impersonate-user',
            };

            kc.loadFromClusterAndUser(cluster, user);
            const opts: RequestOptions = {};
            await kc.applyToHTTPSOptions(opts);
            strictEqual(opts.headers!['Impersonate-User'], 'impersonate-user');
        });
    });
});
