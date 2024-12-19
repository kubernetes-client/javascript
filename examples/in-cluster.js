const k8s = require('@kubernetes/client-node');

const namespace = 'default';

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const main = async () => {
    try {
        const podsRes = await k8sApi.listNamespacedPod(namespace);
        console.log(podsRes.body);
    } catch (err) {
        console.error(err);
    }
};

main();
