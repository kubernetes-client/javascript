const k8s = require('@kubernetes/client-node');
const request = require('request');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const opts = {};
kc.applyToRequest(opts);

request.get(`${kc.getCurrentCluster().server}/api/v1/namespaces/default/pods`, opts,
    (error, response, body) => {
        if (error) {
            console.log(`error: ${error}`);
        }
        if (response) {
            console.log(`statusCode: ${response.statusCode}`);
        }
        console.log(`body: ${body}`);
  });

