import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// This code is the JavaScript equivalent of `kubectl get pods --namespace=default`.

try {
    const pods = await k8sApi.listNamespacedPod({ namespace: 'default' });

    pods.items.forEach((pod) => console.log(pod.metadata.name));
} catch (err) {
    console.error(err);
}
