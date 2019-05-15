//
// Retrieve logs for a pod.
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })

    // Pod with single container
    let logs = await client.api.v1.namespaces('namespace_name').pods('pod_name').log.get()
    console.log(logs.body)

    // Pod with multiple containers
    logs = await client.api.v1.namespaces('namespace_name').pods('pod_name').log.get({
      qs: {
        container: 'container_name'
      }
    })
    console.log(logs.body)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
