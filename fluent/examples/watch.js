//
// Watch changes to a Deployments in a specific Namespace.
//
const Client = require('../lib').Client
const config = require('../lib').config
const JSONStream = require('json-stream')

const deploymentManifest = require('./nginx-deployment.json')

async function cleanup (client) {
  try {
    await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).delete()
  } catch (err) {
    console.warn(`Unable to delete deployment ${deploymentManifest.metadata.name}.  Skipping.`)
  }
}

async function triggerEvents (client) {
  //
  // Trigger some events
  //
  for (let count = 0; count < 3; count++) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest })
    await new Promise(resolve => setTimeout(resolve, 1000))
    await cleanup(client)
  }
}

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })

    //
    // Clean up our cluster and get ready to trigger events.
    //
    await cleanup(client)

    //
    // Get a JSON stream for Deployment events
    //
    const stream = client.apis.apps.v1.watch.namespaces('default').deployments.getStream()
    const jsonStream = new JSONStream()
    stream.pipe(jsonStream)
    jsonStream.on('data', object => {
      console.log('Event: ', JSON.stringify(object, null, 2))
    })

    //
    // Cause Events to be written to `jsonStream`
    //
    await triggerEvents(client)

    //
    // Disconnect from the watch endpoint
    //
    stream.abort()
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
