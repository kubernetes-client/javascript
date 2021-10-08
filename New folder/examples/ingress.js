const k8s = require('@kubernetes/client-node')
const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const k8sApi = kc.makeApiClient(k8s.NetworkingV1beta1Api) // before 1.14 use extensions/v1beta1
const clientIdentifier = 'my-subdomain'

k8sApi.createNamespacedIngress('default', {
  apiVersions: 'networking.k8s.io/v1beta1',
  kind: 'Ingress',
  metadata: { name: `production-custom-${clientIdentifier}` },
  spec: {
    rules: [{
      host: `${clientIdentifier}.example.com`,
      http: {
        paths: [{
          backend: {
            serviceName: 'production-auto-deploy',
            servicePort: 5000
          },
          path: '/'
        }]
      }
    }],
    tls: [{ hosts: [`${clientIdentifier}.example.com`] }]
  }
}).catch(e => console.log(e))
