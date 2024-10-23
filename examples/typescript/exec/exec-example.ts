import * as k8s from '@kubernetes/client-node';
import stream from 'node:stream';

const command = process.argv[2];

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const exec = new k8s.Exec(kc);

const namespace = 'default';
const pod = 'nginx-4217019353-9gl4s';
const container = 'nginx';

exec.exec(
    namespace,
    pod,
    container,
    command,
    process.stdout as stream.Writable,
    process.stderr as stream.Writable,
    process.stdin as stream.Readable,
    true /* tty */,
    (status: k8s.V1Status) => {
        console.log('Exited with status:');
        console.log(JSON.stringify(status, null, 2));
    },
);
