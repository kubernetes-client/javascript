# kubernetes-client

Fluent [Kubernetes API](http://kubernetes.io/) client for Node.js.

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

let kubernetes-client configure automatically by trying the `KUBECONFIG`
environment variable first, then `~/.kube/config`, then an in-cluster
service account, and lastly settling on a default proxy configuration:

```js
const client = new Client({ version: '1.13' })
```

provide your own path to a file:

```js
const { KubeConfig } = require('kubernetes-client')
const kubeconfig = new KubeConfig()
kubeconfig.loadFromFile('~/some/path')
const Request = require('kubernetes-client/backends/request')

const backend = new Request({ kubeconfig })
const client = new Client({ backend, version: '1.13' })
```

provide a configuration object from memory:

```js
// Should match the kubeconfig file format exactly
const config = {
  apiVersion: 'v1',
  clusters: [],
  contexts: [],
  'current-context': '',
  kind: 'Config',
  users: []
}
const { KubeConfig } = require('kubernetes-client')
const kubeconfig = new KubeConfig()
kubeconfig.loadFromString(JSON.stringify(config))

const Request = require('kubernetes-client/backends/request')
const backend = new Request({ kubeconfig })
const client = new Client({ backend, version: '1.13' })
```

and you can also specify the context by setting it in the `kubeconfig`
object:

```js
kubeconfig.setCurrentContext('dev')
```

You can also elide the `.version` and pass an OpenAPI specification:

```js
const spec = require('./swagger.json')
const client = new Client({ spec })
```

or load a specification dynamically from the kube-apiserver:

```js
const client = new Client()
await client.loadSpec()
```

See [Examples](#examples) for more configuration examples.

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

## Examples

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
* Access [VerticalPodAutoscalers](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler): [vpas/](./examples/vpas)
* Create a `client` using an in-cluster configuration: [in-cluster-auth.js](./examples/in-cluster-auth.js)

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Testing

Run the unit tests:

```
npm test
```

The integration tests use the `current-context` in your kubeconfig file. Run the integration tests:

```
npm run test-integration
```

Run integration tests with the `@kubernetes/client-node` backend:

```
KUBERNETES_CLIENT_BACKEND=client-node npm run test-integration
```

[1]: https://swagger.io/specification/#pathItemObject
[2]: https://swagger.io/specification/#pathTemplating
