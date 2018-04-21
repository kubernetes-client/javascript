import stream = require('stream');

import ws = require('websocket');
import { KubeConfig } from './config';
import { V1Status } from './api';


const protocols = [
    "v4.channel.k8s.io",
    "v3.channel.k8s.io",
    "v2.channel.k8s.io",
    "channel.k8s.io"
]

export class WebSocketHandler {
    'config': KubeConfig;

    public static readonly StdinStream = 0;
    public static readonly StdoutStream = 1;
    public static readonly StderrStream = 2;
    public static readonly StatusStream = 3;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    public connect(path: string,
                   textHandler: (text: string) => void,
                   binaryHandler: (stream: number, buff: Buffer) => void): Promise<ws.connection> {

        const server = this.config.getCurrentCluster().server;
        const target = server.startsWith('https://') ? server.substr(8) : server.substr(7);
        const uri = `wss://${target}${path}`;

        const client = new ws.client();

        return new Promise((resolve, reject) => {
            client.on('connect', (connection) => {
                connection.on('message', function(message) {
                    if (message.type === 'utf8') {
                        if (textHandler) {
                            textHandler(message.utf8Data);
                        }
                    }
                    else if (message.type === 'binary') {
                        if (binaryHandler) {
                            let stream = message.binaryData.readInt8(0);
                            binaryHandler(stream, message.binaryData.slice(1));
                        }
                    }
                });
                resolve(connection);
            });

            client.on('connectFailed', (err) => {
                reject(err);
            });

            client.connect(uri, protocols);
        });
    }

    public static handleStandardStreams(stream: number, buff: Buffer, stdout: any, stderr: any): V1Status {
        if (buff.length < 1) {
            return null;
        }
        if (stream == WebSocketHandler.StdoutStream) {
            stdout.write(buff);
        } else if (stream == WebSocketHandler.StderrStream) {
            stderr.write(buff);
        } else if (stream == WebSocketHandler.StatusStream) {
            // stream closing.
            if (stdout) {
                stdout.end();
            }
            if (stderr) {
                stderr.end();
            }
            return JSON.parse(buff.toString('utf8')) as V1Status;
        } else {
            console.log("Unknown stream: " + stream);
        }
        return null;
    }

    public static handleStandardInput(conn: ws.connection, stdin: stream.Readable | any) {
        stdin.on('data', (data) => {
            let buff = new Buffer(data.length + 1);
            buff.writeInt8(0, 0);
            if (data instanceof Buffer) {
                data.copy(buff, 1);
            } else {
                buff.write(data, 1);
            }
            conn.send(buff);
        });

        stdin.on('end', () => {
            conn.close();
        });
    }
}
