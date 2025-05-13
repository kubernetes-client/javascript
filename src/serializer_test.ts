import { afterEach, beforeEach, describe, it } from 'node:test';
import { deepEqual, deepStrictEqual } from 'node:assert';
import { defaultSerializer, ObjectSerializer } from './serializer.js';

describe('ObjectSerializer', () => {
    beforeEach(() => {
        ObjectSerializer.registerModel(
            {
                group: 'my-group.io',
                version: 'v1',
                kind: 'V1MyCustomResource',
            },
            defaultSerializer,
        );
        ObjectSerializer.registerModel(
            {
                group: 'my-group.io',
                version: 'v1',
                kind: 'Deployment',
            },
            defaultSerializer,
        );
    });

    afterEach(() => {
        ObjectSerializer.clearModelRegistry();
    });

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
            deepStrictEqual(res, {
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

        [
            {
                name: 'should serialize a registered custom object',
                input: {
                    type: 'V1MyCustomResource',
                    obj: {
                        apiVersion: 'my-group.io/v1',
                        kind: 'MyCustomResource',
                        metadata: {
                            name: 'k8s-js-client-test',
                            namespace: 'default',
                            creationTimestamp: new Date('2022-01-01T00:00:00.000Z'),
                        },
                        data: {
                            key: 'value',
                        },
                    },
                },
                expected: {
                    apiVersion: 'my-group.io/v1',
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
                },
            },
            {
                name: 'should serialize a registered custom object with a duplicated core resource kind',
                input: {
                    type: 'V1Deployment',
                    obj: {
                        apiVersion: 'my-group.io/v1',
                        kind: 'Deployment',
                        metadata: {
                            name: 'k8s-js-client-test',
                            namespace: 'default',
                            creationTimestamp: new Date('2022-01-01T00:00:00.000Z'),
                        },
                        data: {
                            key: 'value',
                        },
                    },
                },
                expected: {
                    apiVersion: 'my-group.io/v1',
                    kind: 'Deployment',
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
                },
            },
        ].forEach(({ name, input, expected }) => {
            it(name, () => {
                const res = ObjectSerializer.serialize(input.obj, input.type);
                deepStrictEqual(res, expected);
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
            deepStrictEqual(res, {
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
            deepStrictEqual(res, s);
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
            deepEqual(res, {
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
            deepEqual(res, {
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
            deepStrictEqual(res, s);
        });

        [
            {
                name: 'should deserialize a registered custom object',
                input: {
                    type: 'V1MyCustomResource',
                    obj: {
                        apiVersion: 'my-group.io/v1',
                        kind: 'MyCustomResource',
                        metadata: {
                            name: 'k8s-js-client-test',
                            namespace: 'default',
                            creationTimestamp: '2022-01-01T00:00:00.000Z',
                        },
                        data: {
                            key: 'value',
                        },
                    },
                },
                expected: {
                    apiVersion: 'my-group.io/v1',
                    kind: 'MyCustomResource',
                    metadata: {
                        name: 'k8s-js-client-test',
                        namespace: 'default',
                        creationTimestamp: new Date('2022-01-01T00:00:00.000Z'),
                    },
                    data: {
                        key: 'value',
                    },
                },
            },
            {
                name: 'should deserialize a registered custom object with a duplicated core resource kind',
                input: {
                    type: 'V1Deployment',
                    obj: {
                        apiVersion: 'my-group.io/v1',
                        kind: 'Deployment',
                        metadata: {
                            name: 'k8s-js-client-test',
                            namespace: 'default',
                            creationTimestamp: '2022-01-01T00:00:00.000Z',
                        },
                        data: {
                            key: 'value',
                        },
                    },
                },
                expected: {
                    apiVersion: 'my-group.io/v1',
                    kind: 'Deployment',
                    metadata: {
                        name: 'k8s-js-client-test',
                        namespace: 'default',
                        creationTimestamp: new Date('2022-01-01T00:00:00.000Z'),
                    },
                    data: {
                        key: 'value',
                    },
                },
            },
        ].forEach(({ name, input, expected }) => {
            it(name, () => {
                const res = ObjectSerializer.deserialize(input.obj, input.type);
                deepEqual(res, expected);
            });
        });
    });
});
