const k8s = require('@kubernetes/client-node');

const namespace = 'default';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.NetworkingV1Api); // before 1.14 use extensions/v1beta1
const clientIdentifier = 'my-subdomain';

const main = async () => {
    try {
        const createIngressRes = k8sApi.createNamespacedIngress(namespace, {
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
                rules: [
                    {
                        host: `${clientIdentifier}`,
                        http: {
                            paths: [
                                {
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
                                },
                            ],
                        },
                    },
                ],
                tls: [
                    {
                        hosts: [`${clientIdentifier}.example.com`],
                    },
                ],
            },
        });
        console.log(createIngressRes.body);
    } catch (err) {
        console.error(err);
    }
};

main();
