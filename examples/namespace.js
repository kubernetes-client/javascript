const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const namespace = {
    metadata: {
        name: 'test',
    },
};

const main = async () => {
    try {
        const createNamespaceRes = await k8sApi.createNamespace(namespace);
        console.log('New namespace created: ', createNamespaceRes.body);

        const readNamespaceRes = await k8sApi.readNamespace(namespace.metadata.name);
        console.log('Namespcace: ', readNamespaceRes.body);

        await k8sApi.deleteNamespace(namespace.metadata.name, {});
    } catch (err) {
        console.error(err);
    }
};

main();
