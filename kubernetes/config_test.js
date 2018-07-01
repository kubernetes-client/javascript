"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var config_1 = require("./config");
var kcFileName = "testdata/kubeconfig.yaml";
describe("Config", function () {
});
describe("KubeConfig", function () {
    describe("findObject", function () {
        it("should find objects", function () {
            var list = [
                {
                    name: "foo",
                    "cluster": {
                        some: "sub-object"
                    },
                    some: "object"
                },
                {
                    name: "bar",
                    some: "object",
                    cluster: {
                        sone: "sub-object"
                    }
                }
            ];
            var obj1 = config_1.KubeConfig.findObject(list, "foo", "cluster");
            chai_1.expect(obj1.some).to.equal("sub-object");
            var obj2 = config_1.KubeConfig.findObject(list, "bar", "context");
            chai_1.expect(obj2.some).to.equal("object");
            var obj3 = config_1.KubeConfig.findObject(list, "nonexistent", "context");
            chai_1.expect(obj3).to.equal(null);
        });
    });
    describe("loadFromFile", function () {
        it("should load the kubeconfig file properly", function () {
            var kc = new config_1.KubeConfig();
            kc.loadFromFile(kcFileName);
            chai_1.expect(kc.clusters.length).to.equal(2);
            var cluster1 = kc.clusters[0];
            var cluster2 = kc.clusters[1];
            chai_1.expect(cluster1.name).to.equal("cluster1");
            chai_1.expect(cluster1.caData).to.equal("Q0FEQVRB");
            chai_1.expect(cluster1.server).to.equal("http://example.com");
            chai_1.expect(cluster2.name).to.equal("cluster2");
            chai_1.expect(cluster2.caData).to.equal("Q0FEQVRBMg==");
            chai_1.expect(cluster2.server).to.equal("http://example2.com");
            chai_1.expect(kc.users.length).to.equal(2);
            var user1 = kc.users[0];
            var user2 = kc.users[1];
            chai_1.expect(user1.name).to.equal("user1");
            chai_1.expect(user1.certData).to.equal("VVNFUl9DQURBVEE=");
            chai_1.expect(user1.keyData).to.equal("VVNFUl9DS0RBVEE=");
            chai_1.expect(user2.name).to.equal("user2");
            chai_1.expect(user2.certData).to.equal("VVNFUjJfQ0FEQVRB");
            chai_1.expect(user2.keyData).to.equal("VVNFUjJfQ0tEQVRB");
            chai_1.expect(kc.contexts.length).to.equal(2);
            var context1 = kc.contexts[0];
            var context2 = kc.contexts[1];
            chai_1.expect(context1.name).to.equal("context1");
            chai_1.expect(context1.user).to.equal("user1");
            chai_1.expect(context1.cluster).to.equal("cluster1");
            chai_1.expect(context2.name).to.equal("context2");
            chai_1.expect(context2.user).to.equal("user2");
            chai_1.expect(context2.cluster).to.equal("cluster2");
            chai_1.expect(kc.getCurrentContext()).to.equal("context2");
        });
        it("should fail to load a missing kubeconfig file", function () {
        });
    });
    describe("applyHTTPSOptions", function () {
        it("should apply cert configs", function () {
            var kc = new config_1.KubeConfig();
            kc.loadFromFile(kcFileName);
            var opts = {};
            kc.applytoHTTPSOptions(opts);
            chai_1.expect(opts).to.deep.equal({
                ca: new Buffer('CADATA2', 'utf-8'),
                cert: new Buffer('USER2_CADATA', 'utf-8'),
                key: new Buffer('USER2_CKDATA', 'utf-8'),
            });
        });
    });
});
//# sourceMappingURL=config_test.js.map