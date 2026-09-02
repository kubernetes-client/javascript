import { describe, it } from 'node:test';
import { rejects } from 'node:assert';
import { anyFunction, anything, capture, instance, mock, verify, when } from 'ts-mockito';
import querystring from 'node:querystring';
import WebSocket from 'isomorphic-ws';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setImmediate as setImmediatePromise } from 'node:timers/promises';
import tar from 'tar-fs';

import { KubeConfig } from './config.js';
import { Exec } from './exec.js';
import { Cp } from './cp.js';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler.js';

describe('Cp', () => {
    describe('cpFromPod', () => {
        it('should run create tar command to a url', async () => {
            const kc = new KubeConfig();
            const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
            const fakeConn = mock(WebSocket);
            const exec = new Exec(kc, instance(fakeWebSocket));
            const cp = new Cp(kc, exec);

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'container';
            const srcPath = await mkdtemp(join(tmpdir(), 'cp-src-'));
            const tgtPath = await mkdtemp(join(tmpdir(), 'cp-tgt-'));
            await writeFile(join(srcPath, 'test.txt'), 'test');
            const cmdArray = ['tar', 'cf', '-', srcPath];
            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/exec`;

            const query = {
                stdout: true,
                stderr: true,
                stdin: false,
                tty: false,
                command: cmdArray,
                container,
            };
            const queryStr = querystring.stringify(query);

            when(
                fakeWebSocket.connect(`${path}?${queryStr}`, null, anyFunction(), anyFunction()),
            ).thenResolve(instance(fakeConn));
            const cpPromise = cp.cpFromPod(namespace, pod, container, srcPath, tgtPath);
            await setImmediatePromise();
            const chunks = await tarChunks(srcPath);
            verify(fakeWebSocket.connect(`${path}?${queryStr}`, null, anyFunction(), anyFunction())).called();
            const captured = requireCapture(fakeWebSocket);
            for (const chunk of chunks) {
                captured(WebSocketHandler.StdoutStream, chunk);
            }
            captured(WebSocketHandler.StatusStream, Buffer.from(JSON.stringify({ status: 'Success' })));
            await cpPromise;
            await rm(srcPath, { recursive: true, force: true });
            await rm(tgtPath, { recursive: true, force: true });
        });

        it('should run create tar command to a url with cwd', async () => {
            const kc = new KubeConfig();
            const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
            const fakeConn = mock(WebSocket);
            const exec = new Exec(kc, instance(fakeWebSocket));
            const cp = new Cp(kc, exec);

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'container';
            const srcPath = await mkdtemp(join(tmpdir(), 'cp-src-'));
            const tgtPath = await mkdtemp(join(tmpdir(), 'cp-tgt-'));
            await writeFile(join(srcPath, 'test.txt'), 'test');
            const cwd = '/abc';
            const cmdArray = ['tar', 'cf', '-', '-C', cwd, srcPath];
            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/exec`;

            const query = {
                stdout: true,
                stderr: true,
                stdin: false,
                tty: false,
                command: cmdArray,
                container,
            };
            const queryStr = querystring.stringify(query);

            when(
                fakeWebSocket.connect(`${path}?${queryStr}`, null, anyFunction(), anyFunction()),
            ).thenResolve(instance(fakeConn));
            const cpPromise = cp.cpFromPod(namespace, pod, container, srcPath, tgtPath, cwd);
            await setImmediatePromise();
            const chunks = await tarChunks(srcPath);
            const captured = requireCapture(fakeWebSocket);
            for (const chunk of chunks) {
                captured(WebSocketHandler.StdoutStream, chunk);
            }
            captured(WebSocketHandler.StatusStream, Buffer.from(JSON.stringify({ status: 'Success' })));
            verify(fakeWebSocket.connect(`${path}?${queryStr}`, null, anyFunction(), anyFunction())).called();
            await cpPromise;
            await rm(srcPath, { recursive: true, force: true });
            await rm(tgtPath, { recursive: true, force: true });
        });
    });

    describe('cpToPod', () => {
        it('should run extract tar command to a url', async () => {
            const kc = new KubeConfig();
            const fakeWebSocketInterface: WebSocketInterface = mock(WebSocketHandler);
            const fakeWebSocket: WebSocket.WebSocket = mock(WebSocket) as WebSocket.WebSocket;
            const exec = new Exec(kc, instance(fakeWebSocketInterface));
            const cp = new Cp(kc, exec);

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'container';
            const srcPath = 'testdata/archive.txt';
            const tgtPath = '/';
            const cmdArray = ['tar', 'xf', '-', '-C', tgtPath];
            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/exec`;

            const query = {
                stdout: false,
                stderr: true,
                stdin: true,
                tty: false,
                command: cmdArray,
                container,
            };
            const queryStr = querystring.stringify(query);

            const fakeConn: WebSocket.WebSocket = instance(fakeWebSocket);
            when(
                fakeWebSocketInterface.connect(`${path}?${queryStr}`, null, anyFunction(), anyFunction()),
            ).thenResolve(fakeConn);
            when(fakeWebSocket.send(anything())).thenCall(() => {});
            when(fakeWebSocket.close()).thenCall(() => {});

            const cpPromise = cp.cpToPod(namespace, pod, container, srcPath, tgtPath);
            await setImmediatePromise();
            const captured = requireCapture(fakeWebSocketInterface);
            captured(WebSocketHandler.StatusStream, Buffer.from(JSON.stringify({ status: 'Success' })));
            await cpPromise;
            verify(
                fakeWebSocketInterface.connect(`${path}?${queryStr}`, null, anyFunction(), anyFunction()),
            ).called();
        });

        it('should reject when the remote tar command fails', async () => {
            const kc = new KubeConfig();
            const fakeWebSocketInterface: WebSocketInterface = mock(WebSocketHandler);
            const fakeWebSocket: WebSocket.WebSocket = mock(WebSocket) as WebSocket.WebSocket;
            const exec = new Exec(kc, instance(fakeWebSocketInterface));
            const cp = new Cp(kc, exec);

            const path = `/api/v1/namespaces/ns/pods/pod/exec`;
            const query = {
                stdout: false,
                stderr: true,
                stdin: true,
                tty: false,
                command: ['tar', 'xf', '-', '-C', '/'],
                container: 'container',
            };
            const queryStr = querystring.stringify(query);

            when(
                fakeWebSocketInterface.connect(`${path}?${queryStr}`, null, anyFunction(), anyFunction()),
            ).thenResolve(instance(fakeWebSocket));
            when(fakeWebSocket.send(anything())).thenCall(() => {});
            when(fakeWebSocket.close()).thenCall(() => {});

            const cpPromise = cp.cpToPod('ns', 'pod', 'container', 'testdata/archive.txt', '/');
            await setImmediatePromise();
            const captured = requireCapture(fakeWebSocketInterface);
            captured(
                WebSocketHandler.StatusStream,
                Buffer.from(JSON.stringify({ status: 'Failure', message: 'tar failed' })),
            );

            await rejects(cpPromise, /tar failed/);
        });
    });
});

async function tarChunks(path: string): Promise<Buffer[]> {
    const chunks: Buffer[] = [];
    const pack = tar.pack(path);
    for await (const chunk of pack) {
        chunks.push(chunk as Buffer);
    }
    return chunks;
}

function requireCapture(fakeWebSocket: WebSocketInterface): (streamNum: number, buff: Buffer) => boolean {
    const [, , outputFn] = capture(fakeWebSocket.connect).last();
    if (!outputFn) {
        throw new Error('expected output callback');
    }
    return outputFn;
}
