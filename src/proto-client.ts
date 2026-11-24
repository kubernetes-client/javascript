import http from 'node:http';
import https from 'node:https';

import { KubeConfig } from './config.js';
import { DeleteOptions, Status } from './proto/generated/k8s.io/apimachinery/pkg/apis/meta/v1/generated.js';
import { Unknown } from './proto/generated/k8s.io/apimachinery/pkg/runtime/generated.js';

const MAGIC_PREFIX = Uint8Array.from([0x6b, 0x38, 0x73, 0x00]);
const PROTO_MEDIA_TYPE = 'application/vnd.kubernetes.protobuf';

export type ProtoRequestBody = Uint8Array | { serializeBinary(): Uint8Array };

export type ProtoDecoder<T> =
    | ((input: Uint8Array) => T)
    | { decode(input: Uint8Array): T }
    | { deserializeBinary(input: Uint8Array): T };

export interface ObjectOrStatus<T> {
    object: T | null;
    status: Status | null;
}

export class ProtoClient {
    public readonly config: KubeConfig;

    constructor(config: KubeConfig) {
        this.config = config;
    }

    public async get<T>(decoder: ProtoDecoder<T>, requestPath: string): Promise<ObjectOrStatus<T>> {
        return this.request('GET', decoder, requestPath);
    }

    public async list<T>(decoder: ProtoDecoder<T>, requestPath: string): Promise<ObjectOrStatus<T>> {
        return this.get(decoder, requestPath);
    }

    public async create<T>(
        decoder: ProtoDecoder<T>,
        requestPath: string,
        body: ProtoRequestBody,
        apiVersion: string,
        kind: string,
    ): Promise<ObjectOrStatus<T>> {
        return this.request('POST', decoder, requestPath, body, apiVersion, kind);
    }

    public async update<T>(
        decoder: ProtoDecoder<T>,
        requestPath: string,
        body: ProtoRequestBody,
        apiVersion: string,
        kind: string,
    ): Promise<ObjectOrStatus<T>> {
        return this.request('PUT', decoder, requestPath, body, apiVersion, kind);
    }

    public async merge<T>(
        decoder: ProtoDecoder<T>,
        requestPath: string,
        body: ProtoRequestBody,
        apiVersion: string,
        kind: string,
    ): Promise<ObjectOrStatus<T>> {
        return this.request('PATCH', decoder, requestPath, body, apiVersion, kind);
    }

    public async delete<T>(
        decoder: ProtoDecoder<T>,
        requestPath: string,
        deleteOptions?: Partial<DeleteOptions>,
    ): Promise<ObjectOrStatus<T>> {
        if (!deleteOptions) {
            return this.request('DELETE', decoder, requestPath);
        }

        const normalizedDeleteOptions = DeleteOptions.fromPartial({ dryRun: [], ...deleteOptions });
        const deleteBody = DeleteOptions.encode(normalizedDeleteOptions).finish();
        return this.request('DELETE', decoder, requestPath, deleteBody, 'v1', 'DeleteOptions');
    }

    public async request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        decoder: ProtoDecoder<T>,
        requestPath: string,
        body?: ProtoRequestBody,
        apiVersion?: string,
        kind?: string,
    ): Promise<ObjectOrStatus<T>> {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No active cluster!');
        }

        const url = new URL(requestPath, cluster.server);
        const headers: Record<string, string> = {
            Accept: PROTO_MEDIA_TYPE,
        };

        let encodedBody: Uint8Array | undefined;
        if (body !== undefined) {
            if (!apiVersion || !kind) {
                throw new Error('apiVersion and kind are required when a request body is provided.');
            }
            headers['Content-Type'] = PROTO_MEDIA_TYPE;
            encodedBody = this.encode(body, apiVersion, kind);
        }

        const options: https.RequestOptions = {
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            path: `${url.pathname}${url.search}`,
            method,
            headers,
        };

        await this.config.applyToHTTPSOptions(options);

        const data = await new Promise<{ body: Buffer; contentType: string | undefined }>(
            (resolve, reject) => {
                const requestFn = url.protocol === 'https:' ? https.request : http.request;
                const req = requestFn(options, (res) => {
                    const chunks: Buffer[] = [];
                    res.on('data', (chunk: Buffer | string) => {
                        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
                    });
                    res.on('end', () => {
                        resolve({
                            body: Buffer.concat(chunks),
                            contentType: asStringHeader(res.headers['content-type']),
                        });
                    });
                    res.on('error', reject);
                });

                req.on('error', reject);
                if (encodedBody !== undefined) {
                    req.write(encodedBody);
                }
                req.end();
            },
        );

        if (!data.contentType?.includes(PROTO_MEDIA_TYPE)) {
            const bodyAsText = data.body.toString('utf8').trim();
            const contentType = data.contentType ?? 'unknown';
            throw new Error(`Unexpected content type '${contentType}' from API server: ${bodyAsText}`);
        }

        const response = this.parseResponse(data.body);
        if (response.typeMeta?.apiVersion === 'v1' && response.typeMeta?.kind === 'Status') {
            return {
                object: null,
                status: Status.decode(response.raw ?? new Uint8Array()),
            };
        }

        if (!response.raw) {
            throw new Error('Protocol buffer response did not include a raw payload.');
        }

        return {
            object: decode(decoder, response.raw),
            status: null,
        };
    }

    private encode(message: ProtoRequestBody, apiVersion: string, kind: string): Uint8Array {
        const raw = message instanceof Uint8Array ? message : message.serializeBinary();
        const unknown = Unknown.encode({
            typeMeta: { apiVersion, kind },
            raw,
        }).finish();

        const encoded = new Uint8Array(MAGIC_PREFIX.length + unknown.length);
        encoded.set(MAGIC_PREFIX, 0);
        encoded.set(unknown, MAGIC_PREFIX.length);
        return encoded;
    }

    private parseResponse(data: Buffer): Unknown {
        if (data.length < MAGIC_PREFIX.length) {
            throw new Error('Truncated protocol buffer response: missing magic prefix.');
        }

        for (let i = 0; i < MAGIC_PREFIX.length; i++) {
            if (data[i] !== MAGIC_PREFIX[i]) {
                throw new Error('Unexpected protocol buffer response: magic prefix mismatch.');
            }
        }

        return Unknown.decode(data.subarray(MAGIC_PREFIX.length));
    }
}

function decode<T>(decoder: ProtoDecoder<T>, raw: Uint8Array): T {
    if (typeof decoder === 'function') {
        return decoder(raw);
    }

    if ('deserializeBinary' in decoder) {
        return decoder.deserializeBinary(raw);
    }

    return decoder.decode(raw);
}

function asStringHeader(value: string | string[] | undefined): string | undefined {
    if (Array.isArray(value)) {
        return value.join(',');
    }
    return value;
}
