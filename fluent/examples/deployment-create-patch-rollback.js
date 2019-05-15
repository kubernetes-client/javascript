/* eslint no-console:0 */
//
// Create a deployment, patch it, and roll back to the original.
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config

const deploymentManifest = require('./nginx-deployment.json')

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.10' })

    // Create a deployment
    const create = await client.apis.apps.v1.ns('default').deploy.post({ body: deploymentManifest })
    console.log('Create: ', create)

    // Update the deployment
    // Change the image from nginx:1.7.9 to nginx:1.9.1
    const updateImage = await client.apis.apps.v1.ns('default').deploy('nginx-deployment').patch({
      body: {
        spec: {
          template: {
            spec: {
              containers: [{
                name: 'nginx',
                image: 'nginx:1.9.1'
              }]
            }
          }
        }
      }
    })
    console.log('Update: ', updateImage)

    // Rollback to nginx:1.7.9
    const rollback = await client.apis.apps.v1beta1.namespaces('default').deployments('nginx-deployment').rollback.post({
      body: {
        kind: 'DeploymentRollback',
        apiVersion: 'apps/v1beta1',
        name: 'nginx-deployment'
      }
    })
    console.log('Rollback: ', rollback)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
