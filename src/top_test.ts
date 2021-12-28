import { expect } from 'chai';
import nock = require('nock');
import { KubeConfig } from './config';
import { V1Pod } from './gen/api';
import { Metrics, PodMetricsList } from './metrics';
import { topPods } from './top';
import { CoreV1Api } from './gen/api';

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
            containers: [{ name: 'nginx', usage: { cpu: '50000000n', memory: '3912Ki' } }],
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
                { name: 'nginx', usage: { cpu: '0', memory: '4012Ki' } },
                { name: 'sidecar', usage: { cpu: '1400000000n', memory: '3012Ki' } },
            ],
        },
    ],
};

const bestEffortPodList: V1Pod[] = [
    {
        metadata: {
            name: 'dice-roller-7c76898b4d-shm9p',
        },
        spec: {
            containers: [
                {
                    name: 'nginx',
                },
            ],
        },
    },
];

const podList: V1Pod[] = [
    {
        metadata: {
            name: 'dice-roller-7c76898b4d-shm9p',
        },
        spec: {
            containers: [
                {
                    name: 'nginx',
                    resources: {
                        requests: {
                            memory: '100Mi',
                            cpu: '100m',
                        },
                        limits: {
                            memory: '100Mi',
                            cpu: '100m',
                        },
                    },
                },
            ],
        },
    },
    {
        metadata: {
            name: 'other-pod-7c76898b4e-12kj',
        },
        spec: {
            containers: [
                {
                    name: 'nginx',
                    resources: {
                        requests: {
                            memory: '100Mi',
                            cpu: '100m',
                        },
                        limits: {
                            memory: '100Mi',
                            cpu: '100m',
                        },
                    },
                },
                {
                    name: 'sidecar',
                    resources: {
                        requests: {
                            memory: '50Mi',
                            cpu: '2',
                        },
                        limits: {
                            memory: '100Mi',
                            cpu: '2',
                        },
                    },
                },
            ],
        },
    },
];

const TEST_NAMESPACE = 'test-namespace';

const testConfigOptions: any = {
    clusters: [{ name: 'cluster', server: 'https://127.0.0.1:51010' }],
    users: [{ name: 'user', password: 'password' }],
    contexts: [{ name: 'currentContext', cluster: 'cluster', user: 'user' }],
    currentContext: 'currentContext',
};

const systemUnderTest = (
    namespace?: string,
    options: any = testConfigOptions,
): [() => ReturnType<typeof topPods>, nock.Scope] => {
    const kc = new KubeConfig();
    kc.loadFromOptions(options);
    const metricsClient = new Metrics(kc);
    const core = kc.makeApiClient(CoreV1Api);
    const topPodsFunc = () => topPods(core, metricsClient, namespace);

    const scope = nock(testConfigOptions.clusters[0].server);

    return [topPodsFunc, scope];
};

describe('Top', () => {
    describe('topPods', () => {
        it('should return empty when no pods', async () => {
            const [topPodsFunc, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, emptyPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: [],
            });
            const result = await topPodsFunc();
            expect(result).to.deep.equal([]);
            podMetrics.done();
            pods.done();
        });
        it('should return use cluster scope when namespace empty string', async () => {
            const [topPodsFunc, scope] = systemUnderTest('');
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, emptyPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: [],
            });
            const result = await topPodsFunc();
            expect(result).to.deep.equal([]);
            podMetrics.done();
            pods.done();
        });
        it('should return cluster wide pod metrics', async () => {
            const [topPodsFunc, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, mockedPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: podList,
            });
            const result = await topPodsFunc();
            expect(result.length).to.equal(2);
            expect(result[0].CPU).to.deep.equal({
                CurrentUsage: 0.05,
                LimitTotal: 0.1,
                RequestTotal: 0.1,
            });
            expect(result[0].Memory).to.deep.equal({
                CurrentUsage: BigInt('4005888'),
                RequestTotal: BigInt('104857600'),
                LimitTotal: BigInt('104857600'),
            });
            expect(result[0].Containers).to.deep.equal([
                {
                    CPUUsage: {
                        CurrentUsage: 0.05,
                        LimitTotal: 0.1,
                        RequestTotal: 0.1,
                    },
                    Container: 'nginx',
                    MemoryUsage: {
                        CurrentUsage: BigInt('4005888'),
                        LimitTotal: BigInt('104857600'),
                        RequestTotal: BigInt('104857600'),
                    },
                },
            ]);
            expect(result[1].CPU).to.deep.equal({
                CurrentUsage: 1.4,
                LimitTotal: 2.1,
                RequestTotal: 2.1,
            });
            expect(result[1].Memory).to.deep.equal({
                CurrentUsage: BigInt('7192576'),
                LimitTotal: BigInt('209715200'),
                RequestTotal: BigInt('157286400'),
            });
            expect(result[1].Containers).to.deep.equal([
                {
                    CPUUsage: {
                        CurrentUsage: 0,
                        LimitTotal: 0.1,
                        RequestTotal: 0.1,
                    },
                    Container: 'nginx',
                    MemoryUsage: {
                        CurrentUsage: BigInt('4108288'),
                        LimitTotal: BigInt('104857600'),
                        RequestTotal: BigInt('104857600'),
                    },
                },
                {
                    CPUUsage: {
                        CurrentUsage: 1.4,
                        LimitTotal: 2,
                        RequestTotal: 2,
                    },
                    Container: 'sidecar',
                    MemoryUsage: {
                        CurrentUsage: BigInt('3084288'),
                        LimitTotal: BigInt('104857600'),
                        RequestTotal: BigInt('52428800'),
                    },
                },
            ]);
            podMetrics.done();
            pods.done();
        });
        it('should return best effort pod metrics', async () => {
            const [topPodsFunc, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, mockedPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: bestEffortPodList,
            });
            const result = await topPodsFunc();
            expect(result.length).to.equal(1);
            expect(result[0].CPU).to.deep.equal({
                CurrentUsage: 0.05,
                LimitTotal: 0,
                RequestTotal: 0,
            });
            expect(result[0].Memory).to.deep.equal({
                CurrentUsage: BigInt('4005888'),
                RequestTotal: 0,
                LimitTotal: 0,
            });
            expect(result[0].Containers).to.deep.equal([
                {
                    CPUUsage: {
                        CurrentUsage: 0.05,
                        LimitTotal: 0,
                        RequestTotal: 0,
                    },
                    Container: 'nginx',
                    MemoryUsage: {
                        CurrentUsage: BigInt('4005888'),
                        LimitTotal: 0,
                        RequestTotal: 0,
                    },
                },
            ]);
            podMetrics.done();
            pods.done();
        });
        it('should return 0 when pod metrics missing', async () => {
            const [topPodsFunc, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, emptyPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: podList,
            });
            const result = await topPodsFunc();
            expect(result.length).to.equal(2);
            expect(result[0].CPU).to.deep.equal({
                CurrentUsage: 0,
                LimitTotal: 0.1,
                RequestTotal: 0.1,
            });
            expect(result[0].Memory).to.deep.equal({
                CurrentUsage: 0,
                RequestTotal: BigInt('104857600'),
                LimitTotal: BigInt('104857600'),
            });
            expect(result[0].Containers).to.deep.equal([]);
            expect(result[1].CPU).to.deep.equal({
                CurrentUsage: 0,
                LimitTotal: 2.1,
                RequestTotal: 2.1,
            });
            expect(result[1].Memory).to.deep.equal({
                CurrentUsage: 0,
                LimitTotal: BigInt('209715200'),
                RequestTotal: BigInt('157286400'),
            });
            expect(result[1].Containers).to.deep.equal([]);
            podMetrics.done();
            pods.done();
        });
        it('should return empty array when pods missing', async () => {
            const [topPodsFunc, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, mockedPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: [],
            });
            const result = await topPodsFunc();
            expect(result.length).to.equal(0);
            podMetrics.done();
            pods.done();
        });
        it('should return namespace pod metrics', async () => {
            const [topPodsFunc, scope] = systemUnderTest(TEST_NAMESPACE);
            const podMetrics = scope
                .get(`/apis/metrics.k8s.io/v1beta1/namespaces/${TEST_NAMESPACE}/pods`)
                .reply(200, mockedPodMetrics);
            const pods = scope.get(`/api/v1/namespaces/${TEST_NAMESPACE}/pods`).reply(200, {
                items: podList,
            });
            const result = await topPodsFunc();
            expect(result.length).to.equal(2);
            expect(result[0].CPU).to.deep.equal({
                CurrentUsage: 0.05,
                LimitTotal: 0.1,
                RequestTotal: 0.1,
            });
            expect(result[0].Memory).to.deep.equal({
                CurrentUsage: BigInt('4005888'),
                RequestTotal: BigInt('104857600'),
                LimitTotal: BigInt('104857600'),
            });
            expect(result[0].Containers).to.deep.equal([
                {
                    CPUUsage: {
                        CurrentUsage: 0.05,
                        LimitTotal: 0.1,
                        RequestTotal: 0.1,
                    },
                    Container: 'nginx',
                    MemoryUsage: {
                        CurrentUsage: BigInt('4005888'),
                        LimitTotal: BigInt('104857600'),
                        RequestTotal: BigInt('104857600'),
                    },
                },
            ]);
            expect(result[1].CPU).to.deep.equal({
                CurrentUsage: 1.4,
                LimitTotal: 2.1,
                RequestTotal: 2.1,
            });
            expect(result[1].Memory).to.deep.equal({
                CurrentUsage: BigInt('7192576'),
                LimitTotal: BigInt('209715200'),
                RequestTotal: BigInt('157286400'),
            });
            expect(result[1].Containers).to.deep.equal([
                {
                    CPUUsage: {
                        CurrentUsage: 0,
                        LimitTotal: 0.1,
                        RequestTotal: 0.1,
                    },
                    Container: 'nginx',
                    MemoryUsage: {
                        CurrentUsage: BigInt('4108288'),
                        LimitTotal: BigInt('104857600'),
                        RequestTotal: BigInt('104857600'),
                    },
                },
                {
                    CPUUsage: {
                        CurrentUsage: 1.4,
                        LimitTotal: 2,
                        RequestTotal: 2,
                    },
                    Container: 'sidecar',
                    MemoryUsage: {
                        CurrentUsage: BigInt('3084288'),
                        LimitTotal: BigInt('104857600'),
                        RequestTotal: BigInt('52428800'),
                    },
                },
            ]);
            podMetrics.done();
            pods.done();
        });
    });
});
