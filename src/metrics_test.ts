import { deepStrictEqual, ok, match, rejects, strictEqual } from 'node:assert';
import nock from 'nock';
import { KubeConfig } from './config.js';
import { V1Status, ApiException } from './gen/index.js';
import { Metrics, NodeMetricsList, PodMetricsList } from './metrics.js';

const emptyPodMetrics: PodMetricsList = {
    kind: 'PodMetricsList',
    apiVersion: 'metrics.k8s.io/v1beta1',
    metadata: {
        selfLink: '/apis/metrics.k8s.io/v1beta1/pods',
    },
    items: [],
};

const mockedPodMetrics: PodMetricsList = {
    kind: 'PodMetricsList',
    apiVersion: 'metrics.k8s.io/v1beta1',
    metadata: { selfLink: '/apis/metrics.k8s.io/v1beta1/pods/' },
    items: [
        {
            metadata: {
                name: 'dice-roller-7c76898b4d-shm9p',
                namespace: 'default',
                selfLink: '/apis/metrics.k8s.io/v1beta1/namespaces/default/pods/dice-roller-7c76898b4d-shm9p',
                creationTimestamp: '2021-09-26T11:57:27Z',
            },
            timestamp: '2021-09-26T11:57:21Z',
            window: '30s',
            containers: [{ name: 'nginx', usage: { cpu: '10', memory: '3912Ki' } }],
        },
        {
            metadata: {
                name: 'other-pod-7c76898b4e-12kj',
                namespace: 'default',
                selfLink: '/apis/metrics.k8s.io/v1beta1/namespaces/default/pods/other-pod-7c76898b4e-12kj',
                creationTimestamp: '2021-09-26T11:57:27Z',
            },
            timestamp: '2021-09-26T11:57:21Z',
            window: '30s',
            containers: [
                { name: 'nginx', usage: { cpu: '15', memory: '4012Ki' } },
                { name: 'sidecar', usage: { cpu: '16', memory: '3012Ki' } },
            ],
        },
    ],
};

const emptyNodeMetrics: NodeMetricsList = {
    kind: 'NodeMetricsList',
    apiVersion: 'metrics.k8s.io/v1beta1',
    metadata: { selfLink: '/apis/metrics.k8s.io/v1beta1/nodes/' },
    items: [],
};

const mockedNodeMetrics: NodeMetricsList = {
    kind: 'NodeMetricsList',
    apiVersion: 'metrics.k8s.io/v1beta1',
    metadata: { selfLink: '/apis/metrics.k8s.io/v1beta1/nodes/' },
    items: [
        {
            metadata: {
                name: 'a-node',
                selfLink: '/apis/metrics.k8s.io/v1beta1/nodes/a-node',
                creationTimestamp: '2021-09-26T16:01:53Z',
            },
            timestamp: '2021-09-26T16:01:11Z',
            window: '30s',
            usage: { cpu: '214650124n', memory: '801480Ki' },
        },
    ],
};

const TEST_NAMESPACE = 'test-namespace';

const testConfigOptions: any = {
    clusters: [{ name: 'cluster', server: 'https://127.0.0.1:51010' }],
    users: [{ name: 'user', password: 'password' }],
    contexts: [{ name: 'currentContext', cluster: 'cluster', user: 'user' }],
    currentContext: 'currentContext',
};

const systemUnderTest = (options: any = testConfigOptions): [Metrics, nock.Scope] => {
    const kc = new KubeConfig();
    kc.loadFromOptions(options);
    const metricsClient = new Metrics(kc);

    const scope = nock(testConfigOptions.clusters[0].server);

    return [metricsClient, scope];
};

describe('Metrics', () => {
    describe('getPodMetrics', () => {
        it('should return cluster scope empty pods list', async () => {
            const [metricsClient, scope] = systemUnderTest();
            const s = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, emptyPodMetrics);

            const response = await metricsClient.getPodMetrics();
            deepStrictEqual(response, emptyPodMetrics);
            s.done();
        });
        it('should return cluster scope empty pods list when namespace is empty string', async () => {
            const [metricsClient, scope] = systemUnderTest();
            const s = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, emptyPodMetrics);

            const response = await metricsClient.getPodMetrics('');
            deepStrictEqual(response, emptyPodMetrics);
            s.done();
        });
        it('should return namespace scope empty pods list', async () => {
            const [metricsClient, scope] = systemUnderTest();
            const s = scope
                .get(`/apis/metrics.k8s.io/v1beta1/namespaces/${TEST_NAMESPACE}/pods`)
                .reply(200, emptyPodMetrics);

            const response = await metricsClient.getPodMetrics(TEST_NAMESPACE);
            deepStrictEqual(response, emptyPodMetrics);
            s.done();
        });
        it('should return cluster scope pods metrics list', async () => {
            const [metricsClient, scope] = systemUnderTest();
            const s = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, mockedPodMetrics);

            const response = await metricsClient.getPodMetrics();
            deepStrictEqual(response, mockedPodMetrics);

            s.done();
        });
        it('should return namespace scope pods metric list', async () => {
            const [metricsClient, scope] = systemUnderTest();
            const s = scope
                .get(`/apis/metrics.k8s.io/v1beta1/namespaces/${TEST_NAMESPACE}/pods`)
                .reply(200, mockedPodMetrics);

            const response = await metricsClient.getPodMetrics(TEST_NAMESPACE);
            deepStrictEqual(response, mockedPodMetrics);
            s.done();
        });
        it('should when connection refused', async () => {
            const kc = new KubeConfig();
            kc.loadFromOptions({
                clusters: [{ name: 'cluster', server: 'https://127.0.0.1:51011' }],
                users: [{ name: 'user', password: 'password' }],
                contexts: [{ name: 'currentContext', cluster: 'cluster', user: 'user' }],
                currentContext: 'currentContext',
            });
            const metricsClient = new Metrics(kc);
            await rejects(metricsClient.getPodMetrics(), (err) => {
                ok(err instanceof ApiException);
                match(err.message, /connect ECONNREFUSED 127.0.0.1:51011/);
                return true;
            });
        });
        it('should throw when no current cluster', async () => {
            const [metricsClient, scope] = systemUnderTest({
                clusters: [{ name: 'cluster', server: 'https://127.0.0.1:51010' }],
                users: [{ name: 'user', password: 'password' }],
                contexts: [{ name: 'currentContext', cluster: 'cluster', user: 'user' }],
            });
            await rejects(metricsClient.getPodMetrics(), {
                name: 'Error',
                message: 'No currently active cluster',
            });
            scope.done();
        });
        it('should resolve to error when 500 - V1 Status', async () => {
            const response: V1Status = {
                code: 12345,
                message: 'some message',
            };
            const [metricsClient, scope] = systemUnderTest();
            const s = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(500, response);

            await rejects(metricsClient.getPodMetrics(), (e) => {
                ok(e instanceof ApiException);
                strictEqual(e.code, response.code);
                strictEqual(e.body.message, response.message);
                return true;
            });
            s.done();
        });
        it('should resolve to error when 500 - non-V1Status', async () => {
            const response = 'some other response';
            const [metricsClient, scope] = systemUnderTest();
            const s = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(500, response);

            await rejects(metricsClient.getPodMetrics(), (e) => {
                ok(e instanceof ApiException);
                strictEqual(e.code, 500);
                match(e.message, /Error occurred in metrics request/);
                return true;
            });
            s.done();
        });
    });
    describe('getNodeMetrics', () => {
        it('should return empty nodes list', async () => {
            const [metricsClient, scope] = systemUnderTest();
            const s = scope.get('/apis/metrics.k8s.io/v1beta1/nodes').reply(200, emptyNodeMetrics);

            const response = await metricsClient.getNodeMetrics();
            deepStrictEqual(response, emptyNodeMetrics);
            s.done();
        });
        it('should return nodes metrics list', async () => {
            const [metricsClient, scope] = systemUnderTest();
            const s = scope.get('/apis/metrics.k8s.io/v1beta1/nodes').reply(200, mockedNodeMetrics);

            const response = await metricsClient.getNodeMetrics();
            deepStrictEqual(response, mockedNodeMetrics);

            s.done();
        });
        it('should resolve to error when 500', async () => {
            const response: V1Status = {
                code: 12345,
                message: 'some message',
            };
            const [metricsClient, scope] = systemUnderTest();
            const s = scope.get('/apis/metrics.k8s.io/v1beta1/nodes').reply(500, response);

            await rejects(metricsClient.getNodeMetrics(), (e) => {
                ok(e instanceof ApiException);
                strictEqual(e.code, response.code);
                strictEqual(e.body.message, response.message);
                return true;
            });
            s.done();
        });
    });
});
