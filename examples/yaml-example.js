const k8s = require('@kubernetes/client-node');
const fs = require('fs');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.Core_v1Api);

const yamlString = k8s.dumpYaml({
  metadata: {
    name: 'test'
  }
});

const yamlNamespace = k8s.loadYaml(k8s.dumpYaml(yamlString));

k8sApi.createNamespace(yamlNamespace).then(
  (response) => {
    console.log('Created namespace');
    console.log(response);
    k8sApi.readNamespace(namespace.metadata.name).then(
      (response) => {
        console.log(response);
	k8sApi.deleteNamespace(
          namespace.metadata.name, {} /* delete options */);
      });
  },
  (err) => {
    console.log('Error!: ' + err);
  }
);