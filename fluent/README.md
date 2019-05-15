# kubernetes-client

[![Join Slack](https://img.shields.io/badge/Join%20us%20on-Slack-e01563.svg)](https://godaddy-oss-slack.herokuapp.com/)
[![Build Status][build]](https://travis-ci.org/godaddy/kubernetes-client) [![Greenkeeper badge][greenkeeper]](https://greenkeeper.io/)

[greenkeeper]: https://badges.greenkeeper.io/godaddy/kubernetes-client.svg
[build]: https://travis-ci.org/godaddy/kubernetes-client.svg?branch=master

Simplified [Kubernetes API](http://kubernetes.io/) client for Node.js.

## Installation

Install via npm:

```
npm i kubernetes-client --save
```

## Initializing

kubernetes-client generates a Kubernetes API client at runtime based
on a Swagger / OpenAPI specification. You can generate a client using
the cluster's kubeconfig file and that cluster's API specification.

To create the config required to make a client, you can either:

let kubernetes-client load the file automatically through the `KUBECONFIG`
env

```js
const K8sConfig = require('kubernetes-client').config
const config = K8sConfig.fromKubeconfig()
```

provide your own path to a file:

```js
const K8sConfig = require('kubernetes-client').config
const path = '~/some/path'
const config = K8sConfig.fromKubeconfig(path)
```

provide a kubeconfig object from memory:

```js
const K8sConfig = require('kubernetes-client').config
// Should match the kubeconfig file format exactly
const kubeconfig = {
	apiVersion: 'v1',
	clusters: [],
	contexts: [],
	'current-context': '',
	kind: 'Config',
	users: []
}
const config = K8sConfig.fromKubeconfig(kubeconfig)
```

and you can also specify the kubeconfig context by passing it as the
second argument to `fromKubeconfig()`:

```
const config = K8sConfig.fromKubeconfig(null, 'dev')
```

Once you've built a config object, you can combine it with an API
spec to build the client, using specifications included with kubernetes-client:

```js
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
const client = new Client({ config: config.fromKubeconfig(), version: '1.9' })
```

or from a local OpenAPI/Swagger specification:

```js
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
const spec = require('./swagger.json')
const client = new Client({ config: config.fromKubeconfig(), spec})

```

or from the `/swagger.json` endpoint on your kube-apiserver:

```js
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
const client = new Client({ config: config.fromKubeconfig() })
await client.loadSpec()
```

or using basic auth:

```js
const Client = require('kubernetes-client').Client
const client = new Client({
  config: {
    url: 'CLUSTER_URL',
    auth: {
      user: 'admin',
      pass: 'YOUR_PASSWORD',
    },
    insecureSkipTlsVerify: true,
  }
})
```

or from within a Pod using `getInCluster`:

```js
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config
const client = new Client({ config: config.getInCluster() })
await client.loadSpec()
```

kubernetes-client supports reading the [service account
credentials](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#accessing-the-api-from-a-pod)
from different locations by setting the
`KUBERNETES_CLIENT_SERVICEACCOUNT_ROOT` environment variable. This is
useful, for example, when running
[Telepresence](https://www.telepresence.io/howto/volumes).

## Basic usage

kubernetes-client translates Path Item Objects \[[1]\] (*e.g*.,
`/api/v1/namespaces`) to object chains ending in HTTP methods (*e.g.*,
`api.v1.namespaces.get`).

So, to fetch all Namespaces:

```js
const namespaces = await client.api.v1.namespaces.get()
```

kubernetes-client translates Path Templating \[[2]\] (*e.g.*,
`/apis/apps/v1/namespaces/{namespace}/deployments`) to function calls (*e.g.*,
`apis.apps.v1.namespaces('default').deployments`).

So, to create a new Deployment in the default Namespace:

```js
const deploymentManifest = require('./nginx-deployment.json')
const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest })
```

and then fetch your newly created Deployment:

```js
const deployment = await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).get()
```

and finally, remove the Deployment:

```js
await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).delete()
```

kubernetes-client supports `.delete`, `.get`, `.patch`, `.post`, and `.put`.

## Documentation

kubernetes-client generates documentation for the included
specifications:

* [Kubernetes API v1.7](docs/1.7/README.md)
* [Kubernetes API v1.8](docs/1.8/README.md)
* [Kubernetes API v1.9](docs/1.9/README.md)
* [Kubernetes API v1.10](docs/1.10/README.md)
* [Kubernetes API v1.11](docs/1.11/README.md)
* [Kubernetes API v1.12](docs/1.12/README.md)
* [Kubernetes API v1.13](docs/1.13/README.md)

## TypeScript

kubernetes-client includes a typings declartion file for Kubernetes
API 1.13 and a complimentry `Client1_13` class:

```typescript
import * as Api from 'kubernetes-client';

const Client = Api.Client1_13;
const config = Api.config;
const client = new Client({ config: config.fromKubeconfig() });
```

When using TypeScript, kubernetes-client does not support dynamically
generating a client via `.loadSpec()`.

## More examples

[examples/](examples/) has snippets for using kubernetes-client:

* The basic usage example from above: [basic.js](./examples/basic.js)
* Use error handling to simulate `kubectl apply -f`: [apply-deploy.js](./examples/apply-deploy.js)
* Create a `client` from your kube-apiserver's swagger.json:
  [client-from-apiserver-swagger.js](./examples/client-from-apiserver-swagger.js)
* Create a `client` from one of the included Swagger specifications:
  [sync-client-version.js](./examples/sync-client-version.js)
* Using resource aliases supported by `kubectl` (*e.g.*, `.po` vs
  `.pods`): [convenience-properties.js](./examples/convenience-properties.js)
* Use watch endpoints to get a JSON stream of Deployment events:
  [watch.js](./examples/watch.js)
* Extend the Kubernetes API and a `client` with a
  CustomerResourceDefinition: [using-crds.js](./examples/using-crds.js)
* An extended CustomResourceDefinition example that implements a
  controller to "notify" on changes to Deployment objects:
  [deployment-notifier.js](./examples/deployment-notifier.js)
* A basic canary controller that removes Pods from a Service if they
  log an error: [canary-controller.js](./examples/canary-controller.js)
* Create a `client` using basic-auth:
  [basic-auth.js](./examples/basic-auth.js)
* Create a `client` using IAM authenticator and cmd auth (works with Amazon EKS):
  [iam-auth.js](./examples/iam-auth.js)
* Generate [badges](https://github.com/badges/shields) showing the
  status of your Deployments. Illustrates using the in-cluster config:
  [kubernetes-badges](https://github.com/silasbw/kubernetes-badges)
* Create a deployment, patch a change, and rollback to the original version:
  [deployment-create-patch-rollback.js](./examples/deployment-create-patch-rollback.js)
* Access [VerticalPodAutoscalers](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler):
  [examples/vpas](./examples/vpas)

## Contributing

See the kubernetes-client [Issues](./issues) if you're interested in
helping out; and look over the [CONTRIBUTING.md](./CONTRIBUTING.md)
before submitting new Issues and Pull Requests.

## Testing

Run the unit tests:

```
npm test
```

## References

* [An Intuitive Node.js Client for the Kubernetes API](https://godaddy.github.io/2018/04/10/an-intuitive-nodejs-client-for-the-kubernetes-api/)
* [Kubernetes Reference Documentation](https://kubernetes.io/docs/reference/)

## License

[MIT](LICENSE)

[1]: https://swagger.io/specification/#pathItemObject
[2]: https://swagger.io/specification/#pathTemplating
