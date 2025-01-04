import * as k8s from '@kubernetes/client-node';
import { readFileSync } from 'node:fs';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// This code is the JavaScript equivalent of `kubectl apply -f namespace.yaml`.

try {
    const namespaceYaml = k8s.loadYaml(readFileSync('./namespace.yaml', 'utf8'));
    const createdNamespace = await k8sApi.createNamespace({ body: namespaceYaml });
    console.log('New namespace created:', createdNamespace);
} catch (err) {
    console.error(err);
}
