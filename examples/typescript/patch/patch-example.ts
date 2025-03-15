import { CoreV1Api, KubeConfig, setHeaderOptions } from '@kubernetes/client-node';
import { PatchStrategy } from '@kubernetes/client-node/patch';

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
        setHeaderOptions('Content-Type', PatchStrategy.JsonPatch),
    );

    console.log('Patched.');
} catch (err) {
    console.error('Error: ', err);
}
