import { CoreV1Api, V1Node, V1Pod } from './gen/api';
import { add, podsForNode, quantityToScalar, totalCPU, totalMemory } from './util';

export class ResourceUsage {
    constructor(
        public readonly Capacity: number | BigInt,
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
