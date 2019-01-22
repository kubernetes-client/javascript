import * as k8s from '@kubernetes/client-node';
import * as stream from 'stream';

const command = process.argv[2];

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const exec = new k8s.Exec(kc);
exec.exec('default', 'nginx-4217019353-9gl4s', 'nginx', command,
    process.stdout as stream.Writable, process.stderr as stream.Writable, process.stdin as stream.Readable,
    true /* tty */,
    (status: k8s.V1Status) => {
        // tslint:disable-next-line:no-console
        console.log('Exited with status:');
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(status, null, 2));
    });
