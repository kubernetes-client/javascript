import { strictEqual, deepStrictEqual, ok, rejects } from 'node:assert';
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { AddressInfo } from 'node:net';
import { describe, it } from 'node:test';

import { KubeConfig } from './config.js';
import { ProtoClient } from './proto-client.js';
import { Status } from './proto/generated/k8s.io/apimachinery/pkg/apis/meta/v1/generated.js';
import { Unknown } from './proto/generated/k8s.io/apimachinery/pkg/runtime/generated.js';

const MAGIC_PREFIX = Uint8Array.from([0x6b, 0x38, 0x73, 0x00]);
const PROTO_MEDIA_TYPE = 'application/vnd.kubernetes.protobuf';

describe('ProtoClient', () => {
    it('decodes regular protobuf object responses', async () => {
        const expectedBody = 'hello-proto';
        const responseBody = wrapUnknown({
            apiVersion: 'v1',
            kind: 'ConfigMap',
            raw: Buffer.from(expectedBody, 'utf8'),
        });

        await withProtoServer(
            (req, res) => {
                strictEqual(req.method, 'GET');
                strictEqual(req.headers.accept, PROTO_MEDIA_TYPE);
                res.writeHead(200, { 'Content-Type': PROTO_MEDIA_TYPE });
                res.end(responseBody);
            },
            async (url) => {
                const client = new ProtoClient(makeKubeConfig(url));
                const result = await client.get((bytes: Uint8Array) => Buffer.from(bytes).toString('utf8'), '/api/v1');

                strictEqual(result.object, expectedBody);
                strictEqual(result.status, null);
            },
        );
    });

    it('decodes status responses into status objects', async () => {
        const statusPayload = Status.encode({
            status: 'Failure',
            reason: 'NotFound',
            code: 404,
            message: 'pods "missing" not found',
        }).finish();

        await withProtoServer(
            (_req, res) => {
                res.writeHead(404, { 'Content-Type': PROTO_MEDIA_TYPE });
                res.end(
                    wrapUnknown({
                        apiVersion: 'v1',
                        kind: 'Status',
                        raw: statusPayload,
                    }),
                );
            },
            async (url) => {
                const client = new ProtoClient(makeKubeConfig(url));
                const result = await client.get(() => {
                    throw new Error('decoder should not be called for Status responses');
                }, '/api/v1/namespaces/default/pods/missing');

                strictEqual(result.object, null);
                ok(result.status);
                strictEqual(result.status?.status, 'Failure');
                strictEqual(result.status?.reason, 'NotFound');
                strictEqual(result.status?.code, 404);
            },
        );
    });

    it('encodes create requests with Kubernetes protobuf envelope', async () => {
        const requestBody = Uint8Array.from([9, 8, 7]);

        await withProtoServer(
            async (req, res) => {
                strictEqual(req.method, 'POST');
                strictEqual(req.headers.accept, PROTO_MEDIA_TYPE);
                strictEqual(req.headers['content-type'], PROTO_MEDIA_TYPE);

                const body = await readBody(req);
                const parsed = parseUnknown(body);
                strictEqual(parsed.typeMeta?.apiVersion, 'v1');
                strictEqual(parsed.typeMeta?.kind, 'ConfigMap');
                deepStrictEqual(Array.from(parsed.raw ?? []), Array.from(requestBody));

                res.writeHead(201, { 'Content-Type': PROTO_MEDIA_TYPE });
                res.end(
                    wrapUnknown({
                        apiVersion: 'v1',
                        kind: 'ConfigMap',
                        raw: Buffer.from('created', 'utf8'),
                    }),
                );
            },
            async (url) => {
                const client = new ProtoClient(makeKubeConfig(url));
                const result = await client.create(
                    (bytes: Uint8Array) => Buffer.from(bytes).toString('utf8'),
                    '/api/v1/namespaces/default/configmaps',
                    requestBody,
                    'v1',
                    'ConfigMap',
                );

                strictEqual(result.status, null);
                strictEqual(result.object, 'created');
            },
        );
    });

    it('throws for non-protobuf responses', async () => {
        await withProtoServer(
            (_req, res) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end('{"kind":"Status","message":"boom"}');
            },
            async (url) => {
                const client = new ProtoClient(makeKubeConfig(url));
                await rejects(
                    client.get(() => 'ignored', '/api/v1'),
                    /Unexpected content type 'application\/json' from API server/,
                );
            },
        );
    });
});

function wrapUnknown(input: { apiVersion: string; kind: string; raw: Uint8Array }): Buffer {
    const unknown = Unknown.encode({
        typeMeta: {
            apiVersion: input.apiVersion,
            kind: input.kind,
        },
        raw: input.raw,
    }).finish();

    return Buffer.concat([Buffer.from(MAGIC_PREFIX), Buffer.from(unknown)]);
}

function parseUnknown(data: Buffer) {
    for (let i = 0; i < MAGIC_PREFIX.length; i++) {
        strictEqual(data[i], MAGIC_PREFIX[i]);
    }
    return Unknown.decode(data.subarray(MAGIC_PREFIX.length));
}

async function withProtoServer(
    handler: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => Promise<void> | void,
    fn: (url: string) => Promise<void>,
): Promise<void> {
    const server = http.createServer((req, res) => {
        Promise.resolve(handler(req, res)).catch((err: Error) => {
            res.statusCode = 500;
            res.end(err.message);
        });
    });

    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

    try {
        const address = server.address() as AddressInfo;
        await fn(`http://127.0.0.1:${address.port}`);
    } finally {
        await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
    }
}

function makeKubeConfig(serverUrl: string): KubeConfig {
    const kc = new KubeConfig();
    kc.loadFromOptions({
        clusters: [
            {
                name: 'cluster',
                server: serverUrl,
                skipTLSVerify: true,
            },
        ],
        users: [{ name: 'user' }],
        contexts: [
            {
                name: 'context',
                cluster: 'cluster',
                user: 'user',
            },
        ],
        currentContext: 'context',
    });
    return kc;
}

async function readBody(req: IncomingMessage): Promise<Buffer> {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}
