// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const namespace = 'default';

k8sApi
    .listNamespacedPod({ namespace })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
