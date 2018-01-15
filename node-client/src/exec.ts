import querystring = require('querystring');
import stream = require('stream');

import { WebSocketHandler } from './web-socket-handler';
import { KubeConfig } from './config';

export class Exec {
    'handler': WebSocketHandler;

    public constructor(config: KubeConfig) {
        this.handler = new WebSocketHandler(config);
    }        

    // TODO: make command an array and support multiple args
    public async exec(namespace: string, podName: string, containerName: string, command: string, stdout: stream.Writable | any, stderr: stream.Writable | any, stdin: stream.Readable | any, tty: boolean): Promise<WebSocket> {
        var query = {
            stdout: stdout != null,
            stderr: stderr != null,
            stdin: stdin != null,
            tty: tty,
            command: command,
            container: containerName
        }
        var queryStr = querystring.stringify(query);
        var path = `/api/v1/namespaces/${namespace}/pods/${podName}/exec?${queryStr}`;
        var conn = await this.handler.connect(path, null, (stream: number, buff: Buffer) => {
            WebSocketHandler.handleStandardStreams(stream, buff, stdout, stderr);
        });
        if (stdin != null) {
            WebSocketHandler.handleStandardInput(conn, stdin);
        }
        return conn as WebSocket;
    }
}
