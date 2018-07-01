"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var byline_1 = require("byline");
var Watch = (function () {
    function Watch(config) {
        this.config = config;
    }
    Watch.prototype.watch = function (path, queryParams, callback, done) {
        var url = this.config.getCurrentCluster().server + path;
        queryParams['watch'] = true;
        var headerParams = {};
        var requestOptions = {
            method: 'GET',
            qs: queryParams,
            headers: headerParams,
            uri: url,
            useQuerystring: true,
            json: true
        };
        this.config.applyToRequest(requestOptions);
        var stream = new byline_1.LineStream();
        stream.on('data', function (data) {
            var obj = null;
            if (data instanceof Buffer) {
                obj = JSON.parse(data.toString());
            }
            else {
                obj = JSON.parse(data);
            }
            if (obj['type'] && obj['object']) {
                callback(obj['type'], obj['object']);
            }
            else {
                console.log('unexpected object: ' + obj);
            }
        });
        var req = request(requestOptions, function (error, response, body) {
            if (error) {
                done(error);
            }
            done(null);
        });
        req.pipe(stream);
        return req;
    };
    return Watch;
}());
exports.Watch = Watch;
//# sourceMappingURL=watch.js.map