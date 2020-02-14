import { expect } from 'chai';
import { CoreV1Api, V1Container, V1Pod } from './api';
import { podsForNode, quantityToScalar, totalCPU, totalMemory } from './util';

describe('Utils', () => {
    it('should get zero pods for a node', async () => {
        const podList = {
            body: {
                items: [],
            },
        };
        const mockApi = {
            listPodForAllNamespaces: (): Promise<any> => {
                return new Promise<any>((resolve) => {
                    resolve(podList);
                });
            },
        };

        const pods = await podsForNode(mockApi as CoreV1Api, 'foo');
        expect(pods.length).to.equal(0);
    });

    it('should only gets for pods named node', async () => {
        const podList = {
            body: {
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
            },
        };
        const mockApi = {
            listPodForAllNamespaces: (): Promise<any> => {
                return new Promise<any>((resolve) => {
                    resolve(podList);
                });
            },
        };

        const pods = await podsForNode(mockApi as CoreV1Api, 'foo');
        expect(pods.length).to.equal(1);
        expect(pods[0].spec!.nodeName).to.equal('foo');
    });

    it('should parse quantities', () => {
        expect(quantityToScalar('')).to.equal(0);

        expect(quantityToScalar('100m')).to.equal(0.1);
        expect(quantityToScalar('1976m')).to.equal(1.976);

        expect(quantityToScalar('10Ki')).to.equal(10240);

        expect(quantityToScalar('1024')).to.equal(1024);

        expect(() => quantityToScalar('foobar')).to.throw('Unknown quantity foobar');
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
        expect(cpuResult.request).to.equal(1.1);
        expect(cpuResult.limit).to.equal(0.2);

        const memResult = totalMemory(pod);
        expect(memResult.request).to.equal(10240);
        expect(memResult.limit).to.equal(20480);
    });
});
