import { expect } from 'chai';
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';
import { anyFunction, capture, instance, mock, reset, verify } from 'ts-mockito';

import { KubeConfig } from './config';
import { PortForward } from './portforward';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';

describe('WebSocket', () => {
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
});
