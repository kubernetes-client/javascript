import { expect } from 'chai';
import WebSocket = require('isomorphic-ws');
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';
import { anyFunction, anything, capture, instance, mock, verify, when } from 'ts-mockito';

import { CallAwaiter, matchBuffer, ResizableWriteableStreamBuffer } from '../test';
import { V1Status } from './api';
import { KubeConfig } from './config';
import { Exec } from './exec';
import { TerminalSize } from './terminal-size-queue';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';

describe('Exec', () => {
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
            // tslint:disable-next-line:max-line-length
            args = `stdout=false&stderr=true&stdin=true&tty=true&command=${cmdArray[0]}&command=${
                cmdArray[1]
            }&command=${cmdArray[2]}&container=${container}`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();
        });

        it('should correctly attach to streams', async () => {
            const kc = new KubeConfig();
            const fakeWebSocketInterface: WebSocketInterface = mock(WebSocketHandler);
            const fakeWebSocket: WebSocket = mock(WebSocket);
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

            const fakeConn: WebSocket = instance(fakeWebSocket);
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

            /* tslint:disable:no-unused-expression */
            expect(outputFn).to.not.be.null;

            // this is redundant but needed for the compiler, sigh...
            if (!outputFn) {
                return;
            }

            let buffer = Buffer.alloc(1024, 10);

            outputFn(WebSocketHandler.StdoutStream, buffer);
            expect(osStream.size()).to.equal(1024);
            let buff = osStream.getContents() as Buffer;
            for (let i = 0; i < 1024; i++) {
                expect(buff[i]).to.equal(10);
            }

            buffer = Buffer.alloc(1024, 20);
            outputFn(WebSocketHandler.StderrStream, buffer);
            expect(errStream.size()).to.equal(1024);
            buff = errStream.getContents() as Buffer;
            for (let i = 0; i < 1024; i++) {
                expect(buff[i]).to.equal(20);
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
            expect(statusOut).to.deep.equal(statusIn);

            const closePromise = callAwaiter.awaitCall('close');
            isStream.stop();
            await closePromise;
            verify(fakeWebSocket.close()).called();
        });
    });
});
