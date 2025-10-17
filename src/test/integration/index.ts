import patchNamespace from './patchNamespace.js';
import cpFromPod from './cpFromPod.js';

console.log('Integration testing');

await patchNamespace();
await cpFromPod();
