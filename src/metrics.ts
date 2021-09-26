import * as request from 'request';

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

export class Metrics {
    private config: KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    public async getNodeMetrics(): Promise<NodeMetricsList> {
        const path = '/apis/metrics.k8s.io/v1beta1/nodes';

        const requestOptions = this.requestOptionsFromPath(path);

        await this.config.applyToRequest(requestOptions);

        return this.handleResponse<NodeMetricsList>(requestOptions);
    }

    public async getPodMetrics(namespace?: string): Promise<PodMetricsList> {
        let path: string;

        if (namespace !== undefined && namespace.length > 0) {
            path = `/apis/metrics.k8s.io/v1beta1/${namespace}/default/pods`;
        } else {
            path = '/apis/metrics.k8s.io/v1beta1/pods';
        }

        const requestOptions = this.requestOptionsFromPath(path);

        await this.config.applyToRequest(requestOptions);

        return this.handleResponse<PodMetricsList>(requestOptions);
    }

    private requestOptionsFromPath(path: string): request.Options {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }

        return {
            method: 'GET',
            uri: cluster.server + path,
        };
    }

    private handleResponse<T>(requestOptions: request.Options): Promise<T> {
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
