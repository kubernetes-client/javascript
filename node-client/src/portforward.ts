import querystring = require('querystring');
import stream = require('stream');
import WebSocket = require('ws');

import { KubeConfig } from './config';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler';

export class PortForward {
    private readonly handler: WebSocketInterface;
    private readonly disconnectOnErr: boolean;

    // handler is a parameter really only for injecting for testing.
    constructor(config: KubeConfig, disconnectOnErr?: boolean, handler?: WebSocketInterface) {
        if (!handler) {
            this.handler = new WebSocketHandler(config);
        } else {
            this.handler = handler;
        }
        this.disconnectOnErr = true;
    }

    // TODO: support multiple ports for real...
    public async portForward(
        namespace: string, podName: string, targetPorts: number[],
        output: stream.Writable, err: stream.Writable,
        input: stream.Readable,
    ): Promise<WebSocket> {

        if (targetPorts.length === 0) {
            throw new Error('You must provide at least one port to forward to.');
        }
        if (targetPorts.length > 1) {
            throw(new Error('ERROR: Only one port is currently supported for port-forward'));
        }
        const query = {
            ports: targetPorts[0],
        };
        const queryStr = querystring.stringify(query);
        const needsToReadPortNumber: boolean[] = [];
        targetPorts.forEach((value: number, index: number) => {
            needsToReadPortNumber[index * 2] = true;
            needsToReadPortNumber[index * 2 + 1] = true;
        });
        const path = `/api/v1/namespaces/${namespace}/pods/${podName}/portforward?${queryStr}`;
        const conn = await this.handler.connect(path, null, (streamNum: number, buff: Buffer | string): boolean => {
            if (streamNum >= targetPorts.length * 2) {
                if (this.disconnectOnErr) {
                    return false;
                }
            }
            // First two bytes of each stream are the port number
            if (needsToReadPortNumber[streamNum]) {
                buff = buff.slice(2);
                needsToReadPortNumber[streamNum] = false;
            }
            if (streamNum % 2 === 1) {
                if (err) {
                    err.write(buff);
                }
            } else {
                output.write(buff);
            }
            return true;
        });
        WebSocketHandler.handleStandardInput(conn, input, 0);
        return conn;
    }
}
