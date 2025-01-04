import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// This code is the JavaScript equivalent of `kubectl create namespace test`.

try {
    const namespace = {
        metadata: {
            name: 'test',
        },
    };
    const createdNamespace = await k8sApi.createNamespace({ body: namespace });
    console.log('New namespace created:', createdNamespace);
} catch (err) {
    console.error(err);
}
