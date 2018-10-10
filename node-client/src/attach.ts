import querystring = require('querystring');
import stream = require('stream');

import { KubeConfig } from './config';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';

export class Attach {
    public 'handler': WebSocketInterface;

    public constructor(config: KubeConfig, websocketInterface?: WebSocketInterface) {
        if (websocketInterface) {
            this.handler = websocketInterface;
        } else {
            this.handler = new WebSocketHandler(config);
        }
    }

    public async attach(namespace: string, podName: string, containerName: string,
                        stdout: stream.Writable | any, stderr: stream.Writable | any, stdin: stream.Readable | any,
                        tty: boolean): Promise<void> {
        const query = {
            container: containerName,
            stderr: stderr != null,
            stdin: stdin != null,
            stdout: stdout != null,
            tty,
        };
        const queryStr = querystring.stringify(query);
        const path = `/api/v1/namespaces/${namespace}/pods/${podName}/attach?${queryStr}`;
        const conn = await this.handler.connect(path, null, (streamNum: number, buff: Buffer): boolean => {
            WebSocketHandler.handleStandardStreams(streamNum, buff, stdout, stderr);
            return true;
        });
        if (stdin != null) {
            WebSocketHandler.handleStandardInput(conn, stdin);
        }
    }
}
