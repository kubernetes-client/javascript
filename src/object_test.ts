import { expect } from 'chai';
import * as nock from 'nock';
import { V1APIResource, V1APIResourceList } from './api';
import { KubeConfig } from './config';
import { KubernetesObjectApi } from './object';
import { KubernetesObject } from './types';

describe('KubernetesObject', () => {
    const testConfigOptions = {
        clusters: [{ name: 'dc', server: 'https://d.i.y' }],
        users: [{ name: 'ian', password: 'mackaye' }],
        contexts: [{ name: 'dischord', cluster: 'dc', user: 'ian' }],
        currentContext: 'dischord',
    };

    describe('makeApiClient', () => {
        it('should create the client', () => {
            const kc = new KubeConfig();
            kc.loadFromOptions(testConfigOptions);
            const c = KubernetesObjectApi.makeApiClient(kc);
            expect(c).to.be.ok;
            expect((c as any).defaultNamespace).to.equal('default');
        });

        it('should set the default namespace from context', () => {
            const kc = new KubeConfig();
            kc.loadFromOptions({
                clusters: [{ name: 'dc', server: 'https://d.i.y' }],
                users: [{ name: 'ian', password: 'mackaye' }],
                contexts: [{ name: 'dischord', cluster: 'dc', user: 'ian', namespace: 'straight-edge' }],
                currentContext: 'dischord',
            });
            const c = KubernetesObjectApi.makeApiClient(kc);
            expect(c).to.be.ok;
            expect((c as any).defaultNamespace).to.equal('straight-edge');
        });
    });

    class KubernetesObjectApiTest extends KubernetesObjectApi {
        public static makeApiClient(kc?: KubeConfig): KubernetesObjectApiTest {
            if (!kc) {
                kc = new KubeConfig();
                kc.loadFromOptions(testConfigOptions);
            }
            const client = kc.makeApiClient(KubernetesObjectApiTest);
            client.setDefaultNamespace(kc);
            return client;
        }
        public apiVersionResourceCache: Record<string, V1APIResourceList> = {};
        public async specUriPath(spec: KubernetesObject, method: any): Promise<string> {
            return super.specUriPath(spec, method);
        }
        public generateHeaders(
            optionsHeaders: { [name: string]: string },
            action: string = 'GET',
        ): { [name: string]: string } {
            return super.generateHeaders(optionsHeaders, action);
        }
        public async resource(apiVersion: string, kind: string): Promise<V1APIResource | undefined> {
            return super.resource(apiVersion, kind);
        }
    }

    const resourceBodies = {
        core: `{
  "groupVersion": "v1",
  "kind": "APIResourceList",
  "resources": [
    {
      "kind": "Binding",
      "name": "bindings",
      "namespaced": true
    },
    {
      "kind": "ComponentStatus",
      "name": "componentstatuses",
      "namespaced": false
    },
    {
      "kind": "ConfigMap",
      "name": "configmaps",
      "namespaced": true
    },
    {
      "kind": "Endpoints",
      "name": "endpoints",
      "namespaced": true
    },
    {
      "kind": "Event",
      "name": "events",
      "namespaced": true
    },
    {
      "kind": "LimitRange",
      "name": "limitranges",
      "namespaced": true
    },
    {
      "kind": "Namespace",
      "name": "namespaces",
      "namespaced": false
    },
    {
      "kind": "Namespace",
      "name": "namespaces/finalize",
      "namespaced": false
    },
    {
      "kind": "Namespace",
      "name": "namespaces/status",
      "namespaced": false
    },
    {
      "kind": "Node",
      "name": "nodes",
      "namespaced": false
    },
    {
      "kind": "NodeProxyOptions",
      "name": "nodes/proxy",
      "namespaced": false
    },
    {
      "kind": "Node",
      "name": "nodes/status",
      "namespaced": false
    },
    {
      "kind": "PersistentVolumeClaim",
      "name": "persistentvolumeclaims",
      "namespaced": true
    },
    {
      "kind": "PersistentVolumeClaim",
      "name": "persistentvolumeclaims/status",
      "namespaced": true
    },
    {
      "kind": "PersistentVolume",
      "name": "persistentvolumes",
      "namespaced": false
    },
    {
      "kind": "PersistentVolume",
      "name": "persistentvolumes/status",
      "namespaced": false
    },
    {
      "kind": "Pod",
      "name": "pods",
      "namespaced": true
    },
    {
      "kind": "PodAttachOptions",
      "name": "pods/attach",
      "namespaced": true
    },
    {
      "kind": "Binding",
      "name": "pods/binding",
      "namespaced": true
    },
    {
      "group": "policy",
      "kind": "Eviction",
      "name": "pods/eviction",
      "namespaced": true,
      "version": "v1beta1"
    },
    {
      "kind": "PodExecOptions",
      "name": "pods/exec",
      "namespaced": true
    },
    {
      "kind": "Pod",
      "name": "pods/log",
      "namespaced": true
    },
    {
      "kind": "PodPortForwardOptions",
      "name": "pods/portforward",
      "namespaced": true
    },
    {
      "kind": "PodProxyOptions",
      "name": "pods/proxy",
      "namespaced": true
    },
    {
      "kind": "Pod",
      "name": "pods/status",
      "namespaced": true
    },
    {
      "kind": "PodTemplate",
      "name": "podtemplates",
      "namespaced": true
    },
    {
      "kind": "ReplicationController",
      "name": "replicationcontrollers",
      "namespaced": true
    },
    {
      "group": "autoscaling",
      "kind": "Scale",
      "name": "replicationcontrollers/scale",
      "namespaced": true,
      "version": "v1"
    },
    {
      "kind": "ReplicationController",
      "name": "replicationcontrollers/status",
      "namespaced": true
    },
    {
      "kind": "ResourceQuota",
      "name": "resourcequotas",
      "namespaced": true
    },
    {
      "kind": "ResourceQuota",
      "name": "resourcequotas/status",
      "namespaced": true
    },
    {
      "kind": "Secret",
      "name": "secrets",
      "namespaced": true
    },
    {
      "kind": "ServiceAccount",
      "name": "serviceaccounts",
      "namespaced": true
    },
    {
      "kind": "Service",
      "name": "services",
      "namespaced": true
    },
    {
      "kind": "ServiceProxyOptions",
      "name": "services/proxy",
      "namespaced": true
    },
    {
      "kind": "Service",
      "name": "services/status",
      "namespaced": true
    }
  ]
}`,

        apps: `{
  "apiVersion": "v1",
  "groupVersion": "apps/v1",
  "kind": "APIResourceList",
  "resources": [
    {
      "kind": "ControllerRevision",
      "name": "controllerrevisions",
      "namespaced": true
    },
    {
      "kind": "DaemonSet",
      "name": "daemonsets",
      "namespaced": true
    },
    {
      "kind": "DaemonSet",
      "name": "daemonsets/status",
      "namespaced": true
    },
    {
      "kind": "Deployment",
      "name": "deployments",
      "namespaced": true
    },
    {
      "group": "autoscaling",
      "kind": "Scale",
      "name": "deployments/scale",
      "namespaced": true,
      "version": "v1"
    },
    {
      "kind": "Deployment",
      "name": "deployments/status",
      "namespaced": true
    },
    {
      "kind": "ReplicaSet",
      "name": "replicasets",
      "namespaced": true
    },
    {
      "group": "autoscaling",
      "kind": "Scale",
      "name": "replicasets/scale",
      "namespaced": true,
      "version": "v1"
    },
    {
      "kind": "ReplicaSet",
      "name": "replicasets/status",
      "namespaced": true
    },
    {
      "kind": "StatefulSet",
      "name": "statefulsets",
      "namespaced": true
    },
    {
      "group": "autoscaling",
      "kind": "Scale",
      "name": "statefulsets/scale",
      "namespaced": true,
      "version": "v1"
    },
    {
      "kind": "StatefulSet",
      "name": "statefulsets/status",
      "namespaced": true
    }
  ]
}`,
        extensions: `{
  "groupVersion": "extensions/v1beta1",
  "kind": "APIResourceList",
  "resources": [
    {
      "kind": "DaemonSet",
      "name": "daemonsets",
      "namespaced": true
    },
    {
      "kind": "DaemonSet",
      "name": "daemonsets/status",
      "namespaced": true
    },
    {
      "kind": "Deployment",
      "name": "deployments",
      "namespaced": true
    },
    {
      "kind": "DeploymentRollback",
      "name": "deployments/rollback",
      "namespaced": true
    },
    {
      "group": "extensions",
      "kind": "Scale",
      "name": "deployments/scale",
      "namespaced": true,
      "version": "v1beta1"
    },
    {
      "kind": "Deployment",
      "name": "deployments/status",
      "namespaced": true
    },
    {
      "kind": "Ingress",
      "name": "ingresses",
      "namespaced": true
    },
    {
      "kind": "Ingress",
      "name": "ingresses/status",
      "namespaced": true
    },
    {
      "kind": "NetworkPolicy",
      "name": "networkpolicies",
      "namespaced": true
    },
    {
      "kind": "PodSecurityPolicy",
      "name": "podsecuritypolicies",
      "namespaced": false
    },
    {
      "kind": "ReplicaSet",
      "name": "replicasets",
      "namespaced": true
    },
    {
      "group": "extensions",
      "kind": "Scale",
      "name": "replicasets/scale",
      "namespaced": true,
      "version": "v1beta1"
    },
    {
      "kind": "ReplicaSet",
      "name": "replicasets/status",
      "namespaced": true
    },
    {
      "kind": "ReplicationControllerDummy",
      "name": "replicationcontrollers",
      "namespaced": true
    },
    {
      "kind": "Scale",
      "name": "replicationcontrollers/scale",
      "namespaced": true
    }
  ]
}`,
        networking: `{
  "apiVersion": "v1",
  "groupVersion": "networking.k8s.io/v1",
  "kind": "APIResourceList",
  "resources": [
    {
      "kind": "NetworkPolicy",
      "name": "networkpolicies",
      "namespaced": true
    }
  ]
}`,
        rbac: `{
  "apiVersion": "v1",
  "groupVersion": "rbac.authorization.k8s.io/v1",
  "kind": "APIResourceList",
  "resources": [
    {
      "kind": "ClusterRoleBinding",
      "name": "clusterrolebindings",
      "namespaced": false
    },
    {
      "kind": "ClusterRole",
      "name": "clusterroles",
      "namespaced": false
    },
    {
      "kind": "RoleBinding",
      "name": "rolebindings",
      "namespaced": true
    },
    {
      "kind": "Role",
      "name": "roles",
      "namespaced": true
    }
  ]
}`,
        storage: `{
  "apiVersion": "v1",
  "groupVersion": "storage.k8s.io/v1",
  "kind": "APIResourceList",
  "resources": [
    {
      "kind": "StorageClass",
      "name": "storageclasses",
      "namespaced": false
    },
    {
      "kind": "VolumeAttachment",
      "name": "volumeattachments",
      "namespaced": false
    },
    {
      "kind": "VolumeAttachment",
      "name": "volumeattachments/status",
      "namespaced": false
    }
  ]
}`,
    };

    describe('specUriPath', () => {
        it('should return a namespaced path', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const r = await c.specUriPath(o, 'patch');
            expect(r).to.equal('https://d.i.y/api/v1/namespaces/fugazi/services/repeater');
            scope.done();
        });

        it('should default to apiVersion v1', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                kind: 'ServiceAccount',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const r = await c.specUriPath(o, 'patch');
            expect(r).to.equal('https://d.i.y/api/v1/namespaces/fugazi/serviceaccounts/repeater');
            scope.done();
        });

        it('should default to context namespace', async () => {
            const kc = new KubeConfig();
            kc.loadFromOptions({
                clusters: [{ name: 'dc', server: 'https://d.i.y' }],
                users: [{ name: 'ian', password: 'mackaye' }],
                contexts: [{ name: 'dischord', cluster: 'dc', user: 'ian', namespace: 'straight-edge' }],
                currentContext: 'dischord',
            });
            const c = KubernetesObjectApiTest.makeApiClient(kc);
            const o = {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: 'repeater',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const r = await c.specUriPath(o, 'patch');
            expect(r).to.equal('https://d.i.y/api/v1/namespaces/straight-edge/pods/repeater');
            scope.done();
        });

        it('should default to default namespace', async () => {
            const kc = new KubeConfig();
            kc.loadFromOptions({
                clusters: [{ name: 'dc', server: 'https://d.i.y' }],
                users: [{ name: 'ian', password: 'mackaye' }],
                contexts: [{ name: 'dischord', cluster: 'dc', user: 'ian' }],
                currentContext: 'dischord',
            });
            const c = KubernetesObjectApiTest.makeApiClient(kc);
            const o = {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: 'repeater',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const r = await c.specUriPath(o, 'patch');
            expect(r).to.equal('https://d.i.y/api/v1/namespaces/default/pods/repeater');
            scope.done();
        });

        it('should return a non-namespaced path', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'v1',
                kind: 'Namespace',
                metadata: {
                    name: 'repeater',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const r = await c.specUriPath(o, 'delete');
            expect(r).to.equal('https://d.i.y/api/v1/namespaces/repeater');
            scope.done();
        });

        it('should return a namespaced path without name', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    namespace: 'fugazi',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const r = await c.specUriPath(o, 'create');
            expect(r).to.equal('https://d.i.y/api/v1/namespaces/fugazi/services');
            scope.done();
        });

        it('should return a non-namespaced path without name', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'v1',
                kind: 'Namespace',
                metadata: {
                    name: 'repeater',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const r = await c.specUriPath(o, 'create');
            expect(r).to.equal('https://d.i.y/api/v1/namespaces');
            scope.done();
        });

        it('should return a namespaced path for non-core resource', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'apps/v1',
                kind: 'Deployment',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/apis/apps/v1')
                .reply(200, resourceBodies.apps);
            const r = await c.specUriPath(o, 'read');
            expect(r).to.equal('https://d.i.y/apis/apps/v1/namespaces/fugazi/deployments/repeater');
            scope.done();
        });

        it('should return a non-namespaced path for non-core resource', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'rbac.authorization.k8s.io/v1',
                kind: 'ClusterRole',
                metadata: {
                    name: 'repeater',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/apis/rbac.authorization.k8s.io/v1')
                .reply(200, resourceBodies.rbac);
            const r = await c.specUriPath(o, 'read');
            expect(r).to.equal('https://d.i.y/apis/rbac.authorization.k8s.io/v1/clusterroles/repeater');
            scope.done();
        });

        it('should handle a variety of resources', async () => {
            const a = [
                {
                    apiVersion: 'v1',
                    kind: 'Service',
                    ns: true,
                    p: '/api/v1',
                    b: resourceBodies.core,
                    e: 'https://d.i.y/api/v1/namespaces/fugazi/services/repeater',
                },
                {
                    apiVersion: 'v1',
                    kind: 'ServiceAccount',
                    ns: true,
                    p: '/api/v1',
                    b: resourceBodies.core,
                    e: 'https://d.i.y/api/v1/namespaces/fugazi/serviceaccounts/repeater',
                },
                {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    kind: 'Role',
                    ns: true,
                    p: '/apis/rbac.authorization.k8s.io/v1',
                    b: resourceBodies.rbac,
                    e: 'https://d.i.y/apis/rbac.authorization.k8s.io/v1/namespaces/fugazi/roles/repeater',
                },
                {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    kind: 'ClusterRole',
                    ns: false,
                    p: '/apis/rbac.authorization.k8s.io/v1',
                    b: resourceBodies.rbac,
                    e: 'https://d.i.y/apis/rbac.authorization.k8s.io/v1/clusterroles/repeater',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'NetworkPolicy',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: 'https://d.i.y/apis/extensions/v1beta1/namespaces/fugazi/networkpolicies/repeater',
                },
                {
                    apiVersion: 'networking.k8s.io/v1',
                    kind: 'NetworkPolicy',
                    ns: true,
                    p: '/apis/networking.k8s.io/v1',
                    b: resourceBodies.networking,
                    e: 'https://d.i.y/apis/networking.k8s.io/v1/namespaces/fugazi/networkpolicies/repeater',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'Ingress',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: 'https://d.i.y/apis/extensions/v1beta1/namespaces/fugazi/ingresses/repeater',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'DaemonSet',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: 'https://d.i.y/apis/extensions/v1beta1/namespaces/fugazi/daemonsets/repeater',
                },
                {
                    apiVersion: 'apps/v1',
                    kind: 'DaemonSet',
                    ns: true,
                    p: '/apis/apps/v1',
                    b: resourceBodies.apps,
                    e: 'https://d.i.y/apis/apps/v1/namespaces/fugazi/daemonsets/repeater',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'Deployment',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: 'https://d.i.y/apis/extensions/v1beta1/namespaces/fugazi/deployments/repeater',
                },
                {
                    apiVersion: 'apps/v1',
                    kind: 'Deployment',
                    ns: true,
                    p: '/apis/apps/v1',
                    b: resourceBodies.apps,
                    e: 'https://d.i.y/apis/apps/v1/namespaces/fugazi/deployments/repeater',
                },
                {
                    apiVersion: 'storage.k8s.io/v1',
                    kind: 'StorageClass',
                    ns: false,
                    p: '/apis/storage.k8s.io/v1',
                    b: resourceBodies.storage,
                    e: 'https://d.i.y/apis/storage.k8s.io/v1/storageclasses/repeater',
                },
            ];
            for (const k of a) {
                const c = KubernetesObjectApiTest.makeApiClient();
                const o: KubernetesObject = {
                    apiVersion: k.apiVersion,
                    kind: k.kind,
                    metadata: {
                        name: 'repeater',
                    },
                };
                if (k.ns) {
                    o.metadata = o.metadata || {};
                    o.metadata.namespace = 'fugazi';
                }
                const scope = nock('https://d.i.y')
                    .get(k.p)
                    .reply(200, k.b);
                const r = await c.specUriPath(o, 'patch');
                expect(r).to.equal(k.e);
                scope.done();
            }
        });

        it('should handle a variety of resources without names', async () => {
            const a = [
                {
                    apiVersion: 'v1',
                    kind: 'Service',
                    ns: true,
                    p: '/api/v1',
                    b: resourceBodies.core,
                    e: 'https://d.i.y/api/v1/namespaces/fugazi/services',
                },
                {
                    apiVersion: 'v1',
                    kind: 'ServiceAccount',
                    ns: true,
                    p: '/api/v1',
                    b: resourceBodies.core,
                    e: 'https://d.i.y/api/v1/namespaces/fugazi/serviceaccounts',
                },
                {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    kind: 'Role',
                    ns: true,
                    p: '/apis/rbac.authorization.k8s.io/v1',
                    b: resourceBodies.rbac,
                    e: 'https://d.i.y/apis/rbac.authorization.k8s.io/v1/namespaces/fugazi/roles',
                },
                {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    kind: 'ClusterRole',
                    ns: false,
                    p: '/apis/rbac.authorization.k8s.io/v1',
                    b: resourceBodies.rbac,
                    e: 'https://d.i.y/apis/rbac.authorization.k8s.io/v1/clusterroles',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'NetworkPolicy',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: 'https://d.i.y/apis/extensions/v1beta1/namespaces/fugazi/networkpolicies',
                },
                {
                    apiVersion: 'networking.k8s.io/v1',
                    kind: 'NetworkPolicy',
                    ns: true,
                    p: '/apis/networking.k8s.io/v1',
                    b: resourceBodies.networking,
                    e: 'https://d.i.y/apis/networking.k8s.io/v1/namespaces/fugazi/networkpolicies',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'Ingress',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: 'https://d.i.y/apis/extensions/v1beta1/namespaces/fugazi/ingresses',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'DaemonSet',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: 'https://d.i.y/apis/extensions/v1beta1/namespaces/fugazi/daemonsets',
                },
                {
                    apiVersion: 'apps/v1',
                    kind: 'DaemonSet',
                    ns: true,
                    p: '/apis/apps/v1',
                    b: resourceBodies.apps,
                    e: 'https://d.i.y/apis/apps/v1/namespaces/fugazi/daemonsets',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'Deployment',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: 'https://d.i.y/apis/extensions/v1beta1/namespaces/fugazi/deployments',
                },
                {
                    apiVersion: 'apps/v1',
                    kind: 'Deployment',
                    ns: true,
                    p: '/apis/apps/v1',
                    b: resourceBodies.apps,
                    e: 'https://d.i.y/apis/apps/v1/namespaces/fugazi/deployments',
                },
                {
                    apiVersion: 'storage.k8s.io/v1',
                    kind: 'StorageClass',
                    ns: false,
                    p: '/apis/storage.k8s.io/v1',
                    b: resourceBodies.storage,
                    e: 'https://d.i.y/apis/storage.k8s.io/v1/storageclasses',
                },
            ];
            for (const k of a) {
                const c = KubernetesObjectApiTest.makeApiClient();
                const o: KubernetesObject = {
                    apiVersion: k.apiVersion,
                    kind: k.kind,
                };
                if (k.ns) {
                    o.metadata = { namespace: 'fugazi' };
                }
                const scope = nock('https://d.i.y')
                    .get(k.p)
                    .reply(200, k.b);
                const r = await c.specUriPath(o, 'create');
                expect(r).to.equal(k.e);
                scope.done();
            }
        });

        it('should throw an error if kind missing', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'v1',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            let thrown = false;
            try {
                await c.specUriPath(o, 'create');
                expect.fail('should have thrown error');
            } catch (e) {
                thrown = true;
                expect(e.message).to.equal('Required spec property kind is not set');
            }
            expect(thrown).to.be.true;
        });

        it('should throw an error if name required and missing', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    namespace: 'fugazi',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            let thrown = false;
            try {
                await c.specUriPath(o, 'read');
                expect.fail('should have thrown error');
            } catch (e) {
                thrown = true;
                expect(e.message).to.equal('Required spec property name is not set');
            }
            expect(thrown).to.be.true;
            scope.done();
        });

        it('should throw an error if resource is not valid', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const o = {
                apiVersion: 'v1',
                kind: 'Ingress',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            let thrown = false;
            try {
                await c.specUriPath(o, 'create');
                expect.fail('should have thrown error');
            } catch (e) {
                thrown = true;
                expect(e.message).to.equal('Unrecognized API version and kind: v1 Ingress');
            }
            expect(thrown).to.be.true;
            scope.done();
        });
    });

    describe('generateHeaders', () => {
        let client: KubernetesObjectApiTest;
        before(function(this: Mocha.Context): void {
            client = KubernetesObjectApiTest.makeApiClient();
        });

        it('should return default headers', () => {
            const h = client.generateHeaders({});
            expect(h.accept).to.equal('application/json');
        });

        it('should return patch headers', () => {
            const h = client.generateHeaders({}, 'PATCH');
            expect(h.accept).to.equal('application/json');
            expect(h['content-type']).to.equal('application/strategic-merge-patch+json');
        });

        it('should allow overrides', () => {
            const h = client.generateHeaders(
                {
                    accept: 'application/vnd.kubernetes.protobuf',
                    'content-type': 'application/merge-patch+json',
                },
                'PATCH',
            );
            expect(h.accept).to.equal('application/vnd.kubernetes.protobuf');
            expect(h['content-type']).to.equal('application/merge-patch+json');
        });

        it('should retain provided headers', () => {
            const h = client.generateHeaders({
                burden: 'of Proof',
                simple: 'Matters',
            });
            expect(h.accept).to.equal('application/json');
            expect(h.burden).to.equal('of Proof');
            expect(h.simple).to.equal('Matters');
        });
    });

    describe('resource', () => {
        let client: KubernetesObjectApiTest;
        before(function(this: Mocha.Context): void {
            client = KubernetesObjectApiTest.makeApiClient();
        });

        it('should throw an error if apiVersion not set', async () => {
            for (const a of [null, undefined]) {
                let thrown = false;
                try {
                    await client.resource((a as unknown) as string, 'Service');
                } catch (e) {
                    thrown = true;
                    expect(e.message).to.equal(
                        'Required parameter apiVersion was null or undefined when calling resource',
                    );
                }
                expect(thrown).to.be.true;
            }
        });

        it('should throw an error if kind not set', async () => {
            for (const a of [null, undefined]) {
                let thrown = false;
                try {
                    await client.resource('v1', (a as unknown) as string);
                } catch (e) {
                    thrown = true;
                    expect(e.message).to.equal(
                        'Required parameter kind was null or undefined when calling resource',
                    );
                }
                expect(thrown).to.be.true;
            }
        });

        it('should use an interceptor', async () => {
            const c: any = KubernetesObjectApiTest.makeApiClient();
            let intercepted = false;
            if (c.interceptors) {
                c.interceptors.push(async () => {
                    intercepted = true;
                });
            } else {
                c.interceptors = [
                    async () => {
                        intercepted = true;
                    },
                ];
            }
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            await c.resource('v1', 'Service');
            expect(intercepted).to.be.true;
            scope.done();
        });

        it('should cache API response', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const s = await c.resource('v1', 'Service');
            expect(s).to.be.ok;
            if (!s) {
                throw new Error('old TypeScript compiler');
            }
            expect(s.kind).to.equal('Service');
            expect(s.name).to.equal('services');
            expect(s.namespaced).to.be.true;
            expect(c.apiVersionResourceCache).to.be.ok;
            expect(c.apiVersionResourceCache.v1).to.be.ok;
            const sa = await c.resource('v1', 'ServiceAccount');
            expect(sa).to.be.ok;
            if (!sa) {
                throw new Error('old TypeScript compiler');
            }
            expect(sa.kind).to.equal('ServiceAccount');
            expect(sa.name).to.equal('serviceaccounts');
            expect(sa.namespaced).to.be.true;
            const p = await c.resource('v1', 'Pod');
            if (!p) {
                throw new Error('old TypeScript compiler');
            }
            expect(p).to.be.ok;
            expect(p.kind).to.equal('Pod');
            expect(p.name).to.equal('pods');
            expect(p.namespaced).to.be.true;
            const pv = await c.resource('v1', 'PersistentVolume');
            if (!pv) {
                throw new Error('old TypeScript compiler');
            }
            expect(pv).to.be.ok;
            expect(pv.kind).to.equal('PersistentVolume');
            expect(pv.name).to.equal('persistentvolumes');
            expect(pv.namespaced).to.be.false;
            scope.done();
        });

        it('should re-request on cache miss', async () => {
            const c = KubernetesObjectApiTest.makeApiClient();
            c.apiVersionResourceCache.v1 = {
                groupVersion: 'v1',
                kind: 'APIResourceList',
                resources: [
                    {
                        kind: 'Binding',
                        name: 'bindings',
                        namespaced: true,
                    },
                    {
                        kind: 'ComponentStatus',
                        name: 'componentstatuses',
                        namespaced: false,
                    },
                ],
            } as any;
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core);
            const s = await c.resource('v1', 'Service');
            expect(s).to.be.ok;
            if (!s) {
                throw new Error('old TypeScript compiler');
            }
            expect(s.kind).to.equal('Service');
            expect(s.name).to.equal('services');
            expect(s.namespaced).to.be.true;
            expect(c.apiVersionResourceCache).to.be.ok;
            expect(c.apiVersionResourceCache.v1).to.be.ok;
            expect(c.apiVersionResourceCache.v1.resources.length).to.deep.equal(
                JSON.parse(resourceBodies.core).resources.length,
            );
            scope.done();
        });
    });

    describe('verbs', () => {
        let client: KubernetesObjectApi;
        before(() => {
            const kc = new KubeConfig();
            kc.loadFromOptions(testConfigOptions);
            client = KubernetesObjectApi.makeApiClient(kc);
            (client as any).apiVersionResourceCache.v1 = JSON.parse(resourceBodies.core);
        });

        it('should modify resources with defaults', async () => {
            const s = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                },
                spec: {
                    ports: [
                        {
                            port: 80,
                            protocol: 'TCP',
                            targetPort: 80,
                        },
                    ],
                    selector: {
                        app: 'sleep',
                    },
                },
            };
            const methods = [
                {
                    m: client.create,
                    v: 'POST',
                    p: '/api/v1/namespaces/default/services',
                    c: 201,
                    b: `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.97.191.144",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                },
                {
                    m: client.patch,
                    v: 'PATCH',
                    p: '/api/v1/namespaces/default/services/k8s-js-client-test',
                    c: 200,
                    b: `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.97.191.144",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                },
                {
                    m: client.read,
                    v: 'GET',
                    p: '/api/v1/namespaces/default/services/k8s-js-client-test',
                    c: 200,
                    b: `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.97.191.144",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                },
                {
                    m: client.delete,
                    v: 'DELETE',
                    p: '/api/v1/namespaces/default/services/k8s-js-client-test',
                    c: 200,
                    b: `{
  "apiVersion": "v1",
  "details": {
    "kind": "services",
    "name": "k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a"
  },
  "kind": "Status",
  "metadata": {},
  "status": "Success"
}`,
                },
            ];
            for (const m of methods) {
                const scope = nock('https://d.i.y')
                    .intercept(m.p, m.v, m.v === 'DELETE' || m.v === 'GET' ? undefined : s)
                    .reply(m.c, m.b);
                // TODO: Figure out why Typescript barfs if we do m.call
                const hack_m = m.m as any;
                await hack_m.call(client, s);
                scope.done();
            }
        });

        it('should modify resources with pretty set', async () => {
            const s = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                },
                spec: {
                    ports: [
                        {
                            port: 80,
                            protocol: 'TCP',
                            targetPort: 80,
                        },
                    ],
                    selector: {
                        app: 'sleep',
                    },
                },
            };
            const methods = [
                {
                    m: client.create,
                    v: 'POST',
                    p: '/api/v1/namespaces/default/services',
                    c: 201,
                    b: `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.97.191.144",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                },
                {
                    m: client.patch,
                    v: 'PATCH',
                    p: '/api/v1/namespaces/default/services/k8s-js-client-test',
                    c: 200,
                    b: `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.97.191.144",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                },
                {
                    m: client.read,
                    v: 'GET',
                    p: '/api/v1/namespaces/default/services/k8s-js-client-test',
                    c: 200,
                    b: `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.97.191.144",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                },
                {
                    m: client.delete,
                    v: 'DELETE',
                    p: '/api/v1/namespaces/default/services/k8s-js-client-test',
                    c: 200,
                    b: `{
  "apiVersion": "v1",
  "details": {
    "kind": "services",
    "name": "k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a"
  },
  "kind": "Status",
  "metadata": {},
  "status": "Success"
}`,
                },
            ];
            for (const p of ['true', 'false']) {
                for (const m of methods) {
                    const scope = nock('https://d.i.y')
                        .intercept(
                            `${m.p}?pretty=${p}`,
                            m.v,
                            m.v === 'DELETE' || m.v === 'GET' ? undefined : s,
                        )
                        .reply(m.c, m.b);
                    // TODO: Figure out why Typescript barfs if we do m.call
                    const hack_m = m.m as any;
                    await hack_m.call(client, s, p);
                    scope.done();
                }
            }
        });

        it('should set dryRun', async () => {
            const s = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                },
                spec: {
                    ports: [
                        {
                            port: 80,
                            protocol: 'TCP',
                            targetPort: 80,
                        },
                    ],
                    selector: {
                        app: 'sleep',
                    },
                },
            };
            const methods = [
                {
                    m: client.create,
                    v: 'POST',
                    p: '/api/v1/namespaces/default/services',
                    c: 201,
                    b: `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.97.191.144",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                },
                {
                    m: client.patch,
                    v: 'PATCH',
                    p: '/api/v1/namespaces/default/services/k8s-js-client-test',
                    c: 200,
                    b: `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.97.191.144",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                },
                {
                    m: client.delete,
                    v: 'DELETE',
                    p: '/api/v1/namespaces/default/services/k8s-js-client-test',
                    c: 200,
                    b: `{
  "apiVersion": "v1",
  "details": {
    "kind": "services",
    "name": "k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a"
  },
  "kind": "Status",
  "metadata": {},
  "status": "Success"
}`,
                },
            ];
            for (const m of methods) {
                const scope = nock('https://d.i.y')
                    .intercept(`${m.p}?dryRun=All`, m.v, m.v === 'DELETE' || m.v === 'GET' ? undefined : s)
                    .reply(m.c, m.b);
                // TODO: Figure out why Typescript barfs if we do m.call
                const hack_m = m.m as any;
                await hack_m.call(client, s, undefined, 'All');
                scope.done();
            }
        });

        it('should replace a resource', async () => {
            const s = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    annotations: {
                        owner: 'test',
                    },
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                },
                spec: {
                    ports: [
                        {
                            port: 80,
                            protocol: 'TCP',
                            targetPort: 80,
                        },
                    ],
                    selector: {
                        app: 'sleep',
                    },
                },
            };
            const scope = nock('https://d.i.y')
                .post('/api/v1/namespaces/default/services?fieldManager=ManageField', s)
                .reply(
                    201,
                    `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "a4fd7a65-2af5-4ef1-a0bc-cb34a308b821",
    "resourceVersion": "41183",
    "creationTimestamp": "2020-05-11T19:35:01Z",
    "annotations": {
      "owner": "test"
    }
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.106.153.133",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                )
                .put('/api/v1/namespaces/default/services/k8s-js-client-test?pretty=true', {
                    kind: 'Service',
                    apiVersion: 'v1',
                    metadata: {
                        name: 'k8s-js-client-test',
                        namespace: 'default',
                        selfLink: '/api/v1/namespaces/default/services/k8s-js-client-test',
                        uid: 'a4fd7a65-2af5-4ef1-a0bc-cb34a308b821',
                        resourceVersion: '41183',
                        creationTimestamp: '2020-05-11T19:35:01Z',
                        annotations: {
                            owner: 'test',
                            test: '1',
                        },
                    },
                    spec: {
                        ports: [
                            {
                                protocol: 'TCP',
                                port: 80,
                                targetPort: 80,
                            },
                        ],
                        selector: {
                            app: 'sleep',
                        },
                        clusterIP: '10.106.153.133',
                        type: 'ClusterIP',
                        sessionAffinity: 'None',
                    },
                    status: {
                        loadBalancer: {},
                    },
                })
                .reply(
                    200,
                    `{
  "kind": "Service",
  "apiVersion": "v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "a4fd7a65-2af5-4ef1-a0bc-cb34a308b821",
    "resourceVersion": "41185",
    "creationTimestamp": "2020-05-11T19:35:01Z",
    "annotations": {
      "owner": "test",
      "test": "1"
    }
  },
  "spec": {
    "ports": [
      {
        "protocol": "TCP",
        "port": 80,
        "targetPort": 80
      }
    ],
    "selector": {
      "app": "sleep"
    },
    "clusterIP": "10.106.153.133",
    "type": "ClusterIP",
    "sessionAffinity": "None"
  },
  "status": {
    "loadBalancer": {}
  }
}`,
                )
                .delete(
                    '/api/v1/namespaces/default/services/k8s-js-client-test?gracePeriodSeconds=7&propagationPolicy=Foreground',
                )
                .reply(
                    200,
                    `{
  "apiVersion": "v1",
  "details": {
    "kind": "services",
    "name": "k8s-js-client-test",
    "uid": "a4fd7a65-2af5-4ef1-a0bc-cb34a308b821"
  },
  "kind": "Status",
  "metadata": {},
  "status": "Success"
}`,
                );
            const cr: any = await client.create(s, undefined, undefined, 'ManageField');
            const rs: any = cr.body;
            rs.metadata.annotations.test = '1';
            const rr: any = await client.replace(rs, 'true');
            expect(rr.body.metadata.annotations.test).to.equal('1');
            expect(parseInt(rr.body.metadata.resourceVersion, 10)).to.be.greaterThan(
                parseInt(cr.body.metadata.resourceVersion, 10),
            );
            await client.delete(s, undefined, undefined, 7, undefined, 'Foreground');
            scope.done();
        });
    });

    describe('errors', () => {
        let client: KubernetesObjectApi;
        before(() => {
            const kc = new KubeConfig();
            kc.loadFromOptions(testConfigOptions);
            client = KubernetesObjectApi.makeApiClient(kc);
        });

        it('should throw error if no spec', async () => {
            const methods = [client.create, client.patch, client.read, client.replace, client.delete];
            for (const s of [null, undefined]) {
                for (const m of methods) {
                    let thrown = false;
                    try {
                        // TODO: Figure out why Typescript barfs if we do m.call
                        const hack_m = m as any;
                        await hack_m.call(client, s);
                        expect.fail('should have thrown an error');
                    } catch (e) {
                        thrown = true;
                        expect(e.message).to.contain(
                            'Required parameter spec was null or undefined when calling ',
                        );
                    }
                    expect(thrown).to.be.true;
                }
            }
        });

        it('should throw an error if request throws an error', async () => {
            const s = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: 'valid-name',
                    namespace: 'default',
                },
                spec: {
                    ports: [
                        {
                            port: 80,
                            protocol: 'TCP',
                            targetPort: 80,
                        },
                    ],
                    selector: {
                        app: 'sleep',
                    },
                },
            };
            nock('https://d.i.y');
            let thrown = false;
            try {
                await client.read(s);
                expect.fail('should have thrown error');
            } catch (e) {
                thrown = true;
                expect(e.message).to.contain('Nock: No match for request');
            }
            expect(thrown).to.be.true;
        });

        it('should throw an error if name not valid', async () => {
            const s = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: '_not_a_valid_name_',
                    namespace: 'default',
                },
                spec: {
                    ports: [
                        {
                            port: 80,
                            protocol: 'TCP',
                            targetPort: 80,
                        },
                    ],
                    selector: {
                        app: 'sleep',
                    },
                },
            };
            const scope = nock('https://d.i.y')
                .get('/api/v1')
                .reply(200, resourceBodies.core)
                .post('/api/v1/namespaces/default/services', s)
                .reply(
                    422,
                    `{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "Service \"_not_a_valid_name_\" is invalid: metadata.name: Invalid value: \"_not_a_valid_name_\": a DNS-1035 label must consist of lower case alphanumeric characters or '-', start with an alphabetic character, and end with an alphanumeric character (e.g. 'my-name',  or 'abc-123', regex used for validation is '[a-z]([-a-z0-9]*[a-z0-9])?')",
  "reason": "Invalid",
  "details": {
    "name": "_not_a_valid_name_",
    "kind": "Service",
    "causes": [
      {
        "reason": "FieldValueInvalid",
        "message": "Invalid value: \"_not_a_valid_name_\": a DNS-1035 label must consist of lower case alphanumeric characters or '-', start with an alphabetic character, and end with an alphanumeric character (e.g. 'my-name',  or 'abc-123', regex used for validation is '[a-z]([-a-z0-9]*[a-z0-9])?')",
        "field": "metadata.name"
      }
    ]
  },
  "code": 422
}`,
                );
            let thrown = false;
            try {
                await client.create(s);
            } catch (e) {
                thrown = true;
                expect(e.statusCode).to.equal(422);
                expect(e.message).to.equal('HTTP request failed');
            }
            expect(thrown).to.be.true;
            scope.done();
        });

        it('should throw an error if apiVersion not valid', async () => {
            const d = {
                apiVersion: 'applications/v1',
                kind: 'Deployment',
                metadata: {
                    name: 'should-not-be-created',
                    namespace: 'default',
                },
                spec: {
                    selector: {
                        matchLabels: {
                            app: 'sleep',
                        },
                    },
                    template: {
                        metadata: {
                            labels: {
                                app: 'sleep',
                            },
                        },
                        spec: {
                            containers: [
                                {
                                    args: ['60'],
                                    command: ['sleep'],
                                    image: 'alpine',
                                    name: 'sleep',
                                    ports: [{ containerPort: 80 }],
                                },
                            ],
                        },
                    },
                },
            };
            const scope = nock('https://d.i.y')
                .get('/apis/applications/v1')
                .reply(404, `{}`);
            let thrown = false;
            try {
                await client.create(d);
            } catch (e) {
                thrown = true;
                expect(e.statusCode).to.equal(404);
                expect(e.message).to.equal(
                    'Failed to fetch resource metadata for applications/v1/Deployment: HTTP request failed',
                );
            }
            expect(thrown).to.be.true;
            scope.done();
        });
    });
});
