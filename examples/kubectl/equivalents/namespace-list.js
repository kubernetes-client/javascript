const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

/**
 * This sample code is Javascript equivalent to `kubectl get ns`
 */

const namespaceList = async () => {
    try {
        const namespaces = await k8sApi.listNamespace();
        namespaces.body.items.map(namespace => console.log(namespace.metadata.name))
    } catch (err) {
        console.error(err);
    }
};

namespaceList();
