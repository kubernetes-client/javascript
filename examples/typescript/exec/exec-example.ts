import k8s = require('@kubernetes/client-node');

const command = process.argv[2];

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const exec = new k8s.Exec(kc);
exec.exec('default', 'nginx-4217019353-9gl4s', 'nginx', command,
    process.stdout, process.stderr, process.stdin, true /* tty */);
