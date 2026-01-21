import { describe, it } from 'node:test';
import { strictEqual, rejects } from 'node:assert';
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';
import { anyFunction, anything, capture, instance, mock, verify, when } from 'ts-mockito';

import { KubeConfig } from './config.js';
import { PortForward } from './portforward.js';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler.js';
import { CoreV1Api, AppsV1Api, V1Service, V1Deployment, V1Pod, V1PodStatus } from './gen/index.js';

describe('PortForward', () => {
    it('should correctly port-forward to a url', async () => {
        const kc = new KubeConfig();
        const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
        const portForward = new PortForward(kc, true, instance(fakeWebSocket));
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        const namespace = 'somenamespace';
        const pod = 'somepod';
        const port = 8080;

        await portForward.portForward(namespace, pod, [port], osStream, errStream, isStream);

        const path = `/api/v1/namespaces/${namespace}/pods/${pod}/portforward?ports=${port}`;
        verify(fakeWebSocket.connect(path, null, anyFunction())).called();
    });

    it('should not disconnect if disconnectOnErr is false', async () => {
        const kc = new KubeConfig();
        const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
        const portForward = new PortForward(kc, false, instance(fakeWebSocket));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForward('ns', 'p', [8000], osStream, null, isStream);

        const [, , outputFn] = capture(fakeWebSocket.connect).last();

        strictEqual(typeof outputFn, 'function');
        // this is redundant but needed for the compiler, sigh...
        if (!outputFn) {
            return;
        }
        const buffer = Buffer.alloc(1024, 10);

        // unknown stream shouldn't close the socket.
        outputFn(2, buffer);

        outputFn(0, buffer);
        // first time, drop two bytes for the port number.
        strictEqual(osStream.size(), 1022);
    });

    it('should correctly port-forward streams if err is null', async () => {
        const kc = new KubeConfig();
        const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
        const portForward = new PortForward(kc, true, instance(fakeWebSocket));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForward('ns', 'p', [8000], osStream, null, isStream);

        const [, , outputFn] = capture(fakeWebSocket.connect).last();

        strictEqual(typeof outputFn, 'function');
        // this is redundant but needed for the compiler, sigh...
        if (!outputFn) {
            return;
        }
        const buffer = Buffer.alloc(1024, 10);

        // error stream, drop two bytes for the port number.
        outputFn(1, buffer);
        // error stream is null, expect output to be dropped and nothing to change.
        strictEqual(osStream.size(), 0);
    });

    it('should correctly port-forward streams', async () => {
        const kc = new KubeConfig();
        const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
        const portForward = new PortForward(kc, true, instance(fakeWebSocket));
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForward('ns', 'p', [8000], osStream, errStream, isStream);

        const [, , outputFn] = capture(fakeWebSocket.connect).last();

        strictEqual(typeof outputFn, 'function');
        // this is redundant but needed for the compiler, sigh...
        if (!outputFn) {
            return;
        }
        const buffer = Buffer.alloc(1024, 10);

        outputFn(0, buffer);
        // first time, drop two bytes for the port number.
        strictEqual(osStream.size(), 1022);

        outputFn(0, buffer);
        strictEqual(osStream.size(), 2046);

        // error stream, drop two bytes for the port number.
        outputFn(1, buffer);
        strictEqual(errStream.size(), 1022);

        outputFn(1, buffer);
        strictEqual(errStream.size(), 2046);

        // unknown stream, shouldn't change anything.
        outputFn(2, buffer);
        strictEqual(osStream.size(), 2046);
        strictEqual(errStream.size(), 2046);
    });

    it('should throw with no ports or too many', async () => {
        const kc = new KubeConfig();
        const portForward = new PortForward(kc);
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await rejects(portForward.portForward('ns', 'pod', [], osStream, osStream, isStream), {
            name: 'Error',
            message: 'You must provide at least one port to forward to.',
        });
        await rejects(portForward.portForward('ns', 'pod', [1, 2], osStream, osStream, isStream), {
            name: 'Error',
            message: 'Only one port is currently supported for port-forward',
        });
    });

    it('should port-forward to a service by resolving to the first ready pod', async () => {
        const kc: KubeConfig = mock(KubeConfig);
        const mockCoreApi: CoreV1Api = mock(CoreV1Api);
        const mockWebSocket: WebSocketInterface = mock(WebSocketHandler);

        when(kc.makeApiClient(CoreV1Api)).thenReturn(instance(mockCoreApi));

        const serviceMock: V1Service = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: { name: 'test-service', namespace: 'default' },
            spec: {
                selector: {
                    app: 'test-app',
                    version: 'v1',
                },
            },
        };

        const podMock: V1Pod = {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: { name: 'test-app-pod-1', namespace: 'default' },
            status: {
                conditions: [
                    {
                        type: 'Ready',
                        status: 'True',
                    } as { type: string; status: string },
                ],
            } as V1PodStatus,
        };

        when(mockCoreApi.readNamespacedService(anything())).thenResolve(serviceMock);
        when(mockCoreApi.listNamespacedPod(anything())).thenResolve({
            items: [podMock],
        });

        const portForward = new PortForward(instance(kc), true, instance(mockWebSocket));
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForwardService(
            'default',
            'test-service',
            [8080],
            osStream,
            errStream,
            isStream,
        );

        const path = `/api/v1/namespaces/default/pods/test-app-pod-1/portforward?ports=8080`;
        verify(mockWebSocket.connect(path, null, anyFunction())).called();
    });

    it('should throw error when service has no selector', async () => {
        const kc: KubeConfig = mock(KubeConfig);
        const mockCoreApi: CoreV1Api = mock(CoreV1Api);

        when(kc.makeApiClient(CoreV1Api)).thenReturn(instance(mockCoreApi));

        const serviceMock: V1Service = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: { name: 'test-service', namespace: 'default' },
            spec: {
                selector: undefined,
            },
        };

        when(mockCoreApi.readNamespacedService(anything())).thenResolve(serviceMock);

        const portForward = new PortForward(instance(kc));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await rejects(
            portForward.portForwardService('default', 'test-service', [8080], osStream, null, isStream),
            {
                name: 'Error',
                message: 'Service default/test-service has no selector defined',
            },
        );
    });

    it('should throw error when no pods match the service selector', async () => {
        const kc: KubeConfig = mock(KubeConfig);
        const mockCoreApi: CoreV1Api = mock(CoreV1Api);

        when(kc.makeApiClient(CoreV1Api)).thenReturn(instance(mockCoreApi));

        const serviceMock: V1Service = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: { name: 'test-service', namespace: 'default' },
            spec: {
                selector: {
                    app: 'test-app',
                },
            },
        };

        when(mockCoreApi.readNamespacedService(anything())).thenResolve(serviceMock);
        when(mockCoreApi.listNamespacedPod(anything())).thenResolve({
            items: [],
        });

        const portForward = new PortForward(instance(kc));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await rejects(
            portForward.portForwardService('default', 'test-service', [8080], osStream, null, isStream),
            {
                name: 'Error',
                message: 'No pods found with selector "app=test-app" in namespace default',
            },
        );
    });

    it('should throw error when no pods are ready for service selector', async () => {
        const kc: KubeConfig = mock(KubeConfig);
        const mockCoreApi: CoreV1Api = mock(CoreV1Api);

        when(kc.makeApiClient(CoreV1Api)).thenReturn(instance(mockCoreApi));

        const serviceMock: V1Service = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: { name: 'test-service', namespace: 'default' },
            spec: {
                selector: {
                    app: 'test-app',
                },
            },
        };

        const notReadyPod: V1Pod = {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: { name: 'test-app-pod-1', namespace: 'default' },
            status: {
                conditions: [
                    {
                        type: 'Ready',
                        status: 'False',
                    } as { type: string; status: string },
                ],
            } as V1PodStatus,
        };

        when(mockCoreApi.readNamespacedService(anything())).thenResolve(serviceMock);
        when(mockCoreApi.listNamespacedPod(anything())).thenResolve({
            items: [notReadyPod],
        });

        const portForward = new PortForward(instance(kc));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await rejects(
            portForward.portForwardService('default', 'test-service', [8080], osStream, null, isStream),
            {
                name: 'Error',
                message: 'No ready pods found with selector "app=test-app" in namespace default',
            },
        );
    });

    it('should port-forward to a deployment by resolving to the first ready pod', async () => {
        const kc: KubeConfig = mock(KubeConfig);
        const mockAppsApi: AppsV1Api = mock(AppsV1Api);
        const mockCoreApi: CoreV1Api = mock(CoreV1Api);
        const mockWebSocket: WebSocketInterface = mock(WebSocketHandler);

        when(kc.makeApiClient(AppsV1Api)).thenReturn(instance(mockAppsApi));
        when(kc.makeApiClient(CoreV1Api)).thenReturn(instance(mockCoreApi));

        const deploymentMock: V1Deployment = {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: { name: 'test-deployment', namespace: 'default' },
            spec: {
                selector: {
                    matchLabels: {
                        app: 'test-app',
                        env: 'prod',
                    },
                },
                template: {
                    metadata: { labels: { app: 'test-app', env: 'prod' } },
                    spec: { containers: [] },
                },
            },
        };

        const podMock: V1Pod = {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: { name: 'test-app-deploy-1', namespace: 'default' },
            status: {
                conditions: [
                    {
                        type: 'Ready',
                        status: 'True',
                    } as { type: string; status: string },
                ],
            } as V1PodStatus,
        };

        when(mockAppsApi.readNamespacedDeployment(anything())).thenResolve(deploymentMock);
        when(mockCoreApi.listNamespacedPod(anything())).thenResolve({
            items: [podMock],
        });

        const portForward = new PortForward(instance(kc), true, instance(mockWebSocket));
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForwardDeployment(
            'default',
            'test-deployment',
            [8080],
            osStream,
            errStream,
            isStream,
        );

        const path = `/api/v1/namespaces/default/pods/test-app-deploy-1/portforward?ports=8080`;
        verify(mockWebSocket.connect(path, null, anyFunction())).called();
    });

    it('should throw error when deployment has no selector', async () => {
        const kc: KubeConfig = mock(KubeConfig);
        const mockAppsApi: AppsV1Api = mock(AppsV1Api);

        when(kc.makeApiClient(AppsV1Api)).thenReturn(instance(mockAppsApi));

        const deploymentMock: V1Deployment = {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: { name: 'test-deployment', namespace: 'default' },
            spec: {
                selector: {
                    matchLabels: undefined,
                },
                template: {
                    metadata: { labels: {} },
                    spec: { containers: [] },
                },
            },
        };

        when(mockAppsApi.readNamespacedDeployment(anything())).thenResolve(deploymentMock);

        const portForward = new PortForward(instance(kc));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await rejects(
            portForward.portForwardDeployment('default', 'test-deployment', [8080], osStream, null, isStream),
            {
                name: 'Error',
                message: 'Deployment default/test-deployment has no selector defined',
            },
        );
    });

    it('should support full kubernetes label selector syntax for services', async () => {
        const kc: KubeConfig = mock(KubeConfig);
        const mockCoreApi: CoreV1Api = mock(CoreV1Api);
        const mockWebSocket: WebSocketInterface = mock(WebSocketHandler);

        when(kc.makeApiClient(CoreV1Api)).thenReturn(instance(mockCoreApi));

        const serviceMock: V1Service = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: { name: 'test-service', namespace: 'default' },
            spec: {
                selector: {
                    'app.kubernetes.io/name': 'myapp',
                    'app.kubernetes.io/version': '1.0',
                },
            },
        };

        const podMock: V1Pod = {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: { name: 'myapp-pod-1', namespace: 'default' },
            status: {
                conditions: [
                    {
                        type: 'Ready',
                        status: 'True',
                    } as { type: string; status: string },
                ],
            } as V1PodStatus,
        };

        when(mockCoreApi.readNamespacedService(anything())).thenResolve(serviceMock);
        when(mockCoreApi.listNamespacedPod(anything())).thenResolve({
            items: [podMock],
        });

        const portForward = new PortForward(instance(kc), true, instance(mockWebSocket));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForwardService('default', 'test-service', [8080], osStream, null, isStream);

        const path = `/api/v1/namespaces/default/pods/myapp-pod-1/portforward?ports=8080`;
        verify(mockWebSocket.connect(path, null, anyFunction())).called();
    });

    it('should use the first ready pod when multiple pods match the selector', async () => {
        const kc: KubeConfig = mock(KubeConfig);
        const mockCoreApi: CoreV1Api = mock(CoreV1Api);
        const mockWebSocket: WebSocketInterface = mock(WebSocketHandler);

        when(kc.makeApiClient(CoreV1Api)).thenReturn(instance(mockCoreApi));

        const serviceMock: V1Service = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: { name: 'test-service', namespace: 'default' },
            spec: {
                selector: {
                    app: 'test-app',
                },
            },
        };

        const pod1: V1Pod = {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: { name: 'test-app-pod-1', namespace: 'default' },
            status: {
                conditions: [
                    {
                        type: 'Ready',
                        status: 'True',
                    } as { type: string; status: string },
                ],
            } as V1PodStatus,
        };

        const pod2: V1Pod = {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: { name: 'test-app-pod-2', namespace: 'default' },
            status: {
                conditions: [
                    {
                        type: 'Ready',
                        status: 'True',
                    } as { type: string; status: string },
                ],
            } as V1PodStatus,
        };

        when(mockCoreApi.readNamespacedService(anything())).thenResolve(serviceMock);
        when(mockCoreApi.listNamespacedPod(anything())).thenResolve({
            items: [pod1, pod2],
        });

        const portForward = new PortForward(instance(kc), true, instance(mockWebSocket));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForwardService('default', 'test-service', [8080], osStream, null, isStream);

        // Should use the first pod (pod1)
        const path = `/api/v1/namespaces/default/pods/test-app-pod-1/portforward?ports=8080`;
        verify(mockWebSocket.connect(path, null, anyFunction())).called();
    });
});
