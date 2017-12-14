const k8s = require('@kubernetes/typescript-node');

let k8sApi = k8s.Config.defaultClient();
k8sApi.listNamespacedPod('default')
    .then((res) => {
	console.log(res.body);
    });

