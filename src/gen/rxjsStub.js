"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
exports.from = from;
exports.of = of;
exports.mergeMap = mergeMap;
exports.map = map;
var Observable = /** @class */ (function () {
    function Observable(promise) {
        this.promise = promise;
    }
    Observable.prototype.toPromise = function () {
        return this.promise;
    };
    Observable.prototype.pipe = function (callback) {
        return new Observable(this.promise.then(callback));
    };
    return Observable;
}());
exports.Observable = Observable;
function from(promise) {
    return new Observable(promise);
}
function of(value) {
    return new Observable(Promise.resolve(value));
}
function mergeMap(callback) {
    return function (value) { return callback(value).toPromise(); };
}
function map(callback) {
    return callback;
}
