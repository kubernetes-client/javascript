const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const client = k8s.KubernetesObjectApi.makeApiClient(kc);

const namespace = {
    metadata: {
        name: 'test'
    }
}

const live_namespace = (await client.read(namespace)).body
console.log(live_namespace)
