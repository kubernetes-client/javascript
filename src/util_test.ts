import { describe, it } from 'node:test';
import { deepStrictEqual, strictEqual, throws } from 'node:assert';
import { Response } from 'undici';
import { CoreV1Api, V1Container, V1Pod } from './api.js';
import {
    normalizeResponseHeaders,
    findSuffix,
    podsForNode,
    quantityToScalar,
    totalCPU,
    totalMemory,
    getSerializationType,
} from './util.js';

describe('Utils', () => {
    it('should get zero pods for a node', async () => {
        const podList = {
            items: [],
        };
        const mockApi = {
            listPodForAllNamespaces: (): Promise<any> => {
                return new Promise<any>((resolve) => {
                    resolve(podList);
                });
            },
        };

        const pods = await podsForNode(mockApi as CoreV1Api, 'foo');
        strictEqual(pods.length, 0);
    });

    it('should only gets for pods named node', async () => {
        const podList = {
            items: [
                {
                    spec: {
                        nodeName: 'foo',
                    },
                },
                {
                    spec: {
                        nodeName: 'bar',
                    },
                },
            ],
        };
        const mockApi = {
            listPodForAllNamespaces: (): Promise<any> => {
                return new Promise<any>((resolve) => {
                    resolve(podList);
                });
            },
        };

        const pods = await podsForNode(mockApi as CoreV1Api, 'foo');
        strictEqual(pods.length, 1);
        strictEqual(pods[0].spec!.nodeName, 'foo');
    });

    it('should parse quantities', () => {
        strictEqual(quantityToScalar(''), 0);
        strictEqual(quantityToScalar('2n'), 2 / 1_000_000_000);
        strictEqual(quantityToScalar('3u'), 3 / 1_000_000);
        strictEqual(quantityToScalar('100m'), 0.1);
        strictEqual(quantityToScalar('3k'), BigInt(3000));
        strictEqual(quantityToScalar('3M'), BigInt(3 * 1000 * 1000));
        strictEqual(quantityToScalar('3G'), BigInt(3 * 1000 * 1000 * 1000));
        strictEqual(quantityToScalar('5T'), BigInt(5 * 1000 * 1000 * 1000) * BigInt(1000));
        strictEqual(quantityToScalar('3P'), BigInt(3 * 1000 * 1000 * 1000) * BigInt(1000 * 1000));
        strictEqual(quantityToScalar('14E'), BigInt(14 * 1000 * 1000 * 1000) * BigInt(1000 * 1000 * 1000));

        strictEqual(quantityToScalar('0.2'), 0.2);
        strictEqual(quantityToScalar('1976m'), 1.976);

        strictEqual(quantityToScalar('1024'), 1024);
        strictEqual(quantityToScalar('10e3'), 10000);

        strictEqual(quantityToScalar('10Ki'), BigInt(10240));
        strictEqual(quantityToScalar('20Mi'), BigInt(1024 * 1024 * 20));
        strictEqual(quantityToScalar('30Gi'), BigInt(1024 * 1024 * 1024 * 30));
        strictEqual(quantityToScalar('40Ti'), BigInt(1024 * 1024 * 1024 * 1024 * 40));
        strictEqual(quantityToScalar('50Pi'), BigInt(1024 * 1024 * 1024 * 1024 * 1024 * 50));
        strictEqual(quantityToScalar('60Ei'), BigInt(1024 * 1024 * 1024) * BigInt(1024 * 1024 * 1024 * 60));

        throws(() => quantityToScalar('foobar'), {
            message: 'Unknown quantity foobar',
        });
        throws(() => quantityToScalar('100foobar'), {
            message: 'Unknown suffix: foobar',
        });
    });

    it('should parse fractional quantities with integer suffixes', () => {
        strictEqual(quantityToScalar('1.5Gi'), BigInt(1610612736));
        strictEqual(quantityToScalar('0.5Mi'), BigInt(524288));
        strictEqual(quantityToScalar('1.5Ki'), BigInt(1536));
        strictEqual(quantityToScalar('0.1k'), BigInt(100));
        strictEqual(quantityToScalar('2.5G'), BigInt(2500000000));

        strictEqual(quantityToScalar('.5Gi'), BigInt(536870912));
        strictEqual(quantityToScalar('2.Gi'), BigInt(2147483648));
        strictEqual(quantityToScalar('0.125Ki'), BigInt(128));
        strictEqual(quantityToScalar('0.0Gi'), BigInt(0));
        strictEqual(quantityToScalar('+1.5Gi'), BigInt(1610612736));
        strictEqual(quantityToScalar('-1.5Gi'), BigInt(-1610612736));
        strictEqual(quantityToScalar('-3k'), BigInt(-3000));
        strictEqual(quantityToScalar('-10Ki'), BigInt(-10240));
        strictEqual(quantityToScalar('-0.0k'), BigInt(0));
        strictEqual(quantityToScalar('1e20k'), BigInt('1' + '0'.repeat(23)));

        // findSuffix keeps a trailing SI suffix and leaves the exponent on the mantissa.
        // A bare exponent still has no suffix and stays a number.
        strictEqual(quantityToScalar('1.5e6'), 1500000);
        strictEqual(quantityToScalar('1e3k'), BigInt(1000000));
        strictEqual(quantityToScalar('1.5e3Ki'), BigInt(1536000));
        strictEqual(quantityToScalar('1.5e-1k'), BigInt(150));
        strictEqual(quantityToScalar('1.e2k'), BigInt(100000));

        strictEqual(quantityToScalar('1.5Ti'), BigInt(1649267441664));
        strictEqual(quantityToScalar('0.5Pi'), BigInt(562949953421312));
        strictEqual(quantityToScalar('1.5Ei'), BigInt('1729382256910270464'));
        strictEqual(quantityToScalar('2.5T'), BigInt('2500000000000'));
        strictEqual(quantityToScalar('0.5P'), BigInt('500000000000000'));
        strictEqual(quantityToScalar('1.25E'), BigInt('1250000000000000000'));

        // Past the range Number can represent. The float reading of the mantissa
        // loses digits, so rounding that product is not the exact decimal value.
        const floatThousands = BigInt(Math.round(Number('9007199254740993.1') * 1000));
        strictEqual(floatThousands === BigInt('9007199254740993100'), false);
        strictEqual(quantityToScalar('9007199254740993.1k'), BigInt('9007199254740993100'));
        strictEqual(Number('1.0000000000000001'), 1);
        strictEqual(quantityToScalar('1.0000000000000001E'), BigInt('1000000000000000100'));
        strictEqual(quantityToScalar('1.0000000000000001P'), BigInt('1000000000000001'));
        strictEqual(quantityToScalar('1.000000000000000000001Ei'), BigInt('1152921504606846977'));

        // Quantity.Value rounds away from zero. 1.3Ki is 1331.2, 0.0001k is 0.1,
        // 0.1Ti is 109951162777.6. Truncation toward zero would be 1 smaller.
        strictEqual(quantityToScalar('1.3Ki'), BigInt(1332));
        strictEqual(quantityToScalar('-1.3Ki'), BigInt(-1332));
        strictEqual(quantityToScalar('0.0001k'), BigInt(1));
        strictEqual(quantityToScalar('-0.0001k'), BigInt(-1));
        strictEqual(quantityToScalar('0.1Ti'), BigInt('109951162778'));

        throws(() => quantityToScalar('abcGi'), {
            name: 'Error',
            message: 'Unknown quantity abcGi',
        });
        throws(() => quantityToScalar('1.2.3Gi'), {
            name: 'Error',
            message: 'Unknown quantity 1.2.3Gi',
        });
        throws(() => quantityToScalar('.Gi'), {
            name: 'Error',
            message: 'Unknown quantity .Gi',
        });
        throws(() => quantityToScalar('--1Gi'), {
            name: 'Error',
            message: 'Unknown quantity --1Gi',
        });
        throws(() => quantityToScalar('1.2.3m'), {
            name: 'Error',
            message: 'Unknown quantity 1.2.3m',
        });
        throws(() => quantityToScalar(' 1.5Gi'), {
            name: 'Error',
            message: 'Unknown quantity  1.5Gi',
        });
        throws(() => quantityToScalar('1.5 Gi'), {
            name: 'Error',
            message: 'Unknown quantity 1.5 Gi',
        });
        throws(() => quantityToScalar('1e10001k'), {
            name: 'Error',
            message: 'Unknown quantity 1e10001k',
        });
        throws(() => quantityToScalar('1e100001k'), {
            name: 'Error',
            message: 'Unknown quantity 1e100001k',
        });
        const tinyHuge = `1.${'0'.repeat(10001)}1k`;
        throws(() => quantityToScalar(tinyHuge), {
            name: 'Error',
            message: 'Unknown quantity ' + tinyHuge,
        });
    });

    it('should get resources for pod', () => {
        const pod = {
            spec: {
                containers: [
                    {
                        name: 'foo',
                        resources: {
                            requests: {
                                cpu: '100m',
                                memory: '10Ki',
                            },
                            limits: {
                                cpu: '200m',
                            },
                        },
                    } as V1Container,
                    {
                        name: 'bar',
                        resources: {
                            requests: {
                                cpu: '1.0',
                            },
                            limits: {
                                memory: '20Ki',
                            },
                        },
                    } as V1Container,
                ] as V1Container[],
            },
        } as V1Pod;

        const cpuResult = totalCPU(pod);
        strictEqual(cpuResult.request, 1.1);
        strictEqual(cpuResult.limit, 0.2);

        const memResult = totalMemory(pod);
        strictEqual(memResult.request, BigInt(10240));
        strictEqual(memResult.limit, BigInt(20480));
    });

    it('should total fractional memory requests and limits', () => {
        const pod = {
            spec: {
                containers: [
                    {
                        name: 'app',
                        resources: {
                            requests: {
                                cpu: '100m',
                                memory: '1.5Gi',
                            },
                            limits: {
                                cpu: '200m',
                                memory: '0.5Gi',
                            },
                        },
                    } as V1Container,
                    {
                        name: 'sidecar',
                        resources: {
                            requests: {
                                cpu: '1.0',
                                memory: '0.5Gi',
                            },
                            limits: {
                                memory: '1.5Gi',
                            },
                        },
                    } as V1Container,
                ] as V1Container[],
            },
        } as V1Pod;

        const cpuResult = totalCPU(pod);
        strictEqual(cpuResult.request, 1.1);
        strictEqual(cpuResult.limit, 0.2);

        const memResult = totalMemory(pod);
        strictEqual(memResult.request, BigInt(1610612736) + BigInt(536870912));
        strictEqual(memResult.limit, BigInt(536870912) + BigInt(1610612736));
    });

    it('should find the suffix correctly', () => {
        strictEqual(findSuffix('1234567'), '');
        strictEqual(findSuffix('1234asdf'), 'asdf');
        strictEqual(findSuffix('1.0'), '');
        // A scientific exponent ends in a digit, so it is not a suffix.
        // The SI suffix after one is. `e` alone is not a known suffix either.
        strictEqual(findSuffix('1e3'), '');
        strictEqual(findSuffix('1.5e6'), '');
        strictEqual(findSuffix('1.5Gi'), 'Gi');
        strictEqual(findSuffix('1.5e3Ki'), 'Ki');
        strictEqual(findSuffix('10E'), 'E');
    });

    it('shoult extract the headers for ApiException correctly', () => {
        const response = new Response();
        response.headers.set('foo', 'bar');
        response.headers.set('baz', 'k8s');

        deepStrictEqual(normalizeResponseHeaders(response), { foo: 'bar', baz: 'k8s' });
    });

    it('should get the serialization type correctly', () => {
        strictEqual(getSerializationType('v1', 'Pod'), 'V1Pod');
        strictEqual(getSerializationType('apps/v1', 'Deployment'), 'V1Deployment');
        // Built-in Kubernetes resources should return a type
        strictEqual(getSerializationType('v1', 'Pod'), 'V1Pod');
        strictEqual(getSerializationType('apps/v1', 'Deployment'), 'V1Deployment');
        strictEqual(getSerializationType('v1', 'Service'), 'V1Service');
        strictEqual(getSerializationType('batch/v1', 'Job'), 'V1Job');

        // Non-built-in resources should return 'KubernetesObject'
        strictEqual(getSerializationType('serving.knative.dev/v1', 'Service'), 'KubernetesObject');
        strictEqual(getSerializationType('example.com/v1', 'MyCustomResource'), 'KubernetesObject');
        strictEqual(getSerializationType('custom.io/v1alpha1', 'CustomThing'), 'KubernetesObject');

        // Undefined inputs should return 'KubernetesObject'
        strictEqual(getSerializationType(undefined, undefined), 'KubernetesObject');
    });
});
