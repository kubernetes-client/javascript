const k8s = require('@kubernetes/client-node');

const namespace = 'default';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const main = async () => {
    const res = await k8sApi.listNamespacedPod(namespace);

    console.log(`${namespace} namespace pods: `, res.body);
};

main();
