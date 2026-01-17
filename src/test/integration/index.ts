import patchNamespace from './patchNamespace.js';
import cpFromPod from './cpFromPod.js';
import portForwardIntegration from './portForward.js';

console.log('Integration testing');

await patchNamespace();
await cpFromPod();
await portForwardIntegration();
