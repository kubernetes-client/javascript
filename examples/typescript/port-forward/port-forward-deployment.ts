import * as k8s from '@kubernetes/client-node';
import net from 'node:net';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const forward = new k8s.PortForward(kc);

const namespace = process.argv[2] ?? 'default';
const deploymentName = process.argv[3] ?? 'demo-deployment';
const localPort = parseInt(process.argv[4] ?? '8080', 10);
const remotePort = parseInt(process.argv[5] ?? '8080', 10);

// This creates a local server that forwards traffic to a deployment in Kubernetes
// by resolving the deployment to its first ready pod and port-forwarding to that pod.
// Usage: node port-forward-deployment.ts [namespace] [deploymentName] [localPort] [remotePort]
// Example: node port-forward-deployment.ts default my-app 8080 3000
// This is equivalent to: kubectl port-forward deployment/my-app 8080:3000 -n default

const server = net.createServer(async (socket) => {
    try {
        await forward.portForwardDeployment(namespace, deploymentName, [remotePort], socket, null, socket);
    } catch (error) {
        console.error(
            `Error port-forwarding to deployment ${namespace}/${deploymentName}:`,
            (error as Error).message,
        );
        socket.destroy();
    }
});

server.listen(localPort, '127.0.0.1', () => {
    console.log(`Port forward server listening on http://127.0.0.1:${localPort}`);
    console.log(`Forwarding to deployment: ${namespace}/${deploymentName}:${remotePort}`);
    console.log(`Press Ctrl+C to stop`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
    console.error('Server error:', error);
});

process.on('SIGINT', () => {
    console.log('\nShutting down port-forward server...');
    server.close();
    process.exit(0);
});
