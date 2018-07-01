import stream = require('stream');
import { WebSocketHandler } from './web-socket-handler';
import { KubeConfig } from './config';
export declare class Attach {
    'handler': WebSocketHandler;
    constructor(config: KubeConfig);
    attach(namespace: string, podName: string, containerName: string, stdout: stream.Writable | any, stderr: stream.Writable | any, stdin: stream.Readable | any, tty: boolean): void;
}
