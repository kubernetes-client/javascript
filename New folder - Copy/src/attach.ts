import WebSocket = require('isomorphic-ws');
import querystring = require('querystring');
import stream = require('stream');

import { KubeConfig } from './config';
import { isResizable, ResizableStream, TerminalSizeQueue } from './terminal-size-queue';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';

export class Attach {
    public 'handler': WebSocketInterface;

    private terminalSizeQueue?: TerminalSizeQueue;

    public constructor(config: KubeConfig, websocketInterface?: WebSocketInterface) {
        this.handler = websocketInterface || new WebSocketHandler(config);
    }

    public async attach(
        namespace: string,
        podName: string,
        containerName: string,
        stdout: stream.Writable | any,
        stderr: stream.Writable | any,
        stdin: stream.Readable | any,
        tty: boolean,
    ): Promise<WebSocket> {
        const query = {
            container: containerName,
            stderr: stderr != null,
            stdin: stdin != null,
            stdout: stdout != null,
            tty,
        };
        const queryStr = querystring.stringify(query);
        const path = `/api/v1/namespaces/${namespace}/pods/${podName}/attach?${queryStr}`;
        const conn = await this.handler.connect(
            path,
            null,
            (streamNum: number, buff: Buffer): boolean => {
                WebSocketHandler.handleStandardStreams(streamNum, buff, stdout, stderr);
                return true;
            },
        );
        if (stdin != null) {
            WebSocketHandler.handleStandardInput(conn, stdin, WebSocketHandler.StdinStream);
        }
        if (isResizable(stdout)) {
            this.terminalSizeQueue = new TerminalSizeQueue();
            WebSocketHandler.handleStandardInput(conn, this.terminalSizeQueue, WebSocketHandler.ResizeStream);
            this.terminalSizeQueue.handleResizes((stdout as any) as ResizableStream);
        }
        return conn;
    }
}
