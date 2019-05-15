import * as Api from 'kubernetes-client';

const Client = Api.Client1_13;
const config = Api.config;

const deploymentManifest = {
  metadata: {
    name: 'foo'
  }
};

async function main0() {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })
    const namespaces = await client.api.v1.namespaces.get();

    //
    // Create a new Deployment.
    //
    const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest });
    console.log('Create: ', create);

    //
    // Fetch the Deployment we just created.
    //
    const deployment = await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).get();
    console.log('Deployment: ', deployment);

    //
    // Change the Deployment Replica count to 10
    //

    const replica = {
      spec: {
        replicas: 10
      }
    };

    const replicaModify = await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).patch({ body: replica });
    console.log('Replica Modification: ', replicaModify);

    //
    // Modify the image tag
    //
    const newImage = {
      spec: {
        template: {
          spec: {
            containers: [{
              name: 'nginx',
              image: 'nginx:1.8.1'
            }]
          }
        }
      }
    };
    const imageSet = await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).patch({ body: newImage });
    console.log('New Image: ', imageSet);

    //
    // Remove the Deployment we created.
    //
    const removed = await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).delete();
    console.log('Removed: ', removed);
  } catch (err) {
    console.error('Error: ', err);
  }
}

async function main1() {
  try {
    const client = new Client({
      config: {
        url: process.env.K8S_CLUSTER_HOST,
        auth: {
          user: process.env.K8S_USER,
          pass: process.env.K8S_PASSWORD
        },
        insecureSkipTlsVerify: true
      },
      version: process.env.K8S_CLUSTER_VERSION
    });

    //
    // Fetch all the pods
    const pods = await client.api.v1.pods.get();
    pods.body.items.forEach((item) => {
      console.log(item.metadata);
    });

    //
    // Fetch the Deployment from the kube-system namespace.
    //
    const deployment = await client.apis.apps.v1.namespaces('kube-system').deployments.get();
    deployment.body.items.forEach((item) => {
      console.log(item.metadata);
    });

  } catch (err) {
    console.error('Error: ', err);
  }
}

async function main2() {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });
    const create = await client.apis.apps.v1.ns('default').deploy.post({ body: deploymentManifest });
    console.log('Result: ', create);
  } catch (err) {
    console.error('Error: ', err);
  }
}

main0();
main1();
main2();
