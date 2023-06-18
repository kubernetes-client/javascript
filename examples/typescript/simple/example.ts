// in a real program use require('@kubernetes/client-node')
import * as k8s from '../../../dist/index';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const namespace = 'default';

k8sApi.listNamespacedPod({ namespace }).then((res) => {
    // tslint:disable-next-line:no-console
    console.log(res.body);
});

// Example of instantiating a Pod object.
const pod = {} as k8s.V1Pod;
