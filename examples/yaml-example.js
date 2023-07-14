const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const yamlString = k8s.dumpYaml({
    metadata: {
        name: 'test',
    },
});

const yamlNamespace = k8s.loadYaml(yamlString);

const main = async () => {
    try {
        const createNamespaceRes = await k8sApi.createNamespace(yamlNamespace);
        console.log('Created namespace: ', createNamespaceRes.body);

        const namespaceRes = await k8sApi.readNamespace(yamlNamespace.metadata.name);
        console.log('Namespace: ', namespaceRes.body);

        await k8sApi.deleteNamespace(yamlNamespace.metadata.name, {});
    } catch (err) {
        console.error(err);
    }
};

main();
