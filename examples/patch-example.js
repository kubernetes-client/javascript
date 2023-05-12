// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod({ namespace: 'default' }).then((res) => {
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
    const options = { headers: { 'Content-type': k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH } };
    k8sApi
        .patchNamespacedPod(
            { name: res?.items?.[0].metadata?.name ?? '', namespace: 'default', body: patch },
            options,
        )
        .then(() => {
            console.log('Patched.');
        })
        .catch((err) => {
            console.log('Error: ');
            console.log(err);
        });
});
