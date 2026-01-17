import * as k8s from '@kubernetes/client-node';
import net from 'node:net';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const forward = new k8s.PortForward(kc);

const namespace = process.argv[2] || 'default';
const serviceName = process.argv[3] || 'demo-service';
const localPort = parseInt(process.argv[4] || '8080', 10);
const remotePort = parseInt(process.argv[5] || '8080', 10);

// This creates a local server that forwards traffic to a service in Kubernetes
// by resolving the service to its first ready pod and port-forwarding to that pod.
// Usage: npx ts-node port-forward-service.ts [namespace] [serviceName] [localPort] [remotePort]
// Example: npx ts-node port-forward-service.ts default my-service 8080 80
// This is equivalent to: kubectl port-forward svc/my-service 8080:80 -n default

const server = net.createServer(async (socket) => {
    try {
        await forward.portForwardService(namespace, serviceName, [remotePort], socket, null, socket);
    } catch (error) {
        console.error(`Error port-forwarding to service ${namespace}/${serviceName}:`, error.message);
        socket.destroy();
    }
});

server.listen(localPort, '127.0.0.1', () => {
    console.log(`Port forward server listening on http://127.0.0.1:${localPort}`);
    console.log(`Forwarding to service: ${namespace}/${serviceName}:${remotePort}`);
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
