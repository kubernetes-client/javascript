'use strict'

const fs = require('fs');
const parseArgs = require('minimist');
const demoType = parseArgs(process.argv.slice(2));

// Location of custom CA crt
const ca = fs.readFileSync(__dirname + '/ca.crt');

// Unwise option to turn off all TLS security in NodeJS. NodeJS uses a predefined list of trusted CAs and ignores the system CA store. Workaround was to append CA/cert/keys in ApiClient modification.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const kubernetes = require('./index');
// UnversionedPatch model file was not generated, so a stub was put in.

const apiClient = new kubernetes.ApiClient();
apiClient.ca = ca;
apiClient.basePath = 'https://192.168.99.100:8443';
// Authorization of personal minikube setup - not considered a security concern due to local nature - in actual use should be provided by user.
apiClient.defaultHeaders = {
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4ta24wMHMiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6Ijk3MTBkNjc3LWRjNjctMTFlNi05NWMyLTA4MDAyNzY4YjNlYiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.RqeMeu3zxYqfGHpDV0vlVjG8EYgp_dG4Dr8dNc9zN-5J-tUOE_lBJ5VUWwh08GpN7jL3L66IZJ-zmJevVj7bd3OZBaGGTrEzgCrfuyrLIuPY-af8rZkElAtEaFdiT0m-z7JQqpUJ0yz9cZcOHiKN3vLR9zB7kVYcDWvMPwzzJsP65gPQptU1mRcx7w0wPtO8OmQXkrwrxoySwJpj7ug4Qv-QAIW9_Xa67qUUtKNaP1lgRIt9r4UL1fOrzS0fDNgBQClQ3CupkKRFQ4q7nvp6GkE-8HGzIg4tG65khfD2i750InZHGFZhLCTFmjiS-bmXx-MezEPb5rJ4rovMXcWj9w"
};

// Core test

const core = new kubernetes.CoreApi(apiClient);
const coreApi = new kubernetes.CorevApi(apiClient);
const extensions = new kubernetes.ExtensionsvbetaApi(apiClient);
const version = new kubernetes.VersionApi(apiClient);

// Versions
if (demoType['v']) {
    core.getCoreAPIVersions(function(error, data, response) {
        console.log(error, data);
    });

    version.getCodeVersion(function(error, data, response) {
        console.log(error, data);
    });
}

// Test creation of namespace and deployment
if (demoType['c']) {
    const testNs = "{\"kind\":\"Namespace\",\"apiVersion\":\"v1\",\"metadata\":{\"name\":\"client-test\",\"creationTimestamp\":null},\"spec\":{},\"status\":{}}\n";
    coreApi.createCoreV1Namespace(testNs, {}, function(error, data, response) {
        console.log(error, data);
    });


    const testDep = "{\"kind\":\"Deployment\",\"apiVersion\":\"extensions/v1beta1\",\"metadata\":{\"name\":\"hello-world\",\"creationTimestamp\":null,\"labels\":{\"run\":\"hello-world\"}},\"spec\":{\"replicas\":1,\"selector\":{\"matchLabels\":{\"run\":\"hello-world\"}},\"template\":{\"metadata\":{\"creationTimestamp\":null,\"labels\":{\"run\":\"hello-world\"}},\"spec\":{\"containers\":[{\"name\":\"hello-world\",\"image\":\"hello-world\",\"ports\":[{\"containerPort\":8080}],\"resources\":{}}]}},\"strategy\":{}},\"status\":{}}\n";
    const deployment = kubernetes.V1beta1Deployment.constructFromObject(JSON.parse(testDep));

    extensions.createExtensionsV1beta1NamespacedDeployment('default', JSON.stringify(deployment), {pretty: false}, function(error, data, response) {
        console.log(error, data);
    });

}


// Read deployment
if (demoType['r']) {
    extensions.listExtensionsV1beta1NamespacedDeployment('default', {pretty: false}, function(error, data, response) {
        console.log(error, data);
    });

    extensions.readExtensionsV1beta1NamespacedDeployment('hello-world', 'default', {pretty: false}, function(error, data, response) {
        console.log(error, data);
    });
}

// TEARDOWN
if (demoType['d']) {
    const testDel = "{\"kind\":\"DeleteOptions\",\"apiVersion\":\"extensions/v1beta1\",\"orphanDependents\":false}\n";
    const delopts = kubernetes.V1beta1Deployment.constructFromObject(JSON.parse(testDel));
    extensions.deleteExtensionsV1beta1NamespacedDeployment('hello-world', 'default', JSON.stringify(delopts), {pretty: false}, function(error, data, response) {
        console.log(error, data);
    });

    const delTestNs = "{\"kind\":\"DeleteOptions\",\"apiVersion\":\"v1\",\"metadata\":{\"name\":\"client-test\",\"deletionGracePeriodSeconds\":\"60\"},\"spec\":{},\"status\":{}}\n";
    coreApi.deleteCoreV1Namespace('client-test', delTestNs, {}, function(error, data, response) {
        console.log(error, data);
    });
}
