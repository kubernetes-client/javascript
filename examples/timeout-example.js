import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

try {
    const pods = await k8sApi.listNamespacedPod(
        { namespace: 'default' },
        k8s.setRequestTimeoutOptions(5_000),
    );
    console.log(`Found ${pods.items.length} pods.`);
} catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
        console.error('The Kubernetes API request timed out.');
    } else {
        throw err;
    }
}
