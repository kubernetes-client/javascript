import { beforeEach, describe, it } from 'node:test';
import { deepStrictEqual, ok, rejects, strictEqual } from 'node:assert';
import { EventEmitter, once } from 'node:events';
import WebSocket from 'isomorphic-ws';
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';
import { anyFunction, anything, capture, instance, mock, verify, when } from 'ts-mockito';

import { CallAwaiter, matchBuffer, ResizableWriteableStreamBuffer } from './test/index.js';
import { V1Status } from './api.js';
import { KubeConfig } from './config.js';
import { Exec, ExecOptions } from './exec.js';
import { TerminalSize } from './terminal-size-queue.js';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler.js';

describe('Exec', () => {
    const startExec = (exec: Exec, options?: ExecOptions) =>
        exec.exec('ns', 'pod', 'container', 'command', null, null, null, false, undefined, options);

    describe('basic', () => {
        it('should correctly exec to a url', async () => {
            const kc = new KubeConfig();
            const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
            const exec = new Exec(kc, instance(fakeWebSocket));
            const osStream = new WritableStreamBuffer();
            const errStream = new WritableStreamBuffer();
            const isStream = new ReadableStreamBuffer();

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'container';
            const cmd = 'command';
            const cmdArray = ['command', 'arg1', 'arg2'];
            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/exec`;

            await exec.exec(namespace, pod, container, cmd, osStream, errStream, isStream, false);
            let args = `stdout=true&stderr=true&stdin=true&tty=false&command=${cmd}&container=${container}`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await exec.exec(namespace, pod, container, cmd, null, errStream, isStream, false);
            args = `stdout=false&stderr=true&stdin=true&tty=false&command=${cmd}&container=${container}`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await exec.exec(namespace, pod, container, cmd, null, null, isStream, false);
            args = `stdout=false&stderr=false&stdin=true&tty=false&command=${cmd}&container=${container}`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await exec.exec(namespace, pod, container, cmd, null, null, null, false);
            args = `stdout=false&stderr=false&stdin=false&tty=false&command=${cmd}&container=${container}`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await exec.exec(namespace, pod, container, cmd, null, errStream, isStream, true);
            args = `stdout=false&stderr=true&stdin=true&tty=true&command=${cmd}&container=${container}`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await exec.exec(namespace, pod, container, cmdArray, null, errStream, isStream, true);
            args = `stdout=false&stderr=true&stdin=true&tty=true&command=${cmdArray[0]}&command=${cmdArray[1]}&command=${cmdArray[2]}&container=${container}`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();
        });

        it('should correctly attach to streams', async () => {
            const kc = new KubeConfig();
            const fakeWebSocketInterface: WebSocketInterface = mock(WebSocketHandler);
            const fakeWebSocket: WebSocket.WebSocket = mock(WebSocket);
            const callAwaiter: CallAwaiter = new CallAwaiter();
            const exec = new Exec(kc, instance(fakeWebSocketInterface));
            const osStream = new ResizableWriteableStreamBuffer();
            const errStream = new WritableStreamBuffer();
            const isStream = new ReadableStreamBuffer();

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'somecontainer';
            const cmd = 'command';

            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/exec`;
            const args = `stdout=true&stderr=true&stdin=true&tty=false&command=${cmd}&container=${container}`;

            let statusOut = {} as V1Status;

            const fakeConn: WebSocket.WebSocket = instance(fakeWebSocket);
            when(fakeWebSocketInterface.connect(`${path}?${args}`, null, anyFunction())).thenResolve(
                fakeConn,
            );
            when(fakeWebSocket.send(anything())).thenCall(callAwaiter.resolveCall('send'));
            when(fakeWebSocket.close()).thenCall(callAwaiter.resolveCall('close'));

            await exec.exec(
                namespace,
                pod,
                container,
                cmd,
                osStream,
                errStream,
                isStream,
                false,
                (status: V1Status) => {
                    statusOut = status;
                },
            );

            const [, , outputFn] = capture(fakeWebSocketInterface.connect).last();

            strictEqual(typeof outputFn, 'function');

            // this is redundant but needed for the compiler, sigh...
            if (!outputFn) {
                return;
            }

            let buffer = Buffer.alloc(1024, 10);

            outputFn(WebSocketHandler.StdoutStream, buffer);
            strictEqual(osStream.size(), 1024);
            let buff = osStream.getContents() as Buffer;
            for (let i = 0; i < 1024; i++) {
                strictEqual(buff[i], 10);
            }

            buffer = Buffer.alloc(1024, 20);
            outputFn(WebSocketHandler.StderrStream, buffer);
            strictEqual(errStream.size(), 1024);
            buff = errStream.getContents() as Buffer;
            for (let i = 0; i < 1024; i++) {
                strictEqual(buff[i], 20);
            }

            const initialTerminalSize: TerminalSize = { height: 0, width: 0 };
            await callAwaiter.awaitCall('send');
            verify(
                fakeWebSocket.send(
                    matchBuffer(WebSocketHandler.ResizeStream, JSON.stringify(initialTerminalSize)),
                ),
            ).called();

            const msg = 'This is test data';
            const inputPromise = callAwaiter.awaitCall('send');
            isStream.put(msg);
            await inputPromise;
            verify(fakeWebSocket.send(matchBuffer(WebSocketHandler.StdinStream, msg))).called();

            const terminalSize: TerminalSize = { height: 80, width: 120 };
            const resizePromise = callAwaiter.awaitCall('send');
            osStream.rows = terminalSize.height;
            osStream.columns = terminalSize.width;
            osStream.emit('resize');
            await resizePromise;
            verify(
                fakeWebSocket.send(matchBuffer(WebSocketHandler.ResizeStream, JSON.stringify(terminalSize))),
            ).called();

            const statusIn = {
                code: 100,
                message: 'this is a test',
            } as V1Status;
            outputFn(WebSocketHandler.StatusStream, Buffer.from(JSON.stringify(statusIn)));
            deepStrictEqual(statusOut, statusIn);

            const closePromise = callAwaiter.awaitCall('close');
            isStream.stop();
            await closePromise;
            verify(fakeWebSocket.close()).called();
        });
    });

    describe('keepalive', () => {
        let conn: EventEmitter & { readyState: number; ping: () => void };
        let pingCount: number;
        let connectCount: number;
        let exec: Exec;
        const start = (options?: ExecOptions) => startExec(exec, options);

        beforeEach((t) => {
            ok('mock' in t);
            t.mock.timers.enable({ apis: ['setInterval'] });
            pingCount = 0;
            connectCount = 0;
            conn = Object.assign(new EventEmitter(), {
                readyState: WebSocket.OPEN as number,
                ping: () => {
                    pingCount++;
                },
            });
            exec = new Exec(new KubeConfig(), {
                connect: async () => {
                    connectCount++;
                    return conn as unknown as WebSocket.WebSocket;
                },
            });
        });

        it('sends one ping at a time and resumes after pong', async (t) => {
            await start({ pingIntervalMs: 10 });
            t.mock.timers.tick(9);
            strictEqual(pingCount, 0);
            t.mock.timers.tick(1);
            strictEqual(pingCount, 1);
            t.mock.timers.tick(100);
            strictEqual(pingCount, 1);
            conn.emit('pong');
            t.mock.timers.tick(10);
            strictEqual(pingCount, 2);
            t.mock.timers.tick(100);
            strictEqual(pingCount, 2);
        });

        const disabledCases: { name: string; options?: ExecOptions; socket?: object }[] = [
            { name: 'omitted options' },
            { name: 'empty options', options: {} },
            { name: 'undefined interval', options: { pingIntervalMs: undefined } },
            { name: 'missing ping', socket: { ping: undefined } },
            { name: 'non-function on', socket: { on: true } },
            { name: 'missing removeListener', socket: { removeListener: undefined } },
            { name: 'connecting socket', socket: { readyState: WebSocket.CONNECTING } },
            { name: 'closing socket', socket: { readyState: WebSocket.CLOSING } },
            { name: 'closed socket', socket: { readyState: WebSocket.CLOSED } },
        ];
        for (const { name, options, socket } of disabledCases) {
            it(`keeps pings disabled for ${name}`, async (t) => {
                Object.assign(conn, socket);
                const interval = t.mock.method(globalThis, 'setInterval');
                await start(socket ? { pingIntervalMs: 10 } : options);
                t.mock.timers.tick(100);
                strictEqual(pingCount, 0);
                strictEqual(interval.mock.callCount(), 0);
                deepStrictEqual(conn.eventNames(), []);
            });
        }

        for (const value of [0, -1, 1.5, NaN, Infinity, 2147483648, '10', null]) {
            it(`rejects invalid interval ${String(value)} before connecting`, async () => {
                await rejects(
                    start({ pingIntervalMs: value as number }),
                    /pingIntervalMs must be an integer/,
                );
                strictEqual(connectCount, 0);
            });
        }

        for (const pingIntervalMs of [1, 2147483647]) {
            it(`accepts interval boundary ${pingIntervalMs}`, async (t) => {
                await start({ pingIntervalMs });
                t.mock.timers.tick(pingIntervalMs - 1);
                strictEqual(pingCount, 0);
                t.mock.timers.tick(1);
                strictEqual(pingCount, 1);
            });
        }

        for (const event of ['close', 'error']) {
            it(`cleans up its timer and listeners on ${event}`, async (t) => {
                const externalListener = () => {};
                for (const name of ['pong', 'close', 'error']) {
                    conn.on(name, externalListener);
                }
                const clear = t.mock.method(globalThis, 'clearInterval');
                await start({ pingIntervalMs: 10 });
                t.mock.timers.tick(10);
                strictEqual(pingCount, 1);
                conn.emit(event);
                strictEqual(clear.mock.callCount(), 1);
                for (const name of ['pong', 'close', 'error']) {
                    deepStrictEqual(conn.listeners(name), [externalListener]);
                }
                conn.emit('pong');
                t.mock.timers.tick(100);
                strictEqual(pingCount, 1);
                conn.emit('close');
                strictEqual(clear.mock.callCount(), 1);
            });
        }

        it('cleans up if the socket stops being open without a close event', async (t) => {
            await start({ pingIntervalMs: 10 });
            conn.readyState = WebSocket.CLOSING;
            const clear = t.mock.method(globalThis, 'clearInterval');
            t.mock.timers.tick(10);
            strictEqual(clear.mock.callCount(), 1);
            strictEqual(pingCount, 0);
            deepStrictEqual(conn.eventNames(), []);
        });

        it('handles a synchronous pong without getting stuck', async (t) => {
            conn.ping = () => {
                pingCount++;
                conn.emit('pong');
            };
            await start({ pingIntervalMs: 10 });
            t.mock.timers.tick(10);
            t.mock.timers.tick(10);
            strictEqual(pingCount, 2);
        });

        it('keeps concurrent sessions independent', async (t) => {
            await start({ pingIntervalMs: 10 });
            const firstConn = conn;
            conn = Object.assign(new EventEmitter(), {
                readyState: WebSocket.OPEN as number,
                ping: conn.ping,
            });
            await start({ pingIntervalMs: 10 });
            t.mock.timers.tick(10);
            strictEqual(pingCount, 2);
            firstConn.emit('close');
            conn.emit('pong');
            t.mock.timers.tick(10);
            strictEqual(pingCount, 3);
            strictEqual(conn.listenerCount('pong'), 1);
            deepStrictEqual(firstConn.eventNames(), []);
        });
    });

    it('exchanges keepalive ping/pong frames with a real websocket', { timeout: 5000 }, async (t) => {
        const server = new WebSocket.Server({ port: 0 });
        let client: WebSocket.WebSocket | undefined;
        t.after(() => {
            client?.terminate();
            for (const socket of server.clients) {
                socket.terminate();
            }
            server.close();
        });
        await once(server, 'listening');
        const address = server.address();
        ok(typeof address === 'object' && address !== null);
        let pingCount = 0;
        server.on('connection', (socket) => {
            socket.on('ping', () => {
                pingCount++;
            });
        });
        const exec = new Exec(new KubeConfig(), {
            connect: async () => {
                client = new WebSocket(`ws://127.0.0.1:${address.port}`);
                await once(client, 'open');
                return client;
            },
        });
        const conn = await startExec(exec, { pingIntervalMs: 10 });
        await once(conn, 'pong');
        await once(conn, 'pong');
        strictEqual(pingCount, 2);
        const closed = once(conn, 'close');
        conn.close();
        await closed;
        strictEqual(conn.listenerCount('pong'), 0);
        strictEqual(conn.listenerCount('close'), 0);
        strictEqual(conn.listenerCount('error'), 0);
    });
});
