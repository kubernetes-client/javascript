import { promisify } from 'util';
import { expect } from 'chai';
import WebSocket = require('isomorphic-ws');
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';
import stream from 'node:stream';

import { V1Status } from './api';
import { KubeConfig } from './config';
import { Cluster, Context, User } from './config_types';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';
import { fail } from 'assert';

const setImmediatePromise = promisify(setImmediate);

describe('WebSocket', () => {
    it('should throw on unknown code', () => {
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const buff = Buffer.alloc(30, 20);
        const badStream = 10;

        expect(() => WebSocketHandler.handleStandardStreams(badStream, buff, osStream, errStream)).to.throw(
            `Unknown stream: ${badStream}`,
        );
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

        expect(osStream.size()).to.equal(0);
        expect(errStream.size()).to.equal(0);
        /* tslint:disable:no-unused-expression */
        expect(output).to.not.be.null;
    });
    it('should handle empty buffers', () => {
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const buff = Buffer.alloc(0, 20);

        WebSocketHandler.handleStandardStreams(WebSocketHandler.StdoutStream, buff, osStream, errStream);

        expect(osStream.size()).to.equal(0);
        expect(errStream.size()).to.equal(0);
    });
    it('should handle output streams', () => {
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();

        const fill1 = 1;
        const fill2 = 2;

        const buff1 = Buffer.alloc(1024, fill1);
        const buff2 = Buffer.alloc(512, fill2);

        WebSocketHandler.handleStandardStreams(WebSocketHandler.StdoutStream, buff1, osStream, errStream);

        expect(osStream.size()).to.equal(1024);
        expect(errStream.size()).to.equal(0);

        WebSocketHandler.handleStandardStreams(WebSocketHandler.StderrStream, buff2, osStream, errStream);

        expect(osStream.size()).to.equal(1024);
        expect(errStream.size()).to.equal(512);

        const outputBuffer1 = osStream.getContents() as Buffer;
        for (let i = 0; i < 1024; i++) {
            expect(outputBuffer1[i]).to.equal(fill1);
        }

        const outputBuffer2 = errStream.getContents() as Buffer;
        for (let i = 0; i < 512; i++) {
            expect(outputBuffer2[i]).to.equal(fill2);
        }
    });
    it('should throw on a config with no cluster', () => {
        const config = new KubeConfig();
        const handler = new WebSocketHandler(config);
        return expect(handler.connect('/some/path', null, null)).to.eventually.be.rejectedWith(
            'No cluster is defined.',
        );
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
        mockWs.onerror!({
            error: 'some error',
            message: 'some message',
            type: 'type',
            target: mockWs,
        });

        let rejected = false;
        try {
            const val = await promise;
        } catch (err) {
            rejected = true;
        }
        expect(rejected).to.equal(true);
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

        expect(uriOut).to.equal(`wss://${host}${path}`);

        const event = {
            target: mockWs,
            type: 'open',
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

        expect(uriOut).to.equal(`wss://${host}${path}`);

        const event = {
            target: mockWs,
            type: 'open',
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

        expect(closeCount).to.equal(2);
        expect(textReceived).to.equal('string data');

        expect(streamNumber).to.equal(fill);
        expect(dataReceived.length).to.equal(size - 1);
        for (const datum of dataReceived) {
            expect(datum).to.equal(fill);
        }
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
        let endCalled = false;
        const handler = new WebSocketHandler(
            kc,
            (uri: string, protocols: string[], opts: WebSocket.ClientOptions): WebSocket.WebSocket => {
                uriOut = uri;
                return mockWs as WebSocket.WebSocket;
            },
            {
                stdin: process.stdin,
                stderr: process.stderr,
                stdout: {
                    end: () => {
                        endCalled = true;
                    },
                } as stream.Writable,
            },
        );
        const path = '/some/path';

        const promise = handler.connect(path, null, null);
        await setImmediatePromise();

        expect(uriOut).to.equal(`wss://${host}${path}`);

        const event = {
            target: mockWs,
            type: 'open',
        };
        mockWs.onopen!(event);
        const errEvt = {
            error: {},
            message: 'some message',
            type: 'some type',
            target: mockWs,
        };
        const closeBuff = Buffer.alloc(2);
        closeBuff.writeUint8(255, 0);
        closeBuff.writeUint8(WebSocketHandler.StdoutStream, 1);

        mockWs.onmessage!({
            data: closeBuff,
            type: 'type',
            target: mockWs,
        });
        await promise;
        expect(endCalled).to.be.true;
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
            close: () => {},
        } as WebSocket;
        const stdinStream = new ReadableStreamBuffer();
        WebSocketHandler.handleStandardInput(ws, stdinStream);
        stdinStream.emit('end');
        expect(sent).to.not.be.null;
        expect(sent!.readUint8(0)).to.equal(255); // CLOSE signal
        expect(sent!.readUint8(1)).to.equal(0); // Stdin stream is #0
    });
});

describe('Restartable Handle Standard Input', () => {
    it('should throw on negative retry', () => {
        const p = new Promise<WebSocket.WebSocket>(() => {});
        expect(() => WebSocketHandler.restartableHandleStandardInput(() => p, null, 0, -1)).to.throw(
            "retryCount can't be lower than 0.",
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
            expect(count).to.equal(retryTimes);
        });
    });
});
