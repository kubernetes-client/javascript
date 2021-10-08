'use strict';

var when = require('when');
var PStream = require('./pstream');

function identity(x) {
    return x;
}

// Append items to an array-like object
function append(arrlike /* , items... */) {
    return Array.prototype.slice.call(arrlike, 0).concat(Array.prototype.slice.call(arguments, 1));
}

// Produces a transformer that takes a value and simply returns it.
function promisify_value(result_transformer) {
    result_transformer = result_transformer || identity;

    var transformer = function (promise) {
        result_transformer(promise);
    };

    transformer.for_property = function (obj_promise, prop) {
        return when(obj_promise, function (obj) {
            result_transformer(obj[prop]);
        });
    };

    return transformer;
}

// Produces a transformer that takes a promised function, and returns
// a function returning a promise, optionally transforming that
// promise.
function promisify_func(result_transformer) {
    result_transformer = result_transformer || identity;

    var transformer = function (func_promise) {
        return function (/* ... */) {
            var args = arguments;
            return result_transformer(when(func_promise, function (func) {
                return func.apply(null, args);
            }));
        };
    };

    transformer.for_property = function (obj_promise, prop) {
        return function (/* ... */) {
            var args = arguments;
            return result_transformer(when(obj_promise, function (obj) {
                return obj[prop].apply(obj, args);
            }));
        };
    };

    return transformer;
}

// Produces a transformer that takes a promised function
// taking a callback, and returns a function returning a promise,
// optionally transforming that promise.
function promisify_cb_func(result_transformer) {
    result_transformer = result_transformer || identity;

    var transformer = function (func_promise) {
        return function (/* ... */) {
            var args = arguments;
            return result_transformer(when(func_promise, function (func) {
                var d = when.defer();
                func.apply(null, append(args, function (err, val) {
                    if (err) {
                        d.reject(err);
                    } else {
                        d.resolve(val);
                    }
                }));
                return d.promise;
            }));
        };
    };

    transformer.for_property = function (obj_promise, prop) {
        return function(/* ... */) {
            var args = arguments;
            return result_transformer(when(obj_promise, function (obj) {
                var d = when.defer();
                obj[prop].apply(obj, append(args, function (err, val) {
                    if (err) {
                        d.reject(err);
                    } else {
                        d.resolve(val);
                    }
                }));
                return d.promise;
            }));
        };
    };

    return transformer;
}

// Produces a transformer that takes a promised object, and returns an
// object with the properties transformed according to the template.
function promisify_object(template) {
    var transformer = function (obj_promise) {
        var res = {};
        for (var prop in template) {
            res[prop] = template[prop].for_property(obj_promise, prop);
        }
        return res;
    };

    transformer.for_property = function (parent_promise, prop) {
        return transformer(when(parent_promise, function (obj) {
            return obj[prop];
        }));
    };

    return transformer;
}

// Takes a promised read stream and returns a PStream
function promisify_read_stream() {
    var transformer = function (stream_promise) {
        var res = new PStream();
        res.to = function (dest) {
            when(stream_promise, function (stream) {
                PStream.wrap_read_stream(stream).to(dest);
            }, function (err) {
                dest.error(err);
            });
        };
        return res.sanitize();
    };

    transformer.for_property = function (obj_promise, prop) {
        return transformer(when(obj_promise, function (obj) {
            return obj[prop];
        }));
    };

    return transformer;
}

exports.value = promisify_value;
exports.func = promisify_func;
exports.cb_func = promisify_cb_func;
exports.object = promisify_object;
exports.read_stream = promisify_read_stream;
exports.PStream = PStream;
