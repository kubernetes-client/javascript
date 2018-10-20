import querystring = require('querystring');
import stream = require('stream');
import WebSocket = require('ws');

import { KubeConfig } from './config';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';

export class Exec {
    public 'handler': WebSocketInterface;

    public constructor(config: KubeConfig, wsInterface?: WebSocketInterface) {
        if (wsInterface) {
            this.handler = wsInterface;
        } else {
            this.handler = new WebSocketHandler(config);
        }
    }

    // TODO: make command an array and support multiple args
    public async exec(namespace: string, podName: string, containerName: string, command: string,
                      stdout: stream.Writable | any, stderr: stream.Writable | any, stdin: stream.Readable | any,
                      tty: boolean): Promise<WebSocket> {
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
            WebSocketHandler.handleStandardStreams(streamNum, buff, stdout, stderr);
            return true;
        });
        if (stdin != null) {
            WebSocketHandler.handleStandardInput(conn, stdin);
        }
        return conn;
    }
}
