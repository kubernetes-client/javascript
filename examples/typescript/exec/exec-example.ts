import k8s = require('@kubernetes/client-node');

let command = process.argv[2];

let kc = new k8s.KubeConfig();
kc.loadFromFile(process.env['HOME'] + '/.kube/config');

let exec = new k8s.Exec(kc);
exec.exec('default', 'nginx-4217019353-9gl4s', 'nginx', command, process.stdout, process.stderr, process.stdin, true /* tty */);
