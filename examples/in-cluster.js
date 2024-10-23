import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const namespace = 'default';

try {
    const res = await k8sApi.listNamespacedPod({ namespace });

    console.log(res);
} catch (err) {
    console.error(err);
}
