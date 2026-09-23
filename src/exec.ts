import WebSocket from 'isomorphic-ws';
import querystring from 'node:querystring';
import stream from 'stream';

import { V1Status } from './api.js';
import { KubeConfig } from './config.js';
import { isResizable, ResizableStream, TerminalSizeQueue } from './terminal-size-queue.js';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler.js';

export interface ExecOptions {
    /**
     * Optional websocket keepalive interval in milliseconds (1 to 2147483647).
     * Only one ping is outstanding until a pong is received; this is not a pong timeout.
     * Ignored when the socket does not support ping and Node-style event listeners.
     */
    pingIntervalMs?: number;
}

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
     * @param {stream.Readable} stdin - The stream to write stdin data into the command.
     * @param {boolean} tty - Should the command execute in a TTY enabled session.
     * @param {(V1Status) => void} statusCallback -
     *       A callback to received the status (e.g. exit code) from the command, optional.
     * @param {ExecOptions} options - Optional websocket keepalive settings.
     * @return {Promise<WebSocket>} A promise that will return the web socket created for this command.
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
        options?: ExecOptions,
    ): Promise<WebSocket.WebSocket> {
        const pingIntervalMs = options?.pingIntervalMs;
        if (
            pingIntervalMs !== undefined &&
            (!Number.isInteger(pingIntervalMs) || pingIntervalMs <= 0 || pingIntervalMs > 2147483647)
        ) {
            // Validate before connecting so invalid options cannot start a remote command.
            throw new Error('pingIntervalMs must be an integer between 1 and 2147483647');
        }
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
        const conn = await this.handler.connect(path, null, (streamNum: number, buff: Buffer): boolean => {
            const status = WebSocketHandler.handleStandardStreams(streamNum, buff, stdout, stderr);
            if (status != null) {
                if (statusCallback) {
                    statusCallback(status);
                }
                return false;
            }
            return true;
        });
        if (stdin != null) {
            WebSocketHandler.handleStandardInput(conn, stdin, WebSocketHandler.StdinStream);
        }
        if (isResizable(stdout)) {
            this.terminalSizeQueue = new TerminalSizeQueue();
            WebSocketHandler.handleStandardInput(conn, this.terminalSizeQueue, WebSocketHandler.ResizeStream);
            this.terminalSizeQueue.handleResizes(stdout as any as ResizableStream);
        }
        if (pingIntervalMs !== undefined) {
            this.setupPing(conn, pingIntervalMs);
        }
        return conn;
    }

    private setupPing(conn: WebSocket.WebSocket, pingIntervalMs: number): void {
        if (
            typeof conn.ping !== 'function' ||
            typeof conn.on !== 'function' ||
            typeof conn.removeListener !== 'function' ||
            conn.readyState !== WebSocket.OPEN
        ) {
            return;
        }

        let awaitingPong = false;
        const onPong = () => {
            awaitingPong = false;
        };
        const clearKeepAlive = () => {
            clearInterval(timer);
            conn.removeListener('pong', onPong);
            conn.removeListener('close', clearKeepAlive);
            conn.removeListener('error', clearKeepAlive);
        };
        const timer = setInterval(() => {
            if (conn.readyState !== WebSocket.OPEN) {
                clearKeepAlive();
                return;
            }
            if (!awaitingPong) {
                awaitingPong = true;
                conn.ping();
            }
        }, pingIntervalMs);
        conn.on('pong', onPong);
        conn.on('close', clearKeepAlive);
        conn.on('error', clearKeepAlive);
        timer.unref();
    }
}
