import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// This code is the JavaScript equivalent of `kubectl create resourcequota my-quota --hard=pods=3`.

try {
    const quota = {
        metadata: {
            name: 'my-quota',
        },
        spec: {
            hard: {
                pods: '3',
            },
        },
    };
    const createdQuota = await k8sApi.createNamespacedResourceQuota({
        namespace: 'default',
        body: quota,
    });

    console.log('Created quota:', createdQuota);
} catch (err) {
    console.error(err);
}
