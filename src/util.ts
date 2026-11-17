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
    if (/\s/.test(quantity)) {
        throw new Error('Unknown quantity ' + quantity);
    }
    const suffix = findSuffix(quantity);
    if (suffix === '' || suffix === 'n' || suffix === 'u' || suffix === 'm') {
        return quantityToNumber(quantity, suffix);
    }
    const multiplier = integerSuffixMultiplier(suffix);
    if (multiplier === undefined) {
        throw new Error(`Unknown suffix: ${suffix}`);
    }
    return scaleByIntegerSuffix(quantity, suffix, multiplier);
}

// k..E and Ki..Ei count whole base units. Scale the mantissa in base 10 with
// BigInt — significand * multiplier * 10^pow10 — and round a non-zero remainder
// away from zero, matching resource.Quantity.Value(). Number() is not used here:
// it cannot represent every integer past MAX_SAFE_INTEGER or every decimal
// fraction. n/u/m and a bare mantissa stay JS numbers. A power of ten past
// 10000 is rejected so a pathological exponent cannot allocate an unbounded
// integer; real suffixes never reach it. findSuffix leaves a scientific
// exponent in the mantissa (`1.5e3Ki`) and treats a bare `1e3` / `1.5e6` as
// having no suffix.

const MAX_DECIMAL_EXPONENT = BigInt(10000);

const THOUSAND = BigInt(1000);
const MILLION = BigInt(1000 * 1000);
const BILLION = BigInt(1000 * 1000 * 1000);
const KIBI = BigInt(1024);
const MEBI = BigInt(1024 * 1024);
const GIBI = BigInt(1024 * 1024 * 1024);

function integerSuffixMultiplier(suffix: string): bigint | undefined {
    switch (suffix) {
        case 'k':
            return THOUSAND;
        case 'M':
            return MILLION;
        case 'G':
            return BILLION;
        case 'T':
            return BILLION * THOUSAND;
        case 'P':
            return BILLION * MILLION;
        case 'E':
            return BILLION * BILLION;
        case 'Ki':
            return KIBI;
        case 'Mi':
            return MEBI;
        case 'Gi':
            return GIBI;
        case 'Ti':
            return GIBI * KIBI;
        case 'Pi':
            return GIBI * MEBI;
        case 'Ei':
            return GIBI * GIBI;
        default:
            return undefined;
    }
}

function quantityToNumber(quantity: string, suffix: string): number {
    const mantissa = suffix === '' ? quantity : quantity.substring(0, quantity.length - suffix.length);
    const num = Number(mantissa).valueOf();
    if (isNaN(num)) {
        throw new Error('Unknown quantity ' + quantity);
    }
    switch (suffix) {
        case 'n':
            return num / 1_000_000_000.0;
        case 'u':
            return num / 1_000_000.0;
        case 'm':
            return num / 1000.0;
        default:
            return num;
    }
}

interface FixedDecimal {
    negative: boolean;
    significand: bigint;
    // ±significand * 10^pow10
    pow10: bigint;
}

function scaleByIntegerSuffix(quantity: string, suffix: string, multiplier: bigint): bigint {
    const mantissa = quantity.substring(0, quantity.length - suffix.length);
    const parsed = parseFixedDecimal(mantissa);
    if (parsed === undefined) {
        throw new Error('Unknown quantity ' + quantity);
    }
    const scaled = multiplyAndScale(parsed.significand, multiplier, parsed.pow10);
    if (scaled === undefined) {
        throw new Error('Unknown quantity ' + quantity);
    }
    return parsed.negative ? -scaled : scaled;
}

function parseFixedDecimal(mantissa: string): FixedDecimal | undefined {
    const match = /^([+-])?(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(mantissa);
    if (match === null) {
        return undefined;
    }
    const sign = match[1];
    const intPart = match[2];
    const fracPart = match[3];
    const expPart = match[4];
    if (intPart.length === 0 && (fracPart === undefined || fracPart.length === 0)) {
        return undefined;
    }
    const digits = `${intPart}${fracPart ?? ''}`;
    const significand = BigInt(digits.replace(/^0+(?=\d)/, ''));
    const fracDigits = fracPart === undefined ? BigInt(0) : BigInt(fracPart.length);
    const exponent = parseExponent(expPart);
    if (exponent === undefined) {
        return undefined;
    }
    return {
        negative: sign === '-' && significand !== BigInt(0),
        significand,
        pow10: exponent - fracDigits,
    };
}

function parseExponent(expPart: string | undefined): bigint | undefined {
    if (expPart === undefined) {
        return BigInt(0);
    }
    const digits = expPart.replace(/^[+-]/, '').replace(/^0+(?=\d)/, '');
    // 10000 is five digits. Anything longer is past MAX_DECIMAL_EXPONENT, and
    // constructing that BigInt would itself be the allocation we are avoiding.
    if (digits.length > 5) {
        return undefined;
    }
    const magnitude = BigInt(digits);
    return expPart.charAt(0) === '-' ? -magnitude : magnitude;
}

function multiplyAndScale(significand: bigint, multiplier: bigint, pow10: bigint): bigint | undefined {
    if (significand === BigInt(0)) {
        return BigInt(0);
    }
    const magnitude = significand * multiplier;
    if (pow10 >= BigInt(0)) {
        if (pow10 > MAX_DECIMAL_EXPONENT) {
            return undefined;
        }
        return magnitude * pow10n(pow10);
    }
    const denExp = -pow10;
    // 10^denExp is greater than magnitude, so the quotient is 0 and the
    // remainder is not. Round away from zero to 1 without building the power.
    if (denExp >= BigInt(magnitude.toString().length)) {
        return BigInt(1);
    }
    if (denExp > MAX_DECIMAL_EXPONENT) {
        return undefined;
    }
    const denominator = pow10n(denExp);
    const quotient = magnitude / denominator;
    const remainder = magnitude % denominator;
    return remainder === BigInt(0) ? quotient : quotient + BigInt(1);
}

function pow10n(exp: bigint): bigint {
    let result = BigInt(1);
    let base = BigInt(10);
    let exponent = exp;
    const zero = BigInt(0);
    const two = BigInt(2);
    while (exponent > zero) {
        if (exponent % two !== zero) {
            result *= base;
        }
        exponent /= two;
        if (exponent > zero) {
            base *= base;
        }
    }
    return result;
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

// ApiException expects headers as { [key: string]: string }, but undici's fetch returns a Headers class instance.
// This converts the Headers iterable into a plain object.
export function normalizeResponseHeaders(response: { headers: { entries(): Iterable<[string, string]> } }): {
    [key: string]: string;
} {
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

export function getSerializationType(apiVersion?: string, kind?: string): string {
    if (apiVersion === undefined || kind === undefined) {
        return 'KubernetesObject';
    }
    // Types are defined in src/gen/api/models with the format "<Version><Kind>".
    // Version and Kind are in PascalCase.
    const gv = groupVersion(apiVersion);

    // Only return a type name if this is a built-in Kubernetes API group
    if (!isBuiltInApiGroup(gv.group)) {
        return 'KubernetesObject';
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
