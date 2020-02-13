import {CoreV1Api, V1Pod, V1Container} from './gen/api';

export async function podsForNode(api: CoreV1Api, nodeName: string): Promise<V1Pod[]> {
    const allPods = await api.listPodForAllNamespaces();
    return allPods.body.items.filter((pod: V1Pod) => pod.spec!.nodeName === nodeName);
}

export function quantityToScalar(quantity: string): number {
    if (!quantity) {
        return 0;
    }
    if (quantity.endsWith('m')) {
        return parseInt(quantity.substr(0, quantity.length - 1));
    }
    if (quantity.endsWith('Ki')) {
        return parseInt(quantity.substr(0, quantity.length - 2)) * 1024;
    }
    const num = parseInt(quantity);
    if (num < 0) {
        throw new Error('Unknown quantity ' + quantity);
    }
    return num;
}

export class ResourceStatus {
    constructor(public readonly request: number, public readonly limit: number, public readonly resourceType: string) {}
}

export function totalCPU(pod: V1Pod): ResourceStatus {
    return totalForResource(pod, 'cpu');
}

export function totalForResource(pod: V1Pod, resource: string): ResourceStatus {
    let reqTotal = 0;
    let limitTotal = 0;
    pod.spec!.containers.forEach((container: V1Container) => {
        if (container.resources) {
            if (container.resources.requests) {
                reqTotal += quantityToScalar(container.resources.requests[resource]);
            }
            if (container.resources.limits) {
                limitTotal += quantityToScalar(container.resources.limits[resource]);
            }
        }
    });
    return new ResourceStatus(reqTotal, limitTotal, resource);
}
