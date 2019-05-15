/* eslint no-console:0 */
//
// Use a Custom Resource Definition to extend the Kubernetes API and the client.
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config

const crd = require('./crontabs-crd.json')

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })

    //
    // Create the CRD with the Kubernetes API
    //
    const create = await client.apis['apiextensions.k8s.io'].v1beta1.customresourcedefinitions.post({ body: crd })
    console.log('Create: ', create)

    //
    // Add endpoints to our client
    //
    client.addCustomResourceDefinition(crd)

    //
    // List all the resources of the new type
    //
    const all = await client.apis['stable.example.com'].v1.namespaces('default').crontabs.get()
    console.log('All: ', all)

    //
    // Get a specific resources.
    //
    const one = await client.apis['stable.example.com'].v1.namespaces('default').crontabs('foo').get()
    console.log('One: ', one)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
