# Extract domain name from URL

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4JDQMB6MRJXQE&source=url)
![Travis](https://travis-ci.org/bjarneo/extract-domain.svg?branch=master)

Performant domain name extraction. No regex or array magic.

[What is an URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)

However. This package will also remove the sub domain.

## Supports

Browser and Node.

## Usage

```bash
$ npm i --save extract-domain
```

-   urls = string|array
-   returns string|array

```js
extractDomain(urls);
```

ES6

```js
import extractDomain from "extract-domain";
```

```js
const extractDomain = require("extract-domain");
```

```js
const urls = [
    "https://www.npmjs.com/package/extract-domain",
    "http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument",
    "http://user:password@example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument",
    "https://npmjs.com/package/extract-domain",
    "ftp://example.org/resource.txt",
    "this.is.my@email.com"
];

extractDomain(urls[0]); // npmjs.com

extractDomain(urls); // [ 'npmjs.com', 'example.com', 'example.com', 'npmjs.com', 'example.org', 'email.com' ]
```

## TLD support

TLD support require optional dependency to [`psl` library](https://www.npmjs.com/package/psl).

```js
const url =
    "http://www.example.co.uk:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument";

extractDomain(url, { tld: true });
// example.co.uk
```

However, using the tld flag will slow down the process by many seconds. Benchmark:

```
# extract domain 10,000 times
  end ~14 ms (0 s + 13572914 ns)
# extract domain with tld 10,000 times
  end ~4.29 s (4 s + 288108681 ns)
```

## Tests

```bash
$ npm test
```

## Coding style

```bash
$ npm run pretty
```

## Benchmark

```bash
$ npm run benchmark
```

## Contribution

Contributions are appreciated.

## License

MIT-licensed. See LICENSE.
