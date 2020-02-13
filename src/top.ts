import { CoreV1Api, V1Node, V1Pod } from './gen/api';
import { podsForNode, quantityToScalar, totalCPU } from './util';

export class ResourceUsage {
    constructor(public readonly Capacity: number, public readonly RequestTotal: number, public readonly LimitTotal: number) {}
}

export class NodeStatus {
    constructor(public readonly Node: V1Node, public readonly CPU: ResourceUsage) {}
}

export async function topNodes(api: CoreV1Api): Promise<NodeStatus[]> {
    const nodes = await api.listNode();
    const result: NodeStatus[] = [];
    for(let i = 0; i < nodes.body!.items!.length; i++) {
        const node = nodes.body!.items![i];
        const availableCPU = quantityToScalar(node.status!.allocatable!['cpu']);
        let totalPodCPU = 0;
        let totalPodCPULimit = 0;
        let pods = await podsForNode(api, node.metadata!.name!);
        pods = pods.filter((pod: V1Pod) => pod.status!.phase === 'Running');
        pods.forEach((pod: V1Pod) => {
            const total = totalCPU(pod);
            totalPodCPU += total.request;
            totalPodCPULimit += total.limit;
        });

        const cpuUsage = new ResourceUsage(availableCPU, totalPodCPU, totalPodCPULimit);
        result.push(new NodeStatus(node, cpuUsage));
    }
    return result;
}