import k8s = require('@kubernetes/client-node');

let k8sApi = k8s.Config.defaultClient();

k8sApi.listNamespacedPod('default')
    .then((res) => {
        console.log(res.body);
    });

// Example of instantiating a Pod object.
let pod = {
} as k8s.V1Pod;
