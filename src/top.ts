import { CoreV1Api, V1Node, V1Pod } from './gen/api';
import { podsForNode, quantityToScalar, totalCPU, totalMemory } from './util';

export class ResourceUsage {
    constructor(
        public readonly Capacity: number,
        public readonly RequestTotal: number,
        public readonly LimitTotal: number,
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
        let totalPodCPU = 0;
        let totalPodCPULimit = 0;
        let totalPodMem = 0;
        let totalPodMemLimit = 0;
        let pods = await podsForNode(api, node.metadata!.name!);
        pods = pods.filter((pod: V1Pod) => pod.status!.phase === 'Running');
        pods.forEach((pod: V1Pod) => {
            const cpuTotal = totalCPU(pod);
            totalPodCPU += cpuTotal.request;
            totalPodCPULimit += cpuTotal.limit;

            const memTotal = totalMemory(pod);
            totalPodMem += memTotal.request;
            totalPodMemLimit += memTotal.limit;
        });

        const cpuUsage = new ResourceUsage(availableCPU, totalPodCPU, totalPodCPULimit);
        const memUsage = new ResourceUsage(availableMem, totalPodMem, totalPodMemLimit);
        result.push(new NodeStatus(node, cpuUsage, memUsage));
    }
    return result;
}
