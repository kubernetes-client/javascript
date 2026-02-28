import { before, describe, it } from 'node:test';
import { deepStrictEqual, ok, rejects, strictEqual } from 'node:assert';
import { MockAgent } from 'undici';
import { Configuration, V1APIResource, V1APIResourceList, V1Secret } from './api.js';
import { KubeConfig } from './config.js';
import { KubernetesObjectApi } from './object.js';
import { KubernetesObject } from './types.js';
import { of } from './gen/rxjsStub.js';
import { createMockApplyFn } from './test/mock-dispatcher.js';

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
            strictEqual((c as any).defaultNamespace, 'default');
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
            strictEqual((c as any).defaultNamespace, 'straight-edge');
        });
    });

    class KubernetesObjectApiTest extends KubernetesObjectApi {
        public configuration: Configuration;
        public constructor(configuration: Configuration) {
            super(configuration);
            this.configuration = configuration;
        }

        public static makeApiClient(kc?: KubeConfig, mockAgent?: MockAgent): KubernetesObjectApiTest {
            if (!kc) {
                kc = new KubeConfig();
                kc.loadFromOptions(testConfigOptions);
            }
            if (mockAgent) {
                createMockApplyFn(kc, mockAgent);
            }
            const client = kc.makeApiClient(KubernetesObjectApiTest);
            client.setDefaultNamespace(kc);
            return client;
        }
        public apiVersionResourceCache: Record<string, V1APIResourceList> = {};
        public async specUriPath(spec: KubernetesObject, method: any): Promise<string> {
            return super.specUriPath(spec, method);
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

    const jsonContentTypeHeaders = { headers: { 'content-type': 'application/json' } };

    describe('specUriPath', () => {
        it('should return a namespaced path', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'patch');
            strictEqual(r, '/api/v1/namespaces/fugazi/services/repeater');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should default to apiVersion v1', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                kind: 'ServiceAccount',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'patch');
            strictEqual(r, '/api/v1/namespaces/fugazi/serviceaccounts/repeater');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should default to context namespace', async () => {
            const kc = new KubeConfig();
            kc.loadFromOptions({
                clusters: [{ name: 'dc', server: 'https://d.i.y' }],
                users: [{ name: 'ian', password: 'mackaye' }],
                contexts: [{ name: 'dischord', cluster: 'dc', user: 'ian', namespace: 'straight-edge' }],
                currentContext: 'dischord',
            });
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(kc, mockAgent);
            const o = {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: 'repeater',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'patch');
            strictEqual(r, '/api/v1/namespaces/straight-edge/pods/repeater');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should default to default namespace', async () => {
            const kc = new KubeConfig();
            kc.loadFromOptions({
                clusters: [{ name: 'dc', server: 'https://d.i.y' }],
                users: [{ name: 'ian', password: 'mackaye' }],
                contexts: [{ name: 'dischord', cluster: 'dc', user: 'ian' }],
                currentContext: 'dischord',
            });
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(kc, mockAgent);
            const o = {
                apiVersion: 'v1',
                kind: 'Pod',
                metadata: {
                    name: 'repeater',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'patch');
            strictEqual(r, '/api/v1/namespaces/default/pods/repeater');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should return a non-namespaced path', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'v1',
                kind: 'Namespace',
                metadata: {
                    name: 'repeater',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'delete');
            strictEqual(r, '/api/v1/namespaces/repeater');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should return a namespaced path without name', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    namespace: 'fugazi',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'create');
            strictEqual(r, '/api/v1/namespaces/fugazi/services');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should return a non-namespaced path without name', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'v1',
                kind: 'Namespace',
                metadata: {
                    name: 'repeater',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'create');
            strictEqual(r, '/api/v1/namespaces');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should return a namespaced path for non-core resource', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'apps/v1',
                kind: 'Deployment',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/apis/apps/v1', method: 'GET' })
                .reply(200, resourceBodies.apps, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'read');
            strictEqual(r, '/apis/apps/v1/namespaces/fugazi/deployments/repeater');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should return a non-namespaced path for non-core resource', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'rbac.authorization.k8s.io/v1',
                kind: 'ClusterRole',
                metadata: {
                    name: 'repeater',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/apis/rbac.authorization.k8s.io/v1', method: 'GET' })
                .reply(200, resourceBodies.rbac, jsonContentTypeHeaders);
            const r = await c.specUriPath(o, 'read');
            strictEqual(r, '/apis/rbac.authorization.k8s.io/v1/clusterroles/repeater');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should handle a variety of resources', async () => {
            const a = [
                {
                    apiVersion: 'v1',
                    kind: 'Service',
                    ns: true,
                    p: '/api/v1',
                    b: resourceBodies.core,
                    e: '/api/v1/namespaces/fugazi/services/repeater',
                },
                {
                    apiVersion: 'v1',
                    kind: 'ServiceAccount',
                    ns: true,
                    p: '/api/v1',
                    b: resourceBodies.core,
                    e: '/api/v1/namespaces/fugazi/serviceaccounts/repeater',
                },
                {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    kind: 'Role',
                    ns: true,
                    p: '/apis/rbac.authorization.k8s.io/v1',
                    b: resourceBodies.rbac,
                    e: '/apis/rbac.authorization.k8s.io/v1/namespaces/fugazi/roles/repeater',
                },
                {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    kind: 'ClusterRole',
                    ns: false,
                    p: '/apis/rbac.authorization.k8s.io/v1',
                    b: resourceBodies.rbac,
                    e: '/apis/rbac.authorization.k8s.io/v1/clusterroles/repeater',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'NetworkPolicy',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: '/apis/extensions/v1beta1/namespaces/fugazi/networkpolicies/repeater',
                },
                {
                    apiVersion: 'networking.k8s.io/v1',
                    kind: 'NetworkPolicy',
                    ns: true,
                    p: '/apis/networking.k8s.io/v1',
                    b: resourceBodies.networking,
                    e: '/apis/networking.k8s.io/v1/namespaces/fugazi/networkpolicies/repeater',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'Ingress',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: '/apis/extensions/v1beta1/namespaces/fugazi/ingresses/repeater',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'DaemonSet',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: '/apis/extensions/v1beta1/namespaces/fugazi/daemonsets/repeater',
                },
                {
                    apiVersion: 'apps/v1',
                    kind: 'DaemonSet',
                    ns: true,
                    p: '/apis/apps/v1',
                    b: resourceBodies.apps,
                    e: '/apis/apps/v1/namespaces/fugazi/daemonsets/repeater',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'Deployment',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: '/apis/extensions/v1beta1/namespaces/fugazi/deployments/repeater',
                },
                {
                    apiVersion: 'apps/v1',
                    kind: 'Deployment',
                    ns: true,
                    p: '/apis/apps/v1',
                    b: resourceBodies.apps,
                    e: '/apis/apps/v1/namespaces/fugazi/deployments/repeater',
                },
                {
                    apiVersion: 'storage.k8s.io/v1',
                    kind: 'StorageClass',
                    ns: false,
                    p: '/apis/storage.k8s.io/v1',
                    b: resourceBodies.storage,
                    e: '/apis/storage.k8s.io/v1/storageclasses/repeater',
                },
            ];
            for (const k of a) {
                const mockAgent = new MockAgent();
                mockAgent.disableNetConnect();
                const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
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
                mockAgent
                    .get('https://d.i.y')
                    .intercept({ path: k.p, method: 'GET' })
                    .reply(200, k.b, jsonContentTypeHeaders);
                const r = await c.specUriPath(o, 'patch');
                strictEqual(r, k.e);
                mockAgent.assertNoPendingInterceptors();
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
                    e: '/api/v1/namespaces/fugazi/services',
                },
                {
                    apiVersion: 'v1',
                    kind: 'ServiceAccount',
                    ns: true,
                    p: '/api/v1',
                    b: resourceBodies.core,
                    e: '/api/v1/namespaces/fugazi/serviceaccounts',
                },
                {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    kind: 'Role',
                    ns: true,
                    p: '/apis/rbac.authorization.k8s.io/v1',
                    b: resourceBodies.rbac,
                    e: '/apis/rbac.authorization.k8s.io/v1/namespaces/fugazi/roles',
                },
                {
                    apiVersion: 'rbac.authorization.k8s.io/v1',
                    kind: 'ClusterRole',
                    ns: false,
                    p: '/apis/rbac.authorization.k8s.io/v1',
                    b: resourceBodies.rbac,
                    e: '/apis/rbac.authorization.k8s.io/v1/clusterroles',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'NetworkPolicy',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: '/apis/extensions/v1beta1/namespaces/fugazi/networkpolicies',
                },
                {
                    apiVersion: 'networking.k8s.io/v1',
                    kind: 'NetworkPolicy',
                    ns: true,
                    p: '/apis/networking.k8s.io/v1',
                    b: resourceBodies.networking,
                    e: '/apis/networking.k8s.io/v1/namespaces/fugazi/networkpolicies',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'Ingress',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: '/apis/extensions/v1beta1/namespaces/fugazi/ingresses',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'DaemonSet',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: '/apis/extensions/v1beta1/namespaces/fugazi/daemonsets',
                },
                {
                    apiVersion: 'apps/v1',
                    kind: 'DaemonSet',
                    ns: true,
                    p: '/apis/apps/v1',
                    b: resourceBodies.apps,
                    e: '/apis/apps/v1/namespaces/fugazi/daemonsets',
                },
                {
                    apiVersion: 'extensions/v1beta1',
                    kind: 'Deployment',
                    ns: true,
                    p: '/apis/extensions/v1beta1',
                    b: resourceBodies.extensions,
                    e: '/apis/extensions/v1beta1/namespaces/fugazi/deployments',
                },
                {
                    apiVersion: 'apps/v1',
                    kind: 'Deployment',
                    ns: true,
                    p: '/apis/apps/v1',
                    b: resourceBodies.apps,
                    e: '/apis/apps/v1/namespaces/fugazi/deployments',
                },
                {
                    apiVersion: 'storage.k8s.io/v1',
                    kind: 'StorageClass',
                    ns: false,
                    p: '/apis/storage.k8s.io/v1',
                    b: resourceBodies.storage,
                    e: '/apis/storage.k8s.io/v1/storageclasses',
                },
            ];
            for (const k of a) {
                const mockAgent = new MockAgent();
                mockAgent.disableNetConnect();
                const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
                const o: KubernetesObject = {
                    apiVersion: k.apiVersion,
                    kind: k.kind,
                };
                if (k.ns) {
                    o.metadata = { namespace: 'fugazi' };
                }
                mockAgent
                    .get('https://d.i.y')
                    .intercept({ path: k.p, method: 'GET' })
                    .reply(200, k.b, jsonContentTypeHeaders);
                const r = await c.specUriPath(o, 'create');
                strictEqual(r, k.e);
                mockAgent.assertNoPendingInterceptors();
            }
        });

        it('should throw an error if kind missing', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'v1',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            await rejects(c.specUriPath(o, 'create'), {
                name: 'Error',
                message: 'Required spec property kind is not set',
            });
        });

        it('should throw an error if name required and missing', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'v1',
                kind: 'Service',
                metadata: {
                    namespace: 'fugazi',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);

            await rejects(c.specUriPath(o, 'read'), {
                name: 'Error',
                message: 'Required spec property name is not set',
            });
            mockAgent.assertNoPendingInterceptors();
        });

        it('should throw an error if resource is not valid', async () => {
            const mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
            const o = {
                apiVersion: 'v1',
                kind: 'Ingress',
                metadata: {
                    name: 'repeater',
                    namespace: 'fugazi',
                },
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);

            await rejects(c.specUriPath(o, 'create'), {
                name: 'Error',
                message: 'Unrecognized API version and kind: v1 Ingress',
            });
            mockAgent.assertNoPendingInterceptors();
        });
    });

    describe('resource', () => {
        let client: KubernetesObjectApiTest;
        let mockAgent: MockAgent;
        before(function () {
            mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            client = KubernetesObjectApiTest.makeApiClient(undefined, mockAgent);
        });

        it('should throw an error if apiVersion not set', async () => {
            for (const a of [null, undefined]) {
                await rejects(client.resource(a as unknown as string, 'Service'), {
                    name: 'Error',
                    message: 'Required parameter apiVersion was null or undefined when calling resource',
                });
            }
        });

        it('should throw an error if kind not set', async () => {
            for (const a of [null, undefined]) {
                await rejects(client.resource('v1', a as unknown as string), {
                    name: 'Error',
                    message: 'Required parameter kind was null or undefined when calling resource',
                });
            }
        });

        it('should use middleware', async () => {
            const ma = new MockAgent();
            ma.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, ma);

            let preMiddlewareCalled = false;
            let postMiddlewareCalled = false;
            c.configuration.middleware.push({
                pre: (context) => {
                    preMiddlewareCalled = true;
                    return of(context);
                },
                post: (context) => {
                    postMiddlewareCalled = true;
                    return of(context);
                },
            });

            ma.get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            await c.resource('v1', 'Service');
            strictEqual(preMiddlewareCalled, true);
            strictEqual(postMiddlewareCalled, true);
            ma.assertNoPendingInterceptors();
        });

        it('should cache API response', async () => {
            const ma = new MockAgent();
            ma.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, ma);
            ma.get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const s = await c.resource('v1', 'Service');
            if (!s) {
                throw new Error('old TypeScript compiler');
            }
            strictEqual(s.kind, 'Service');
            strictEqual(s.name, 'services');
            strictEqual(s.namespaced, true);
            ok(c.apiVersionResourceCache);
            ok(c.apiVersionResourceCache.v1);
            const sa = await c.resource('v1', 'ServiceAccount');
            if (!sa) {
                throw new Error('old TypeScript compiler');
            }
            strictEqual(sa.kind, 'ServiceAccount');
            strictEqual(sa.name, 'serviceaccounts');
            strictEqual(sa.namespaced, true);
            const p = await c.resource('v1', 'Pod');
            if (!p) {
                throw new Error('old TypeScript compiler');
            }
            strictEqual(p.kind, 'Pod');
            strictEqual(p.name, 'pods');
            strictEqual(p.namespaced, true);
            const pv = await c.resource('v1', 'PersistentVolume');
            if (!pv) {
                throw new Error('old TypeScript compiler');
            }
            strictEqual(pv.kind, 'PersistentVolume');
            strictEqual(pv.name, 'persistentvolumes');
            strictEqual(pv.namespaced, false);
            ma.assertNoPendingInterceptors();
        });

        it('should re-request on cache miss', async () => {
            const ma = new MockAgent();
            ma.disableNetConnect();
            const c = KubernetesObjectApiTest.makeApiClient(undefined, ma);
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
            ma.get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            const s = await c.resource('v1', 'Service');
            if (!s) {
                throw new Error('old TypeScript compiler');
            }
            strictEqual(s.kind, 'Service');
            strictEqual(s.name, 'services');
            strictEqual(s.namespaced, true);
            ok(c.apiVersionResourceCache);
            ok(c.apiVersionResourceCache.v1);
            strictEqual(
                c.apiVersionResourceCache.v1.resources.length,
                JSON.parse(resourceBodies.core).resources.length,
            );
            ma.assertNoPendingInterceptors();
        });
    });

    describe('verbs', () => {
        let client: KubernetesObjectApi;
        let mockAgent: MockAgent;
        before(() => {
            const kc = new KubeConfig();
            kc.loadFromOptions(testConfigOptions);
            mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            createMockApplyFn(kc, mockAgent);
            client = KubernetesObjectApi.makeApiClient(kc);
            (client as any).apiVersionResourceCache.v1 = JSON.parse(resourceBodies.core);
            (client as any).apiVersionResourceCache['networking.k8s.io/v1'] = JSON.parse(
                resourceBodies.networking,
            );
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
                mockAgent
                    .get('https://d.i.y')
                    .intercept({ path: m.p, method: m.v })
                    .reply(m.c, m.b, jsonContentTypeHeaders);
                // TODO: Figure out why Typescript barfs if we do m.call
                const hack_m = m.m as any;
                await hack_m.call(client, s);
            }
            mockAgent.assertNoPendingInterceptors();
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
                    mockAgent
                        .get('https://d.i.y')
                        .intercept({ path: `${m.p}?pretty=${p}`, method: m.v })
                        .reply(m.c, m.b, jsonContentTypeHeaders);
                    // TODO: Figure out why Typescript barfs if we do m.call
                    const hack_m = m.m as any;
                    await hack_m.call(client, s, p);
                }
            }
            mockAgent.assertNoPendingInterceptors();
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
                mockAgent
                    .get('https://d.i.y')
                    .intercept({ path: `${m.p}?dryRun=All`, method: m.v })
                    .reply(m.c, m.b, jsonContentTypeHeaders);
                // TODO: Figure out why Typescript barfs if we do m.call
                const hack_m = m.m as any;
                await hack_m.call(client, s, undefined, 'All');
            }
            mockAgent.assertNoPendingInterceptors();
        });

        it('should properly serialize resources on modify', async () => {
            const netPol = {
                apiVersion: 'networking.k8s.io/v1',
                kind: 'NetworkPolicy',
                metadata: {
                    name: 'k8s-js-client-test',
                    namespace: 'default',
                },
                spec: {
                    podSelector: {
                        matchLabels: {
                            app: 'my-app',
                        },
                    },
                    policyTypes: ['Ingress'],
                    ingress: [
                        {
                            _from: [
                                {
                                    podSelector: { matchLabels: { app: 'foo' } },
                                },
                            ],
                            ports: [{ port: 123 }],
                        },
                    ],
                },
            };
            const returnBody = `{
  "kind": "NetworkPolicy",
  "apiVersion": "networking.k8s.io/v1",
  "metadata": {
    "name": "k8s-js-client-test",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/services/k8s-js-client-test",
    "uid": "6a43eddc-26bf-424e-ab30-cde3041a706a",
    "resourceVersion": "32373",
    "creationTimestamp": "2020-05-11T17:34:25Z"
  },
  "spec": {
    "policyTypes": ["Ingress"],
    "podSelector": {
      "matchLabels": {
        "app": "my-app"
      }
    },
    "ingress": [
      {
        "from": [{
          "podSelector": {
            "matchLabels": {
                "app": "foo"
            }
          }
        }],
        "ports": [{"port": 123}]
      }
    ]
  }
}`;
            const methods = [
                {
                    m: client.create,
                    v: 'POST',
                    p: '/apis/networking.k8s.io/v1/namespaces/default/networkpolicies',
                    c: 201,
                    b: returnBody,
                },
                {
                    m: client.replace,
                    v: 'PUT',
                    p: '/apis/networking.k8s.io/v1/namespaces/default/networkpolicies/k8s-js-client-test',
                    c: 200,
                    b: returnBody,
                },
                {
                    m: client.patch,
                    v: 'PATCH',
                    p: '/apis/networking.k8s.io/v1/namespaces/default/networkpolicies/k8s-js-client-test',
                    c: 200,
                    b: returnBody,
                },
            ];
            for (const m of methods) {
                mockAgent
                    .get('https://d.i.y')
                    .intercept({ path: m.p, method: m.v })
                    .reply(m.c, m.b, jsonContentTypeHeaders);
                // TODO: Figure out why Typescript barfs if we do m.call
                const hack_m = m.m as any;
                await hack_m.call(client, netPol);
            }
            mockAgent.assertNoPendingInterceptors();
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
            mockAgent
                .get('https://d.i.y')
                .intercept({
                    path: '/api/v1/namespaces/default/services?fieldManager=ManageField',
                    method: 'POST',
                })
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
                    jsonContentTypeHeaders,
                );
            mockAgent
                .get('https://d.i.y')
                .intercept({
                    path: '/api/v1/namespaces/default/services/k8s-js-client-test?pretty=true',
                    method: 'PUT',
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
                    jsonContentTypeHeaders,
                );
            mockAgent
                .get('https://d.i.y')
                .intercept({
                    path: '/api/v1/namespaces/default/services/k8s-js-client-test?gracePeriodSeconds=7&propagationPolicy=Foreground',
                    method: 'DELETE',
                })
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
                    jsonContentTypeHeaders,
                );
            const c = await client.create(s, undefined, undefined, 'ManageField');
            (c.metadata.annotations as Record<string, string>).test = '1';
            const r = await client.replace(c, 'true');
            strictEqual((r.metadata.annotations as Record<string, string>).test, '1');
            ok(
                parseInt((r.metadata as any).resourceVersion, 10) >
                    parseInt((c.metadata as any).resourceVersion, 10),
            );
            await client.delete(s, undefined, undefined, 7, undefined, 'Foreground');
            mockAgent.assertNoPendingInterceptors();
        });

        it('should read a resource', async () => {
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1/namespaces/default/secrets/test-secret-1', method: 'GET' })
                .reply(
                    200,
                    {
                        apiVersion: 'v1',
                        kind: 'Secret',
                        metadata: {
                            name: 'test-secret-1',
                            namespace: 'default',
                            uid: 'a4fd7a65-2af5-4ef1-a0bc-cb34a308b821',
                            creationTimestamp: '2022-01-01T00:00:00.000Z',
                        },
                        data: {
                            key: 'value',
                        },
                    },
                    jsonContentTypeHeaders,
                );
            const secret = await client.read<V1Secret>({
                apiVersion: 'v1',
                kind: 'Secret',
                metadata: {
                    name: 'test-secret-1',
                    namespace: 'default',
                },
            });
            strictEqual(secret instanceof V1Secret, true);
            deepStrictEqual(secret.data, {
                key: 'value',
            });
            ok(secret.metadata);
            deepStrictEqual(secret.metadata!.creationTimestamp, new Date('2022-01-01T00:00:00.000Z'));
            mockAgent.assertNoPendingInterceptors();
        });

        it('should read a custom resource', async () => {
            interface CustomTestResource extends KubernetesObject {
                spec: {
                    key: string;
                };
            }
            (client as any).apiVersionResourceCache['example.com/v1'] = {
                groupVersion: 'example.com/v1',
                kind: 'APIResourceList',
                resources: [
                    {
                        kind: 'CustomTestResource',
                        name: 'customtestresources',
                        namespaced: true,
                    },
                ],
            };
            mockAgent
                .get('https://d.i.y')
                .intercept({
                    path: '/apis/example.com/v1/namespaces/default/customtestresources/test-1',
                    method: 'GET',
                })
                .reply(
                    200,
                    {
                        apiVersion: 'example.com/v1',
                        kind: 'CustomTestResource',
                        metadata: {
                            name: 'test-1',
                            namespace: 'default',
                            uid: 'a4fd7a65-2af5-4ef1-a0bc-cb34a308b821',
                            creationTimestamp: '2022-01-01T00:00:00.000Z',
                        },
                        spec: {
                            key: 'value',
                        },
                    },
                    jsonContentTypeHeaders,
                );
            const custom = await client.read<CustomTestResource>({
                apiVersion: 'example.com/v1',
                kind: 'CustomTestResource',
                metadata: {
                    name: 'test-1',
                    namespace: 'default',
                },
            });
            deepStrictEqual(custom.spec, {
                key: 'value',
            });
            ok(custom.metadata);
            deepStrictEqual(custom.metadata!.creationTimestamp, new Date('2022-01-01T00:00:00.000Z'));
            mockAgent.assertNoPendingInterceptors();
        });

        it('should list resources in a namespace', async () => {
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1/namespaces/default/secrets', method: 'GET' })
                .reply(
                    200,
                    {
                        apiVersion: 'v1',
                        kind: 'SecretList',
                        items: [
                            {
                                apiVersion: 'v1',
                                kind: 'Secret',
                                metadata: {
                                    name: 'test-secret-1',
                                    uid: 'a4fd7a65-2af5-4ef1-a0bc-cb34a308b821',
                                },
                            },
                        ],
                        metadata: {
                            resourceVersion: '216532459',
                            continue: 'abc',
                        },
                    },
                    jsonContentTypeHeaders,
                );
            const lr = await client.list<V1Secret>('v1', 'Secret', 'default');
            const items = lr.items;
            strictEqual(items.length, 1);
            strictEqual(items[0] instanceof V1Secret, true);
            mockAgent.assertNoPendingInterceptors();
        });

        it('should list resources in all namespaces', async () => {
            mockAgent
                .get('https://d.i.y')
                .intercept({
                    path: '/api/v1/secrets?fieldSelector=metadata.name%3Dtest-secret1&labelSelector=app%3Dmy-app&limit=5',
                    method: 'GET',
                })
                .reply(
                    200,
                    {
                        apiVersion: 'v1',
                        kind: 'SecretList',
                        items: [
                            {
                                apiVersion: 'v1',
                                kind: 'Secret',
                                metadata: {
                                    name: 'test-secret-1',
                                    uid: 'a4fd7a65-2af5-4ef1-a0bc-cb34a308b821',
                                },
                            },
                        ],
                        metadata: {
                            resourceVersion: '216532459',
                            continue: 'abc',
                        },
                    },
                    jsonContentTypeHeaders,
                );
            const lr = await client.list(
                'v1',
                'Secret',
                undefined,
                undefined,
                undefined,
                undefined,
                'metadata.name=test-secret1',
                'app=my-app',
                5,
            );
            const items = lr.items;
            strictEqual(items.length, 1);
            mockAgent.assertNoPendingInterceptors();
        });
    });

    describe('errors', () => {
        let client: KubernetesObjectApi;
        let mockAgent: MockAgent;
        before(() => {
            const kc = new KubeConfig();
            kc.loadFromOptions(testConfigOptions);
            mockAgent = new MockAgent();
            mockAgent.disableNetConnect();
            createMockApplyFn(kc, mockAgent);
            client = KubernetesObjectApi.makeApiClient(kc);
        });

        it('should throw error if no spec', async () => {
            const methods = [client.create, client.patch, client.read, client.replace, client.delete];
            for (const s of [null, undefined]) {
                for (const m of methods) {
                    // TODO: Figure out why Typescript barfs if we do m.call
                    const hack_m = m as any;
                    await rejects(hack_m.call(client, s), {
                        name: 'Error',
                        message: /Required parameter spec was null or undefined when calling /,
                    });
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
            await rejects(client.read(s), {
                name: 'TypeError',
            });
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
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1', method: 'GET' })
                .reply(200, resourceBodies.core, jsonContentTypeHeaders);
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/api/v1/namespaces/default/services', method: 'POST' })
                .reply(
                    422,
                    `{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "Service \\"_not_a_valid_name_\\" is invalid",
  "reason": "Invalid",
  "details": {
    "name": "_not_a_valid_name_",
    "kind": "Service",
    "causes": [
      {
        "reason": "FieldValueInvalid",
        "message": "Invalid value",
        "field": "metadata.name"
      }
    ]
  },
  "code": 422
}`,
                    jsonContentTypeHeaders,
                );

            await rejects(client.create(s), {
                name: 'Error',
                code: 422,
            });
            mockAgent.assertNoPendingInterceptors();
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
            mockAgent
                .get('https://d.i.y')
                .intercept({ path: '/apis/applications/v1', method: 'GET' })
                .reply(404, '{}', jsonContentTypeHeaders);
            await rejects(client.create(d), {
                name: 'Error',
                code: 404,
                message: /Failed to fetch resource metadata for applications\/v1\/Deployment/,
            });
            mockAgent.assertNoPendingInterceptors();
        });

        it('should throw error if no apiVersion', async () => {
            await rejects((client.list as any)(undefined, undefined), {
                name: 'Error',
                message: 'Required parameter apiVersion was null or undefined when calling list.',
            });
        });

        it('should throw error if no kind', async () => {
            await rejects((client.list as any)('', undefined), {
                name: 'Error',
                message: 'Required parameter kind was null or undefined when calling list.',
            });
        });
    });
});
