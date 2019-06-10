const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const path = '/api/v1/namespaces/default/pods';
const watch = new k8s.Watch(kc);
const listFn = (fn) => {
    k8sApi.listNamespacedPod('default')
        .then((res) => {
            const podList = res.body;
            fn(podList.items, podList.metadata.resourceVersin);
        })
        .catch((err) => {
            console.log(err);
        });
}
const cache = new k8s.ListWatch(path, watch, listFn);

const looper = () => {
    const list = cache.list('default');
    if (list) {
        let names = [];
        for (let i = 0; i < list.length; i++) {
            names.push(list[i].metadata.name);
        }
        console.log(names.join(','));
    }
    setTimeout(looper, 2000);
}

looper();
