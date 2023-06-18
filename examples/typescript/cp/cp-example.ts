// in a real program use require('@kubernetes/client-node')
import * as k8s from '../../../dist';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const cp = new k8s.Cp(kc);

const namespace = 'default';
const pod = 'nginx-4217019353-9gl4s';
const container = 'nginx';
const srcPath = '/test.txt';
const targetPath = '/tmp';

cp.cpFromPod(namespace, pod, container, srcPath, targetPath);
