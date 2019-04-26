import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const terminalSizeQueue = new k8s.TerminalSizeQueue();
terminalSizeQueue.resize(getSize(process.stdout));
process.stdout.on('resize', () => {
    terminalSizeQueue.resize(getSize(process.stdout));
});

const attach = new k8s.Attach(kc);
attach.attach(
    'default',
    'nginx-4217019353-9gl4s',
    'nginx',
    process.stdout,
    process.stderr,
    null /* stdin */,
    false /* tty */,
    terminalSizeQueue,
);

function getSize(writeStream: NodeJS.WriteStream): k8s.TerminalSize {
    return {
        height: writeStream.rows!,
        width: writeStream.columns!,
    };
}
