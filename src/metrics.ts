import request = require('request');

import { KubeConfig } from './config';
import { HttpError, ObjectSerializer } from './gen/api';

export interface Usage {
    cpu: string;
    memory: string;
}

export interface ContainerMetric {
    name: string;
    usage: Usage;
}

export interface PodMetric {
    metadata: {
        name: string;
        namespace: string;
        selfLink?: string;
        creationTimestamp: string;
        labels?: { [key: string]: string };
    };
    timestamp: string;
    window: string;
    containers: ContainerMetric[];
}

export interface NodeMetric {
    metadata: {
        name: string;
        selfLink?: string;
        creationTimestamp: string;
        labels?: { [key: string]: string };
    };
    timestamp: string;
    window: string;
    usage: Usage;
}

export interface PodMetricsList {
    kind: 'PodMetricsList';
    apiVersion: 'metrics.k8s.io/v1beta1';
    metadata: {
        selfLink: string;
    };
    items: PodMetric[];
}

export interface NodeMetricsList {
    kind: 'NodeMetricsList';
    apiVersion: 'metrics.k8s.io/v1beta1';
    metadata: {
        selfLink: string;
    };
    items: NodeMetric[];
}

export interface SinglePodMetrics extends PodMetric {
    kind: 'PodMetrics';
    apiVersion: 'metrics.k8s.io/v1beta1';
}

export interface SingleNodeMetrics extends NodeMetric {
    kind: 'NodeMetrics';
    apiVersion: 'metrics.k8s.io/v1beta1';
}

export interface MetricsOptions {
    /**
     * restrict the list of returned objects by labels
     */
    labelSelector?: string;
}

export class Metrics {
    private config: KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    public async getNodeMetrics(options?: MetricsOptions): Promise<NodeMetricsList>;
    public async getNodeMetrics(node: string, options?: MetricsOptions): Promise<SingleNodeMetrics>;
    public async getNodeMetrics(
        nodeOrOptions?: string | MetricsOptions,
        options?: MetricsOptions,
    ): Promise<NodeMetricsList | SingleNodeMetrics> {
        if (typeof nodeOrOptions !== 'string' || nodeOrOptions === '') {
            if (nodeOrOptions !== '') {
                options = nodeOrOptions;
            }
            return this.metricsApiRequest<NodeMetricsList>('/apis/metrics.k8s.io/v1beta1/nodes', options);
        }
        return this.metricsApiRequest<SingleNodeMetrics>(
            `/apis/metrics.k8s.io/v1beta1/nodes/${nodeOrOptions}`,
            options,
        );
    }

    public async getPodMetrics(options?: MetricsOptions): Promise<PodMetricsList>;
    public async getPodMetrics(namespace?: string, options?: MetricsOptions): Promise<PodMetricsList>;
    public async getPodMetrics(
        namespace: string,
        name: string,
        options?: MetricsOptions,
    ): Promise<SinglePodMetrics>;
    public async getPodMetrics(
        namespaceOrOptions?: string | MetricsOptions,
        nameOrOptions?: string | MetricsOptions,
        options?: MetricsOptions,
    ): Promise<SinglePodMetrics | PodMetricsList> {
        let path: string;

        if (typeof namespaceOrOptions === 'string' && namespaceOrOptions !== '') {
            const namespace = namespaceOrOptions;

            if (typeof nameOrOptions === 'string') {
                path = `/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods/${nameOrOptions}`;
            } else {
                path = `/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods`;
                options = nameOrOptions;
            }
        } else {
            path = '/apis/metrics.k8s.io/v1beta1/pods';

            if (typeof namespaceOrOptions !== 'string') {
                options = namespaceOrOptions;
            } else if (typeof nameOrOptions !== 'string') {
                options = nameOrOptions;
            }
        }

        return this.metricsApiRequest<PodMetricsList | SinglePodMetrics>(path, options);
    }

    private async metricsApiRequest<
        T extends PodMetricsList | NodeMetricsList | SinglePodMetrics | SingleNodeMetrics,
    >(path: string, options?: MetricsOptions): Promise<T> {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }

        const requestOptions: request.Options = {
            method: 'GET',
            uri: cluster.server + path,
            qs: options,
        };

        await this.config.applyToRequest(requestOptions);

        return new Promise((resolve, reject) => {
            const req = request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else if (response.statusCode !== 200) {
                    try {
                        const deserializedBody = ObjectSerializer.deserialize(JSON.parse(body), 'V1Status');
                        reject(new HttpError(response, deserializedBody, response.statusCode));
                    } catch (e) {
                        reject(new HttpError(response, body, response.statusCode));
                    }
                } else {
                    resolve(JSON.parse(body) as T);
                }
            });
        });
    }
}
