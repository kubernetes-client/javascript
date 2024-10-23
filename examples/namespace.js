import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

var namespace = {
    metadata: {
        name: 'test',
    },
};

try {
    const response = await k8sApi.createNamespace({ body: namespace });
    console.log('Created namespace');
    console.log(response);
    const res = await k8sApi.readNamespace({ name: namespace.metadata.name });
    console.log(res);
    await k8sApi.deleteNamespace({ name: namespace.metadata.name });
} catch (err) {
    console.error('Error!: ' + err);
}
