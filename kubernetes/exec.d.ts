import stream = require('stream');
import ws = require('websocket');
import { WebSocketHandler } from './web-socket-handler';
import { KubeConfig } from './config';
export declare class Exec {
    'handler': WebSocketHandler;
    constructor(config: KubeConfig);
    exec(namespace: string, podName: string, containerName: string, command: string, stdout: stream.Writable | any, stderr: stream.Writable | any, stdin: stream.Readable | any, tty: boolean): Promise<ws.connection>;
}
