// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');
const { createConfiguration, ServerConfiguration } = require('../dist');
const { PromiseMiddlewareWrapper } = require('../dist/gen/middleware');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const namespace = 'default';

k8sApi.listNamespacedPod({ namespace }).then((res) => {
    const patch = [
        {
            op: 'replace',
            path: '/metadata/labels',
            value: {
                foo: 'bar',
            },
        },
    ];
    // TODO this method of passing the content type will change when we figure out a way to properly do this
    const headerPatchMiddleware = new PromiseMiddlewareWrapper({
        pre: async (requestContext) => {
            requestContext.setHeaderParam('Content-type', 'application/json-patch+json');
            return requestContext;
        },
        post: async (responseContext) => responseContext,
    });
    let currentContext = kc.getCurrentContext();
    let currentCluster = kc.getCluster(currentContext);
    if (currentCluster === undefined || currentCluster === null) {
        throw new Error('Cluster is undefined');
    }
    let server = currentCluster.server;
    if (server === undefined) {
        throw new Error('Server is undefined');
    }

    const baseServerConfig = new ServerConfiguration(server, {});
    const configuration = createConfiguration({
        middleware: [headerPatchMiddleware],
        baseServer: baseServerConfig,
        authMethods: {
            default: kc,
        },
    });
    k8sApi
        .patchNamespacedPod(
            { name: res?.items?.[0].metadata?.name ?? '', namespace, body: patch },
            configuration,
        )
        .then(() => {
            console.log('Patched.');
        })
        .catch((err) => {
            console.log('Error: ');
            console.log(err);
        });
});
