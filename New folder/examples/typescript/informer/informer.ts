// tslint:disable:no-console
import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const listFn = () => k8sApi.listNamespacedPod('default');

const informer = k8s.makeInformer(kc, '/api/v1/namespaces/default/pods', listFn);

informer.on('add', (obj: k8s.V1Pod) => { console.log(`Added: ${obj.metadata!.name}`); });
informer.on('update', (obj: k8s.V1Pod) => { console.log(`Updated: ${obj.metadata!.name}`); });
informer.on('delete', (obj: k8s.V1Pod) => { console.log(`Deleted: ${obj.metadata!.name}`); });
informer.on('error', (err: k8s.V1Pod) => {
  console.error(err);
  // Restart informer after 5sec
  setTimeout(() => {
    informer.start();
  }, 5000);
});

informer.start();
