import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const client = k8s.KubernetesObjectApi.makeApiClient(kc);
const namespace = {
    kind: 'Namespace',
    metadata: {
        name: 'test',
    },
};

client.create(namespace);
