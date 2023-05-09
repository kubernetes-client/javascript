// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

var namespace = {
    metadata: {
        name: 'test',
    },
};

k8sApi.createNamespace({ body: namespace }).then(
    (response) => {
        console.log('Created namespace');
        console.log(response);
        k8sApi.readNamespace({ name: namespace.metadata.name }).then((response) => {
            console.log(response);
            k8sApi.deleteNamespace({ name: namespace.metadata.name });
        });
    },
    (err) => {
        console.log('Error!: ' + err);
    },
);
