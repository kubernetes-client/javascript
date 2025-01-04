import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// This code is the JavaScript equivalent of `kubectl run demo-pod --image=nginx --namespace=default`.

const pod = {
    metadata: {
        name: 'demo-pod',
    },
    spec: {
        containers: [
            {
                name: 'nginx-container',
                image: 'nginx',
            },
        ],
    },
};
const namespace = 'default';

try {
    const createdPod = await k8sApi.createNamespacedPod({
        namespace,
        body: pod,
    });
    console.log('Created pod:', createdPod);
} catch (err) {
    console.error(err);
}
