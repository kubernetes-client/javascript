const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const path = '/api/v1/pods';
const watch = new k8s.Watch(kc);

const listFn = () => k8sApi.listPodForAllNamespaces()

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
