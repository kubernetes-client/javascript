import assert from 'node:assert';
import { CoreV1Api, KubeConfig, V1Pod } from '../../index.js';
import { Watch } from '../../watch.js';
import { generateName } from './name.js';

export default async function watchPods() {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    const coreV1Client = kc.makeApiClient(CoreV1Api);
    const watch = new Watch(kc);

    const namespace = 'default';
    const labelKey = 'watch-test';
    const labelValue = generateName('run');

    console.log(`\n=== Watch Integration Test (label=${labelValue}) ===`);

    const receivedEvents: { type: string; name: string }[] = [];

    let addResolve: () => void;
    const addPromise = new Promise<void>((resolve) => {
        addResolve = resolve;
    });

    let deleteResolve: () => void;
    const deletePromise = new Promise<void>((resolve) => {
        deleteResolve = resolve;
    });

    const controller = await watch.watch(
        `/api/v1/namespaces/${namespace}/pods`,
        { labelSelector: `${labelKey}=${labelValue}` },
        (phase: string, obj: V1Pod) => {
            const name = obj.metadata?.name ?? 'unknown';
            console.log(`Watch event: ${phase} ${name}`);
            receivedEvents.push({ type: phase, name });

            if (phase === 'ADDED') addResolve();
            if (phase === 'DELETED') deleteResolve();
        },
        (err: any) => {
            if (err && err.name !== 'AbortError') console.log('Watch done with error:', err);
        },
    );

    const podName = generateName('watch-test-pod');
    try {
        console.log(`Creating pod ${podName}`);
        const pod = new V1Pod();
        pod.metadata = { name: podName, labels: { [labelKey]: labelValue } };
        pod.spec = {
            containers: [{ name: 'test', image: 'busybox', command: ['sleep', '3600'] }],
            restartPolicy: 'Never',
        };
        await coreV1Client.createNamespacedPod({ namespace, body: pod });

        await Promise.race([
            addPromise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timed out waiting for ADDED event')), 15000),
            ),
        ]);

        const addEvent = receivedEvents.find((e) => e.type === 'ADDED' && e.name === podName);
        assert.ok(addEvent, 'Should have received ADDED event for pod');
        console.log('✓ Received ADDED event');

        console.log(`Deleting pod ${podName}`);
        await coreV1Client.deleteNamespacedPod({ name: podName, namespace });

        await Promise.race([
            deletePromise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timed out waiting for DELETED event')), 15000),
            ),
        ]);

        const deleteEvent = receivedEvents.find((e) => e.type === 'DELETED' && e.name === podName);
        assert.ok(deleteEvent, 'Should have received DELETED event for pod');
        console.log('✓ Received DELETED event');
    } finally {
        controller.abort();
        try {
            await coreV1Client.deleteNamespacedPod({ name: podName, namespace });
        } catch {
            // already deleted or never created
        }
    }

    console.log('Watch integration test passed!');
}
