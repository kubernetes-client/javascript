import { deepEqual } from 'node:assert';
import nock from 'nock';

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
            nock('https://nowhere.foo', {
                reqheaders: {
                    authorization: `Basic ${auth}`,
                },
            })
                .get('/api/v1/namespaces/default/pods')
                .reply(200, result);

            const list = await k8sApi.listNamespacedPod({ namespace: 'default' });

            return deepEqual(list, result);
        });
    });
});
