const stream = require('stream');
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const log = new k8s.Log(kc);

const logStream = new stream.PassThrough();

logStream.on('data', (chunk) => {
	// use write rather than console.log to prevent double line feed
	process.stdout.write(chunk);
});

log.log('default', 'pod1', 'container1', logStream, (err) => {console.log(err)}, {follow: true, tailLines: 50, pretty: false, timestamps: false})
.then(req => {
	// disconnects after 5 seconds
	setTimeout(function(){
		req.abort();
	}, 5000);
});

