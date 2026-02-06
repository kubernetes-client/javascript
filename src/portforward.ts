import WebSocket from 'isomorphic-ws';
import querystring from 'node:querystring';
import stream from 'node:stream';

import { AppsV1Api, CoreV1Api, V1Pod } from './gen/index.js';
import { KubeConfig } from './config.js';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler.js';

export class PortForward {
    private readonly config: KubeConfig;
    private readonly handler: WebSocketInterface;
    private readonly disconnectOnErr: boolean;

    // handler is a parameter really only for injecting for testing.
    constructor(config: KubeConfig, disconnectOnErr?: boolean, handler?: WebSocketInterface) {
        this.config = config;
        this.handler = handler || new WebSocketHandler(config);
        this.disconnectOnErr = disconnectOnErr === undefined ? true : disconnectOnErr;
    }

    // TODO: support multiple ports for real...
    public async portForward(
        namespace: string,
        podName: string,
        targetPorts: number[],
        output: stream.Writable,
        err: stream.Writable | null,
        input: stream.Readable,
        retryCount: number = 0,
    ): Promise<WebSocket.WebSocket | (() => WebSocket.WebSocket | null)> {
        if (targetPorts.length === 0) {
            throw new Error('You must provide at least one port to forward to.');
        }
        if (targetPorts.length > 1) {
            throw new Error('Only one port is currently supported for port-forward');
        }
        const query = {
            ports: targetPorts[0],
        };
        const queryStr = querystring.stringify(query);
        const needsToReadPortNumber: boolean[] = [];
        targetPorts.forEach((value: number, index: number) => {
            needsToReadPortNumber[index * 2] = true;
            needsToReadPortNumber[index * 2 + 1] = true;
        });
        const path = `/api/v1/namespaces/${namespace}/pods/${podName}/portforward?${queryStr}`;
        const createWebSocket = (): Promise<WebSocket.WebSocket> => {
            return this.handler.connect(path, null, (streamNum: number, buff: Buffer | string): boolean => {
                if (streamNum >= targetPorts.length * 2) {
                    return !this.disconnectOnErr;
                }
                // First two bytes of each stream are the port number
                if (needsToReadPortNumber[streamNum]) {
                    buff = buff.slice(2);
                    needsToReadPortNumber[streamNum] = false;
                }
                if (streamNum % 2 === 1) {
                    if (err) {
                        err.write(buff);
                    }
                } else {
                    output.write(buff);
                }
                return true;
            });
        };

        if (retryCount < 1) {
            const ws = await createWebSocket();
            WebSocketHandler.handleStandardInput(ws, input, 0);
            return ws;
        }

        return WebSocketHandler.restartableHandleStandardInput(createWebSocket, input, 0, retryCount);
    }

    /**
     * Port forward to a service by resolving to the first ready pod selected by the service's selector.
     *
     * @param namespace - The namespace of the service
     * @param serviceName - The name of the service
     * @param targetPorts - The target ports to forward to
     * @param output - The writable stream for output
     * @param err - The writable stream for error output (can be null)
     * @param input - The readable stream for input
     * @param retryCount - The number of times to retry the connection
     * @throws Will throw an error if the service is not found or has no ready pods
     */
    public async portForwardService(
        namespace: string,
        serviceName: string,
        targetPorts: number[],
        output: stream.Writable,
        err: stream.Writable | null,
        input: stream.Readable,
        retryCount: number = 0,
    ): Promise<WebSocket.WebSocket | (() => WebSocket.WebSocket | null)> {
        const coreApi = this.config.makeApiClient(CoreV1Api);
        const service = await coreApi.readNamespacedService({ name: serviceName, namespace });

        if (!service.spec?.selector || Object.keys(service.spec.selector).length === 0) {
            throw new Error(`Service ${namespace}/${serviceName} has no selector defined`);
        }

        const labelSelector = this.buildLabelSelector(service.spec.selector);
        const pod = await this.getFirstReadyPod(namespace, labelSelector);

        return this.portForward(namespace, pod.metadata!.name!, targetPorts, output, err, input, retryCount);
    }

    /**
     * Port forward to a deployment by resolving to the first ready pod selected by the deployment's selector.
     *
     * @param namespace - The namespace of the deployment
     * @param deploymentName - The name of the deployment
     * @param targetPorts - The target ports to forward to
     * @param output - The writable stream for output
     * @param err - The writable stream for error output (can be null)
     * @param input - The readable stream for input
     * @param retryCount - The number of times to retry the connection
     * @throws Will throw an error if the deployment is not found or has no ready pods
     */
    public async portForwardDeployment(
        namespace: string,
        deploymentName: string,
        targetPorts: number[],
        output: stream.Writable,
        err: stream.Writable | null,
        input: stream.Readable,
        retryCount: number = 0,
    ): Promise<WebSocket.WebSocket | (() => WebSocket.WebSocket | null)> {
        const appsApi = this.config.makeApiClient(AppsV1Api);
        const deployment = await appsApi.readNamespacedDeployment({ name: deploymentName, namespace });

        if (
            !deployment.spec?.selector?.matchLabels ||
            Object.keys(deployment.spec.selector.matchLabels).length === 0
        ) {
            throw new Error(`Deployment ${namespace}/${deploymentName} has no selector defined`);
        }

        const labelSelector = this.buildLabelSelector(deployment.spec.selector.matchLabels);
        const pod = await this.getFirstReadyPod(namespace, labelSelector);

        return this.portForward(namespace, pod.metadata!.name!, targetPorts, output, err, input, retryCount);
    }

    /**
     * Get the first ready pod matching the label selector.
     *
     * @param namespace - The namespace to query
     * @param labelSelector - The label selector to filter pods
     * @returns The first ready pod
     * @throws Will throw an error if no ready pods are found
     */
    private async getFirstReadyPod(namespace: string, labelSelector: string): Promise<V1Pod> {
        const coreApi = this.config.makeApiClient(CoreV1Api);
        const podList = await coreApi.listNamespacedPod({ namespace, labelSelector });

        if (!podList.items || podList.items.length === 0) {
            throw new Error(`No pods found with selector "${labelSelector}" in namespace ${namespace}`);
        }

        // Find the first pod with Ready status
        for (const pod of podList.items) {
            if (this.isPodReady(pod)) {
                return pod;
            }
        }

        throw new Error(`No ready pods found with selector "${labelSelector}" in namespace ${namespace}`);
    }

    /**
     * Check if a pod is ready by looking at its status conditions.
     *
     * @param pod - The pod to check
     * @returns True if the pod has a Ready condition with status True
     */
    private isPodReady(pod: V1Pod): boolean {
        if (!pod.status?.conditions) {
            return false;
        }
        return pod.status.conditions.some(
            (condition) => condition.type === 'Ready' && condition.status === 'True',
        );
    }

    /**
     * Build a Kubernetes label selector string from a label object.
     *
     * @param labels - An object of label key-value pairs
     * @returns A Kubernetes label selector string
     */
    private buildLabelSelector(labels: { [key: string]: string }): string {
        return Object.entries(labels)
            .map(([key, value]) => `${key}=${value}`)
            .join(',');
    }
}
