import * as k8s from '@kubernetes/client-node';
import { PromiseMiddlewareWrapper } from '@kubernetes/client-node/dist/gen/middleware.js';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const namespace = 'default';

try {
    const res = await k8sApi.listNamespacedPod({ namespace });
    const patch = [
        {
            op: 'replace',
            path: '/metadata/labels',
            value: {
                foo: 'bar',
            },
        },
    ];
    const headerPatchMiddleware = new PromiseMiddlewareWrapper({
        pre: async (requestContext) => {
            requestContext.setHeaderParam('Content-type', 'application/json-patch+json');
            return requestContext;
        },
        post: async (responseContext) => responseContext,
    });
    let currentCluster = kc.getCurrentCluster();
    if (currentCluster === null) {
        throw new Error('Cluster is undefined');
    }
    let server = currentCluster.server;
    if (server === undefined) {
        throw new Error('Server is undefined');
    }

    const baseServerConfig = new k8s.ServerConfiguration(server, {});
    const configuration = k8s.createConfiguration({
        middleware: [headerPatchMiddleware],
        baseServer: baseServerConfig,
        authMethods: {
            default: kc,
        },
    });

    await k8sApi.patchNamespacedPod(
        { name: res?.items?.[0]?.metadata?.name ?? '', namespace, body: patch },
        configuration,
    );
    console.log('Patched.');
} catch (err) {
    console.error('Error: ');
    console.error(err);
}
