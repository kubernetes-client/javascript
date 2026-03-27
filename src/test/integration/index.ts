import patchNamespace from './patchNamespace.js';
import cpFromPod from './cpFromPod.js';
import portForwardIntegration from './portForward.js';
import watchPods from './watchPods.js';
import informerReconnect from './informerReconnect.js';

console.log('Integration testing');

await patchNamespace();
await cpFromPod();
await portForwardIntegration();
await watchPods();
await informerReconnect();
