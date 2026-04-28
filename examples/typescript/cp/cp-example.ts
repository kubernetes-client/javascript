import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const cp = new k8s.Cp(kc);

const namespace = 'default';
const pod = 'nginx-4217019353-9gl4s';
const container = 'nginx';
const srcPath = './test.txt';
const targetPath = '/tmp';

// Simple copy without retries (default behavior)
await cp.cpFromPod(namespace, pod, container, srcPath, targetPath);

// For large files or unreliable connections, use retries:
// - maxTries > 0: Retry up to N times
// - maxTries < 0: Retry indefinitely
// await cp.cpFromPod(namespace, pod, container, srcPath, targetPath, undefined, 10);
// await cp.cpToPod(namespace, pod, container, srcPath, targetPath, 10);
