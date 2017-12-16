import querystring = require('querystring');
import stream = require('stream');

import { WebSocketHandler } from './web-socket-handler';
import { KubeConfig } from '@kubernetes/client-node';

export class Attach {
    'handler': WebSocketHandler;

    public constructor(config: KubeConfig) {
        this.handler = new WebSocketHandler(config);
    }        

    public attach(namespace: string, podName: string, containerName: string, stdout: stream.Writable | any, stderr: stream.Writable | any, stdin: stream.Readable | any, tty: boolean) {
        var query = {
            stdout: stdout != null,
            stderr: stderr != null,
            stdin: stdin != null,
            tty: tty,
            container: containerName
        }
        var queryStr = querystring.stringify(query);
        var path = `/api/v1/namespaces/${namespace}/pods/${podName}/attach?${queryStr}`;        
        this.handler.connect(path, null, (stream: number, buff: Buffer) => {
            WebSocketHandler.handleStandardStreams(stream, buff, stdout, stderr);
        });
    }
}
