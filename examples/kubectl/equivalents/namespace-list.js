import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// This code is the JavaScript equivalent of `kubectl get ns`.

try {
    const namespaces = await k8sApi.listNamespace();
    namespaces.items.forEach((namespace) => console.log(namespace.metadata.name));
} catch (err) {
    console.error(err);
}
