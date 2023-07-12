const stream = require('stream');
const k8s = require('@kubernetes/client-node');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const namespace = 'default';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const log = new k8s.Log(kc);

const logStream = new stream.PassThrough();

logStream.on('data', (chunk) => {
    // use write rather than console.log to prevent double line feed
    process.stdout.write(chunk);
});

const main = async () => {
    try {
        const req = await log.log(namespace, 'pod1', 'container', logStream, {
            follow: true,
            tailLines: 50,
            pretty: false,
            timestamps: false,
        });

        if (req) {
            // Disconnect after 5 seconds
            await delay(5000);
            req.abort();
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

main();
