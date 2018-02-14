# Javascript Kubernetes Client information

The Javascript clients for Kubernetes is implemented in 
[typescript](https://typescriptlang.org), but can be called from either
Javascript or Typescript.

For now, the client is implemented for server-side use with node 
using the `request` library.

There are future plans to also build a jQuery compatible library but
for now, all of the examples and instructions assume the node client.

# Installation
```sh
$ npm install @kubernetes/client-node
```

# Example code

## List all pods
```javascript
const k8s = require('@kubernetes/client-node');

var k8sApi = k8s.Config.defaultClient();
k8sApi.listNamespacedPod('default')
    .then((res) => {
        console.log(res.body);
    });
```

## Create a new namespace
```javascript
const k8s = require('@kubernetes/client-node');

var k8sApi = k8s.Config.defaultClient();

var namespace = {
  metadata: {
    name: 'test'
  }
};

k8sApi.createNamespace(namespace).then(
  (response) => {
    console.log('Created namespace');
    console.log(response);
    k8sApi.readNamespace(namespace.metadata.name).then(
      (response) => {
        console.log(response);
        k8sApi.deleteNamespace(
          namespace.metadata.name, {} /* delete options */);
      });
  },
  (err) => {
    console.log('Error!: ' + err);
  }
);
```

# Development

All dependencies of this project are expressed in its 
[`package.json` file](node-client/package.json). Before you start developing, ensure
that you have [NPM](https://www.npmjs.com/) installed, then run:

```console
npm install
```

# Testing

Tests are written using the [Chai](http://chaijs.com/) library. See
[`config_test.ts`](./config_test.ts) for an example.

To run tests, execute the following:

```console
npm test
```

