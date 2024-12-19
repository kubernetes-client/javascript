const k8s = require('../dist/index');

const kubeSystemNamespcae = 'kube-system';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const metricsClient = new k8s.Metrics(kc);

const main = async () => {
    try {
        const topPodsRes1 = await k8s.topPods(k8sApi, metricsClient, kubeSystemNamespcae);
        const podsColumns = topPodsRes1.map((pod) => {
            return {
                POD: pod.Pod.metadata.name,
                'CPU(cores)': pod.CPU.CurrentUsage,
                'MEMORY(bytes)': pod.Memory.CurrentUsage,
            };
        });
        console.log('Top pods');
        console.table(podsColumns);

        const topPodsRes2 = await k8s.topPods(k8sApi, metricsClient, kubeSystemNamespcae);
        const podsAndContainersColumns = topPodsRes2.flatMap((pod) => {
            return pod.Containers.map((containerUsage) => {
                return {
                    POD: pod.Pod.metadata.name,
                    NAME: containerUsage.Container,
                    'CPU(cores)': containerUsage.CPUUsage.CurrentUsage,
                    'MEMORY(bytes)': containerUsage.MemoryUsage.CurrentUsage,
                };
            });
        });
        console.log('Top containers');
        console.table(podsAndContainersColumns);
    } catch (err) {
        console.error(err);
    }
};

main();
