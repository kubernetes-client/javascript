import querystring = require('querystring');
import stream = require('stream');

import { KubeConfig } from './config';
import { WebSocketHandler } from './web-socket-handler';

export class Attach {
    public 'handler': WebSocketHandler;

    public constructor(config: KubeConfig) {
        this.handler = new WebSocketHandler(config);
    }

    public attach(namespace: string, podName: string, containerName: string,
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
        const promise = this.handler.connect(path, null, (streamNum: number, buff: Buffer): boolean => {
            WebSocketHandler.handleStandardStreams(streamNum, buff, stdout, stderr);
            return true;
        });
        const result = new Promise<void>((resolvePromise, reject) => {
            promise.then(() => resolvePromise(), (err) => reject(err));
        });
        return result;
    }
}
