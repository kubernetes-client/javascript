"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require("querystring");
var web_socket_handler_1 = require("./web-socket-handler");
var Attach = (function () {
    function Attach(config) {
        this.handler = new web_socket_handler_1.WebSocketHandler(config);
    }
    Attach.prototype.attach = function (namespace, podName, containerName, stdout, stderr, stdin, tty) {
        var query = {
            stdout: stdout != null,
            stderr: stderr != null,
            stdin: stdin != null,
            tty: tty,
            container: containerName
        };
        var queryStr = querystring.stringify(query);
        var path = "/api/v1/namespaces/" + namespace + "/pods/" + podName + "/attach?" + queryStr;
        this.handler.connect(path, null, function (stream, buff) {
            web_socket_handler_1.WebSocketHandler.handleStandardStreams(stream, buff, stdout, stderr);
        });
    };
    return Attach;
}());
exports.Attach = Attach;
//# sourceMappingURL=attach.js.map