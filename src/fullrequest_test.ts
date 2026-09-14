import { afterEach, beforeEach, describe, it } from 'node:test';
import { deepEqual, rejects } from 'node:assert';
import { MockAgent, setGlobalDispatcher, getGlobalDispatcher, type Dispatcher } from 'undici';

import { CoreV1Api } from './api.js';
import { KubeConfig } from './config.js';
import { Cluster, User } from './config_types.js';
import { timeoutMiddlewareMilliseconds } from './middleware.js';

describe('FullRequest', () => {
    describe('getPods', () => {
        let mockAgent: MockAgent;
        let originalDispatcher: Dispatcher;

        beforeEach(() => {
            originalDispatcher = getGlobalDispatcher();
            mockAgent = new MockAgent();
            setGlobalDispatcher(mockAgent);
            mockAgent.disableNetConnect();
        });

        afterEach(async () => {
            await mockAgent.close();
            setGlobalDispatcher(originalDispatcher);
        });

        it('should get pods successfully', async () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'https://nowhere.foo',
            } as Cluster;
            const username = 'foo';
            const password = 'some-password';
            const user = {
                name: 'my-user',
                username,
                password,
            } as User;

            kc.loadFromClusterAndUser(cluster, user);

            const k8sApi = kc.makeApiClient(CoreV1Api);
            const result = {
                kind: 'PodList',
                apiVersion: 'v1',
                items: [],
            };
            const auth = Buffer.from(`${username}:${password}`).toString('base64');

            const pool = mockAgent.get('https://nowhere.foo');
            pool.intercept({
                path: '/api/v1/namespaces/default/pods',
                method: 'GET',
                headers: { authorization: `Basic ${auth}` },
            }).reply(200, JSON.stringify(result), {
                headers: { 'content-type': 'application/json' },
            });

            const list = await k8sApi.listNamespacedPod({ namespace: 'default' });
            deepEqual(list, result);
        });

        it('should abort a generated API request after the configured timeout', async () => {
            const kc = new KubeConfig();
            kc.loadFromClusterAndUser(
                { name: 'foo', server: 'https://nowhere.foo' } as Cluster,
                { name: 'my-user' } as User,
            );
            const k8sApi = kc.makeApiClient(CoreV1Api);

            mockAgent
                .get('https://nowhere.foo')
                .intercept({ path: '/api/v1/namespaces/default/pods', method: 'GET' })
                .reply(200, { kind: 'PodList', apiVersion: 'v1', items: [] })
                .delay(100);

            await rejects(
                k8sApi.listNamespacedPod(
                    { namespace: 'default' },
                    {
                        middleware: [timeoutMiddlewareMilliseconds(10)],
                        middlewareMergeStrategy: 'append',
                    },
                ),
                { name: 'TimeoutError' },
            );
        });
    });
});
