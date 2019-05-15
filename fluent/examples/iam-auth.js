/* eslint no-console:0 */
//
// Create an API client for an AWS EKS cluster using IAM authentication
// Note: In order for this to work, you must set the environment
// variable AWS_PROFILE
//
const Client = require('kubernetes-client').Client

async function main () {
  try {
    const client = new Client({
      config: {
        url: process.env.K8S_CLUSTER_HOST,
        auth: {
          provider: {
            type: 'cmd',
            config: {
              'cmd-path': 'aws-iam-authenticator',
              'cmd-args': 'token -i ' + process.env.K8S_AUTH_TOKEN,
              'cmd-env': {
                AWS_PROFILE: process.env.AWS_PROFILE
              },
              'token-key': 'status.token'
            }
          }
        },
        insecureSkipTlsVerify: true
      },
      version: process.env.K8S_CLUSTER_VERSION
    })

    //
    // Fetch all the pods
    const pods = await client.api.v1.pods.get()
    pods.body.items.forEach((item) => {
      console.log(item.metadata)
    })

    //
    // Fetch the Deployment from the kube-system namespace.
    //
    const deployment = await client.apis.apps.v1.namespaces('kube-system').deployments().get()
    deployment.body.items.forEach((item) => {
      console.log(item.metadata)
    })
  } catch (err) {
    console.error('Error: ', err)
  }
}

main()
