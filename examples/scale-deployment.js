// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

const targetNamespaceName = 'default';
const targetDeploymentName = 'docker-test-deployment';
const numberOfTargetReplicas = 3;

async function scale(namespace, name, replicas) {
    // find the particular deployment
    const deployment = await k8sApi.readNamespacedDeployment({
        name,
        namespace,
    });

    if (!deployment || !deployment.spec) {
        throw new Error(`Deployment ${name} not found in namespace ${namespace}`);
    }
    // edit
    const newDeployment = {
        ...deployment,
        spec: {
            ...deployment.spec,
            replicas,
        },
    };

    // replace
    await k8sApi.replaceNamespacedDeployment({
        name,
        namespace,
        body: newDeployment,
    });
}

scale(targetNamespaceName, targetDeploymentName, numberOfTargetReplicas);
