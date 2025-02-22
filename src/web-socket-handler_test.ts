import { deepStrictEqual, equal, notStrictEqual, rejects, strictEqual, throws } from 'node:assert';
import { Readable, Writable } from 'node:stream';
import { setImmediate as setImmediatePromise } from 'node:timers/promises';
import WebSocket from 'isomorphic-ws';
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';

import { V1Status } from './api.js';
import { KubeConfig } from './config.js';
import { Cluster, Context, User } from './config_types.js';
import { WebSocketHandler } from './web-socket-handler.js';

describe('WebSocket', () => {
    it('should throw on unknown code', () => {
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const buff = Buffer.alloc(30, 20);
        const badStream = 10;

        throws(() => WebSocketHandler.handleStandardStreams(badStream, buff, osStream, errStream), {
            message: `Unknown stream: ${badStream}`,
        });
    });
    it('should handle a status to end', () => {
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();

        const status = new V1Status();
        status.message = 'Some message';
        status.reason = 'Some Reason';
        const data = JSON.stringify(status);

        const buff = Buffer.alloc(data.length);
        buff.write(data);

        const output = WebSocketHandler.handleStandardStreams(
            WebSocketHandler.StatusStream,
            buff,
            osStream,
            errStream,
        );

        strictEqual(osStream.size(), 0);
        strictEqual(errStream.size(), 0);
        notStrictEqual(output, null);
    });
    it('should handle empty buffers', () => {
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const buff = Buffer.alloc(0, 20);

        WebSocketHandler.handleStandardStreams(WebSocketHandler.StdoutStream, buff, osStream, errStream);

        strictEqual(osStream.size(), 0);
        strictEqual(errStream.size(), 0);
    });
    it('should handle output streams', () => {
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();

        const fill1 = 1;
        const fill2 = 2;

        const buff1 = Buffer.alloc(1024, fill1);
        const buff2 = Buffer.alloc(512, fill2);

        WebSocketHandler.handleStandardStreams(WebSocketHandler.StdoutStream, buff1, osStream, errStream);

        strictEqual(osStream.size(), 1024);
        strictEqual(errStream.size(), 0);

        WebSocketHandler.handleStandardStreams(WebSocketHandler.StderrStream, buff2, osStream, errStream);

        strictEqual(osStream.size(), 1024);
        strictEqual(errStream.size(), 512);

        const outputBuffer1 = osStream.getContents() as Buffer;
        for (let i = 0; i < 1024; i++) {
            strictEqual(outputBuffer1[i], fill1);
        }

        const outputBuffer2 = errStream.getContents() as Buffer;
        for (let i = 0; i < 512; i++) {
            strictEqual(outputBuffer2[i], fill2);
        }
    });
    it('should throw on a config with no cluster', async () => {
        const config = new KubeConfig();
        const handler = new WebSocketHandler(config);
        await rejects(handler.connect('/some/path', null, null), { message: 'No cluster is defined.' });
    });
    it('should error on bad connection', async () => {
        const kc = new KubeConfig();
        const server = 'foo.company.nonexistent';
        kc.clusters = [
            {
                name: 'cluster',
                server,
            } as Cluster,
        ] as Cluster[];
        kc.contexts = [
            {
                cluster: 'cluster',
                user: 'user',
            } as Context,
        ] as Context[];
        kc.users = [
            {
                name: 'user',
            } as User,
        ];

        const mockWs = {} as WebSocket.WebSocket;
        const handler = new WebSocketHandler(
            kc,
            (uri: string, protocols: string[], opts: WebSocket.ClientOptions): WebSocket.WebSocket => {
                return mockWs as WebSocket.WebSocket;
            },
        );
        const path = '/some/path';

        const promise = handler.connect(path, null, null);
        await setImmediatePromise();

        mockWs.onerror!({
            error: 'some error',
            message: 'some message',
            type: 'type',
            target: mockWs,
        });

        await rejects(promise);
    });
    it('should connect properly', async () => {
        const kc = new KubeConfig();
        const host = 'foo.company.com';
        const server = `https://${host}`;
        kc.clusters = [
            {
                name: 'cluster',
                server,
            } as Cluster,
        ] as Cluster[];
        kc.contexts = [
            {
                cluster: 'cluster',
                user: 'user',
            } as Context,
        ] as Context[];
        kc.users = [
            {
                name: 'user',
            } as User,
        ];

        const mockWs = {} as WebSocket.WebSocket;
        let uriOut = '';

        const handler = new WebSocketHandler(
            kc,
            (uri: string, protocols: string[], opts: WebSocket.ClientOptions): WebSocket.WebSocket => {
                uriOut = uri;
                return mockWs as WebSocket.WebSocket;
            },
        );
        const path = '/some/path';

        const promise = handler.connect(path, null, null);
        await setImmediatePromise();

        strictEqual(uriOut, `wss://${host}${path}`);

        const event = {
            error: {},
            type: 'some type',
            target: mockWs,
        };
        mockWs.onopen!(event);
        const errEvt = {
            error: {},
            message: 'some message',
            type: 'some type',
            target: mockWs,
        };
        mockWs.onmessage!({
            data: 'string data',
            type: 'type',
            target: mockWs,
        });
        const buff = Buffer.alloc(10, 100);
        mockWs.onmessage!({
            data: buff,
            type: 'type',
            target: mockWs,
        });
        mockWs.onerror!(errEvt);
        await promise;
    });
    it('should connect properly with handlers', async () => {
        const kc = new KubeConfig();
        const host = 'foo.company.com';
        const server = `https://${host}`;
        kc.clusters = [
            {
                name: 'cluster',
                server,
            } as Cluster,
        ] as Cluster[];
        kc.contexts = [
            {
                cluster: 'cluster',
                user: 'user',
            } as Context,
        ] as Context[];
        kc.users = [
            {
                name: 'user',
            } as User,
        ];

        let closeCount = 0;
        const mockWs = {
            close: () => {
                closeCount++;
            },
        } as WebSocket.WebSocket;
        let uriOut = '';

        const handler = new WebSocketHandler(
            kc,
            (uri: string, protocols: string[], opts: WebSocket.ClientOptions): WebSocket.WebSocket => {
                uriOut = uri;
                return mockWs as WebSocket.WebSocket;
            },
        );
        const path = '/some/path';

        let textReceived = '';
        const textHandler = (text: string): boolean => {
            textReceived = text;
            return false;
        };

        let dataReceived: Buffer = Buffer.alloc(0, 0);
        let streamNumber = -1;
        const binaryHandler = (stream: number, data: Buffer): boolean => {
            streamNumber = stream;
            dataReceived = data;
            return false;
        };

        const promise = handler.connect(path, textHandler, binaryHandler);
        await setImmediatePromise();

        strictEqual(uriOut, `wss://${host}${path}`);

        const event = {
            error: {},
            type: 'some type',
            target: mockWs,
        };
        mockWs.onopen!(event);
        const errEvt = {
            error: {},
            message: 'some message',
            type: 'some type',
            target: mockWs,
        };
        mockWs.onmessage!({
            data: 'string data',
            type: 'type',
            target: mockWs,
        });
        const fill = 100;
        const size = 10;
        const buff = Buffer.alloc(size, fill);
        mockWs.onmessage!({
            data: buff,
            type: 'type',
            target: mockWs,
        });
        mockWs.onerror!(errEvt);
        await promise;

        strictEqual(closeCount, 2);
        strictEqual(textReceived, 'string data');

        strictEqual(streamNumber, fill);
        strictEqual(dataReceived.length, size - 1);
        for (const datum of dataReceived) {
            strictEqual(datum, fill);
        }
    });
    it('handles multi-byte characters', () => {
        return new Promise((resolve) => {
            const stream = new Readable({ read() {} });
            const mockWs = {
                close() {},
                send(data) {
                    deepStrictEqual(data, Buffer.from([0x0f, 0xe2, 0x98, 0x83]));
                    resolve(undefined);
                },
            } as WebSocket.WebSocket;

            stream.setEncoding('utf8');
            stream.push('☃');
            WebSocketHandler.handleStandardInput(mockWs, stream, 0x0f);
        });
    });
});

describe('V5 protocol support', () => {
    it('should handle close', async () => {
        const kc = new KubeConfig();
        const host = 'foo.company.com';
        const server = `https://${host}`;
        kc.clusters = [
            {
                name: 'cluster',
                server,
            } as Cluster,
        ] as Cluster[];
        kc.contexts = [
            {
                cluster: 'cluster',
                user: 'user',
            } as Context,
        ] as Context[];
        kc.users = [
            {
                name: 'user',
            } as User,
        ];

        const mockWs = {
            protocol: 'v5.channel.k8s.io',
        } as WebSocket.WebSocket;
        let uriOut = '';
        let stderrEndCalled = false;
        let stdoutEndCalled = false;
        let stdinPauseCalled = false;
        const handler = new WebSocketHandler(
            kc,
            (uri: string, protocols: string[], opts: WebSocket.ClientOptions): WebSocket.WebSocket => {
                uriOut = uri;
                return mockWs as WebSocket.WebSocket;
            },
            {
                stdin: {
                    pause: () => {
                        stdinPauseCalled = true;
                        return {} as Readable;
                    },
                } as Readable,
                stderr: {
                    end: () => {
                        stderrEndCalled = true;
                    },
                } as Writable,
                stdout: {
                    end: () => {
                        stdoutEndCalled = true;
                    },
                } as Writable,
            },
        );
        const path = '/some/path';

        const promise = handler.connect(path, null, null);
        await setImmediatePromise();

        strictEqual(uriOut, `wss://${host}${path}`);

        const event = {
            target: mockWs,
            type: 'open',
        };
        mockWs.onopen!(event);
        // Close stdin/stdout with Buffers
        [WebSocketHandler.StdinStream, WebSocketHandler.StdoutStream].forEach((stream) => {
            const closeBuff = Buffer.alloc(2);
            closeBuff.writeUint8(255, 0);
            closeBuff.writeUint8(stream, 1);

            mockWs.onmessage!({
                data: closeBuff,
                type: 'type',
                target: mockWs,
            });
        });
        // Close stderr with a string \xff is 'close' \x02 is the stderr stream number
        // so that both paths are tested.
        const closeMsg = '\xFF\x02';
        mockWs.onmessage!({
            data: closeMsg,
            type: 'type',
            target: mockWs,
        });
        await promise;
        strictEqual(stdoutEndCalled, true);
        strictEqual(stderrEndCalled, true);
        strictEqual(stdinPauseCalled, true);
    });
    it('should handle closing stdin < v4 protocol', () => {
        const ws = {
            // send is not defined, so this will throw if we try to send the close message.
            close: () => {},
        } as WebSocket;
        const stdinStream = new ReadableStreamBuffer();
        WebSocketHandler.handleStandardInput(ws, stdinStream);
        stdinStream.emit('end');
    });
    it('should handle closing stdin v5 protocol', () => {
        let sent: Buffer | null = null;
        const ws = {
            protocol: 'v5.channel.k8s.io',
            send: (data) => {
                sent = data;
            },
            close: () => {
                throw new Error('should not be called');
            },
        } as unknown as WebSocket;
        const stdinStream = new ReadableStreamBuffer();
        WebSocketHandler.handleStandardInput(ws, stdinStream);
        stdinStream.emit('end');
        notStrictEqual(sent, null);
        strictEqual(sent!.readUint8(0), 255); // CLOSE signal
        strictEqual(sent!.readUInt8(1), 0); // Stdin stream is #0
    });
});

describe('Restartable Handle Standard Input', () => {
    it('should throw on negative retry', () => {
        const p = new Promise<WebSocket.WebSocket>(() => {});
        throws(
            () =>
                WebSocketHandler.restartableHandleStandardInput(() => p, new Readable({ read() {} }), 0, -1),
            { message: "retryCount can't be lower than 0." },
        );
    });

    it('should retry n times', () => {
        const retryTimes = 5;
        let count = 0;
        const ws = {
            readyState: false,
        } as unknown;
        WebSocketHandler.processData(
            'some test data',
            null,
            (): Promise<WebSocket.WebSocket> => {
                return new Promise<WebSocket.WebSocket>((resolve) => {
                    count++;
                    resolve(ws as WebSocket.WebSocket);
                });
            },
            0,
            retryTimes,
        ).catch(() => {
            strictEqual(count, retryTimes);
        });
    });

    it('should work correctly', async () => {
        let sent: Buffer | null = null;
        const ws = {
            protocol: 'v5.channel.k8s.io',
            send: (data) => {
                sent = data;
            },
            readyState: WebSocket.OPEN,
            close: () => {
                throw new Error('should not be called');
            },
        } as unknown as WebSocket;
        const p = new Promise<WebSocket>((resolve, reject) => resolve(ws));
        let dataCb: any;
        let endCb: any;
        let flushCb: any;

        const r = {
            on: (verb, cb) => {
                if (verb === 'data') {
                    dataCb = cb;
                }
                if (verb === 'end') {
                    endCb = cb;
                }
                if (verb == 'flush') {
                    flushCb = cb;
                }
            },
        } as Readable;

        WebSocketHandler.restartableHandleStandardInput(() => p, r, 0, 4, true);

        dataCb('some test data');
        endCb();
        await flushCb();

        equal(sent!.toString(), '\x00some test data');
    });

    it('should work if the web socket exists', () => {
        let sent: Buffer | null = null;
        const ws = {
            protocol: 'v5.channel.k8s.io',
            send: (data) => {
                sent = data;
            },
            readyState: WebSocket.OPEN,
            close: () => {
                throw new Error('should not be called');
            },
        } as unknown as WebSocket;
        let count = 0;
        WebSocketHandler.processData(
            'some test data',
            ws,
            (): Promise<WebSocket.WebSocket> => {
                return new Promise<WebSocket.WebSocket>((resolve) => {
                    count++;
                    resolve(ws as WebSocket.WebSocket);
                });
            },
            0,
            5,
        );
        equal(sent!.toString(), '\x00some test data');
        strictEqual(count, 0);
    });
});
