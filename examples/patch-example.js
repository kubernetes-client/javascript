import * as k8s from '@kubernetes/client-node';

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

    await k8sApi.patchNamespacedPod(
        { name: res?.items?.[0]?.metadata?.name ?? '', namespace, body: patch },
        k8s.setHeaderOptions('Content-Type', k8s.JsonPatch),
    );

    console.log('Patched.');
} catch (err) {
    console.error('Error: ');
    console.error(err);
}
