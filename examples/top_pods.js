const k8s = require('../dist/index');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const metricsClient = new k8s.Metrics(kc);

k8s.topPods(k8sApi, metricsClient, "kube-system")
.then((pods) => {

    const podsColumns = pods.reduce((accum, next) => {
        accum.push({
            "POD": next.Pod.metadata.name,
            "CPU(cores)": next.CPU.CurrentUsage,
            "MEMORY(bytes)": next.Memory.CurrentUsage,
        });
        return accum;
    }, []);
    console.log("TOP PODS")
    console.table(podsColumns)
});

k8s.topPods(k8sApi, metricsClient, "kube-system")
.then((pods) => {

    const podsColumns = pods.reduce((accum, next) => {

        next.Containers.forEach(containerUsage => {
            accum.push({
                "POD": next.Pod.metadata.name,
                "NAME": containerUsage.Container,
                "CPU(cores)": next.CPU.CurrentUsage,
                "MEMORY(bytes)": next.Memory.CurrentUsage,
            });
        })
        return accum;
    }, []);

    console.log("TOP CONTAINERS")
    console.table(podsColumns)
});