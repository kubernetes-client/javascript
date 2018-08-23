import k8s = require('@kubernetes/client-node');

let kc = new k8s.KubeConfig();
kc.loadFromDefault();

let attach = new k8s.Attach(kc);
attach.attach('default', 'nginx-4217019353-9gl4s', 'nginx', process.stdout, process.stderr, null /* stdin */, false /* tty */);
