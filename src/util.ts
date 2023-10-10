import { tmpdir } from 'os';
import { randomUUID } from 'crypto';
import { promises as fs, constants as fsConstants } from 'fs';
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
        case 'n':
            return Number(quantity.slice(0, quantity.length - 1)).valueOf() / 1_000_000_000.0;
        case 'u':
            return Number(quantity.slice(0, quantity.length - 1)).valueOf() / 1_000_000.0;
        case 'm':
            return Number(quantity.slice(0, quantity.length - 1)).valueOf() / 1000.0;
        case 'k':
            return BigInt(quantity.slice(0, quantity.length - 1)) * BigInt(1000);
        case 'M':
            return BigInt(quantity.slice(0, quantity.length - 1)) * BigInt(1000 * 1000);
        case 'G':
            return BigInt(quantity.slice(0, quantity.length - 1)) * BigInt(1000 * 1000 * 1000);
        case 'T':
            return BigInt(quantity.slice(0, quantity.length - 1)) * BigInt(1000 * 1000 * 1000) * BigInt(1000);
        case 'P':
            return (
                BigInt(quantity.slice(0, quantity.length - 1)) *
                BigInt(1000 * 1000 * 1000) *
                BigInt(1000 * 1000)
            );
        case 'E':
            return (
                BigInt(quantity.slice(0, quantity.length - 1)) *
                BigInt(1000 * 1000 * 1000) *
                BigInt(1000 * 1000 * 1000)
            );
        case 'Ki':
            return BigInt(quantity.slice(0, quantity.length - 2)) * BigInt(1024);
        case 'Mi':
            return BigInt(quantity.slice(0, quantity.length - 2)) * BigInt(1024 * 1024);
        case 'Gi':
            return BigInt(quantity.slice(0, quantity.length - 2)) * BigInt(1024 * 1024 * 1024);
        case 'Ti':
            return BigInt(quantity.slice(0, quantity.length - 2)) * BigInt(1024 * 1024 * 1024) * BigInt(1024);
        case 'Pi':
            return (
                BigInt(quantity.slice(0, quantity.length - 2)) *
                BigInt(1024 * 1024 * 1024) *
                BigInt(1024 * 1024)
            );
        case 'Ei':
            return (
                BigInt(quantity.slice(0, quantity.length - 2)) *
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

export function totalCPUForContainer(container: V1Container): ResourceStatus {
    return containerTotalForResource(container, 'cpu');
}

export function totalMemoryForContainer(container: V1Container): ResourceStatus {
    return containerTotalForResource(container, 'memory');
}

export function totalCPU(pod: V1Pod): ResourceStatus {
    return totalForResource(pod, 'cpu');
}

export function totalMemory(pod: V1Pod): ResourceStatus {
    return totalForResource(pod, 'memory');
}

export function add(n1: number | bigint, n2: number | bigint): number | bigint {
    if (typeof n1 === 'number' && typeof n2 === 'number') {
        return n1 + n2;
    }
    if (typeof n1 === 'number') {
        return BigInt(Math.round(n1)) + BigInt(n2);
    } else if (typeof n2 === 'number') {
        return BigInt(n1) + BigInt(Math.round(n2));
    }
    return BigInt(n1) + BigInt(n2);
}

export function containerTotalForResource(container: V1Container, resource: string): ResourceStatus {
    let reqTotal: number | bigint = 0;
    let limitTotal: number | bigint = 0;
    if (container.resources) {
        if (container.resources.requests) {
            reqTotal = add(reqTotal, quantityToScalar(container.resources.requests[resource]));
        }
        if (container.resources.limits) {
            limitTotal = add(limitTotal, quantityToScalar(container.resources.limits[resource]));
        }
    }
    return new ResourceStatus(reqTotal, limitTotal, resource);
}

export function totalForResource(pod: V1Pod, resource: string): ResourceStatus {
    let reqTotal: number | bigint = 0;
    let limitTotal: number | bigint = 0;
    pod.spec!.containers.forEach((container: V1Container) => {
        const containerTotal = containerTotalForResource(container, resource);

        reqTotal = add(reqTotal, containerTotal.request);
        limitTotal = add(limitTotal, containerTotal.limit);
    });
    return new ResourceStatus(reqTotal, limitTotal, resource);
}

export async function generateTmpFileName(): Promise<string> {
    let tmpFileName: string;

    let i = 0;
    do {
        tmpFileName = `${tmpdir()}/${randomUUID()}`;

        try {
            await fs.access(tmpFileName, fsConstants.W_OK);

            console.warn('Tmp file already exists');
        } catch (err) {
            return tmpFileName;
        }

        i++;
    } while (i < 10);

    throw new Error('Cannot generate tmp file name');
}
