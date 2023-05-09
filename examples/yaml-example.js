// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const yamlString = k8s.dumpYaml({
    metadata: {
        name: 'test',
    },
});

const yamlNamespace = k8s.loadYaml(yamlString);

k8sApi.createNamespace({ body: yamlNamespace }).then(
    (response) => {
        console.log('Created namespace');
        console.log(response);
        k8sApi.readNamespace({ name: yamlNamespace.metadata.name }).then((response) => {
            console.log(response);
            k8sApi.deleteNamespace({ name: yamlNamespace.metadata.name }, {} /* delete options */);
        });
    },
    (err) => {
        console.log('Error!: ' + err);
    },
);
