const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

/**
 * This sample code is Javascript equivalent to `kubectl create namespace test`
 */

const namespaceCreate = async () => {
    try {
        const namespace = {
            metadata: {
                name: 'test',
            },
        };
        const createdNamespace = await k8sApi.createNamespace(namespace);
        console.log('New namespace created: ', createdNamespace.body);
    } catch (err) {
        console.error(err);
    }
};

namespaceCreate();
