import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// This code is the JavaScript equivalent of `kubectl get resourcequotas --all-namespaces`.

try {
    const resourceQuotas = await k8sApi.listResourceQuotaForAllNamespaces();

    resourceQuotas.items.forEach((quota) => console.log(quota.metadata.name));
} catch (err) {
    console.error(err);
}
