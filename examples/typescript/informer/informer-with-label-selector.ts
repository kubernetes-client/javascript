import * as k8s from '@kubernetes/client-node';
import { setTimeout as delay } from 'node:timers/promises';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const namespace = 'default';
const APP_LABEL_SELECTOR = 'app=foo';

const listFn = () =>
    k8sApi.listNamespacedPod({
        namespace,
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
    try {
        await k8sApi.createNamespacedPod({ namespace, body: appPod });
        console.log('create', name);
    } catch (e) {
        console.error(e);
    }
};

const deletePod = async (podName: string, podNamespace: string) => {
    await k8sApi.deleteNamespacedPod({ name: podName, namespace: podNamespace });
    console.log('delete', podName);
};

const informer = k8s.makeInformer(kc, `/api/v1/namespaces/${namespace}/pods`, listFn, APP_LABEL_SELECTOR);

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

await informer.start();
setTimeout(async () => {
    await createPod('server-foo', 'foo');
    await delay(5000);
    await createPod('server-bar', 'bar');
    await delay(5000);
    await deletePod('server-foo', namespace);
    await deletePod('server-bar', namespace);
}, 5000);
