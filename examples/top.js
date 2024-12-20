const k8s = require('../dist/index');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const main = async () => {
    try {
        const topNodesRes = await k8s.topNodes(k8sApi);
        console.log(topNodesRes);
    } catch (err) {
        console.error(err);
    }
};

main();
