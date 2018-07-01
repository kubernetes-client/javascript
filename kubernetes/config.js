"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var base64 = require("base-64");
var jsonpath = require("jsonpath");
var shelljs = require("shelljs");
var yaml = require("js-yaml");
var config_types_1 = require("./config_types");
var client = require("./auth-wrapper");
var KubeConfig = (function () {
    function KubeConfig() {
    }
    KubeConfig.prototype.getContexts = function () {
        return this.contexts;
    };
    KubeConfig.prototype.getClusters = function () {
        return this.clusters;
    };
    KubeConfig.prototype.getUsers = function () {
        return this.users;
    };
    KubeConfig.prototype.getCurrentContext = function () {
        return this.currentContext;
    };
    KubeConfig.prototype.setCurrentContext = function (context) {
        this.currentContext = context;
    };
    KubeConfig.findObject = function (list, name, key) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var obj = list_1[_i];
            if (obj['name'] == name) {
                if (obj[key]) {
                    return obj[key];
                }
                return obj;
            }
        }
        return null;
    };
    KubeConfig.prototype.getCurrentContextObject = function () {
        return this.getContextObject(this.currentContext);
    };
    KubeConfig.prototype.getContextObject = function (name) {
        return KubeConfig.findObject(this.contexts, name, 'context');
    };
    KubeConfig.prototype.getCurrentCluster = function () {
        return this.getCluster(this.getCurrentContextObject()['cluster']);
    };
    KubeConfig.prototype.getCluster = function (name) {
        return KubeConfig.findObject(this.clusters, name, 'cluster');
    };
    KubeConfig.prototype.getCurrentUser = function () {
        return this.getUser(this.getCurrentContextObject()['user']);
    };
    KubeConfig.prototype.getUser = function (name) {
        return KubeConfig.findObject(this.users, name, 'user');
    };
    KubeConfig.prototype.loadFromFile = function (file) {
        this.loadFromString(fs.readFileSync(file, 'utf8'));
    };
    KubeConfig.prototype.bufferFromFileOrString = function (file, data) {
        if (file) {
            return fs.readFileSync(file);
        }
        if (data) {
            return new Buffer(base64.decode(data), 'utf-8');
        }
        return null;
    };
    KubeConfig.prototype.applyHTTPSOptions = function (opts) {
        var cluster = this.getCurrentCluster();
        var user = this.getCurrentUser();
        opts.ca = this.bufferFromFileOrString(cluster.caFile, cluster.caData);
        opts.cert = this.bufferFromFileOrString(user.certFile, user.certData);
        opts.key = this.bufferFromFileOrString(user.keyFile, user.keyData);
    };
    KubeConfig.prototype.applyAuthorizationHeader = function (opts) {
        var user = this.getCurrentUser();
        var token = null;
        if (user.authProvider && user.authProvider.config) {
            var config = user.authProvider.config;
            token = 'Bearer ' + config['access-token'];
            var expiry = config['expiry'];
            if (expiry) {
                var expiration = Date.parse(expiry);
                if (expiration < Date.now()) {
                    if (config['cmd-path']) {
                        var cmd = config['cmd-path'];
                        if (config['cmd-args']) {
                            cmd = cmd + ' ' + config['cmd-args'];
                        }
                        var result = shelljs.exec(cmd, { silent: true });
                        if (result['code'] != 0) {
                            throw new Error('Failed to refresh token: ' + result);
                        }
                        var resultObj = JSON.parse(result.stdout.toString());
                        var path_1 = config['token-key'];
                        path_1 = '$' + path_1.slice(1, -1);
                        config['access-token'] = jsonpath.query(resultObj, path_1);
                        token = 'Bearer ' + config['access-token'];
                    }
                    else {
                        throw new Error('Token is expired!');
                    }
                }
            }
        }
        if (user.token) {
            token = 'Bearer ' + user.token;
        }
        if (token) {
            if (!opts.headers) {
                opts.headers = [];
            }
            opts.headers['Authorization'] = token;
        }
    };
    KubeConfig.prototype.applyOptions = function (opts) {
        this.applyHTTPSOptions(opts);
        this.applyAuthorizationHeader(opts);
    };
    KubeConfig.prototype.applytoHTTPSOptions = function (opts) {
        var user = this.getCurrentUser();
        this.applyOptions(opts);
        if (user.username) {
            opts.auth = user.username + ":" + user.password;
        }
    };
    KubeConfig.prototype.applyToRequest = function (opts) {
        var cluster = this.getCurrentCluster();
        var user = this.getCurrentUser();
        this.applyOptions(opts);
        if (cluster.skipTLSVerify) {
            opts.strictSSL = false;
        }
        if (user.username) {
            opts.auth = {
                username: user.username,
                password: user.password
            };
        }
    };
    KubeConfig.prototype.loadFromString = function (config) {
        var obj = yaml.safeLoad(config);
        if (obj['apiVersion'] != 'v1') {
            throw new TypeError('unknown version: ' + obj['apiVersion']);
        }
        this.clusters = config_types_1.newClusters(obj['clusters']);
        this.contexts = config_types_1.newContexts(obj['contexts']);
        this.users = config_types_1.newUsers(obj['users']);
        this.currentContext = obj['current-context'];
    };
    return KubeConfig;
}());
exports.KubeConfig = KubeConfig;
var Config = (function () {
    function Config() {
    }
    Config.fromFile = function (filename) {
        var kc = new KubeConfig();
        kc.loadFromFile(filename);
        var k8sApi = new client.Core_v1Api(kc.getCurrentCluster()['server']);
        k8sApi.setDefaultAuthentication(kc);
        return k8sApi;
    };
    Config.fromCluster = function () {
        var host = process.env.KUBERNETES_SERVICE_HOST;
        var port = process.env.KUBERNETES_SERVICE_PORT;
        var caCert = fs.readFileSync(Config.SERVICEACCOUNT_CA_PATH);
        var token = fs.readFileSync(Config.SERVICEACCOUNT_TOKEN_PATH);
        var k8sApi = new client.Core_v1Api('https://' + host + ':' + port);
        k8sApi.setDefaultAuthentication({
            'applyToRequest': function (opts) {
                opts.ca = caCert;
                if (!opts.headers) {
                    opts.headers = [];
                }
                opts.headers['Authorization'] = 'Bearer ' + token;
            }
        });
        return k8sApi;
    };
    Config.defaultClient = function () {
        if (process.env.KUBECONFIG) {
            return Config.fromFile(process.env.KUBECONFIG);
        }
        var config = path.join(process.env.HOME, ".kube", "config");
        if (fs.existsSync(config)) {
            return Config.fromFile(config);
        }
        if (fs.existsSync(Config.SERVICEACCOUNT_TOKEN_PATH)) {
            return Config.fromCluster();
        }
        return new client.Core_v1Api('http://localhost:8080');
    };
    Config.SERVICEACCOUNT_ROOT = '/var/run/secrets/kubernetes.io/serviceaccount';
    Config.SERVICEACCOUNT_CA_PATH = Config.SERVICEACCOUNT_ROOT + '/ca.crt';
    Config.SERVICEACCOUNT_TOKEN_PATH = Config.SERVICEACCOUNT_ROOT + '/token';
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map