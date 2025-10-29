import { Response } from 'node-fetch';
import { CoreV1Api, V1Container, V1Pod } from './gen/index.js';

export async function podsForNode(api: CoreV1Api, nodeName: string): Promise<V1Pod[]> {
    const allPods = await api.listPodForAllNamespaces();
    if (!allPods.items) {
        return [];
    }
    return allPods.items.filter((pod: V1Pod) => pod.spec!.nodeName === nodeName);
}

export function findSuffix(quantity: string): string {
    let ix = quantity.length - 1;
    while (ix >= 0 && !/[.0-9]/.test(quantity.charAt(ix))) {
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
            return Number(quantity.substr(0, quantity.length - 1)).valueOf() / 1_000_000_000.0;
        case 'u':
            return Number(quantity.substr(0, quantity.length - 1)).valueOf() / 1_000_000.0;
        case 'm':
            return Number(quantity.substr(0, quantity.length - 1)).valueOf() / 1000.0;
        case 'k':
            return BigInt(quantity.substr(0, quantity.length - 1)) * BigInt(1000);
        case 'M':
            return BigInt(quantity.substr(0, quantity.length - 1)) * BigInt(1000 * 1000);
        case 'G':
            return BigInt(quantity.substr(0, quantity.length - 1)) * BigInt(1000 * 1000 * 1000);
        case 'T':
            return (
                BigInt(quantity.substr(0, quantity.length - 1)) * BigInt(1000 * 1000 * 1000) * BigInt(1000)
            );
        case 'P':
            return (
                BigInt(quantity.substr(0, quantity.length - 1)) *
                BigInt(1000 * 1000 * 1000) *
                BigInt(1000 * 1000)
            );
        case 'E':
            return (
                BigInt(quantity.substr(0, quantity.length - 1)) *
                BigInt(1000 * 1000 * 1000) *
                BigInt(1000 * 1000 * 1000)
            );
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
    public readonly request: bigint | number;
    public readonly limit: bigint | number;
    public readonly resourceType: string;

    constructor(request: bigint | number, limit: bigint | number, resourceType: string) {
        this.request = request;
        this.limit = limit;
        this.resourceType = resourceType;
    }
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

// There is a disconnect between the ApiException headers and the response headers from node-fetch
// ApiException expects { [key: string]: string } whereas node-fetch provides: { [key: string]: string[] }
// https://github.com/node-fetch/node-fetch/issues/783
// https://github.com/node-fetch/node-fetch/pull/1757
export function normalizeResponseHeaders(response: Response): { [key: string]: string } {
    const normalizedHeaders = {};

    for (const [key, value] of response.headers.entries()) {
        normalizedHeaders[key] = value;
    }

    return normalizedHeaders;
}

/**
 * Built-in Kubernetes API groups that have generated TypeScript models.
 * Custom resources and third-party API groups (like Knative) are not included.
 */
const BUILT_IN_API_GROUPS = new Set([
    'core', // maps to "" (empty string) for core resources like Pod, Service, etc.
    'admissionregistration.k8s.io',
    'apiextensions.k8s.io',
    'apiregistration.k8s.io',
    'apps',
    'authentication.k8s.io',
    'authorization.k8s.io',
    'autoscaling',
    'batch',
    'certificates.k8s.io',
    'coordination.k8s.io',
    'discovery.k8s.io',
    'events.k8s.io',
    'flowcontrol.apiserver.k8s.io',
    'internal.apiserver.k8s.io',
    'networking.k8s.io',
    'node.k8s.io',
    'policy',
    'rbac.authorization.k8s.io',
    'resource.k8s.io',
    'scheduling.k8s.io',
    'storage.k8s.io',
    'storagemigration.k8s.io',
]);

/**
 * Check if the given API group is a built-in Kubernetes API group.
 * @param group - The API group to check (e.g., "apps", "serving.knative.dev", "core")
 * @returns true if the group is a built-in Kubernetes API group, false otherwise
 */
function isBuiltInApiGroup(group: string): boolean {
    return BUILT_IN_API_GROUPS.has(group);
}

export function getSerializationType(apiVersion?: string, kind?: string): string | undefined {
    if (apiVersion === undefined || kind === undefined) {
        return 'KubernetesObject';
    }
    // Types are defined in src/gen/api/models with the format "<Version><Kind>".
    // Version and Kind are in PascalCase.
    const gv = groupVersion(apiVersion);

    // Only return a type name if this is a built-in Kubernetes API group
    if (!isBuiltInApiGroup(gv.group)) {
        return undefined;
    }

    const version = gv.version.charAt(0).toUpperCase() + gv.version.slice(1);
    return `${version}${kind}`;
}

interface GroupVersion {
    group: string;
    version: string;
}

function groupVersion(apiVersion: string): GroupVersion {
    const v = apiVersion.split('/');
    return v.length === 1
        ? {
              group: 'core',
              version: apiVersion,
          }
        : {
              group: v[0],
              version: v[1],
          };
}
