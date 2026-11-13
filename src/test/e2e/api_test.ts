import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before, describe, it } from 'node:test';
import protobuf from 'protobufjs';
import { fetch } from 'undici';
import { CoreV1Api, HttpMethod, KubeConfig, PatchStrategy, setHeaderOptions } from '../../index.js';
import { RequestContext } from '../../gen/http/http.js';

const protobufContentType = 'application/vnd.kubernetes.protobuf';
const magic = Buffer.from([0x6b, 0x38, 0x73, 0x00]);

// Only the fields exercised here are needed; protobuf decoders skip unknown fields.
const schema = protobuf.parse(`
    syntax = "proto2";
    message TypeMeta {
        optional string apiVersion = 1;
        optional string kind = 2;
    }
    message Unknown {
        optional TypeMeta typeMeta = 1;
        optional bytes raw = 2;
        optional string contentEncoding = 3;
        optional string contentType = 4;
    }
    message ObjectMeta {
        optional string name = 1;
        optional string namespace = 3;
        optional string resourceVersion = 6;
        map<string, string> labels = 11;
    }
    message ConfigMap {
        optional ObjectMeta metadata = 1;
        map<string, string> data = 2;
    }
    message ConfigMapList {
        repeated ConfigMap items = 2;
    }
`).root;
const unknownType = schema.lookupType('Unknown');

function encode(kind: string, value: object): Buffer {
    const type = schema.lookupType(kind);
    const raw = type.encode(type.fromObject(value)).finish();
    const envelope = unknownType.encode({ typeMeta: { apiVersion: 'v1', kind }, raw }).finish();
    return Buffer.concat([magic, envelope]);
}

function decode(kind: string, body: Buffer) {
    assert.deepEqual(body.subarray(0, magic.length), magic, 'Missing Kubernetes protobuf prefix');
    const envelope = unknownType.toObject(unknownType.decode(body.subarray(magic.length)));
    assert.equal(envelope.typeMeta.apiVersion, 'v1');
    assert.equal(envelope.typeMeta.kind, kind);
    const type = schema.lookupType(kind);
    return type.toObject(type.decode(envelope.raw));
}

describe('Kubernetes API end-to-end', { timeout: 120_000 }, () => {
    const config = new KubeConfig();
    const namespace = `client-node-e2e-${randomUUID()}`;
    let api: CoreV1Api;
    let namespaceCreated = false;

    before(async () => {
        config.loadFromDefault();
        assert.ok(config.getCurrentCluster(), 'A reachable Kubernetes cluster and kubeconfig are required');
        api = config.makeApiClient(CoreV1Api);
        await api.createNamespace({ body: { metadata: { name: namespace } } });
        namespaceCreated = true;
    });

    after(async () => {
        if (namespaceCreated) {
            await api.deleteNamespace({ name: namespace });
        }
    });

    async function request(method: HttpMethod, path: string, status: number, body?: Buffer) {
        const cluster = config.getCurrentCluster();
        assert.ok(cluster);
        const context = new RequestContext(`${cluster.server}/api/v1/namespaces/${namespace}${path}`, method);
        context.setHeaderParam('Accept', protobufContentType);
        if (body) {
            context.setHeaderParam('Content-Type', protobufContentType);
        }
        await config.applySecurityAuthentication(context);
        const response = await fetch(context.getUrl(), {
            method,
            headers: context.getHeaders(),
            dispatcher: context.getDispatcher(),
            body,
            signal: AbortSignal.timeout(30_000),
        });
        const bytes = Buffer.from(await response.arrayBuffer());
        assert.equal(response.status, status, `${method} ${path}: ${bytes.toString()}`);
        assert.equal(response.headers.get('content-type'), protobufContentType);
        return bytes;
    }

    it('creates, reads, lists, patches, and deletes ConfigMaps using the generated JSON client', async () => {
        const name = 'json-config';
        const created = await api.createNamespacedConfigMap({
            namespace,
            body: { metadata: { name, labels: { suite: 'e2e-json' } }, data: { greeting: 'hello' } },
        });
        assert.equal(created.metadata?.namespace, namespace);
        const read = await api.readNamespacedConfigMap({ namespace, name });
        assert.deepEqual(read.data, { greeting: 'hello' });
        const list = await api.listNamespacedConfigMap({ namespace, labelSelector: 'suite=e2e-json' });
        assert.deepEqual(
            list.items.map((item) => item.metadata?.name),
            [name],
        );
        const patched = await api.patchNamespacedConfigMap(
            { namespace, name, body: { data: { greeting: 'updated' } } },
            setHeaderOptions('Content-Type', PatchStrategy.MergePatch),
        );
        assert.deepEqual(patched.data, { greeting: 'updated' });
        await api.deleteNamespacedConfigMap({ namespace, name });
        await assert.rejects(api.readNamespacedConfigMap({ namespace, name }), { code: 404 });
    });

    it('creates, reads, lists, updates, and deletes ConfigMaps over the protobuf wire protocol', async () => {
        const name = 'protobuf-config';
        const value = {
            metadata: { name, namespace, labels: { suite: 'e2e-protobuf' } },
            data: { greeting: 'hello \u2603', multiline: 'first\nsecond' },
        };
        const created = decode(
            'ConfigMap',
            await request(HttpMethod.POST, '/configmaps', 201, encode('ConfigMap', value)),
        );
        assert.equal(created.metadata.name, name);
        assert.equal(created.metadata.namespace, namespace);
        assert.deepEqual(created.data, value.data);
        const read = decode('ConfigMap', await request(HttpMethod.GET, `/configmaps/${name}`, 200));
        assert.deepEqual(read.data, value.data);
        assert.ok(read.metadata.resourceVersion);
        const list = decode(
            'ConfigMapList',
            await request(HttpMethod.GET, '/configmaps?labelSelector=suite%3De2e-protobuf', 200),
        );
        assert.equal(list.items.length, 1);
        assert.equal(list.items[0].metadata.name, name);
        assert.deepEqual(list.items[0].data, value.data);
        const updated = decode(
            'ConfigMap',
            await request(
                HttpMethod.PUT,
                `/configmaps/${name}`,
                200,
                encode('ConfigMap', { metadata: read.metadata, data: { greeting: 'updated' } }),
            ),
        );
        assert.deepEqual(updated.data, { greeting: 'updated' });
        // Cross-check decoding and persistence through the generated JSON client.
        const json = await api.readNamespacedConfigMap({ namespace, name });
        assert.deepEqual(json.data, updated.data);
        await request(HttpMethod.DELETE, `/configmaps/${name}`, 200);
        await assert.rejects(api.readNamespacedConfigMap({ namespace, name }), { code: 404 });
    });
});
