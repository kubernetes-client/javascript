import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const metricsClient = new k8s.Metrics(kc);

const namespace = 'kube-system';

{
    const pods = await k8s.topPods(k8sApi, metricsClient, namespace);
    const podsColumns = pods.map((pod) => {
        return {
            POD: pod.Pod.metadata?.name,
            'CPU(cores)': pod.CPU.CurrentUsage,
            'MEMORY(bytes)': pod.Memory.CurrentUsage,
        };
    });

    console.log('TOP PODS');
    console.table(podsColumns);
}

{
    const pods = await k8s.topPods(k8sApi, metricsClient, namespace);
    const podsAndContainersColumns = pods.flatMap((pod) => {
        return pod.Containers.map((containerUsage) => {
            return {
                POD: pod.Pod.metadata?.name,
                NAME: containerUsage.Container,
                'CPU(cores)': containerUsage.CPUUsage.CurrentUsage,
                'MEMORY(bytes)': containerUsage.MemoryUsage.CurrentUsage,
            };
        });
    });

    console.log('TOP CONTAINERS');
    console.table(podsAndContainersColumns);
}
