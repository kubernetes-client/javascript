'use strict';
const assert = require('assert');

let extractDomain;

if (process.env.NODE_ENV === 'travis') {
    extractDomain = require('./dist/extract-domain');
} else {
    extractDomain = require('./index');
}

const urls = [
    'https://www.npmjs.com/package/extract-domain',
    'http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'https://npmjs.com/package/extract-domain',
    'http://example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'http://www.so.many.sub.domains.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'http://user:password@example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'ftp://example.org/resource.txt',
    'http://www.npmjs.com',
    'http://www.npmjs.com?query=test',
    'http://www.npmjs.com#fragment',
    'this.is.my@email.com',
    'test@something.com',
];

const expected = [
    'npmjs.com',
    'example.com',
    'npmjs.com',
    'example.org',
    'email.com',
    'something.com',
];

describe('extract domain', () => {
    it('should extract given domain from url', () => {
        assert.strictEqual(extractDomain(urls[0]), expected[0]);
        assert.strictEqual(extractDomain(urls[1]), expected[1]);
        assert.strictEqual(extractDomain(urls[7]), expected[0]);
        assert.strictEqual(extractDomain(urls[8]), expected[0]);
        assert.strictEqual(extractDomain(urls[10]), expected[4]);
    });

    it('should extract given domain from an array of urls', () => {
        const domains = extractDomain(urls);

        domains.map(domain => assert(expected.indexOf(domain) > -1));
    });

    it('should return empty string if it is not a url', () => {
        assert.strictEqual(extractDomain('/i.am/just.astring//7test'), '');
    });

    it('should throw syntax error exception if the argument is not string nor array', () => {
        try {
            extractDomain({});
        } catch (e) {
            assert.strictEqual(e.name, 'TypeError');

            assert.strictEqual(
                e.message,
                'The given URL is not a string. Please verify your string|array.'
            );
        }
    });

    it('should throw syntax error exception if the array value is not a string', () => {
        try {
            extractDomain([['wow']]);
        } catch (e) {
            assert.strictEqual(e.name, 'TypeError');

            assert.strictEqual(
                e.message,
                'The given URL is not a string. Please verify your string|array.'
            );
        }
    });

    it('should support tld if options flag is used', () => {
        assert.strictEqual(
            extractDomain(
                'http://www.so.many.sub.domains.example.co.uk:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: true }
            ),
            'example.co.uk'
        );

        assert.strictEqual(
            extractDomain(
                'http://user:password@www.so.many.sub.domains.example.co.uk:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: true }
            ),
            'example.co.uk'
        );

        assert.strictEqual(
            extractDomain(
                'http://user:password@www.so.many.sub.domains.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: true }
            ),
            'example.com'
        );

        assert.strictEqual(extractDomain('https://example.com', { tld: true }), 'example.com');
    });
});
