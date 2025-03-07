import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.NetworkingV1Api);

const namespace = 'default';
const clientIdentifier = 'my-subdomain';

try {
    await k8sApi
        .createNamespacedIngress({
            namespace,
            body: {
                apiVersion: 'networking.k8s.io/v1',
                kind: 'Ingress',
                metadata: { name: `production-custom-${clientIdentifier}` },
                spec: {
                    rules: [
                        {
                            host: `${clientIdentifier}.example.com`,
                            http: {
                                paths: [
                                    {
                                        backend: {
                                            service: {
                                                name: 'production-auto-deploy',
                                                port: { number: 5000 },
                                            },
                                        },
                                        path: '/',
                                        pathType: 'ImplementationSpecific',
                                    },
                                ],
                            },
                        },
                    ],
                    tls: [{ hosts: [`${clientIdentifier}.example.com`] }],
                },
            },
        })
} catch (e) {
    console.error(e);
}
