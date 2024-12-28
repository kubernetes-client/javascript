import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const client = k8s.KubernetesObjectApi.makeApiClient(kc);
const namespace = {
    apiVersion: 'v1',
    kind: 'Namespace',
    metadata: {
        name: 'test',
    },
};

console.log(await client.read(namespace));
