const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const client = k8s.KubernetesObjectApi.makeApiClient(kc);

// update deployment "my-deployment" in namespace "my-namespace" to 3 replicas
const deployment = {
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: {
    name: 'my-deployment',
    namespace: 'my-namespace'
  },
  spec: {
    replicas: 3
  }
}

client.patch(deployment)