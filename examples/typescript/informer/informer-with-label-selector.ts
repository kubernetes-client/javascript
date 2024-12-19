import * as k8s from '@kubernetes/client-node';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const APP_LABEL_SELECTOR = 'app=foo';

const listFn = () =>
    k8sApi.listNamespacedPod('default', undefined, undefined, undefined, undefined, APP_LABEL_SELECTOR);

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
    await k8sApi.createNamespacedPod('default', appPod).catch((e) => console.error(e));
    console.log('Created new pod: ', name);
};

const deletePod = async (name: string, namespace: string) => {
    await k8sApi.deleteNamespacedPod(name, namespace);
    console.log('delete', name);
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
informer.on('error', async (err: k8s.V1Pod) => {
    console.error('Error: ', err);

    // Restart informer after 5sec
    await delay(5000);
    informer.start();
});

const main = async () => {
    await informer.start();
    await delay(5000);
    await createPod('server-foo', 'foo');
    await delay(5000);
    await createPod('server-bar', 'bar');
    await delay(5000);
    await deletePod('server-foo', 'default');
    await deletePod('server-bar', 'default');
    await delay(5000);
};

main();
