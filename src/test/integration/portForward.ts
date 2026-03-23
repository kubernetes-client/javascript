import assert from 'node:assert';
import net from 'node:net';
import { setTimeout } from 'node:timers/promises';
import { CoreV1Api, AppsV1Api, KubeConfig, V1Service, V1Deployment } from '../../index.js';
import { PortForward } from '../../portforward.js';
import { generateName } from './name.js';

const MAX_PORT_FORWARD_RETRIES = 5;
const MAX_POD_READY_CHECKS = 60;
const POD_READY_CHECK_POLL_DELAY_MS = 1000;

export default async function portForwardIntegration() {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    console.log(`\n=== Port Forward Integration Test ===`);

    await deploymentSuccessTest(kc);
    await serviceSuccessTest(kc);
    await serviceNoSelectorTest(kc);

    console.log('\nAll Port Forward integration tests passed!');
}

async function deploymentSuccessTest(kc: KubeConfig): Promise<void> {
    console.log('Deployment Port Forward Success Test...');

    const namespace = 'default';
    const appName = generateName('pf-dp-test');
    const deploymentName = `${appName}-deployment`;
    const containerPort = 8080;
    const localPort = 18080;

    const portForward = new PortForward(kc);

    await createDeployment(appName, deploymentName, namespace, containerPort, kc);

    const deploymentServer = net.createServer(async (socket) => {
        try {
            await portForward.portForwardDeployment(
                namespace,
                deploymentName,
                [containerPort],
                socket,
                null,
                socket,
            );
        } catch (error) {
            console.error('Deployment port forward error:', error);
            socket.destroy();
        }
    });

    await new Promise<void>((resolve) => {
        deploymentServer.listen(localPort, '127.0.0.1', () => {
            console.log(`Local server listening on port ${localPort} for deployment test`);
            resolve();
        });
    });

    const deploymentTestPassed = await testPortForwardConnection(localPort, 'deployment');
    deploymentServer.close();
    assert.strictEqual(deploymentTestPassed, true, 'Failed to connect to deployment via port-forward');

    console.log('Cleaning up deployment...');
    const appsV1Client = kc.makeApiClient(AppsV1Api);
    await appsV1Client.deleteNamespacedDeployment({ name: deploymentName, namespace });
}

async function serviceSuccessTest(kc: KubeConfig): Promise<void> {
    console.log('Service Port Forward Success Test...');

    const namespace = 'default';
    const appName = generateName('pf-svc-test');
    const serviceName = `${appName}-service`;
    const deploymentName = `${appName}-deployment`;
    const containerPort = 8080;
    const localPort = 18081;

    const portForward = new PortForward(kc);

    await createDeployment(appName, deploymentName, namespace, containerPort, kc);
    await createService(appName, serviceName, namespace, containerPort, kc);

    const serviceServer = net.createServer(async (socket) => {
        try {
            await portForward.portForwardService(
                namespace,
                serviceName,
                [containerPort],
                socket,
                null,
                socket,
            );
        } catch (error) {
            console.error('Service port forward error:', error);
            socket.destroy();
        }
    });

    await new Promise<void>((resolve) => {
        serviceServer.listen(localPort, '127.0.0.1', () => {
            console.log(`Local server listening on port ${localPort} for service test`);
            resolve();
        });
    });

    const serviceTestPassed = await testPortForwardConnection(localPort, 'service');
    serviceServer.close();
    assert.strictEqual(serviceTestPassed, true, 'Failed to connect to service via port-forward');

    console.log('Cleaning up service and deployment...');
    const coreV1Client = kc.makeApiClient(CoreV1Api);
    const appsV1Client = kc.makeApiClient(AppsV1Api);
    await coreV1Client.deleteNamespacedService({ name: serviceName, namespace });
    await appsV1Client.deleteNamespacedDeployment({ name: deploymentName, namespace });
}

async function serviceNoSelectorTest(kc: KubeConfig) {
    console.log('Service Port Forward No Selector Test...');
    let errorThrown = false;

    const namespace = 'default';
    const appName = generateName('pf-test');
    const containerPort = 8080;
    const badServiceName = `${appName}-bad-service`;

    await createService('non-existent-app', badServiceName, namespace, containerPort, kc);

    try {
        try {
            const portForward = new PortForward(kc);
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
        const coreV1Client = kc.makeApiClient(CoreV1Api);
        await coreV1Client.deleteNamespacedService({ name: badServiceName, namespace });
    }
}

async function testPortForwardConnection(testPort: number, label: string): Promise<boolean> {
    for (let i = 0; i < MAX_PORT_FORWARD_RETRIES; i++) {
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

                socket.write('GET / HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n');
            });

            if (response.includes('Hello World')) {
                console.log(`✓ Successfully connected to ${label} via port-forward`);
                return true;
            }
        } catch (error) {
            console.log('error:', error);
            if (i < 4) {
                console.log(`Attempt ${i + 1} failed, retrying...`);
                await setTimeout(1000);
            }
        }
    }
    return false;
}

async function createDeployment(
    appName: string,
    deploymentName: string,
    namespace: string,
    containerPort: number,
    kc: KubeConfig,
) {
    console.log(`Creating test deployment ${deploymentName} in namespace: ${namespace}`);

    const appsV1Client = kc.makeApiClient(AppsV1Api);

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

    await appsV1Client.createNamespacedDeployment({ namespace, body: deployment });

    console.log('Waiting for deployment pods to be ready...');
    let podsReady = false;

    for (let i = 0; i < MAX_POD_READY_CHECKS; i++) {
        const deployment = await appsV1Client.readNamespacedDeployment({ name: deploymentName, namespace });
        if (
            deployment.status?.readyReplicas === deployment.spec?.replicas &&
            (deployment.status?.readyReplicas ?? 0) > 0
        ) {
            podsReady = true;
            console.log(`Deployment is ready with ${deployment.status?.readyReplicas} replicas`);
            break;
        }
        await setTimeout(POD_READY_CHECK_POLL_DELAY_MS);
    }

    assert.strictEqual(podsReady, true, 'Deployment pods did not become ready in time');
}

async function createService(
    appName: string,
    serviceName: string,
    namespace: string,
    containerPort: number,
    kc: KubeConfig,
) {
    console.log(`Creating service ${serviceName} in namespace: ${namespace}`);

    const coreV1Client = kc.makeApiClient(CoreV1Api);

    const service = new V1Service();
    service.metadata = { name: serviceName, namespace };
    service.spec = {
        selector: { app: appName },
        ports: [{ port: containerPort, targetPort: containerPort, protocol: 'TCP' }],
        type: 'ClusterIP',
    };

    await coreV1Client.createNamespacedService({ namespace, body: service });
}
