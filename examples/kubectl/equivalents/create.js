// in a real program use require('@kubernetes/client-node')
import * as k8s from '../../../dist/index';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const client = k8s.KubernetesObjectApi.makeApiClient(kc);

const namespace = {
    metadata: {
        name: 'test'
    }
}

client.create(namespace)