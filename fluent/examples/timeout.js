/* eslint no-console:0 */
//
// Demonstrate how to set an HTTP request timeout.
//
const Client = require('../').Client
const config = require('../').config

async function main () {
  try {
    //
    // Set a long timeout for HTTP requests of 30,000 milliseconds.
    //
    const timeout = 30000
    const client = new Client({
      config: Object.assign(config.fromKubeconfig(), { timeout }),
      version: '1.9'
    })

    //
    // Get all the Namespaces.
    //
    const namespaces = await client.api.v1.namespaces.get()
    console.log('Namespaces: ', namespaces)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
