import fetch from 'node-fetch';
import { KubeConfig } from './config';
import { ApiException, V1Status } from './gen';

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
        return this.metricsApiRequest<NodeMetricsList>('/apis/metrics.k8s.io/v1beta1/nodes');
    }

    public async getPodMetrics(namespace?: string): Promise<PodMetricsList> {
        let path: string;

        if (namespace !== undefined && namespace.length > 0) {
            path = `/apis/metrics.k8s.io/v1beta1/namespaces/${namespace}/pods`;
        } else {
            path = '/apis/metrics.k8s.io/v1beta1/pods';
        }

        return this.metricsApiRequest<PodMetricsList>(path);
    }

    private async metricsApiRequest<T extends PodMetricsList | NodeMetricsList>(path: string): Promise<T> {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }

        const requestURL = cluster.server + path;

        const requestInit = await this.config.applytoFetchOptions({
            method: 'GET',
            servername: cluster.server + path,
        });

        return fetch(requestURL, requestInit)
            .then((response) => {
                return Promise.all([response.json(), response.status, response]);
            })
            .then(([json, status, response]) => {
                if (status === 200) {
                    return json as T;
                }
                if (status === 500) {
                    const v1status = json as V1Status;
                    const v1code = v1status.code;
                    const v1message = v1status.message;
                    if (v1code !== undefined && v1message !== undefined) {
                        throw new ApiException<undefined | V1Status>(
                            v1code,
                            v1message,
                            v1status,
                            response.headers.raw(),
                        );
                    }
                }
                throw new ApiException<undefined>(
                    status,
                    'Error occurred in metrics request',
                    undefined,
                    response.headers.raw(),
                );
            })
            .catch((e) => {
                if (e instanceof ApiException) {
                    throw e;
                }
                throw new ApiException<undefined | V1Status>(
                    500,
                    `Error occurred in metrics request: ${e.message}`,
                    {},
                    {},
                );
            });
    }
}
