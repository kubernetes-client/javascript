// tslint:disable:no-console
// in a real program use require('@kubernetes/client-node')
import * as k8s from '../../../dist/index';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const APP_LABEL_SELECTOR = 'app=foo';

const listFn = () =>
    k8sApi.listNamespacedPod({
        namespace: 'default',
        labelSelector: APP_LABEL_SELECTOR,
    });

const createPod = async (name: string, app: string) => {
    const appPodContainer = {
        name: 'nginx',
        image: 'nginx:latest',
    } as k8s.V1Container;

    const appPod = {
        metadata: {
            name,
            labels: {
                app,
            },
        },
        spec: {
            containers: [appPodContainer],
        },
    } as k8s.V1Pod;
    await k8sApi.createNamespacedPod({ namespace: 'default', body: appPod }).catch((e) => console.error(e));
    console.log('create', name);
};

const deletePod = async (podName: string, podNamespace: string) => {
    await k8sApi.deleteNamespacedPod({ name: podName, namespace: podNamespace });
    console.log('delete', name);
};

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const informer = k8s.makeInformer(kc, '/api/v1/namespaces/default/pods', listFn, APP_LABEL_SELECTOR);

informer.on('add', (obj: k8s.V1Pod) => {
    console.log(`Added: ${obj.metadata!.name}`);
});
informer.on('update', (obj: k8s.V1Pod) => {
    console.log(`Updated: ${obj.metadata!.name}`);
});
informer.on('delete', (obj: k8s.V1Pod) => {
    console.log(`Deleted: ${obj.metadata!.name}`);
});
informer.on('error', (err: k8s.V1Pod) => {
    console.error(err);
    // Restart informer after 5sec
    setTimeout(() => {
        informer.start();
    }, 5000);
});

informer.start().then(() => {
    setTimeout(async () => {
        await createPod('server-foo', 'foo');
        await delay(5000);
        await createPod('server-bar', 'bar');
        await delay(5000);
        await deletePod('server-foo', 'default');
        await deletePod('server-bar', 'default');
    }, 5000);
});
