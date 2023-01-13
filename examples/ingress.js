const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.NetworkingV1Api); // before 1.14 use extensions/v1beta1
const clientIdentifier = 'my-subdomain';

k8sApi.createNamespacedIngress('default', {
  apiVersions: 'networking.k8s.io/v1',
  kind: 'Ingress',
  metadata: {
    name: `production-custom-${clientIdentifier}`,
    labels: {
      createdBy: 'node-client',
    },
    annotations: {
      'meta.helm.sh/release-namespace': 'production-auto-deploy',
    },
  },
  spec: {
    ingressClassName: 'nginx',
    rules: [{
      host: `${clientIdentifier}`,
      http: {
        paths: [{
          backend: {
            service: {
              name: 'production-auto-deploy',
              port: {
                number: 5000,
              },
            },
          },
          path: '/default-kuberiq(/|$)(.*)',
          pathType: 'ImplementationSpecific',
        }],
      },
    }],
    tls: [{
      hosts: [`${clientIdentifier}.example.com`],
    }],
  },
}).catch(e => console.log(e));
