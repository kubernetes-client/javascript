import { expect, use } from 'chai';
import chaiAsPromised = require('chai-as-promised');
import nock = require('nock');

import { CoreV1Api } from './api';
import { KubeConfig } from './config';
import { Cluster, User } from './config_types';

use(chaiAsPromised);

describe('FullRequest', () => {
    describe('getPods', () => {
        it('should get pods successfully', () => {
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
                metadata: undefined,
            };
            const auth = Buffer.from(`${username}:${password}`).toString('base64');
            nock('https://nowhere.foo:443', {
                reqheaders: {
                    authorization: `Basic ${auth}`,
                },
            })
                .get('/api/v1/namespaces/default/pods')
                .reply(200, result);

            const promise = k8sApi.listNamespacedPod('default');

            return expect(promise)
                .to.eventually.have.property('body')
                .that.deep.equals(result);
        });
    });
});
