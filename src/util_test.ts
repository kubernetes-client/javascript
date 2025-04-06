import { describe, it } from 'node:test';
import { deepStrictEqual, strictEqual, throws } from 'node:assert';
import { Response } from 'node-fetch';
import { CoreV1Api, V1Container, V1Pod } from './api.js';
import {
    normalizeResponseHeaders,
    findSuffix,
    podsForNode,
    quantityToScalar,
    totalCPU,
    totalMemory,
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

    it('should find the suffix correctly', () => {
        strictEqual(findSuffix('1234567'), '');
        strictEqual(findSuffix('1234asdf'), 'asdf');
        strictEqual(findSuffix('1.0'), '');
    });

    it('shoult extract the headers for ApiException correctly', () => {
        const response = new Response();
        response.headers.set('foo', 'bar');
        response.headers.set('baz', 'k8s');

        deepStrictEqual(normalizeResponseHeaders(response), { foo: 'bar', baz: 'k8s' });
    });
});
