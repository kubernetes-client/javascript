const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod('default')
    .then((res) => {
        const patch = [
            {
                "op": "replace",
                "path":"/metadata/labels",
                "value": {
                    "foo": "bar"
                }
            }
        ];
        const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
        k8sApi.patchNamespacedPod(res.body.items[0].metadata.name, 'default', patch, undefined, undefined, undefined, undefined, options)
            .then(() => { console.log("Patched.")})
            .catch((err) => { console.log("Error: "); console.log(err)});
    });
