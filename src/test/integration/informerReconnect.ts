import assert from 'node:assert';
import { CoreV1Api, KubeConfig, V1ConfigMap, V1ConfigMapList } from '../../index.js';
import { Watch } from '../../watch.js';
import { ListWatch } from '../../cache.js';
import { generateName } from './name.js';
import { withTimeout } from './helpers.js';

export default async function informerReconnect() {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    const coreV1Client = kc.makeApiClient(CoreV1Api);
    const namespace = 'default';
    const labelKey = 'informer-test';
    const labelValue = generateName('run');
    const labelSelector = `${labelKey}=${labelValue}`;

    console.log(`\n=== Informer Reconnect Integration Test (label=${labelValue}) ===`);

    const watch = new Watch(kc);
    const listFn = async (): Promise<V1ConfigMapList> => {
        return coreV1Client.listNamespacedConfigMap({
            namespace,
            labelSelector,
        });
    };

    const informer = new ListWatch<V1ConfigMap>(
        `/api/v1/namespaces/${namespace}/configmaps`,
        watch,
        listFn,
        false,
        labelSelector,
    );

    const addedNames: string[] = [];
    let connectCount = 0;
    let errorCount = 0;

    let cm1AddResolve: () => void;
    const cm1AddPromise = new Promise<void>((resolve) => {
        cm1AddResolve = resolve;
    });

    let cm2AddResolve: () => void;
    const cm2AddPromise = new Promise<void>((resolve) => {
        cm2AddResolve = resolve;
    });

    const initialConnects = 0;
    let reconnectResolve: () => void;
    const reconnectPromise = new Promise<void>((resolve) => {
        reconnectResolve = resolve;
    });

    informer.on('add', (obj: V1ConfigMap) => {
        const name = obj.metadata?.name ?? 'unknown';
        console.log(`Informer event: add ${name}`);
        addedNames.push(name);

        if (name === cm1Name) cm1AddResolve();
        if (name === cm2Name) cm2AddResolve();
    });

    informer.on('connect', () => {
        connectCount++;
        console.log(`Informer event: connect (#${connectCount})`);
        if (connectCount > initialConnects + 1) reconnectResolve();
    });

    informer.on('error', (err: any) => {
        errorCount++;
        console.log(`Informer event: error ${err}`);
    });

    const cm1Name = generateName('cm1');
    const cm2Name = generateName('cm2');

    try {
        await informer.start();
        console.log('Informer started');

        console.log(`Creating configmap ${cm1Name}`);
        await coreV1Client.createNamespacedConfigMap({
            namespace,
            body: {
                metadata: { name: cm1Name, labels: { [labelKey]: labelValue } },
                data: { key: 'value1' },
            },
        });

        await withTimeout(cm1AddPromise, 15000, 'Timed out waiting for cm1 add event');
        assert.ok(addedNames.includes(cm1Name), 'Should have received add event for cm1');
        console.log('✓ Received add event for cm1');

        console.log(`Waiting for watch reconnection (up to 45s)...`);
        await withTimeout(reconnectPromise, 45000, 'Timed out waiting for informer reconnect');
        assert.ok(connectCount > initialConnects + 1, 'Informer should have reconnected');
        console.log(`✓ Informer reconnected (connect count: ${connectCount})`);

        console.log(`Creating configmap ${cm2Name}`);
        await coreV1Client.createNamespacedConfigMap({
            namespace,
            body: {
                metadata: { name: cm2Name, labels: { [labelKey]: labelValue } },
                data: { key: 'value2' },
            },
        });

        await withTimeout(cm2AddPromise, 15000, 'Timed out waiting for cm2 add event');
        assert.ok(addedNames.includes(cm2Name), 'Should have received add event for cm2 after reconnect');
        console.log('✓ Received add event for cm2 after reconnection');

        const cm1Duplicates = addedNames.filter((n) => n === cm1Name).length;
        assert.strictEqual(
            cm1Duplicates,
            1,
            `cm1 should only appear once in add events, got ${cm1Duplicates}`,
        );
        console.log('✓ No duplicate add events for cm1 (delta-only after reconnect)');

        assert.strictEqual(errorCount, 0, `Expected no errors, got ${errorCount}`);
        console.log('✓ No error events');
    } finally {
        await informer.stop();
        try {
            await coreV1Client.deleteNamespacedConfigMap({ name: cm1Name, namespace });
        } catch {
            // already deleted
        }
        try {
            await coreV1Client.deleteNamespacedConfigMap({ name: cm2Name, namespace });
        } catch {
            // already deleted
        }
    }

    console.log('Informer reconnect integration test passed!');
}
