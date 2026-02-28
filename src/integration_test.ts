import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert';
import { MockAgent } from 'undici';

import { CoreV1Api } from './api.js';
import { KubeConfig } from './config.js';
import { Cluster, User } from './config_types.js';
import { createMockApplyFn } from './test/mock-dispatcher.js';

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

            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            createMockApplyFn(kc, mockAgent);

            const k8sApi = kc.makeApiClient(CoreV1Api);
            const result = {
                kind: 'PodList',
                apiVersion: 'v1',
                items: [],
            };
            mockAgent
                .get('https://nowhere.foo')
                .intercept({ path: '/api/v1/namespaces/default/pods', method: 'GET' })
                .reply(200, result, { headers: { 'content-type': 'application/json' } });

            const list = await k8sApi.listNamespacedPod({ namespace: 'default' });

            deepEqual(list, result);
            mockAgent.assertNoPendingInterceptors();
        });
    });
});
