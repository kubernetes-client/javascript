import { CoreV1Api, KubeConfig, requestTimeoutMiddleware } from '@kubernetes/client-node';

const kc = new KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(CoreV1Api);

try {
    const pods = await k8sApi.listNamespacedPod(
        { namespace: 'default' },
        {
            middleware: [requestTimeoutMiddleware(5_000)],
            middlewareMergeStrategy: 'append',
        },
    );
    console.log(`Found ${pods.items.length} pods.`);
} catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
        console.error('The Kubernetes API request timed out.');
    } else {
        throw err;
    }
}
