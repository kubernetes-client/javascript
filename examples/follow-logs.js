// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');
const stream = require('stream');

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

log.log(namespace, pod, container, logStream, {
    follow: true,
    tailLines: 50,
    pretty: false,
    timestamps: false,
})
    .catch((err) => {
        console.error(err);
    })
    .then((req) => {
        // disconnects after 5 seconds
        setTimeout(function () {
            //Note: You might have to install AbortController if you are using node version < 15.0.0
            req.abort();
        }, 5000);
    });
