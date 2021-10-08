import { isNumber } from 'underscore';
import { CoreV1Api, V1Container, V1Pod } from './gen/api';

export async function podsForNode(api: CoreV1Api, nodeName: string): Promise<V1Pod[]> {
    const allPods = await api.listPodForAllNamespaces();
    return allPods.body.items.filter((pod: V1Pod) => pod.spec!.nodeName === nodeName);
}

export function findSuffix(quantity: string): string {
    let ix = quantity.length - 1;
    while (ix >= 0 && !/[\.0-9]/.test(quantity.charAt(ix))) {
        ix--;
    }
    return ix === -1 ? '' : quantity.substring(ix + 1);
}

export function quantityToScalar(quantity: string): number | bigint {
    if (!quantity) {
        return 0;
    }
    const suffix = findSuffix(quantity);
    if (suffix === '') {
        const num = Number(quantity).valueOf();
        if (isNaN(num)) {
            throw new Error('Unknown quantity ' + quantity);
        }
        return num;
    }
    switch (suffix) {
        case 'm':
            return Number(quantity.substr(0, quantity.length - 1)).valueOf() / 1000.0;
        case 'Ki':
            return BigInt(quantity.substr(0, quantity.length - 2)) * BigInt(1024);
        case 'Mi':
            return BigInt(quantity.substr(0, quantity.length - 2)) * BigInt(1024 * 1024);
        case 'Gi':
            return BigInt(quantity.substr(0, quantity.length - 2)) * BigInt(1024 * 1024 * 1024);
        case 'Ti':
            return (
                BigInt(quantity.substr(0, quantity.length - 2)) * BigInt(1024 * 1024 * 1024) * BigInt(1024)
            );
        case 'Pi':
            return (
                BigInt(quantity.substr(0, quantity.length - 2)) *
                BigInt(1024 * 1024 * 1024) *
                BigInt(1024 * 1024)
            );
        case 'Ei':
            return (
                BigInt(quantity.substr(0, quantity.length - 2)) *
                BigInt(1024 * 1024 * 1024) *
                BigInt(1024 * 1024 * 1024)
            );
        default:
            throw new Error(`Unknown suffix: ${suffix}`);
    }
}

export class ResourceStatus {
    constructor(
        public readonly request: bigint | number,
        public readonly limit: bigint | number,
        public readonly resourceType: string,
    ) {}
}

export function totalCPU(pod: V1Pod): ResourceStatus {
    return totalForResource(pod, 'cpu');
}

export function totalMemory(pod: V1Pod): ResourceStatus {
    return totalForResource(pod, 'memory');
}

export function add(n1: number | bigint, n2: number | bigint): number | bigint {
    if (isNumber(n1) && isNumber(n2)) {
        return n1 + n2;
    }
    if (isNumber(n1)) {
        return BigInt(Math.round(n1)) + (n2 as bigint);
    } else if (isNumber(n2)) {
        return (n1 as bigint) + BigInt(Math.round(n2));
    }
    return ((n1 as bigint) + n2) as bigint;
}

export function totalForResource(pod: V1Pod, resource: string): ResourceStatus {
    let reqTotal: number | bigint = 0;
    let limitTotal: number | bigint = 0;
    pod.spec!.containers.forEach((container: V1Container) => {
        if (container.resources) {
            if (container.resources.requests) {
                reqTotal = add(reqTotal, quantityToScalar(container.resources.requests[resource]));
            }
            if (container.resources.limits) {
                limitTotal = add(limitTotal, quantityToScalar(container.resources.limits[resource]));
            }
        }
    });
    return new ResourceStatus(reqTotal, limitTotal, resource);
}
