const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

/**
 * This sample code is Javascript equivalent to `kubectl get pods --namespace=default`
 */

const podFilterByNamespace = async () => {
    try {
        const pods = await k8sApi.listNamespacedPod('default');
        pods.body.items.map(pod => console.log(pod.metadata.name))
    } catch (err) {
        console.error(err);
    }
};

podFilterByNamespace();
