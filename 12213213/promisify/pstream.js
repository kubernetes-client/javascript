'use strict';

var when = require('when');

function merge_objects(a, b) {
    for (var prop in b) {
        if (!a.hasOwnProperty(prop)) {
            a[prop] = b[prop];
        }
    }
    return a;
};

// A PStream represents an incoming stream of items.  Conceptually, it
// is a promise accompanied by a lazy sequence of items.  The promise
// indicates when the sequence ends in the case of a successful
// resolution, or otherwise an error from the source of the steam.
// Unlike node's EventEmitter-based read streams, an error strictly
// terminates the stream.

function PStream() {
}

PStream.isPStream = function (obj) {
    return obj instanceof PStream;
}

PStream.prototype.then = function (callback, errback) {
    return this.sink().then(callback, errback);
};

// Make a new stream by applying a function to each item in the stream
PStream.prototype.map = function(f) {
    var underlying = this;
    var res = new PStream();
    res.to = function (dest) {
        underlying.to(merge_objects({
            item: function (val) {
                dest.item(f(val));
            }
        }, dest));
    };
    return res;
};

// Pass each item to a function, and reutn a promise representing the
// end of the stream.
PStream.prototype.sink = function (f) {
    var d = when.defer();
    var res = d.promise;
    this.to({
        item: function (val) { if (f) { f(val); } },
        end: function () { if (d) { d.resolve(); d = null; } },
        error: function (err) { if (d) { d.reject(err); d = null; } }
    });
    return res;
};

// A general pstream -> pstream transformation. Like map, but the
// function is passed a callback to allow it to yield zero, one, or
// many values.  There is also an "end function" which makes it
// possible to yield extra items downstream when the upstream ends.
PStream.prototype.transform = function(funcs) {
    var underlying = this;

    var res = new PStream();
    res.to = function (dest) {
        if (funcs.initial) {
            var done = false;
            funcs.initial(function (out) { if (!done) { dest.item(out); } });
            done = true;
        }

        var new_dest = {};
        if (funcs.item) {
            new_dest.item = function (val) {
                var done = false;
                funcs.item(val, function (out) { if (!done) { dest.item(out); } });
                done = true;
            }
        }

        if (funcs.end) {
            new_dest.end = function () {
                var done = false;
                funcs.end(function (out) { if (!done) { dest.item(out); } });
                done = true;
                dest.end();
            };
        }

        underlying.to(merge_objects(new_dest, dest));
    };

    return res;
};

// Make a PStream that is guaranteed to be well behaved (reflects
// exceptions up through "error", only calls "end" or "error" once).
PStream.prototype.sanitize = function() {
    var underlying = this;
    var res = new PStream();
    res.to = function (dest) {
        var done = false;
        underlying.to({
            item: function (val) {
                if (!done) {
                    try {
                        dest.item(val);
                    }
                    catch (err) {
                        dest.error(err);
                        done = true;
                    }
                }
            },

            end: function () {
                if (!done) {
                    try {
                        dest.end();
                    }
                    catch (err) {
                        dest.error(err);
                    }
                    done = true;
                }
            },

            error: function (err) {
                if (!done) {
                    try {
                        dest.error(err);
                    }
                    catch (err) {
                        dest.error(err);
                    }
                    done = true;
                }
            }
        });
    };

    return res;
};

PStream.wrap_read_stream = function (s) {
    var res = new PStream();
    res.to = function (dest) {
        s.on('data', function (data) { dest.item(data); });
        s.on('end', function () { dest.end(); });
        s.on('error', function (err) { dest.error(err); });

        // Some streams emit 'close' but not 'end', despite what the
        // node docs suggest.
        s.on('close', function () { dest.end(); });
    };
    return res;
}

// Make a PStream that yields the items in a promised array
PStream.from_array = function (p) {
    var res = new PStream();
    res.to = function (dest) {
        when(p, function (arr) {
            arr.forEach(function (item) { dest.item(item); });
            dest.end();
        }).then(null, function (err) { dest.error(err); });
    };
    return res;
}

// Convert a PStream to a promised array
PStream.prototype.to_array = function () {
    var res = [];
    return this.map(function (item) {
        res.push(item);
    }).then(function () {
        return res;
    });
};

module.exports = PStream;
