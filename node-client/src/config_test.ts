import 'mocha';

import * as base64 from 'base-64';
import { expect } from 'chai';
import * as https from 'https';

import { KubeConfig } from './config';
import { Cluster, Context, User } from './config_types';

const kcFileName = 'testdata/kubeconfig.yaml';

/* tslint:disable: no-empty */
describe('Config', () => {});

describe('KubeConfig', () => {
    describe('findObject', () => {
        it('should find objects', () => {
            const list = [
                {
                    name: 'foo',
                    cluster: {
                        some: 'sub-object',
                    },
                    some: 'object',
                },
                {
                    name: 'bar',
                    some: 'object',
                    cluster: {
                        sone: 'sub-object',
                    },
                },
            ];

            // Validate that if the named object ('cluster' in this case) is inside we pick it out
            const obj1 = KubeConfig.findObject(list, 'foo', 'cluster');
            expect(obj1.some).to.equal('sub-object');

            // Validate that if the named object is missing, we just return the full object
            const obj2 = KubeConfig.findObject(list, 'bar', 'context');
            expect(obj2.some).to.equal('object');

            // validate that we do the right thing if it is missing
            const obj3 = KubeConfig.findObject(list, 'nonexistent', 'context');
            expect(obj3).to.equal(null);
        });
    });

    describe('loadFromClusterAndUser', () => {
        it('should load from cluster and user', () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'http://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;

            kc.loadFromClusterAndUser(cluster, user);

            const clusterOut = kc.getCurrentCluster();
            expect(clusterOut).to.equal(cluster);

            const userOut = kc.getCurrentUser();
            expect(userOut).to.equal(user);
        });
    });

    describe('clusterConstructor', () => {
        it('should load from options', () => {
            const cluster = {
                name: 'foo',
                server: 'http://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;

            const context = {
                name: 'my-context',
                user: user.name,
                cluster: cluster.name,
            };

            const kc = new KubeConfig();
            kc.loadFromOptions({
                clusters: [cluster],
                users: [user],
                contexts: [context],
                currentContext: context.name,
            });

            const clusterOut = kc.getCurrentCluster();
            expect(clusterOut).to.equal(cluster);

            const userOut = kc.getCurrentUser();
            expect(userOut).to.equal(user);
        });
    });

    describe('loadFromFile', () => {
        it('should load the kubeconfig file properly', () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);

            // check clusters
            expect(kc.clusters.length).to.equal(2);
            const cluster1 = kc.clusters[0];
            const cluster2 = kc.clusters[1];
            expect(cluster1.name).to.equal('cluster1');
            expect(cluster1.caData).to.equal('Q0FEQVRB');
            expect(cluster1.server).to.equal('http://example.com');
            expect(cluster2.name).to.equal('cluster2');
            expect(cluster2.caData).to.equal('Q0FEQVRBMg==');
            expect(cluster2.server).to.equal('http://example2.com');
            expect(cluster2.skipTLSVerify).to.equal(true);

            // check users
            expect(kc.users.length).to.equal(2);
            const user1 = kc.users[0];
            const user2 = kc.users[1];
            expect(user1.name).to.equal('user1');
            expect(user1.certData).to.equal('VVNFUl9DQURBVEE=');
            expect(user1.keyData).to.equal('VVNFUl9DS0RBVEE=');
            expect(user2.name).to.equal('user2');
            expect(user2.certData).to.equal('VVNFUjJfQ0FEQVRB');
            expect(user2.keyData).to.equal('VVNFUjJfQ0tEQVRB');

            // check contexts
            expect(kc.contexts.length).to.equal(2);
            const context1 = kc.contexts[0];
            const context2 = kc.contexts[1];
            expect(context1.name).to.equal('context1');
            expect(context1.user).to.equal('user1');
            expect(context1.cluster).to.equal('cluster1');
            expect(context2.name).to.equal('context2');
            expect(context2.user).to.equal('user2');
            expect(context2.cluster).to.equal('cluster2');

            expect(kc.getCurrentContext()).to.equal('context2');
        });
        it('should fail to load a missing kubeconfig file', () => {
            // TODO: make the error check work
            // let kc = new KubeConfig();
            // expect(kc.loadFromFile("missing.yaml")).to.throw();
        });
    });

    describe('applyHTTPSOptions', () => {
        it('should apply cert configs', () => {
            const kc = new KubeConfig();
            kc.loadFromFile(kcFileName);

            const opts: https.RequestOptions = {};
            kc.applytoHTTPSOptions(opts);

            expect(opts).to.deep.equal({
                ca: new Buffer('CADATA2', 'utf-8'),
                cert: new Buffer('USER2_CADATA', 'utf-8'),
                key: new Buffer('USER2_CKDATA', 'utf-8'),
            });
        });
    });
});
