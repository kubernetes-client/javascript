import * as k8s from '@kubernetes/client-node';
import stream from 'node:stream';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const log = new k8s.Log(kc);
const logStream = new stream.PassThrough();
const namespace = 'default';
const pod = 'pod1';
const container = 'container1';

logStream.on('data', (chunk) => {
    // use write rather than console.log to prevent double line feed
    process.stdout.write(chunk);
});

try {
    const req = await log.log(namespace, pod, container, logStream, {
        follow: true,
        tailLines: 50,
        pretty: false,
        timestamps: false,
    });

    // disconnects after 5 seconds
    setTimeout(() => {
        // Note: You might have to install AbortController if you are using Node version < 15.0.0
        req.abort();
    }, 5000);
} catch (err) {
    console.error(err);
}
