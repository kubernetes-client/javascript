import * as k8s from '@kubernetes/client-node';
import fetch from 'node-fetch';
import https from 'node:https';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const currentUser = kc.getCurrentUser();
const currentCluster = kc.getCurrentCluster();

const agent = new https.Agent({
    ca: Buffer.from(currentCluster?.caData ?? '', 'base64').toString('utf8'),
    cert: Buffer.from(currentUser?.certData ?? '', 'base64').toString('utf8'),
    keepAlive: true,
    key: Buffer.from(currentUser?.keyData ?? '', 'base64').toString('utf8'),
});

const opts = {
    headers: {},
    agent: agent,
};

kc.applyToHTTPSOptions(opts);

const url = `${kc?.getCurrentCluster()?.server}/api/v1/namespaces/default/pods`;

try {
    const response = await fetch(url, opts);
    const body = await response.text();

    console.log(`statusCode: ${response.status}`);
    console.log(`body: ${body}`);
} catch (err) {
    console.error(`error: ${error}`);
}
