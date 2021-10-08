var assert = require('assert');
var fs = require('fs');
var join = require('path').join;
var detect = require('../');

describe('language detect', function () {
  it('should allow synchronous filename detection', function () {
    assert.equal(detect.filename('unknown'), null);
    assert.equal(detect.filename('test.js'), 'JavaScript');
    assert.equal(detect.filename('test.cpp'), 'C++');
  });

  it('should allow synchronous shebang detection', function () {
    assert.equal(detect.shebang(''), null);
    assert.equal(detect.shebang('#!/usr/bin/env make'), 'Makefile');
    assert.equal(detect.shebang('#!/usr/bin/sbcl --script'), 'Common Lisp');
    assert.equal(detect.shebang('#!/usr/bin/python2.6'), 'Python');
  });

  it('should allow synchronous language classification', function () {
    assert.equal(detect.classify('for link in links:'), 'Python');
  });

  it('should error when the file doesn\'t exist', function (done) {
    detect('/where/art/thou/romeo', function (err) {
      assert.ok(err);

      return done();
    });
  });

  it('should error when checking a directory', function (done) {
    detect(__dirname + '/fixtures/Cakefile', function (err) {
      assert.ok(err);

      return done();
    })
  });

  function test (name, path, language) {
    describe(name, function () {
      it('should detect', function (done) {
        detect(path, function (err, result) {
          assert.equal(result, language);

          return done(err);
        });
      });

      it('should work synchronously', function () {
        var result = detect.sync(path);

        assert.equal(result, language);
      });

      it('should work on contents', function () {
        var result = detect.contents(path, fs.readFileSync(path, 'utf8'));

        assert.equal(result, language);
      });
    });
  }

  test('file name detection', join(__dirname, 'fixtures/Gemfile'), 'Ruby');
  test('file extension detection', join(__dirname, 'fixtures/bar.h'), 'Objective-C');
  test('shebang detection', join(__dirname, 'fixtures/build'), 'JavaScript');
  test('language classification', join(__dirname, 'fixtures/obscure'), 'CSS');

  describe('additional tests', function () {
    it('shebang detect should fallback', function (done) {
      detect(join(__dirname, 'fixtures/bar.h'), function (err, language) {
        assert.equal(language, 'Objective-C');

        return done(err);
      });
    });

    it('should work with object property name', function () {
      var result = detect.filename('constructor');

      assert.equal(result, undefined);
    });
  });
});
