import k8s = require('@kubernetes/client-node');

const command = process.argv[2];

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const exec = new k8s.Exec(kc);
exec.exec('default', 'demo', 'demo', command,
    process.stdout, process.stderr, process.stdin,
    (status: k8s.V1Status) => {
        console.log('Exited with status:');
        console.log(JSON.stringify(status, null, 2));
    },
    true /* tty */);
