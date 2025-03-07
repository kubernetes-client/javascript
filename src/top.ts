import { CoreV1Api, V1Node, V1Pod, V1PodList } from './gen/index.js';
import { Metrics, PodMetric } from './metrics.js';
import {
    add,
    podsForNode,
    quantityToScalar,
    totalCPU,
    totalCPUForContainer,
    totalMemory,
    totalMemoryForContainer,
} from './util.js';

export class ResourceUsage {
    public readonly Capacity: number | bigint;
    public readonly RequestTotal: number | bigint;
    public readonly LimitTotal: number | bigint;

    constructor(Capacity: number | bigint, RequestTotal: number | bigint, LimitTotal: number | bigint) {
        this.Capacity = Capacity;
        this.RequestTotal = RequestTotal;
        this.LimitTotal = LimitTotal;
    }
}

export class CurrentResourceUsage {
    public readonly CurrentUsage: number | bigint;
    public readonly RequestTotal: number | bigint;
    public readonly LimitTotal: number | bigint;

    constructor(CurrentUsage: number | bigint, RequestTotal: number | bigint, LimitTotal: number | bigint) {
        this.CurrentUsage = CurrentUsage;
        this.RequestTotal = RequestTotal;
        this.LimitTotal = LimitTotal;
    }
}

export class NodeStatus {
    public readonly Node: V1Node;
    public readonly CPU: ResourceUsage;
    public readonly Memory: ResourceUsage;

    constructor(Node: V1Node, CPU: ResourceUsage, Memory: ResourceUsage) {
        this.Node = Node;
        this.CPU = CPU;
        this.Memory = Memory;
    }
}

export class ContainerStatus {
    public readonly Container: string;
    public readonly CPUUsage: CurrentResourceUsage;
    public readonly MemoryUsage: CurrentResourceUsage;

    constructor(Container: string, CPUUsage: CurrentResourceUsage, MemoryUsage: CurrentResourceUsage) {
        this.Container = Container;
        this.CPUUsage = CPUUsage;
        this.MemoryUsage = MemoryUsage;
    }
}

export class PodStatus {
    public readonly Pod: V1Pod;
    public readonly CPU: CurrentResourceUsage;
    public readonly Memory: CurrentResourceUsage;
    public readonly Containers: ContainerStatus[];

    constructor(
        Pod: V1Pod,
        CPU: CurrentResourceUsage,
        Memory: CurrentResourceUsage,
        Containers: ContainerStatus[],
    ) {
        this.Pod = Pod;
        this.CPU = CPU;
        this.Memory = Memory;
        this.Containers = Containers;
    }
}

export async function topNodes(api: CoreV1Api): Promise<NodeStatus[]> {
    // TODO: Support metrics APIs in the client and this library
    const nodes = await api.listNode();
    const result: NodeStatus[] = [];
    for (const node of nodes.items) {
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

// Returns the current pod CPU/Memory usage including the CPU/Memory usage of each container
export async function topPods(api: CoreV1Api, metrics: Metrics, namespace?: string): Promise<PodStatus[]> {
    // Figure out which pod list endpoint to call
    const getPodList = async (): Promise<V1PodList> => {
        if (namespace) {
            return await api.listNamespacedPod({ namespace });
        }
        return await api.listPodForAllNamespaces();
    };

    const [podMetrics, podList] = await Promise.all([metrics.getPodMetrics(namespace), getPodList()]);

    // Create a map of pod names to their metric usage
    // to make it easier to look up when we need it later
    const podMetricsMap = podMetrics.items.reduce((accum, next) => {
        accum.set(next.metadata.name, next);
        return accum;
    }, new Map<string, PodMetric>());

    const result: PodStatus[] = [];
    for (const pod of podList.items) {
        const podMetric = podMetricsMap.get(pod.metadata!.name!);

        const containerStatuses: ContainerStatus[] = [];
        let currentPodCPU: number | bigint = 0;
        let currentPodMem: number | bigint = 0;
        let podRequestsCPU: number | bigint = 0;
        let podLimitsCPU: number | bigint = 0;
        let podRequestsMem: number | bigint = 0;
        let podLimitsMem: number | bigint = 0;

        pod.spec!.containers.forEach((container) => {
            // get the the container CPU/Memory container.resources.requests/limits
            const containerCpuTotal = totalCPUForContainer(container);
            const containerMemTotal = totalMemoryForContainer(container);

            // sum each container's CPU/Memory container.resources.requests/limits
            // to get the pod's overall requests/limits
            podRequestsCPU = add(podRequestsCPU, containerCpuTotal.request);
            podLimitsCPU = add(podLimitsCPU, containerCpuTotal.limit);

            podRequestsMem = add(podLimitsMem, containerMemTotal.request);
            podLimitsMem = add(podLimitsMem, containerMemTotal.limit);

            // Find the container metrics by container.name
            // if both the pod and container metrics exist
            const containerMetrics =
                podMetric !== undefined
                    ? podMetric.containers.find((c) => c.name === container.name)
                    : undefined;

            // Store the current usage of each container
            // Sum each container to get the overall pod usage
            if (containerMetrics !== undefined) {
                const currentContainerCPUUsage = quantityToScalar(containerMetrics.usage.cpu);
                const currentContainerMemUsage = quantityToScalar(containerMetrics.usage.memory);

                currentPodCPU = add(currentPodCPU, currentContainerCPUUsage);
                currentPodMem = add(currentPodMem, currentContainerMemUsage);

                const containerCpuUsage = new CurrentResourceUsage(
                    currentContainerCPUUsage,
                    containerCpuTotal.request,
                    containerCpuTotal.limit,
                );
                const containerMemUsage = new CurrentResourceUsage(
                    currentContainerMemUsage,
                    containerMemTotal.request,
                    containerMemTotal.limit,
                );

                containerStatuses.push(
                    new ContainerStatus(containerMetrics.name, containerCpuUsage, containerMemUsage),
                );
            }
        });

        const podCpuUsage = new CurrentResourceUsage(currentPodCPU, podRequestsCPU, podLimitsCPU);
        const podMemUsage = new CurrentResourceUsage(currentPodMem, podRequestsMem, podLimitsMem);
        result.push(new PodStatus(pod, podCpuUsage, podMemUsage, containerStatuses));
    }
    return result;
}
