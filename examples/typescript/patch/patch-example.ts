import {
    CoreV1Api,
    RequestContext,
    ResponseContext,
    KubeConfig,
    createConfiguration,
    type Configuration,
    ServerConfiguration,
} from '@kubernetes/client-node';
import { PromiseMiddlewareWrapper } from '@kubernetes/client-node/dist/gen/middleware.js';

const kc = new KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(CoreV1Api);

try {
    const res = await k8sApi.listNamespacedPod({ namespace: 'default' });
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
        pre: async (requestContext: RequestContext) => {
            requestContext.setHeaderParam('Content-type', 'application/json-patch+json');
            return requestContext;
        },
        post: async (responseContext: ResponseContext) => responseContext,
    });
    const currentCluster = kc.getCurrentCluster();
    if (currentCluster === null) {
        throw new Error('Cluster is undefined');
    }
    const server = currentCluster.server;
    if (server === undefined) {
        throw new Error('Server is undefined');
    }

    const baseServerConfig: ServerConfiguration<{}> = new ServerConfiguration<{}>(server, {});
    const configuration: Configuration = createConfiguration({
        middleware: [headerPatchMiddleware],
        baseServer: baseServerConfig,
        authMethods: {
            default: kc,
        },
    });
    const podName = res.items[0]?.metadata?.name;
    if (podName === undefined) {
        throw new Error('Pod name is undefined');
    }

    await k8sApi.patchNamespacedPod(
        {
            name: podName,
            namespace: 'default',
            body: patch,
        },
        configuration,
    );

    console.log('Patched.');
} catch (err) {
    console.error('Error: ', err);
}
