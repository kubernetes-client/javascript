# xcase
Blazingly fast recursive conversion to and from camelCase or PascalCase for objects and arrays and strings.

It supports both Node.js and Browser.

xcase passes most of https://github.com/domchristie/humps tests, excluding only those with custom regexps and handler functions. So if you use `humps` and need something much faster than this is the right place.

```
> node benchmark.js
xcase#camelize x 7,521,530 ops/sec ±0.18% (96 runs sampled)
humps#camelize x 870,637 ops/sec ±0.67% (95 runs sampled)
lodash#camelCase x 784,445 ops/sec ±1.18% (92 runs sampled)
Fastest is xcase#camelize
xcase#decamelize x 6,517,893 ops/sec ±0.43% (94 runs sampled)
humps#decamelize x 1,576,663 ops/sec ±0.65% (95 runs sampled)
lodash#snakeCase x 659,930 ops/sec ±1.50% (95 runs sampled)
Fastest is xcase#decamelize
xcase#camelizeKeys x 642,111 ops/sec ±1.16% (92 runs sampled)
humps#camelizeKeys x 126,551 ops/sec ±0.64% (91 runs sampled)
lodash#reduce + camelCase x 120,886 ops/sec ±1.11% (92 runs sampled)
Fastest is xcase#camelizeKeys
xcase#decamelizeKeys x 613,896 ops/sec ±1.13% (86 runs sampled)
humps#decamelizeKeys x 194,091 ops/sec ±0.61% (92 runs sampled)
lodash#reduce + snakeCase: 
Fastest is xcase#decamelizeKeys
xcase#camelizeKeys (large object) x 678 ops/sec ±0.35% (94 runs sampled)
xcase#camelizeKeys {inPlace: true} (large object) x 570 ops/sec ±1.41% (86 runs sampled)
humps#camelizeKeys (large object) x 163 ops/sec ±0.22% (82 runs sampled)
Fastest is xcase#camelizeKeys (large object)
xcase#decamelizeKeys (large object) x 665 ops/sec ±0.68% (92 runs sampled)
humps#decamelizeKeys (large object) x 238 ops/sec ±0.63% (85 runs sampled)
Fastest is xcase#decamelizeKeys (large object)
```

## Installation

Node: `npm install --save xcase`

Browser (JSPM): `jspm install npm:xcase`

Browser (Bower): `jspm install xcase`

Browser (Manual): Load https://raw.githubusercontent.com/encharm/xcase/master/dist/xcase.min.js and use global `xcase` object

## Usage:

```
let {camelizeKeys} = require('xcase');
let obj = camelizeKeys({
  foo_bar: 1
}); 
// obj is {fooBar: 1}
```

## API

* `camelize(string, [options])` 

    change `"foo_bar"`/`"foo bar"`/`"foo-bar"` to `"fooBar"`

* `camelizeKeys(objectOrArray, [options])`

    change all keys according to `camelize`

* `decamelize(string, [options])`

    change `"fooBar"` to `"foo_bar"` and takes custom `separator` in options

* `decamelizeKeys(objectOrArray, [options])`

    change all keys according to `decamelize`

* `pascalize(string, [opts])`

    change `"foo_bar"`/`"foo bar"`/`"foo-bar"` to `"FooBar"`

* `pascalizeKeys(objectOrArray, [options])`

    change all keys according to `pascalize`

* `depascalize(string, [opts])`

    change `"FooBar"` to `"foo_bar"` and takes custom `separator` in options

* `depascalizeKeys(objectOrArray, [options])`

    change all keys according to `depascalize`


Options:
* `inPlace: true` - to modify existing object (note, it's slower than default! v8 is smarter than us)
* `separator` - for example `-` for `de**` variant of functions

## License

MIT

Copyright (c) 2016, Code Charm Ltd
