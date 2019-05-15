/* eslint no-console:0 */
//
// Example "DeploymentNotifier" controller using a Custom Resource Definition
// to configure a "notifier" on changes to Deployments.
//
// You can experiment with the controller by creating a Deployment and an
// associated DeploymentNotifier object:
//
//   $ kubectl apply -f examples/nginx-deployment.json
//   $ kubectl apply -f examples/nginx-deploymentnotifier.json
//   $ kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
//
// One shortcoming of this implementation is the lack of support for handling
// disconnections from watch endpoints. The kube-apiserver periodically
// disconnects watch streams (according to --min-request-timeout).
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
const JSONStream = require('json-stream')

const crd = require('./deploymentnotifier-crd.json')

function watchDeployment (client, notifier) {
  let version = '(none)'
  const stream = client.apis.apps.v1beta.watch.ns('default').deploy(notifier.deploymentName).getStream()
  const jsonStream = new JSONStream()
  stream.pipe(jsonStream)

  jsonStream.on('data', async event => {
    const newVersion = event.object.spec.template.spec.containers.map(container => container.image).join(',')
    //
    // Simple "notification": log to the console. A better option could be
    // calling the New Relic Deployment API or GithHub Deloyment Status or ...
    //
    console.log(`DeploymentNotifier ${notifier.metadata.name}: ${event.object.metadata.name} ${event.type}`)
    if (version !== newVersion) {
      console.log(`${version} -> ${newVersion}`, JSON.stringify(notifier.notify, null, 2))
      version = newVersion
    }
  })

  return stream
}

function watchDeploymentNotifiers (client) {
  const stream = client.apis['kubernetes-client.io'].v1.watch.deploymentnotifiers.getStream()
  const jsonStream = new JSONStream()
  stream.pipe(jsonStream)

  const watchers = {}
  jsonStream.on('data', async event => {
    const id = `${event.object.metadata.namespace}/${event.object.metadata.name}`
    if (event.type === 'ADDED') {
      //
      // Watch the Deployment for each DeploymentNotifier.
      //
      watchers[id] = watchDeployment(client, event.object)
    } else if (event.type === 'DELETED') {
      watchers[id].abort()
      delete watchers[id]
    }
  })
}

async function main () {
  try {
    const client = new Client({ config: config.fromKubeconfig() })
    await client.loadSpec()

    //
    // Create the CRD if it doesn't already exist.
    //
    try {
      await client.apis['apiextensions.k8s.io'].v1beta1.customresourcedefinitions.post({ body: crd })
    } catch (err) {
      //
      // API returns a 409 Conflict if CRD already exists.
      //
      if (err.statusCode !== 409) throw err
    }

    //
    // Add endpoints to our client
    //
    client.addCustomResourceDefinition(crd)

    //
    // Watch DeploymentNotifiers.
    //
    watchDeploymentNotifiers(client)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
