import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const cp = new k8s.Cp(kc);

const namespace = 'default';
const pod = 'nginx-4217019353-9gl4s';
const container = 'nginx';
const srcPath = './test.txt';
const targetPath = '/tmp';

await cp.cpFromPod(namespace, pod, container, srcPath, targetPath);
