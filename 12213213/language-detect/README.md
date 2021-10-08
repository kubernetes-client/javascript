# Language Detect

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Detect the programming language of any file by checking the file name, file extension, file shebang and falling back to a programming language classifier. For more language information, it should be used in conjunction with [language-map](https://github.com/blakeembrey/language-map).

## Installation

```
npm install language-detect --save
```

## Usage

```javascript
var detect = require('language-detect');
```

### Asynchronously From a File

```javascript
detect(__dirname + '/test.js', function (err, language) {
  console.log(err);      //=> null
  console.log(language); //=> "JavaScript"
});
```

### Synchronously From a File

```javascript
detect.sync(__dirname + '/test.js'); //=> "JavaScript"
```

### From The Filename and Contents

```javascript
detect.contents(__dirname + '/test.js', 'var test = true;\n'); //=> "JavaScript"
```

### From Only a Filename

```javascript
detect.filename(__dirname + '/test.js'); //=> "JavaScript"
```

### Check for Shebang

```javascript
detect.shebang('#!/usr/bin/env node\n...'); //=> "JavaScript"
```

### Run Classification

Uses [language-classifier](https://github.com/tj/node-language-classifier) which can only detect a small subset of languages.

```javascript
detect.classify('.test { color: red; }')
```

### Other Properties

* **detect.aliases** A map of known aliases
* **detect.interpreters** A map of known interpreters
* **detect.extensions** A map of known file extensions
* **detect.filenames** A map of known file names

## License

MIT

[npm-image]: https://img.shields.io/npm/v/language-detect.svg?style=flat
[npm-url]: https://npmjs.org/package/language-detect
[downloads-image]: https://img.shields.io/npm/dm/language-detect.svg?style=flat
[downloads-url]: https://npmjs.org/package/language-detect
[travis-image]: https://img.shields.io/travis/blakeembrey/node-language-detect.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/node-language-detect
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/node-language-detect.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/node-language-detect?branch=master
