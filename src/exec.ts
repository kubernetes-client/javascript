import WebSocket = require('isomorphic-ws');
import querystring = require('querystring');
import stream = require('stream');

import { V1Status } from './api';
import { KubeConfig } from './config';
import { isResizable, ResizableStream, TerminalSizeQueue } from './terminal-size-queue';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';

export class Exec {
    public 'handler': WebSocketInterface;

    private terminalSizeQueue?: TerminalSizeQueue;

    public constructor(config: KubeConfig, wsInterface?: WebSocketInterface) {
        this.handler = wsInterface || new WebSocketHandler(config);
    }

    /**
     * @param {string}  namespace - The namespace of the pod to exec the command inside.
     * @param {string} podName - The name of the pod to exec the command inside.
     * @param {string} containerName - The name of the container in the pod to exec the command inside.
     * @param {(string|string[])} command - The command or command and arguments to execute.
     * @param {stream.Writable} stdout - The stream to write stdout data from the command.
     * @param {stream.Writable} stderr - The stream to write stderr data from the command.
     * @param {stream.Readable} stdin - The strream to write stdin data into the command.
     * @param {boolean} tty - Should the command execute in a TTY enabled session.
     * @param {(V1Status) => void} statusCallback -
     *       A callback to received the status (e.g. exit code) from the command, optional.
     * @return {string} This is the result
     */
    public async exec(
        namespace: string,
        podName: string,
        containerName: string,
        command: string | string[],
        stdout: stream.Writable | null,
        stderr: stream.Writable | null,
        stdin: stream.Readable | null,
        tty: boolean,
        statusCallback?: (status: V1Status) => void,
    ): Promise<WebSocket> {
        const query = {
            stdout: stdout != null,
            stderr: stderr != null,
            stdin: stdin != null,
            tty,
            command,
            container: containerName,
        };
        const queryStr = querystring.stringify(query);
        const path = `/api/v1/namespaces/${namespace}/pods/${podName}/exec?${queryStr}`;
        const conn = await this.handler.connect(
            path,
            null,
            (streamNum: number, buff: Buffer): boolean => {
                const status = WebSocketHandler.handleStandardStreams(streamNum, buff, stdout, stderr);
                if (status != null) {
                    if (statusCallback) {
                        statusCallback(status);
                    }
                    return false;
                }
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
