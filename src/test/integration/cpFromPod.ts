import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { CoreV1Api, KubeConfig, V1Pod } from '../../index.js';
import { Cp } from '../../cp.js';
import { generateName } from './name.js';

export default async function cpFromPod() {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    const coreV1Client = kc.makeApiClient(CoreV1Api);
    const cp = new Cp(kc);

    const testPodName = generateName('cp-test-pod');
    const namespace = 'default';

    const pod = new V1Pod();
    pod.metadata = { name: testPodName };
    pod.spec = {
        containers: [
            {
                name: 'test-container',
                image: 'busybox',
                command: ['sh', '-c', 'echo "test content" > /tmp/test.txt && sleep 3600'],
            },
        ],
        restartPolicy: 'Never',
    };

    console.log(`Creating pod ${testPodName}`);
    await coreV1Client.createNamespacedPod({ namespace, body: pod });

    console.log('Waiting for pod to be ready...');
    let podReady = false;
    for (let i = 0; i < 30; i++) {
        const currentPod = await coreV1Client.readNamespacedPod({ name: testPodName, namespace });
        if (currentPod.status?.phase === 'Running') {
            podReady = true;
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    assert.strictEqual(podReady, true, 'Pod did not become ready in time');
    console.log('Pod is ready');

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'k8s-cp-test-'));

    try {
        console.log('Copying file from pod...');

        cp.cpFromPod(namespace, testPodName, 'test-container', 'test.txt', tempDir, '/tmp');

        // Wait for file to appear
        const copiedFilePath = path.join(tempDir, 'test.txt');
        let fileExists = false;
        for (let i = 0; i < 20; i++) {
            if (fs.existsSync(copiedFilePath)) {
                fileExists = true;
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        assert.strictEqual(fileExists, true, 'File was not copied');

        const content = fs.readFileSync(copiedFilePath, 'utf-8');
        assert.strictEqual(content.trim(), 'test content', 'File content does not match');

        console.log('cpFromPod test passed!');
    } finally {
        console.log('Cleaning up...');
        await coreV1Client.deleteNamespacedPod({ name: testPodName, namespace });
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}
