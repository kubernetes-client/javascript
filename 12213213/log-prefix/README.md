log-prefix
==========

Prefix calls to console.log, console.warn, etc with whatever you'd like

Example
-------

``` js
console.log('before log-prefix');
require('log-prefix')('==> %s <==');
console.log('after log-prefix');
```

yields

```
before log-prefix
==> after log-prefix <==
```

You can specify a function instead of a string.  The function must return a
string to be used (good for dynamic values).

``` js
require('log-prefix')(function() { return '[' + Date.now() + '] %s' });
console.log('hello %s', 'world');
```

yields

```
[1371582989993] hello world
```

Install
------

    npm install log-prefix

Tests
-----

    npm test

License
-------

MIT License
