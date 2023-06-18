// in a real program use require('@kubernetes/client-node')
import * as k8s from '../../../dist';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const attach = new k8s.Attach(kc);

const namespace = 'default';
const pod = 'nginx-4217019353-9gl4s';
const container = 'nginx';

attach.attach(namespace, pod, container, process.stdout, process.stderr, null /* stdin */, false /* tty */);
