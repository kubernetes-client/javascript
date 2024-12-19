const k8s = require('@kubernetes/client-node');
const fs = require('fs');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

/**
 * This sample code is Javascript equivalent to `kubectl apply -f namespace.yml`
 * You can find the sample namespace.yml file in the examples/resources folder
 */

const namespaceCreateYaml = async () => {
    try {
        const namespaceYaml = k8s.loadYaml(fs.readFileSync('../../resources/namespace.yml'));
        const createdNamespace = await k8sApi.createNamespace(namespaceYaml);
        console.log('New namespace created: ', createdNamespace.body);
    } catch (err) {
        console.error(err);
    }
};

namespaceCreateYaml();
