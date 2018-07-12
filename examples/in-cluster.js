const k8s = require('@kubernetes/client-node');

let kc = new k8s.KubeConfig();
kc.loadFromCluster();

let k8sApi = new k8s.Core_v1Api(kc.getCurrentCluster()['server']);
k8sApi.setDefaultAuthentication(kc);

k8sApi.listNamespacedPod('default')
    .then((res) => {
	console.log(res.body);
    })
    .catch((err) => {
        console.log(err);
    });

