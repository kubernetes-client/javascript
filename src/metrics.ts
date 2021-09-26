import * as request from 'request';
import { KubeConfig } from './config';
import { HttpError, ObjectSerializer, Authentication } from './gen/api';

export interface ContainerMetric {
    name: string,
    usage:{
        cpu: string,
        memory: string
    }
}

export interface PodMetric {
    metadata: {
        name: string;
        namespace: string;
        selfLink: string;
        creationTimestamp: string;
    }
    timestamp: string,
    window: string,
    containers: Array<ContainerMetric>
}

export interface PodMetricsList {
    kind: 'PodMetricsList';
    apiVersion: 'metrics.k8s.io/v1beta1';
    metadata: {
        selfLink: string
    };
    items: Array<PodMetric>
}

export class Metrics {
    private config: KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    // TODO getNodeMetrics
    
    public async getPodMetrics(namespace?: string): Promise<PodMetricsList> {

        let path:string;

        if (namespace !== undefined && namespace.length > 0){
            path = `/apis/metrics.k8s.io/v1beta1/${namespace}/default/pods`;   
        } else {
            path = "/apis/metrics.k8s.io/v1beta1/pods";
        }

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
                    const result: PodMetricsList = JSON.parse(body)
                    resolve(result);
                }
            });
        });

    }
}
