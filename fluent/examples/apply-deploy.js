//
// Use this pattern to simulate kubectl apply -f; create a Deployment or replace it if it already exists.
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config

const deploymentManifest = require('./nginx-deployment.json')

async function applyDeploy () {
  const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })

  try {
    const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest })
    console.log('Create:', create)
  } catch (err) {
    if (err.code !== 409) throw err
    const replace = await client.apis.apps.v1.namespaces('default').deployments('nginx-deployment').put({ body: deploymentManifest })
    console.log('Replace:', replace)
  }
}

applyDeploy()
