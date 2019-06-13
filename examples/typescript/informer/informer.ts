// tslint:disable:no-console
import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const listFn = () => k8sApi.listPodForAllNamespaces();

const informer = k8s.makeInformer(kc, '/api/v1/namespaces/default/pods', listFn);

informer.on('add', (obj) => { console.log(`Added: ${obj}`); });
informer.on('update', (obj) => { console.log(`Updated: ${obj}`); });
informer.on('delete', (obj) => { console.log(`Deleted: ${obj}`); });
