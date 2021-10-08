import k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod('default')
    .then((res) => {
        // tslint:disable-next-line:no-console
        console.log(res.body);
    });

// Example of instantiating a Pod object.
const pod = {
} as k8s.V1Pod;
