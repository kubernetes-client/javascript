import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const namespace = 'default';

const res = await k8sApi.listNamespacedPod({ namespace });
console.log(res);

// Example of instantiating a Pod object.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pod = {} as k8s.V1Pod;
