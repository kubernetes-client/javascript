# ky-universal [![Build Status](https://travis-ci.com/sindresorhus/ky-universal.svg?branch=master)](https://travis-ci.com/sindresorhus/ky-universal)

> Use Ky in both Node.js and browsers

[Ky](https://github.com/sindresorhus/ky) is made for browsers, but this package makes it possible to use it in Node.js too, by polyfilling most of the required browser APIs using [`node-fetch`](https://github.com/bitinn/node-fetch) and [`abort-controller`](https://github.com/mysticatea/abort-controller).

This package can be useful for:
- Isomorphic code
- Web apps (React, Vue.js, etc.) that use server-side rendering (SSR)
- Testing browser libraries using a Node.js test runner

**Note:** Before opening an issue, make sure it's an issue with Ky and not its polyfills. Generally, if something works in the browser, but not in Node.js, it's an issue with `node-fetch` or `abort-controller`.

Keep in mind that Ky targets [modern browsers](https://github.com/sindresorhus/ky#browser-support) when used in the browser. For older browsers, you will need to transpile and use a [`fetch` polyfill](https://github.com/github/fetch).

**If you only target Node.js, I would strongly recommend using [Got](https://github.com/sindresorhus/got) instead.**


## Install

```
$ npm install ky ky-universal
```

*Note that you also need to install `ky`.*


## Usage

```js
const ky = require('ky-universal');

(async () => {
	const parsed = await ky('https://httpbin.org/json').json();

	// …
})();
```


## API

The API is exactly the same as the [Ky API](https://github.com/sindresorhus/ky#api).


## FAQ

#### How do I use this with a web app (React, Vue.js, etc.) that uses server-side rendering (SSR)?

Use it like you would use Ky:

```js
import ky from 'ky-universal';

(async () => {
	const parsed = await ky('https://httpbin.org/json').json();

	// …
})();
```

Webpack will ensure the polyfills are only included and used when the app is rendered on the server-side.

#### How do I test a browser library that uses Ky in AVA?

Put the following in package.json:

```json
{
	"ava": {
		"require": [
			"ky-universal"
		]
	}
}
```

The library that uses Ky will now *just work* in AVA tests.


## Related

- [ky](https://github.com/sindresorhus/ky) - Tiny and elegant HTTP client based on the browser Fetch API
- [got](https://github.com/sindresorhus/got) - Simplified HTTP requests in Node.js
