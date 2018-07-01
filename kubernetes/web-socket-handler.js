"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws = require("websocket");
var protocols = [
    "v4.channel.k8s.io",
    "v3.channel.k8s.io",
    "v2.channel.k8s.io",
    "channel.k8s.io"
];
var WebSocketHandler = (function () {
    function WebSocketHandler(config) {
        this.config = config;
    }
    WebSocketHandler.prototype.connect = function (path, textHandler, binaryHandler) {
        var server = this.config.getCurrentCluster().server;
        var target = server.startsWith('https://') ? server.substr(8) : server.substr(7);
        var uri = "wss://" + target + path;
        var opts = {};
        this.config.applytoHTTPSOptions(opts);
        var client = new ws.client({ tlsOptions: opts });
        return new Promise(function (resolve, reject) {
            client.on('connect', function (connection) {
                connection.on('message', function (message) {
                    if (message.type === 'utf8') {
                        if (textHandler) {
                            textHandler(message.utf8Data);
                        }
                    }
                    else if (message.type === 'binary') {
                        if (binaryHandler) {
                            var stream_1 = message.binaryData.readInt8(0);
                            binaryHandler(stream_1, message.binaryData.slice(1));
                        }
                    }
                });
                resolve(connection);
            });
            client.on('connectFailed', function (err) {
                reject(err);
            });
            client.connect(uri, protocols);
        });
    };
    WebSocketHandler.handleStandardStreams = function (stream, buff, stdout, stderr) {
        if (buff.length < 1) {
            return null;
        }
        if (stream == WebSocketHandler.StdoutStream) {
            stdout.write(buff);
        }
        else if (stream == WebSocketHandler.StderrStream) {
            stderr.write(buff);
        }
        else if (stream == WebSocketHandler.StatusStream) {
            if (stdout) {
                stdout.end();
            }
            if (stderr) {
                stderr.end();
            }
            return JSON.parse(buff.toString('utf8'));
        }
        else {
            console.log("Unknown stream: " + stream);
        }
        return null;
    };
    WebSocketHandler.handleStandardInput = function (conn, stdin) {
        stdin.on('data', function (data) {
            var buff = new Buffer(data.length + 1);
            buff.writeInt8(0, 0);
            if (data instanceof Buffer) {
                data.copy(buff, 1);
            }
            else {
                buff.write(data, 1);
            }
            conn.send(buff);
        });
        stdin.on('end', function () {
            conn.close();
        });
    };
    WebSocketHandler.StdinStream = 0;
    WebSocketHandler.StdoutStream = 1;
    WebSocketHandler.StderrStream = 2;
    WebSocketHandler.StatusStream = 3;
    return WebSocketHandler;
}());
exports.WebSocketHandler = WebSocketHandler;
//# sourceMappingURL=web-socket-handler.js.map