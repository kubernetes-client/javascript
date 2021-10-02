import { CoreV1Api, V1Node, V1Pod, V1PodList, V1Container } from './gen/api';
import { Metrics, PodMetric } from './metrics';
import { add, podsForNode, quantityToScalar, totalCPU, totalMemory } from './util';

export class ResourceUsage {
    constructor(
        public readonly Capacity: number | BigInt,
        public readonly RequestTotal: number | BigInt,
        public readonly LimitTotal: number | BigInt,
    ) {}
}

export class CurrentResourceUsage {
    constructor(
        public readonly CurrentUsage: number | BigInt,
        public readonly RequestTotal: number | BigInt,
        public readonly LimitTotal: number | BigInt,
    ) {}
}

export class NodeStatus {
    constructor(
        public readonly Node: V1Node,
        public readonly CPU: ResourceUsage,
        public readonly Memory: ResourceUsage,
    ) {}
}

export class ContainerStatus {
    constructor(
        public readonly Container: string,
        public readonly CPUUsage: number | BigInt,
        public readonly Memory: number | BigInt,
    ) {}
}

export class PodStatus {
    constructor(
        public readonly Pod: V1Pod,
        public readonly CPU: CurrentResourceUsage,
        public readonly Memory: CurrentResourceUsage,
        public readonly Containers: ContainerStatus[],
    ) {}
}



export async function topNodes(api: CoreV1Api): Promise<NodeStatus[]> {
    // TODO: Support metrics APIs in the client and this library
    const nodes = await api.listNode();
    const result: NodeStatus[] = [];
    for (const node of nodes.body!.items) {
        const availableCPU = quantityToScalar(node.status!.allocatable!.cpu);
        const availableMem = quantityToScalar(node.status!.allocatable!.memory);
        let totalPodCPU: number | bigint = 0;
        let totalPodCPULimit: number | bigint = 0;
        let totalPodMem: number | bigint = 0;
        let totalPodMemLimit: number | bigint = 0;
        let pods = await podsForNode(api, node.metadata!.name!);
        pods = pods.filter((pod: V1Pod) => pod.status!.phase === 'Running');
        pods.forEach((pod: V1Pod) => {
            const cpuTotal = totalCPU(pod);
            totalPodCPU = add(totalPodCPU, cpuTotal.request);
            totalPodCPULimit = add(totalPodCPULimit, cpuTotal.limit);

            const memTotal = totalMemory(pod);
            totalPodMem = add(totalPodMem, memTotal.request);
            totalPodMemLimit = add(totalPodMemLimit, memTotal.limit);
        });

        const cpuUsage = new ResourceUsage(availableCPU, totalPodCPU, totalPodCPULimit);
        const memUsage = new ResourceUsage(availableMem, totalPodMem, totalPodMemLimit);
        result.push(new NodeStatus(node, cpuUsage, memUsage));
    }
    return result;
}

export async function topPods(api: CoreV1Api, metrics: Metrics, namespace?: string): Promise<PodStatus[]> {
    
    const getPodList = async ():Promise<V1PodList> => {
        if (namespace) {
            return (await api.listNamespacedPod(namespace)).body
        } else {
            return (await api.listPodForAllNamespaces()).body
        }
    }

    const [podMetrics, podList] = await Promise.all([metrics.getPodMetrics(namespace), getPodList()])

    const podMetricsMap = podMetrics.items.reduce((accum, next) => {
       accum.set(next.metadata.name, next)
       return accum
    }, (new Map<string, PodMetric>()))

    const result: PodStatus[] = [];
    for (const pod of podList.items) {

        const podMetric = podMetricsMap.get(pod.metadata!.name!)

        const cpuTotal = totalCPU(pod);
        const memTotal = totalMemory(pod);
        const containerStatuses: ContainerStatus[] = [];
        let currentPodCPU: number | bigint = 0;
        let currentPodMem: number | bigint = 0;

        if (podMetric !== undefined){
            podMetric.containers.forEach(container => {
                const containerCPUUsage = quantityToScalar(container.usage.cpu);
                const containerMemUsage = quantityToScalar(container.usage.memory);
                currentPodCPU = add(currentPodCPU, containerCPUUsage)
                currentPodMem = add(currentPodMem, containerMemUsage)
                containerStatuses.push(new ContainerStatus(container.name, containerCPUUsage, containerMemUsage))
            })
        }

        const cpuUsage = new CurrentResourceUsage(currentPodCPU, cpuTotal.request, cpuTotal.limit);
        const memUsage = new CurrentResourceUsage(currentPodMem, memTotal.request, memTotal.limit);
        result.push(new PodStatus(pod, cpuUsage, memUsage, containerStatuses));

    }
    return result;
    

}
