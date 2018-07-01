"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("./api");
var Core_v1Api = (function (_super) {
    __extends(Core_v1Api, _super);
    function Core_v1Api(baseUri) {
        return _super.call(this, baseUri) || this;
    }
    Core_v1Api.prototype.setDefaultAuthentication = function (auth) {
        this.authentications.default = auth;
    };
    return Core_v1Api;
}(api.Core_v1Api));
exports.Core_v1Api = Core_v1Api;
var Extensions_v1beta1Api = (function (_super) {
    __extends(Extensions_v1beta1Api, _super);
    function Extensions_v1beta1Api(baseUri) {
        return _super.call(this, baseUri) || this;
    }
    Extensions_v1beta1Api.prototype.setDefaultAuthentication = function (auth) {
        this.authentications.default = auth;
    };
    return Extensions_v1beta1Api;
}(api.Extensions_v1beta1Api));
exports.Extensions_v1beta1Api = Extensions_v1beta1Api;
//# sourceMappingURL=auth-wrapper.js.map