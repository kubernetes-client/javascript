/* eslint no-console:0 */
//
// Create an API client based on a specified API version. kubernetes-client uses
// included swagger specification files.
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config

const deploymentManifest = require('./nginx-deployment.json')

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })
    const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest })
    console.log('Result: ', create)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
