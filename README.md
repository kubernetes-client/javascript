# Javascript Kubernetes Client information

The Javascript clients for Kubernetes simply uses the 
[typescript client for kubernetes](https://github.com/kubernetes-client/typescript) from
vanilla Javascript.

# Installation
```sh
# Don't worry, you can call Typescript code from Javascript too...
$ npm install @kubernetes/typescript-node
```

# Example code

## List all pods
```javascript
const k8s = require('@kubernetes/typescript-node');

var k8sApi = k8s.Config.defaultClient();
k8sApi.listNamespacedPod('default')
    .then((res) => {
        console.log(res.body);
    });
```

## Create a new namespace
```javascript
const k8s = require('@kubernetes/typescript-node');

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

