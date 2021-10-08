const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod('default')
    .then((res) => {
	console.log(res.body);
    })
    .catch((err) => {
        console.log(err);
    });

