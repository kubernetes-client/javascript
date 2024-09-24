import { anything, anyFunction, instance, mock, verify, when } from 'ts-mockito';
import * as querystring from 'querystring';
import { expect } from 'chai';
import WebSocket = require('isomorphic-ws');
import * as fs from 'node:fs';
import * as path from 'node:path';
import { tmpdir } from 'os';
import * as tar from 'tar';
import { CallAwaiter } from '../test';
import { KubeConfig } from './config';
import { Exec } from './exec';
import { Cp } from './cp';
import { BinaryHandler, WebSocketHandler, WebSocketInterface } from './web-socket-handler';
import { V1Status } from './api';
import { randomUUID } from 'crypto';
import { sleep } from './util';

describe('Cp', () => {
    let tmpDir = '';

    beforeEach(() => {
        tmpDir = `${tmpdir()}/${randomUUID()}`;
        fs.mkdirSync(tmpDir);
    });

    afterEach(() => {
        if (tmpDir) {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });

    describe('cpFromPod', () => {
        it('should run create tar command to a url', async () => {
            const kc = new KubeConfig();
            const fakeWebSocketInterface: WebSocketInterface = mock(WebSocketHandler);
            const fakeWebSocket: WebSocket.WebSocket = mock(WebSocket);
            const fakeConn: WebSocket.WebSocket = instance(fakeWebSocket);
            const callAwaiter: CallAwaiter = new CallAwaiter();
            const exec = new Exec(kc, instance(fakeWebSocketInterface));
            const cp = new Cp(kc, exec);

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'container';
            const srcPath = '/';
            const cmdArray = ['tar', 'zcf', '-', srcPath];
            const queryPath = `/api/v1/namespaces/${namespace}/pods/${pod}/exec`;

            const query = {
                stdout: true,
                stderr: true,
                stdin: false,
                tty: false,
                command: cmdArray,
                container,
            };
            const queryStr = querystring.stringify(query);

            when(fakeWebSocketInterface.connect(`${queryPath}?${queryStr}`, null, anyFunction())).thenCall(
                callAwaiter.resolveCall('connect', fakeConn),
            );
            when(fakeWebSocket.close()).thenCall(callAwaiter.resolveCall('close'));

            let complete = false;
            let lastErr = undefined;
            const promise = cp
                .cpFromPod(namespace, pod, container, srcPath, tmpDir)
                .then(() => {
                    complete = true;
                })
                .catch((err) => {
                    lastErr = err;
                });
            expect(lastErr).to.be.undefined;
            expect(complete).to.be.false;

            const binaryHandler: BinaryHandler = (await callAwaiter.awaitCall('connect'))[2];

            // simulate a network hope with a sleep
            await sleep(1);
            const contents = fs.readFileSync('testdata/archive.tgz');
            binaryHandler(WebSocketHandler.StdoutStream, contents);

            // simulate a network hope with a sleep
            await sleep(1);
            const status: V1Status = {
                status: 'Success',
            };
            binaryHandler(WebSocketHandler.StatusStream, Buffer.from(JSON.stringify(status)));

            await promise;

            expect(lastErr).to.be.undefined;
            expect(complete).to.be.true;

            const found = fs.readFileSync(path.join(tmpDir, 'archive.txt')).toString('utf8');
            const expected = fs.readFileSync('testdata/archive.txt').toString('utf8');
            expect(found).to.eq(expected);
        });
    });

    describe('cpToPod', () => {
        it('should run extract tar command to a url', async () => {
            const kc = new KubeConfig();
            const fakeWebSocketInterface: WebSocketInterface = mock(WebSocketHandler);
            const fakeWebSocket: WebSocket.WebSocket = mock(WebSocket) as WebSocket.WebSocket;
            const callAwaiter: CallAwaiter = new CallAwaiter();
            const exec = new Exec(kc, instance(fakeWebSocketInterface));
            const cp = new Cp(kc, exec);

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'container';
            const srcPath = 'archive.txt';
            const tgtPath = '/';
            const cmdArray = ['tar', 'xf', '-', '-C', tgtPath];
            const cwd = 'testdata/';
            const queryPath = `/api/v1/namespaces/${namespace}/pods/${pod}/exec`;

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
            when(fakeWebSocketInterface.connect(`${queryPath}?${queryStr}`, null, anyFunction())).thenCall(
                callAwaiter.resolveCall('connect', fakeConn),
            );

            const outFilename = path.join(tmpDir, 'send-data.tar');
            const out = fs.createWriteStream(outFilename);
            when(fakeWebSocket.send(anything())).thenCall((data) => {
                const streamNum = data.readInt8(0);
                if (streamNum === WebSocketHandler.StdinStream) {
                    out.write(data.subarray(1));
                } else {
                    console.log(streamNum);
                }
            });

            when(fakeWebSocket.close()).thenCall(callAwaiter.resolveCall('close'));

            let complete = false;
            let lastErr = undefined;
            const promise = cp
                .cpToPod(namespace, pod, container, srcPath, tgtPath, cwd)
                .then(() => {
                    complete = true;
                })
                .catch((err) => {
                    lastErr = err;
                });
            expect(lastErr).to.be.undefined;
            expect(complete).to.be.false;

            const binaryHandler: BinaryHandler = (await callAwaiter.awaitCall('connect'))[2];

            // wait for all data to be written and close called
            await callAwaiter.awaitCall('close');
            out.close();
            await tar.x({ f: outFilename, cwd: tmpDir });

            // simulate a network hope with a sleep
            await sleep(1);
            const status: V1Status = {
                status: 'Success',
            };
            binaryHandler(WebSocketHandler.StatusStream, Buffer.from(JSON.stringify(status)));

            await promise;

            expect(lastErr).to.be.undefined;
            expect(complete).to.be.true;

            verify(fakeWebSocketInterface.connect(`${queryPath}?${queryStr}`, null, anyFunction())).called();
        });
    });
});
