import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const cp = new k8s.Cp(kc);
cp.cpFromPod('default', 'nginx-4217019353-9gl4s', 'nginx', './test.txt', '/tmp');
