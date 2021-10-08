'use strict';

var util = require('util');
var when = require('when');
var promisify = require('../promisify');

// Some simple support for imposing a time limit on tests

function TestTimeoutError() {
    Error.captureStackTrace(this);
    this.message = "test timed out";
}
util.inherits(TestTimeoutError, Error);
TestTimeoutError.prototype.name = "TestTimeoutError";

function timeout(assert, secs) {
    var orig_done = assert.done;

    var timer = setTimeout(function () {
        if (timer) {
            timer = null;
            assert.done = orig_done;
            throw new TestTimeoutError();
        }
    }, secs * 1000);

    assert.done = function (err) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        assert.done = orig_done;
        assert.done(err);
    };
}

// A promise that resolves to the given value on the next tick of the
// event loop.
function promptly(val) {
    var d = when.defer();
    process.nextTick(function () { d.resolve(val); });
    return d.promise;
}

module.exports.promptly = function (assert) {
    timeout(assert, 5);
    promptly(100).then(function (val) {
        assert.equal(val, 100);
        assert.done();
    });
};

// Propogate an error from a promise as a normal exception.
function vent(promise) {
    return promise.then(function () { return promise; },
                        function (err) {
                            // This is the only way to get an exception
                            // out of promises-land
                            process.nextTick(function () { throw err; });
                            return when.defer().promise;
                        });
}

// Run a sequence of promise-based tests.  A test is a function that
//  returns a promise that triggers when the test is done.
function tests(assert /* , tests... */) {
    var args = arguments;
    var i = 1;

    // Handle the next promise
    function next() {
        if (i >= args.length) {
            assert.done();
            return null;
        }
        else {
            return args[i++](assert).then(function () { return next(); });
        }
    }

    return vent(next());
}

function cb_identity(val, cb) {
    process.nextTick(function () { cb(null, val); });
}

// Wrap a function in a object, making sure that 'this' gets the right value
function wrap_func(f, assert) {
    var obj = {
        prop: function (/* args */) {
            assert.strictEqual(obj, this);
            return f.apply(null, arguments);
        }
    };
    return obj;
}

function CustomError() {
    Error.captureStackTrace(this);
    this.message = "Oh dear";
}
util.inherits(CustomError, Error);
CustomError.prototype.name = "CustomError";


function cb_error(cb) {
    process.nextTick(function () { cb(new CustomError()); });
}

function double(n) {
    return n * 2;
}

module.exports.func = function (assert) {
    timeout(assert, 5);
    assert.expect(6);
    tests(assert,
          function () {
              // Convert a function into a function returning a promise
              return promisify.func()(double)(42).then(function (res) {
                  assert.equal(res, 84);
              });
          },
          function () {
              // Convert a promise yielding a function into a function
              // returning a promise
              return promisify.func()(promptly(double))(43).then(function (res) {
                  assert.equal(res, 86);
              });
          },
          function () {
              // Exceptions should get turned into errors
              return promisify.func()(function () { throw new CustomError(); })().then(null, function (err) {
                  assert.ok(err instanceof CustomError);
              });
          },
          function () {
              // for_property should take care of methods
              return promisify.func().for_property(wrap_func(double, assert), 'prop')(44).then(function (res) {
                  assert.equal(res, 88);
              });
          },
          function () {
              // Transform the result
              return promisify.func(function (p) { return p.then(double); })(double)(45).then(function (res) {
                  assert.equal(res, 180);
              });
          });
};

module.exports.cb_func = function (assert) {
    timeout(assert, 5);
    assert.expect(9);
    tests(assert,
          function () {
              // Convert cb_identity into a function returning a promise.
              return promisify.cb_func()(cb_identity)(42).then(function (res) {
                  assert.equal(res, 42);
              });
          },
          function () {
              // Convert a promise yielding cb_identity into a
              // function returning a promise.
              return promisify.cb_func()(promptly(cb_identity))(43).then(function (res) {
                  assert.equal(res, 43);
              });
          },
          function () {
              // Convert a promise yielding an object with a
              // cb_identity property into a function returning a
              // promise.
              return promisify.cb_func().for_property(promptly(wrap_func(cb_identity, assert)), 'prop')(44).then(function (res) {
                  assert.equal(res, 44);
              });
          },
          // And now the same again for errors
          function () {
              return promisify.cb_func()(cb_error)().then(null, function (err) {
                  assert.ok(err instanceof CustomError);
              });
          },
          function () {
              return promisify.cb_func()(promptly(cb_error))().then(null, function (err) {
                  assert.ok(err instanceof CustomError);
              });
          },
          function () {
              return promisify.cb_func().for_property(promptly(wrap_func(cb_error, assert)), 'prop')().then(null, function (err) {
                  assert.ok(err instanceof CustomError);
              });
          },
          function () {
              // Do a transformation of the result
              return promisify.cb_func(function (p) { return p.then(double); })(cb_identity)(42).then(function (res) {
                  assert.equal(res, 84);
              });
          });
};

module.exports.object = function (assert) {
    timeout(assert, 5);
    assert.expect(4);
    tests(assert,
          function () {
              return promisify.object({prop: promisify.func()})(wrap_func(double, assert)).prop(42).then(function (res) {
                  assert.equal(res, 84);
              });
          },
          function () {
              return promisify.object({prop: promisify.cb_func()})(wrap_func(cb_identity, assert)).prop(43).then(function (res) {
                  assert.equal(res, 43);
              });
          });
    // TODO Test nested
};

// Make a simple read stream
function test_read_stream() {
    var EventEmitter = require('events').EventEmitter;
    var stream = new EventEmitter();
    var i = 1;
    function next() {
        if (i <= 5) {
            stream.emit('data', String(i++));
            process.nextTick(next);
        }
        else {
            stream.emit('end');
        }
    }
    process.nextTick(next);
    return stream;
}

module.exports.read_stream = function (assert) {
    timeout(assert, 5);
    assert.expect(4);
    tests(assert,
          function () {
              // Accumulate items from the test stream into a buffer
              var buf =''
              return promisify.read_stream()(test_read_stream()).map(function (val) { buf += val; }).then(function () {
                  assert.equal(buf, '12345');
              });
          },
          function () {
              // In conjunction with promisify.func to convert a read
              // stream returned from a method
              var buf =''
              return promisify.func(promisify.read_stream()).for_property(promptly(wrap_func(test_read_stream, assert)), 'prop')().map(function (val) { buf += val; }).then(function () {
                  assert.equal(buf, '12345');
              });
          },
          function () {
              // Test error case
              return promisify.read_stream()(test_read_stream()).map(function (val) { throw new CustomError(); }).then(null, function (err) {
                  assert.ok(err instanceof CustomError);
              });
          });
};
