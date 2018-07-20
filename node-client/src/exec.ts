import querystring = require('querystring');
import stream = require('stream');
import ws = require('websocket');

import { KubeConfig } from './config';
import { WebSocketHandler } from './web-socket-handler';

export class Exec {
    public 'handler': WebSocketHandler;

    public constructor(config: KubeConfig) {
        this.handler = new WebSocketHandler(config);
    }

    // TODO: make command an array and support multiple args
    public async exec(namespace: string, podName: string, containerName: string, command: string,
                      stdout: stream.Writable | any, stderr: stream.Writable | any, stdin: stream.Readable | any,
                      tty: boolean): Promise<ws.connection> {
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
        const conn = await this.handler.connect(path, null, (streamNum: number, buff: Buffer) => {
            WebSocketHandler.handleStandardStreams(streamNum, buff, stdout, stderr);
        });
        if (stdin != null) {
            WebSocketHandler.handleStandardInput(conn, stdin);
        }
        return conn;
    }
}
