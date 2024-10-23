import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const yamlString = k8s.dumpYaml({
    metadata: {
        name: 'test',
    },
});

const yamlNamespace = k8s.loadYaml(yamlString);

try {
    const response = await k8sApi.createNamespace({ body: yamlNamespace });
    console.log('Created namespace');
    console.log(response);
    const res = await k8sApi.readNamespace({ name: yamlNamespace.metadata.name });
    console.log(res);
    await k8sApi.deleteNamespace({ name: yamlNamespace.metadata.name }, {} /* delete options */);
} catch (err) {
    console.error('Error!: ' + err);
}
