import * as k8s from '@kubernetes/client-node';
import * as stream from 'stream';

const command = process.argv[2];

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const terminalSizeQueue = new k8s.TerminalSizeQueue();
terminalSizeQueue.resize(getSize(process.stdout));
process.stdout.on('resize', () => {
    terminalSizeQueue.resize(getSize(process.stdout));
});

const exec = new k8s.Exec(kc);
exec.exec(
    'tutor',
    'tutor-environment-operator-deployment-c888b5cd8-qp95f',
    'default',
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
    terminalSizeQueue,
);

function getSize(writeStream: NodeJS.WriteStream): k8s.TerminalSize {
    return {
        height: writeStream.rows!,
        width: writeStream.columns!,
    };
}
