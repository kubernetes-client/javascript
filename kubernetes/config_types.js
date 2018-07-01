"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var u = require("underscore");
var fs = require("fs");
function newClusters(a) {
    return u.map(a, clusterIterator());
}
exports.newClusters = newClusters;
function clusterIterator() {
    return function (elt, i, list) {
        if (!elt['name']) {
            throw new Error("clusters" + i + ".name is missing");
        }
        if (!elt.cluster['server']) {
            throw new Error("clusters[" + i + "].cluster.server is missing");
        }
        return {
            name: elt['name'],
            caData: elt.cluster['certificate-authority-data'],
            caFile: elt.cluster['certificate-authority'],
            server: elt.cluster['server'],
            skipTLSVerify: elt.cluster['insecure-skip-tls-verify'] == 'true'
        };
    };
}
function newUsers(a) {
    return u.map(a, userIterator());
}
exports.newUsers = newUsers;
function userIterator() {
    return function (elt, i, list) {
        if (!elt.name) {
            throw new Error("users[" + i + "].name is missing");
        }
        var token = null;
        if (elt.user["token"]) {
            token = elt.user["token"];
        }
        if (elt.user["token-file"]) {
            token = fs.readFileSync(elt.user["token-file"]);
        }
        return {
            name: elt.name,
            certData: elt.user["client-certificate-data"],
            certFile: elt.user["client-certificate"],
            keyData: elt.user["client-key-data"],
            keyFile: elt.user["client-key"],
            authProvider: elt.user["auth-provider"],
            token: token,
            username: elt.user["username"],
            password: elt.user["password"]
        };
    };
}
function newContexts(a) {
    return u.map(a, contextIterator());
}
exports.newContexts = newContexts;
function contextIterator() {
    return function (elt, i, list) {
        if (!elt.name) {
            throw new Error("contexts[" + i + "].name is missing");
        }
        if (!elt.context["cluster"]) {
            throw new Error("contexts[" + i + "].context.cluster is missing");
        }
        if (!elt.context["user"]) {
            throw new Error("context[" + i + "].context.user is missing");
        }
        return {
            cluster: elt.context['cluster'],
            user: elt.context["user"],
            name: elt.name
        };
    };
}
//# sourceMappingURL=config_types.js.map