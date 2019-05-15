/* eslint no-console:0 */
//
// Use the shorter resource name aliases.
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config

const deploymentManifest = require('./nginx-deployment.json')

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })
    const create = await client.apis.apps.v1.ns('default').deploy.post({ body: deploymentManifest })
    console.log('Result: ', create)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
