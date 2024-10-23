import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const namespace = 'default';

const res = await k8sApi.listNamespacedPod({ namespace });
console.log(res.body);

// Example of instantiating a Pod object.
const pod = {} as k8s.V1Pod;
