import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert';
import { MockAgent, setGlobalDispatcher, getGlobalDispatcher } from 'undici';

import { CoreV1Api } from './api.js';
import { KubeConfig } from './config.js';
import { Cluster, User } from './config_types.js';

describe('FullRequest', () => {
    describe('getPods', () => {
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

            const originalDispatcher = getGlobalDispatcher();
            const mockAgent = new MockAgent();
            setGlobalDispatcher(mockAgent);
            mockAgent.disableNetConnect();

            const pool = mockAgent.get('https://nowhere.foo');
            pool.intercept({
                path: '/api/v1/namespaces/default/pods',
                method: 'GET',
                headers: { authorization: `Basic ${auth}` },
            }).reply(200, JSON.stringify(result), {
                headers: { 'content-type': 'application/json' },
            });

            try {
                const list = await k8sApi.listNamespacedPod({ namespace: 'default' });
                deepEqual(list, result);
            } finally {
                await mockAgent.close();
                setGlobalDispatcher(originalDispatcher);
            }
        });
    });
});
