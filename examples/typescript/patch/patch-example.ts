// in a real program use require('@kubernetes/client-node')
import {
    CoreV1Api,
    RequestContext,
    ResponseContext,
    KubeConfig,
    createConfiguration,
    Configuration,
    ServerConfiguration,
} from '../../../dist';
import { PromiseMiddlewareWrapper } from '../../../dist/gen/middleware';

const kc = new KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(CoreV1Api);

k8sApi
    .listNamespacedPod({
        namespace: 'default',
    })
    .then((res) => {
        const patch = [
            {
                op: 'replace',
                path: '/metadata/labels',
                value: {
                    foo: 'bar',
                },
            },
        ];
        const options = { headers: { 'Content-type': 'application/json-patch+json' } };
        const headerPatchMiddleware = new PromiseMiddlewareWrapper({
            pre: async (requestContext: RequestContext) => {
                requestContext.setHeaderParam('Content-type', 'application/json-patch+json');
                return requestContext;
            },
            post: async (responseContext: ResponseContext) => responseContext,
        });
        const currentContext = kc.getCurrentContext();
        const currentCluster = kc.getCluster(currentContext);
        if (currentCluster === undefined || currentCluster === null) {
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

        const podName = res.items[0].metadata?.name;
        if (podName === undefined) {
            throw new Error('Pod name is undefined');
        }
        k8sApi
            .patchNamespacedPod(
                {
                    name: podName,
                    namespace: 'default',
                    body: patch,
                },
                configuration,
            )
            .then(() => {
                // tslint:disable-next-line:no-console
                console.log('Patched.');
            })
            .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log('Error: ', err);
            });
    });
