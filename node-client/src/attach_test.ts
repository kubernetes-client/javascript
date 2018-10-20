import { expect } from 'chai';
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';
import { anyFunction, anything, capture, instance, mock, verify, when } from 'ts-mockito';
import WebSocket = require('ws');

import { Attach } from './attach';
import { KubeConfig } from './config';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';

describe('Attach', () => {
    describe('basic', () => {
        it('should correctly attach to a url', async () => {
            const kc = new KubeConfig();
            const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
            const attach = new Attach(kc, instance(fakeWebSocket));
            const osStream = new WritableStreamBuffer();
            const errStream = new WritableStreamBuffer();
            const isStream = new ReadableStreamBuffer();

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'somecontainer';

            await attach.attach(
                namespace, pod, container, osStream, errStream, isStream, false);

            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/attach`;
            let args = `container=${container}&stderr=true&stdin=true&stdout=true&tty=false`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await attach.attach(
                namespace, pod, container, null, null, null, false);
            args = `container=${container}&stderr=false&stdin=false&stdout=false&tty=false`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await attach.attach(
                namespace, pod, container, osStream, null, null, false);
            args = `container=${container}&stderr=false&stdin=false&stdout=true&tty=false`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await attach.attach(
                namespace, pod, container, osStream, errStream, null, false);
            args = `container=${container}&stderr=true&stdin=false&stdout=true&tty=false`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await attach.attach(
                namespace, pod, container, osStream, errStream, null, true);
            args = `container=${container}&stderr=true&stdin=false&stdout=true&tty=true`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();
        });

        it('should correctly attach to streams', async () => {
            const kc = new KubeConfig();
            const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
            const attach = new Attach(kc, instance(fakeWebSocket));
            const osStream = new WritableStreamBuffer();
            const errStream = new WritableStreamBuffer();
            const isStream = new ReadableStreamBuffer();

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'somecontainer';

            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/attach`;
            const args = `container=${container}&stderr=true&stdin=true&stdout=true&tty=false`;

            const fakeConn: WebSocket = mock(WebSocket);
            when(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).thenResolve(fakeConn);

            await attach.attach(
                namespace, pod, container, osStream, errStream, isStream, false);
            const [, , outputFn] = capture(fakeWebSocket.connect).last();

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

            const msg = 'This is test data';
            isStream.put(msg);
            verify(fakeConn.send(msg));

            isStream.stop();
            verify(fakeConn.close());
        });
    });
});
