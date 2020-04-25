const k8s = require('@kubernetes/client-node')
const kc = new k8s.KubeConfig()
kc.loadFromDefault()

// Using apiVersion networking.k8s.io/v1beta1, for versions before 1.14 use extensions/v1beta1
const k8sApi = kc.makeApiClient(k8s.NetworkingV1beta1Api)

function createIngress(clientIdentifier) {
  return {
    apiVersions: 'networking.k8s.io/v1beta1',
    kind: 'Ingress',
    metadata: {
      name: `production-custom-${clientIdentifier}`,
      namespace: 'default'
    },
    spec: {
      rules: [
        {
          name: `production-custom-${clientIdentifier}`,
          host: `${clientIdentifier}.example.com`,
          http: {
            paths: [
              {
                backend: {
                  serviceName: 'production-auto-deploy',
                  servicePort: 5000
                },
                path: '/'
              }
            ]
          }
        }
      ],
      tls: [
        {
          hosts: [`${clientIdentifier}.example.com`]
        }
      ]
    },
  }
}

function main () {
  const clientIdentifier = 'poop'
  const ingress = createIngress(clientIdentifier)
  k8sApi.createNamespacedIngress('default', ingress)
    .then(() => console.log('Success'))
    .catch(e => {
      console.log(e)
    })
}

main()
