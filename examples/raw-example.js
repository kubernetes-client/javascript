// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');
const fetch = require('node-fetch');
const https = require('https');

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
fetch(url, opts)
    .then((response) => {
        console.log(`statusCode: ${response.status}`);
        return response.text();
    })
    .then((body) => {
        console.log(`body: ${body}`);
    })
    .catch((error) => {
        console.log(`error: ${error}`);
    });
