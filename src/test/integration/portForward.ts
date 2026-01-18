import assert from 'node:assert';
import net from 'node:net';
import { setTimeout } from 'node:timers/promises';
import { CoreV1Api, AppsV1Api, KubeConfig, V1Service, V1Deployment } from '../../index.js';
import { PortForward } from '../../portforward.js';
import { generateName } from './name.js';

export default async function portForwardIntegration() {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    const coreV1Client = kc.makeApiClient(CoreV1Api);
    const appsV1Client = kc.makeApiClient(AppsV1Api);
    const portForward = new PortForward(kc);

    const namespace = 'default';
    const appName = generateName('pf-test');
    const serviceName = `${appName}-service`;
    const deploymentName = `${appName}-deployment`;
    const containerPort = 8080;
    const testPort = 18080; // Local port for testing

    console.log(`\n=== Port Forward Integration Test ===`);
    console.log(`Creating test resources in namespace: ${namespace}`);

    // Create a deployment with a simple HTTP server
    const deployment = new V1Deployment();
    deployment.metadata = { name: deploymentName, namespace };
    deployment.spec = {
        replicas: 2,
        selector: { matchLabels: { app: appName } },
        template: {
            metadata: { labels: { app: appName } },
            spec: {
                containers: [
                    {
                        name: 'test-server',
                        image: 'busybox',
                        command: [
                            'sh',
                            '-c',
                            `while true; do echo -e "HTTP/1.1 200 OK\\r\\nContent-Length: 13\\r\\n\\r\\nHello World\\n" | nc -l -p ${containerPort} || true; done`,
                        ],
                        ports: [{ containerPort }],
                    },
                ],
            },
        },
    };

    console.log(`Creating deployment ${deploymentName}...`);
    await appsV1Client.createNamespacedDeployment({ namespace, body: deployment });

    // Create a service for the deployment
    const service = new V1Service();
    service.metadata = { name: serviceName, namespace };
    service.spec = {
        selector: { app: appName },
        ports: [{ port: containerPort, targetPort: containerPort, protocol: 'TCP' }],
        type: 'ClusterIP',
    };

    console.log(`Creating service ${serviceName}...`);
    await coreV1Client.createNamespacedService({ namespace, body: service });

    // Wait for pods to be ready
    console.log('Waiting for deployment pods to be ready...');
    let podsReady = false;
    for (let i = 0; i < 60; i++) {
        const deployment = await appsV1Client.readNamespacedDeployment({ name: deploymentName, namespace });
        if (
            deployment.status?.readyReplicas === deployment.spec?.replicas &&
            (deployment.status?.readyReplicas ?? 0) > 0
        ) {
            podsReady = true;
            console.log(`Deployment is ready with ${deployment.status?.readyReplicas} replicas`);
            break;
        }
        await setTimeout(1000);
    }

    assert.strictEqual(podsReady, true, 'Deployment pods did not become ready in time');

    try {
        // Test 1: Port forward to deployment
        console.log(`\nTest 1: Port forwarding to deployment ${deploymentName}...`);
        let deploymentTestPassed = false;

        const deploymentServer = net.createServer((socket) => {
            portForward
                .portForwardDeployment(namespace, deploymentName, [containerPort], socket, null, socket)
                .catch((error) => {
                    console.error('Deployment port forward error:', error.message);
                    socket.destroy();
                });
        });

        await new Promise<void>((resolve) => {
            deploymentServer.listen(testPort, '127.0.0.1', () => {
                console.log(`Local server listening on port ${testPort} for deployment test`);
                resolve();
            });
        });

        // Test connection to deployment via port-forward
        for (let i = 0; i < 5; i++) {
            try {
                const response = await new Promise<string>((resolve, reject) => {
                    const socket = net.createConnection({ port: testPort, host: '127.0.0.1' });
                    let data = '';

                    const timeout = globalThis.setTimeout(() => {
                        socket.destroy();
                        reject(new Error('Connection timeout'));
                    }, 5000);

                    socket.on('data', (chunk) => {
                        data += chunk.toString();
                        // Close socket when we receive data to avoid hanging
                        if (data.includes('Hello World')) {
                            clearTimeout(timeout);
                            socket.end();
                        }
                    });

                    socket.on('end', () => {
                        clearTimeout(timeout);
                        resolve(data);
                    });

                    socket.on('error', (error) => {
                        clearTimeout(timeout);
                        reject(error);
                    });

                    // Send a simple HTTP request
                    socket.write('GET / HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n');
                });

                if (response.includes('Hello World')) {
                    deploymentTestPassed = true;
                    console.log('✓ Successfully connected to deployment via port-forward');
                    break;
                }
            } catch (error) {
                console.log('error:', error);
                if (i < 4) {
                    console.log(`Attempt ${i + 1} failed, retrying...`);
                    await setTimeout(1000);
                }
            }
        }

        deploymentServer.close();
        assert.strictEqual(deploymentTestPassed, true, 'Failed to connect to deployment via port-forward');

        // Test 2: Port forward to service
        console.log(`\nTest 2: Port forwarding to service ${serviceName}...`);
        let serviceTestPassed = false;

        const serviceServer = net.createServer((socket) => {
            portForward
                .portForwardService(namespace, serviceName, [containerPort], socket, null, socket)
                .catch((error) => {
                    console.error('Service port forward error:', error.message);
                    socket.destroy();
                });
        });

        await new Promise<void>((resolve) => {
            serviceServer.listen(testPort, '127.0.0.1', () => {
                console.log(`Local server listening on port ${testPort} for service test`);
                resolve();
            });
        });

        // Test connection to service via port-forward
        for (let i = 0; i < 5; i++) {
            try {
                const response = await new Promise<string>((resolve, reject) => {
                    const socket = net.createConnection({ port: testPort, host: '127.0.0.1' });
                    let data = '';

                    const timeout = globalThis.setTimeout(() => {
                        socket.destroy();
                        reject(new Error('Connection timeout'));
                    }, 5000);

                    socket.on('data', (chunk) => {
                        data += chunk.toString();
                        // Close socket when we receive data to avoid hanging
                        if (data.includes('Hello World')) {
                            clearTimeout(timeout);
                            socket.end();
                        }
                    });

                    socket.on('end', () => {
                        clearTimeout(timeout);
                        resolve(data);
                    });

                    socket.on('error', (error) => {
                        clearTimeout(timeout);
                        reject(error);
                    });

                    // Send a simple HTTP request
                    socket.write('GET / HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n');
                });

                if (response.includes('Hello World')) {
                    serviceTestPassed = true;
                    console.log('✓ Successfully connected to service via port-forward');
                    break;
                }
            } catch (error) {
                console.log('error:', error);
                if (i < 4) {
                    console.log(`Attempt ${i + 1} failed, retrying...`);
                    await setTimeout(1000);
                }
            }
        }

        serviceServer.close();
        assert.strictEqual(serviceTestPassed, true, 'Failed to connect to service via port-forward');

        // Test 3: Error handling - service with no selector
        console.log(`\nTest 3: Error handling - service with no matching pods...`);
        const badServiceName = `${appName}-bad-service`;
        const badService = new V1Service();
        badService.metadata = { name: badServiceName, namespace };
        badService.spec = {
            selector: { app: 'nonexistent-app' }, // No pods match this selector
            ports: [{ port: containerPort, targetPort: containerPort, protocol: 'TCP' }],
            type: 'ClusterIP',
        };

        await coreV1Client.createNamespacedService({ namespace, body: badService });

        try {
            // Try to port forward to service with no ready pods
            let errorThrown = false;
            try {
                const dummySocket = new net.Socket();
                await portForward.portForwardService(
                    namespace,
                    badServiceName,
                    [containerPort],
                    dummySocket,
                    null,
                    dummySocket,
                );
            } catch (error) {
                errorThrown = true;
                console.log(`✓ Correctly threw error: ${(error as Error).message}`);
            }
            assert.strictEqual(errorThrown, true, 'Should have thrown error for service with no ready pods');
        } finally {
            await coreV1Client.deleteNamespacedService({ name: badServiceName, namespace });
        }

        console.log('\n✓ Port forward integration tests passed!');
    } finally {
        console.log('\nCleaning up test resources...');
        try {
            await appsV1Client.deleteNamespacedDeployment({ name: deploymentName, namespace });
            await coreV1Client.deleteNamespacedService({ name: serviceName, namespace });
        } catch (error) {
            console.warn('Cleanup warning:', (error as Error).message);
        }
    }
}
