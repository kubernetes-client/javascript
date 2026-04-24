import { afterEach, beforeEach, describe, it } from 'node:test';
import { strictEqual, rejects, throws } from 'node:assert';
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher, type Dispatcher } from 'undici';
import { AddOptionsToSearchParams, Log, LogOptions } from './log.js';
import { KubeConfig } from './config.js';
import { Writable } from 'node:stream';

describe('Log', () => {
    describe('Constructor', () => {
        it('should work', () => {
            const config = new KubeConfig();
            config.addCluster({
                name: 'foo',
                server: 'https://example.com',
                caData: 'certificate-authority-data',
                skipTLSVerify: false,
            });
            const log = new Log(config);
            strictEqual(log.config, config);
        });
    });
    describe('log', () => {
        const config = new KubeConfig();
        config.addCluster({
            name: 'foo',
            server: 'https://example.com',
            caData: 'certificate-authority-data',
            skipTLSVerify: false,
        });
        config.addContext({
            name: 'foo',
            cluster: 'foo',
            user: 'foo',
        });
        config.setCurrentContext('foo');
        const log = new Log(config);

        let mockAgent: MockAgent;
        let originalDispatcher: Dispatcher;
        let pool: ReturnType<MockAgent['get']>;

        beforeEach(() => {
            originalDispatcher = getGlobalDispatcher();
            mockAgent = new MockAgent();
            setGlobalDispatcher(mockAgent);
            mockAgent.disableNetConnect();
            pool = mockAgent.get('https://example.com');
        });

        afterEach(async () => {
            await mockAgent.close();
            setGlobalDispatcher(originalDispatcher);
        });

        it('should make a request with correct parameters', async () => {
            const namespace = 'default';
            const podName = 'mypod';
            const containerName = 'mycontainer';
            const stream = new Writable({
                write(chunk, encoding, callback) {
                    callback();
                },
            });
            const options: LogOptions = {
                follow: true,
                limitBytes: 100,
                pretty: true,
                previous: true,
                sinceSeconds: 1,
                tailLines: 1,
                timestamps: true,
            };

            pool.intercept({
                method: 'GET',
                path: '/api/v1/namespaces/default/pods/mypod/log?container=mycontainer&follow=true&limitBytes=100&pretty=true&previous=true&sinceSeconds=1&tailLines=1&timestamps=true',
            }).reply(200, 'log data');

            const controller = await log.log(namespace, podName, containerName, stream, options);
            strictEqual(controller instanceof AbortController, true);
            mockAgent.assertNoPendingInterceptors();
        });

        it('should throw an error if no active cluster', async () => {
            const configWithoutCluster = new KubeConfig();
            const logWithoutCluster = new Log(configWithoutCluster);
            const namespace = 'default';
            const podName = 'mypod';
            const containerName = 'mycontainer';
            const stream = new Writable({
                write(chunk, encoding, callback) {
                    callback();
                },
            });

            await rejects(async () => {
                await logWithoutCluster.log(namespace, podName, containerName, stream);
            }, /No currently active cluster/);
        });

        it('should handle API exceptions on non-500', async () => {
            const namespace = 'default';
            const podName = 'mypod';
            const containerName = 'mycontainer';
            const stream = new Writable({
                write(chunk, encoding, callback) {
                    callback();
                },
            });

            pool.intercept({
                method: 'GET',
                path: '/api/v1/namespaces/default/pods/mypod/log?container=mycontainer',
            }).reply(501, JSON.stringify({ message: 'Error occurred in log request' }), {
                headers: { 'content-type': 'application/json' },
            });

            await rejects(async () => {
                await log.log(namespace, podName, containerName, stream);
            }, /Error occurred in log request/);
            mockAgent.assertNoPendingInterceptors();
        });

        it('should handle API exceptions on 500', async () => {
            const namespace = 'default';
            const podName = 'mypod';
            const containerName = 'mycontainer';
            const stream = new Writable({
                write(chunk, encoding, callback) {
                    callback();
                },
            });

            pool.intercept({
                method: 'GET',
                path: '/api/v1/namespaces/default/pods/mypod/log?container=mycontainer',
            }).reply(500, JSON.stringify({ message: 'Error occurred in log request' }), {
                headers: { 'content-type': 'application/json' },
            });

            await rejects(async () => {
                await log.log(namespace, podName, containerName, stream);
            }, /Error occurred in log request/);
            mockAgent.assertNoPendingInterceptors();
        });

        it('should handle V1Status with code and message', async () => {
            const namespace = 'default';
            const podName = 'mypod';
            const containerName = 'mycontainer';
            const stream = new Writable({
                write(chunk, encoding, callback) {
                    callback();
                },
            });

            const v1Status = {
                kind: 'Status',
                apiVersion: 'v1',
                metadata: {},
                status: 'Failure',
                message: 'Pod not found',
                reason: 'NotFound',
                details: {
                    name: podName,
                    kind: 'pods',
                },
                code: 404,
            };

            pool.intercept({
                method: 'GET',
                path: '/api/v1/namespaces/default/pods/mypod/log?container=mycontainer',
            }).reply(500, JSON.stringify(v1Status), { headers: { 'content-type': 'application/json' } });

            await rejects(async () => {
                await log.log(namespace, podName, containerName, stream);
            }, /Pod not found/);
            mockAgent.assertNoPendingInterceptors();
        });
    });
    describe('AddOptionsToSearchParams', () => {
        it('should handle no log options', () => {
            const searchParams = new URLSearchParams();
            AddOptionsToSearchParams(undefined, searchParams);
            // verify that it doesn't throw.
        });
        it('should add options to search params', () => {
            let searchParams = new URLSearchParams();
            let options: LogOptions = {
                follow: true,
                limitBytes: 100,
                pretty: true,
                previous: true,
                sinceSeconds: 1,
                tailLines: 1,
                timestamps: true,
            };
            AddOptionsToSearchParams(options, searchParams);
            strictEqual(searchParams.get('follow'), 'true');
            strictEqual(searchParams.get('limitBytes'), '100');
            strictEqual(searchParams.get('pretty'), 'true');
            strictEqual(searchParams.get('previous'), 'true');
            strictEqual(searchParams.get('sinceSeconds'), '1');
            strictEqual(searchParams.get('tailLines'), '1');
            strictEqual(searchParams.get('timestamps'), 'true');

            const sinceTime = new Date().toISOString();
            searchParams = new URLSearchParams();
            options = { sinceTime };
            AddOptionsToSearchParams(options, searchParams);
            strictEqual(searchParams.get('sinceTime'), sinceTime);
        });
        it('should use defaults for', () => {
            const searchParams = new URLSearchParams();
            const options: LogOptions = {};
            AddOptionsToSearchParams(options, searchParams);
            strictEqual(searchParams.get('follow'), 'false');
            strictEqual(searchParams.get('pretty'), 'false');
            strictEqual(searchParams.get('previous'), 'false');
            strictEqual(searchParams.get('timestamps'), 'false');
        });
        it('sinceTime and sinceSeconds cannot be used together', () => {
            const searchParams = new URLSearchParams();
            const sinceTime = new Date().toISOString();
            const options: LogOptions = {
                sinceSeconds: 1,
                sinceTime,
            };
            throws(() => {
                AddOptionsToSearchParams(options, searchParams);
            }, /at most one of sinceTime or sinceSeconds may be specified/);
        });
    });
});
