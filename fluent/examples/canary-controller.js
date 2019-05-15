/* eslint no-console:0 */
//
// Simple canary controller example: check Pod logs for any log messages with
// level "error"; on error, re-label the Pod to remove it from a Service.
//
// You can create a Deployment and Service to experiment with using the
// coalmine example:
//
//   $ kubectl apply -f examples/coalmine-deploy.json
//   $ kubectl expose deployment coalmine --type=NodePort --selector='app=coalmine,state=stable'
//   $ minikube service coalmine --url
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
const JSONStream = require('json-stream')

const namespace = 'default'
const deployment = 'coalmine'

const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })

function watchPod (pod) {
  const podClient = client.api.v1.namespaces(namespace).pods(pod)
  const stream = podClient.log.getStream({ qs: { follow: true } })
  const jsonStream = new JSONStream()
  stream.pipe(jsonStream)

  jsonStream.on('data', async object => {
    console.log('Log event:', JSON.stringify(object, null, 2))
    if (object.level === 'error') {
      console.warn(`Error in ${pod}`)
      await podClient.patch({
        body: {
          metadata: {
            labels: {
              state: 'failed'
            }
          }
        }
      })
      stream.abort()
    }
  })

  //
  // Watch logs for 60 seconds.
  //
  const timeout = setTimeout(() => stream.abort(), 60 * 1000)
  jsonStream.on('end', () => clearTimeout(timeout))
}

async function main () {
  try {
    //
    // Get the Pod names associated with the Deployment.
    //
    const manifest = await client.apis.apps.v1.namespaces(namespace).deployments(deployment).get()
    const matchLabels = manifest.body.spec.selector.matchLabels
    const matchQuery = Object.keys(matchLabels)
      .map(label => `${label}=${matchLabels[label]}`)
      .join(',')
    const pods = await client.api.v1.namespaces(namespace).pods.get({ qs: { labelSelector: matchQuery } })
    pods.body.items.map(podManifest => podManifest.metadata.name).forEach(watchPod)
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
