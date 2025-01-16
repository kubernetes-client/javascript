import { expect } from 'chai';
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';
import { anyFunction, capture, instance, mock, verify } from 'ts-mockito';

import { KubeConfig } from './config.js';
import { PortForward } from './portforward.js';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler.js';

describe('PortForward', () => {
    it('should correctly port-forward to a url', async () => {
        const kc = new KubeConfig();
        const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
        const portForward = new PortForward(kc, true, instance(fakeWebSocket));
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        const namespace = 'somenamespace';
        const pod = 'somepod';
        const port = 8080;

        await portForward.portForward(namespace, pod, [port], osStream, errStream, isStream);

        const path = `/api/v1/namespaces/${namespace}/pods/${pod}/portforward?ports=${port}`;
        verify(fakeWebSocket.connect(path, null, anyFunction())).called();
    });

    it('should not disconnect if disconnectOnErr is false', async () => {
        const kc = new KubeConfig();
        const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
        const portForward = new PortForward(kc, false, instance(fakeWebSocket));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForward('ns', 'p', [8000], osStream, null, isStream);

        const [, , outputFn] = capture(fakeWebSocket.connect).last();

        expect(outputFn).to.not.be.null;
        // this is redundant but needed for the compiler, sigh...
        if (!outputFn) {
            return;
        }
        const buffer = Buffer.alloc(1024, 10);

        // unknown stream shouldn't close the socket.
        outputFn(2, buffer);

        outputFn(0, buffer);
        // first time, drop two bytes for the port number.
        expect(osStream.size()).to.equal(1022);
    });

    it('should correctly port-forward streams if err is null', async () => {
        const kc = new KubeConfig();
        const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
        const portForward = new PortForward(kc, true, instance(fakeWebSocket));
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForward('ns', 'p', [8000], osStream, null, isStream);

        const [, , outputFn] = capture(fakeWebSocket.connect).last();

        expect(outputFn).to.not.be.null;
        // this is redundant but needed for the compiler, sigh...
        if (!outputFn) {
            return;
        }
        const buffer = Buffer.alloc(1024, 10);

        // error stream, drop two bytes for the port number.
        outputFn(1, buffer);
        // error stream is null, expect output to be dropped and nothing to change.
        expect(osStream.size()).to.equal(0);
    });

    it('should correctly port-forward streams', async () => {
        const kc = new KubeConfig();
        const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
        const portForward = new PortForward(kc, true, instance(fakeWebSocket));
        const osStream = new WritableStreamBuffer();
        const errStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await portForward.portForward('ns', 'p', [8000], osStream, errStream, isStream);

        const [, , outputFn] = capture(fakeWebSocket.connect).last();

        expect(outputFn).to.not.be.null;
        // this is redundant but needed for the compiler, sigh...
        if (!outputFn) {
            return;
        }
        const buffer = Buffer.alloc(1024, 10);

        outputFn(0, buffer);
        // first time, drop two bytes for the port number.
        expect(osStream.size()).to.equal(1022);

        outputFn(0, buffer);
        expect(osStream.size()).to.equal(2046);

        // error stream, drop two bytes for the port number.
        outputFn(1, buffer);
        expect(errStream.size()).to.equal(1022);

        outputFn(1, buffer);
        expect(errStream.size()).to.equal(2046);

        // unknown stream, shouldn't change anything.
        outputFn(2, buffer);
        expect(osStream.size()).to.equal(2046);
        expect(errStream.size()).to.equal(2046);
    });

    it('should throw with no ports or too many', async () => {
        const kc = new KubeConfig();
        const portForward = new PortForward(kc);
        const osStream = new WritableStreamBuffer();
        const isStream = new ReadableStreamBuffer();

        await expect(
            portForward.portForward('ns', 'pod', [], osStream, osStream, isStream),
        ).to.be.rejectedWith(Error, 'You must provide at least one port to forward to.');
        await expect(
            portForward.portForward('ns', 'pod', [1, 2], osStream, osStream, isStream),
        ).to.be.rejectedWith(Error, 'Only one port is currently supported for port-forward');
    });
});
