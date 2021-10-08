import * as k8s from '@kubernetes/client-node';
import * as net from 'net';

const command = process.argv[2];

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const forward = new k8s.PortForward(kc);

// This simple server just forwards traffic from itself to a service running in kubernetes
// -> localhost:8080 -> port-forward-tunnel -> kubernetes-pod
// This is basically equivalent to 'kubectl port-forward ...' but in TypeScript.
const server = net.createServer((socket) => {
    forward.portForward('default', 'demo', [8080], socket, null, socket);
});

server.listen(8080, '127.0.0.1');
