const k8s = require('@kubernetes/client-node');

const namespace = 'default';

const kc = new k8s.KubeConfig();

kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const main = async () => {
    try {
        const podsRes = await k8sApi.listNamespacedPod(namespace);
        const patch = [
            {
                op: 'replace',
                path: '/metadata/labels',
                value: {
                    foo: 'bar',
                },
            },
        ];
        const options = { headers: { 'Content-type': k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH } };
        const podPatchRes = await k8sApi.patchNamespacedPod(
            podsRes.body.items[0].metadata.name,
            namespace,
            patch,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            options,
        );
        console.log('Pod patched: ', podPatchRes.body);
    } catch (err) {
        console.error(err);
    }
};

main();
