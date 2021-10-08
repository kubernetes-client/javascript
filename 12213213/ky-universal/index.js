'use strict';
const {URL, URLSearchParams} = require('url');
const fetch = require('node-fetch');
const AbortController = require('abort-controller');

if (!global.URL) {
	global.URL = URL;
}

if (!global.URLSearchParams) {
	global.URLSearchParams = URLSearchParams;
}

if (!global.fetch) {
	global.fetch = fetch;
}

if (!global.Headers) {
	global.Headers = fetch.Headers;
}

if (!global.Request) {
	global.Request = fetch.Request;
}

if (!global.Response) {
	global.Response = fetch.Response;
}

if (!global.AbortController) {
	global.AbortController = AbortController;
}

const {
	default: ky,
	HTTPError,
	TimeoutError
} = require('ky/umd');

module.exports = ky;
module.exports.default = ky;
module.exports.HTTPError = HTTPError;
module.exports.TimeoutError = TimeoutError;
