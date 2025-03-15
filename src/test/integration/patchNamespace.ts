import assert, { deepEqual } from 'node:assert';
import { PatchStrategy, CoreV1Api, KubeConfig, setHeaderOptions, V1Namespace } from '../../index';

export default async function patchNamespace() {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    const coreV1Client = kc.makeApiClient(CoreV1Api);
    let newNS = new V1Namespace();
    const testNSName = 'integration-test-patch-ns';
    newNS.metadata = {
        name: testNSName,
        labels: {
            initialLabel: 'initialValue',
        },
    };
    console.log(`Creating namespace ${testNSName}`);
    await coreV1Client.createNamespace({ body: newNS });
    newNS = await coreV1Client.readNamespace({ name: testNSName });
    assert(newNS.metadata?.name === testNSName);
    deepEqual(newNS.metadata?.labels?.initialLabel, 'initialValue');
    console.log('Namespace created with initial label.');

    const patch = [
        {
            op: 'replace',
            path: '/metadata/labels',
            value: {
                foo: 'bar',
            },
        },
    ];

    console.log(`Patching namespace ${testNSName} to replace labels`);
    await coreV1Client.patchNamespace(
        {
            name: testNSName,
            body: patch,
        },
        setHeaderOptions('Content-Type', PatchStrategy.JsonPatch),
    );

    const patchedNS = await coreV1Client.readNamespace({ name: testNSName });
    deepEqual(patchedNS.metadata?.labels?.foo, 'bar');
    deepEqual(patchedNS.metadata?.labels?.initialLabel, undefined);
    console.log('Namespace patched with new label.');
}
