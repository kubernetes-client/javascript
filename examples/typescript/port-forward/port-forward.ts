// in a real program use require('@kubernetes/client-node')
import * as k8s from '../../../dist';
import * as net from 'net';

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
