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
        selfLink: string;
        creationTimestamp: string;
    };
    timestamp: string;
    window: string;
    containers: ContainerMetric[];
}

export interface NodeMetric {
    metadata: {
        name: string;
        selfLink: string;
        creationTimestamp: string;
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

export interface SinglePodMetrics {
    kind: 'PodMetrics';
    apiVersion: 'metrics.k8s.io/v1beta1';
    metadata: {
        name: string;
        namespace: string;
        creationTimestamp: string;
        labels: { [key: string]: string };
    };
    timestamp: string;
    window: string;
    containers: ContainerMetric[];
}

export class Metrics {
    private config: KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    public async getNodeMetrics(): Promise<NodeMetricsList> {
        return this.metricsApiRequest<NodeMetricsList>('/apis/metrics.k8s.io/v1beta1/nodes');
    }

    public async getPodMetrics(namespace?: string): Promise<PodMetricsList>;
    public async getPodMetrics(namespace: string, name: string): Promise<SinglePodMetrics>;

    public async getPodMetrics(
        namespace?: string,
        name?: string,
    ): Promise<SinglePodMetrics | PodMetricsList> {
        let path: string;

        if (namespace !== undefined && namespace.length > 0 && name !== undefined && name.length > 0) {
            path = `/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods/${name}`;
            return this.metricsApiRequest<SinglePodMetrics>(path);
        }

        if (namespace !== undefined && namespace.length > 0) {
            path = `/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods`;
        } else {
            path = '/apis/metrics.k8s.io/v1beta1/pods';
        }

        return this.metricsApiRequest<PodMetricsList>(path);
    }

    private async metricsApiRequest<T extends PodMetricsList | NodeMetricsList | SinglePodMetrics>(
        path: string,
    ): Promise<T> {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }

        const requestOptions: request.Options = {
            method: 'GET',
            uri: cluster.server + path,
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
