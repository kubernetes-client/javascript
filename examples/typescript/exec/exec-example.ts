// in a real program use require('@kubernetes/client-node')
import * as k8s from '../../../dist';
import * as stream from 'stream';

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
        // tslint:disable-next-line:no-console
        console.log('Exited with status:');
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(status, null, 2));
    },
);
