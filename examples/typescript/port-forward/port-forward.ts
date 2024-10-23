import * as k8s from '@kubernetes/client-node';
import net from 'node:net';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const forward = new k8s.PortForward(kc);

const namespace = 'default';
const pod = 'demo';
const port = 8080;

// This simple server just forwards traffic from itself to a service running in kubernetes
// -> localhost:8080 -> port-forward-tunnel -> kubernetes-pod
// This is basically equivalent to 'kubectl port-forward ...' but in TypeScript.
const server = net.createServer((socket) => {
    forward.portForward(namespace, pod, [port], socket, null, socket);
});

server.listen(port, '127.0.0.1');
