import { expect } from 'chai';
import { ObjectSerializer } from './serializer';

describe('ObjectSerializer', () => {
    describe('serialize', () => {
        it('should serialize a known object', () => {
            const s = {
                apiVersion: 'v1',
                kind: 'Secret',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                    creationTimestamp: new Date('2022-01-01T00:00:00.000Z'),
                },
                data: {
                    key: 'value',
                },
            };
            const res = ObjectSerializer.serialize(s, 'V1Secret');
            expect(res).to.deep.equal({
                apiVersion: 'v1',
                kind: 'Secret',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                    creationTimestamp: '2022-01-01T00:00:00.000Z',
                    uid: undefined,
                    annotations: undefined,
                    labels: undefined,
                    finalizers: undefined,
                    generateName: undefined,
                    selfLink: undefined,
                    resourceVersion: undefined,
                    generation: undefined,
                    ownerReferences: undefined,
                    deletionTimestamp: undefined,
                    deletionGracePeriodSeconds: undefined,
                    managedFields: undefined,
                },
                data: {
                    key: 'value',
                },
                type: undefined,
                immutable: undefined,
                stringData: undefined,
            });
        });

        it('should serialize a unknown kubernetes object', () => {
            const s = {
                apiVersion: 'v1alpha1',
                kind: 'MyCustomResource',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                    creationTimestamp: new Date('2022-01-01T00:00:00.000Z'),
                },
                data: {
                    key: 'value',
                },
            };
            const res = ObjectSerializer.serialize(s, 'v1alpha1MyCustomResource');
            expect(res).to.deep.equal({
                apiVersion: 'v1alpha1',
                kind: 'MyCustomResource',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                    creationTimestamp: '2022-01-01T00:00:00.000Z',
                    uid: undefined,
                    annotations: undefined,
                    labels: undefined,
                    finalizers: undefined,
                    generateName: undefined,
                    selfLink: undefined,
                    resourceVersion: undefined,
                    generation: undefined,
                    ownerReferences: undefined,
                    deletionTimestamp: undefined,
                    deletionGracePeriodSeconds: undefined,
                    managedFields: undefined,
                },
                data: {
                    key: 'value',
                },
            });
        });

        it('should serialize a unknown primitive', () => {
            const s = {
                key: 'value',
            };
            const res = ObjectSerializer.serialize(s, 'unknown');
            expect(res).to.deep.equal(s);
        });
    });

    describe('deserialize', () => {
        it('should deserialize a known object', () => {
            const s = {
                apiVersion: 'v1',
                kind: 'Secret',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                    creationTimestamp: '2022-01-01T00:00:00.000Z',
                },
                data: {
                    key: 'value',
                },
            };
            const res = ObjectSerializer.deserialize(s, 'V1Secret');
            expect(res).to.deep.equal({
                apiVersion: 'v1',
                kind: 'Secret',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                    creationTimestamp: new Date('2022-01-01T00:00:00.000Z'),
                },
                data: {
                    key: 'value',
                },
            });
        });

        it('should deserialize a unknown object', () => {
            const s = {
                apiVersion: 'v1alpha1',
                kind: 'MyCustomResource',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                    creationTimestamp: '2022-01-01T00:00:00.000Z',
                },
                data: {
                    key: 'value',
                },
            };
            const res = ObjectSerializer.deserialize(s, 'v1alpha1MyCustomResource');
            expect(res).to.deep.equal({
                apiVersion: 'v1alpha1',
                kind: 'MyCustomResource',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                    creationTimestamp: new Date('2022-01-01T00:00:00.000Z'),
                },
                data: {
                    key: 'value',
                },
            });
        });

        it('should deserialize a unknown primitive', () => {
            const s = {
                key: 'value',
            };
            const res = ObjectSerializer.serialize(s, 'unknown');
            expect(res).to.deep.equal(s);
        });
    });
});
