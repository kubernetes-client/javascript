import { describe, it } from 'node:test';
import { deepEqual, deepStrictEqual, strictEqual } from 'assert';
import nock from 'nock';
import { KubeConfig } from './config.js';
import { Metrics, PodMetricsList } from './metrics.js';
import { CurrentResourceUsage, ResourceUsage, topNodes, topPods } from './top.js';
import { CoreV1Api, V1Node, V1Pod } from './api.js';

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
            nodeName: 'node1',
        },
        status: {
            phase: 'Running',
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
            nodeName: 'node1',
        },
        status: {
            phase: 'Running',
        },
    },
];

const nodeList: V1Node[] = [
    {
        metadata: {
            name: 'node1',
        },
        status: {
            capacity: {
                cpu: '4',
                memory: '16Gi',
            },
            allocatable: {
                cpu: '4',
                memory: '16Gi',
            },
        },
    },
    {
        metadata: {
            name: 'node2',
        },
        status: {
            capacity: {
                cpu: '8',
                memory: '32Gi',
            },
            allocatable: {
                cpu: '8',
                memory: '32Gi',
            },
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
): [() => ReturnType<typeof topPods>, () => ReturnType<typeof topNodes>, nock.Scope] => {
    const kc = new KubeConfig();
    kc.loadFromOptions(options);
    const metricsClient = new Metrics(kc);
    const core = kc.makeApiClient(CoreV1Api);
    const topPodsFunc = () => topPods(core, metricsClient, namespace);
    const topNodesFunc = () => topNodes(core);

    const scope = nock(testConfigOptions.clusters[0].server);

    return [topPodsFunc, topNodesFunc, scope];
};

describe('Top', () => {
    describe('topPods', () => {
        it('should return empty when no pods', async () => {
            const [topPodsFunc, _, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, emptyPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: [],
            });
            const result = await topPodsFunc();
            deepStrictEqual(result, []);
            podMetrics.done();
            pods.done();
        });
        it('should return use cluster scope when namespace empty string', async () => {
            const [topPodsFunc, _, scope] = systemUnderTest('');
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, emptyPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: [],
            });
            const result = await topPodsFunc();
            deepStrictEqual(result, []);
            podMetrics.done();
            pods.done();
        });
        it('should return cluster wide pod metrics', async () => {
            const [topPodsFunc, _, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, mockedPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: podList,
            });
            const result = await topPodsFunc();
            strictEqual(result.length, 2);
            deepStrictEqual(result[0].CPU, new CurrentResourceUsage(0.05, 0.1, 0.1));
            deepStrictEqual(
                result[0].Memory,
                new CurrentResourceUsage(BigInt('4005888'), BigInt('104857600'), BigInt('104857600')),
            );
            deepEqual(result[0].Containers, [
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
            deepStrictEqual(result[1].CPU, new CurrentResourceUsage(1.4, 2.1, 2.1));
            deepStrictEqual(
                result[1].Memory,
                new CurrentResourceUsage(BigInt('7192576'), BigInt('157286400'), BigInt('209715200')),
            );
            deepEqual(result[1].Containers, [
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
            const [topPodsFunc, _, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, mockedPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: bestEffortPodList,
            });
            const result = await topPodsFunc();
            strictEqual(result.length, 1);
            deepStrictEqual(result[0].CPU, new CurrentResourceUsage(0.05, 0, 0));
            deepStrictEqual(result[0].Memory, new CurrentResourceUsage(BigInt('4005888'), 0, 0));
            deepEqual(result[0].Containers, [
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
            const [topPodsFunc, _, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, emptyPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: podList,
            });
            const result = await topPodsFunc();
            strictEqual(result.length, 2);
            deepStrictEqual(result[0].CPU, new CurrentResourceUsage(0, 0.1, 0.1));
            deepStrictEqual(
                result[0].Memory,
                new CurrentResourceUsage(0, BigInt('104857600'), BigInt('104857600')),
            );
            deepStrictEqual(result[0].Containers, []);
            deepStrictEqual(result[1].CPU, new CurrentResourceUsage(0, 2.1, 2.1));
            deepStrictEqual(
                result[1].Memory,
                new CurrentResourceUsage(0, BigInt('157286400'), BigInt('209715200')),
            );
            deepStrictEqual(result[1].Containers, []);
            podMetrics.done();
            pods.done();
        });
        it('should return empty array when pods missing', async () => {
            const [topPodsFunc, _, scope] = systemUnderTest();
            const podMetrics = scope.get('/apis/metrics.k8s.io/v1beta1/pods').reply(200, mockedPodMetrics);
            const pods = scope.get('/api/v1/pods').reply(200, {
                items: [],
            });
            const result = await topPodsFunc();
            strictEqual(result.length, 0);
            podMetrics.done();
            pods.done();
        });
        it('should return namespace pod metrics', async () => {
            const [topPodsFunc, _, scope] = systemUnderTest(TEST_NAMESPACE);
            const podMetrics = scope
                .get(`/apis/metrics.k8s.io/v1beta1/namespaces/${TEST_NAMESPACE}/pods`)
                .reply(200, mockedPodMetrics);
            const pods = scope.get(`/api/v1/namespaces/${TEST_NAMESPACE}/pods`).reply(200, {
                items: podList,
            });
            const result = await topPodsFunc();
            strictEqual(result.length, 2);
            deepStrictEqual(result[0].CPU, new CurrentResourceUsage(0.05, 0.1, 0.1));
            deepStrictEqual(
                result[0].Memory,
                new CurrentResourceUsage(BigInt('4005888'), BigInt('104857600'), BigInt('104857600')),
            );
            deepEqual(result[0].Containers, [
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
            deepStrictEqual(result[1].CPU, new CurrentResourceUsage(1.4, 2.1, 2.1));
            deepStrictEqual(
                result[1].Memory,
                new CurrentResourceUsage(BigInt('7192576'), BigInt('157286400'), BigInt('209715200')),
            );
            deepEqual(result[1].Containers, [
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
    describe('topNodes', () => {
        it('should return empty when no nodes', async () => {
            const [_, topNodesFunc, scope] = systemUnderTest();
            const nodes = scope.get('/api/v1/nodes').reply(200, {
                items: [],
            });
            const result = await topNodesFunc();
            deepStrictEqual(result, []);
            nodes.done();
        });

        it('should return cluster wide node metrics', async () => {
            const [_, topNodesFunc, scope] = systemUnderTest();
            const pods = scope.get('/api/v1/pods').times(2).reply(200, {
                items: podList,
            });
            const nodes = scope.get('/api/v1/nodes').reply(200, {
                items: nodeList,
            });
            const result = await topNodesFunc();
            strictEqual(result.length, 2);
            deepStrictEqual(result[0].CPU, new ResourceUsage(4, 2.2, 2.2));
            deepStrictEqual(
                result[0].Memory,
                new ResourceUsage(BigInt('17179869184'), BigInt('262144000'), BigInt('314572800')),
            );
            deepStrictEqual(result[1].CPU, new ResourceUsage(8, 0, 0));
            deepStrictEqual(result[1].Memory, new ResourceUsage(BigInt('34359738368'), 0, 0));
            pods.done();
            nodes.done();
        });
    });
});
