const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const yamlString = k8s.dumpYaml({
  metadata: {
    name: 'test'
  }
});

const yamlNamespace = k8s.loadYaml(yamlString);

k8sApi.createNamespace(yamlNamespace).then(
  (response) => {
    console.log('Created namespace');
    console.log(response);
    k8sApi.readNamespace(yamlNamespace.metadata.name).then(
      (response) => {
        console.log(response);
        k8sApi.deleteNamespace(
          yamlNamespace.metadata.name, {} /* delete options */);
      });
  },
  (err) => {
    console.log('Error!: ' + err);
  }
);
