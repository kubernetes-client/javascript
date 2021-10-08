# MIME Codec

[![Greenkeeper badge](https://badges.greenkeeper.io/emailjs/emailjs-mime-codec.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/emailjs/emailjs-mime-codec.png?branch=master)](https://travis-ci.org/emailjs/emailjs-mime-codec) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)  [![ES6+](https://camo.githubusercontent.com/567e52200713e0f0c05a5238d91e1d096292b338/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f65732d362b2d627269676874677265656e2e737667)](https://kangax.github.io/compat-table/es6/)

`emailjs-mime-codec` allows you to encode and decode between different MIME related encodings. Quoted-Printable, Base64 etc.

All input can use any charset (in this case, the value must not be a string but an arraybuffer of Uint8Array) but output is always unicode.

## Usage

    npm install --save emailjs-mime-codec

    import {
      encode, decode, convert
      mimeEncode, mimeDecode,
      base64Encode, base64Decode,
      quotedPrintableEncode, quotedPrintableDecode,
      mimeWordEncode, mimeWordDecode,
      mimeWordsEncode, mimeWordsDecode,
      headerLineEncode, headerLinesDecode,
      continuationEncode,
      foldLines,
      parseHeaderValue
    } from 'emailjs-mime-codec'

### Charset functions

```javascript
encode(data: String) -> Uint8Array
decode(data: Uint8Array, charset: String) -> String
convert(data, charset: String) -> String
```

`encode` takes a String and returns a UTF-8 encoded Uint8Array.

`decode` takes a Uint8Array along with a charset and decodes the typed array to a String. Charset defaults to UTF-8.

`convert` chains encode and decode and converts an input string with a given encoding to a UTF-8 encoded Uint8Array.

### foldLines

Folds a long line according to the RFC 5322 <http://tools.ietf.org/html/rfc5322#section-2.1.1>

    foldLines(str [, lineLengthMax[, afterSpace]]) -> String

  * **str** - String to be folded
  * **lineLengthMax** - Maximum length of a line (defaults to 76)
  * **afterSpace** - If true, leave a space in th end of a line

For example:

    foldLines('Content-Type: multipart/alternative; boundary="----zzzz----"')

results in

    Content-Type: multipart/alternative;
         boundary="----zzzz----"

### mimeWordEncode

Encodes a string into mime encoded word format <http://en.wikipedia.org/wiki/MIME#Encoded-Word>  (see also `mimeWordDecode`)

    mimeWordEncode(str [, mimeWordEncoding[, fromCharset]]) -> String

  * **str** - String or Uint8Array to be encoded
  * **mimeWordEncoding** - Encoding for the mime word, either Q or B (default is 'Q')
  * **fromCharset** - If the first parameter is a typed array, use this encoding to decode the value to unicode

For example:

    mimeWordEncode('See on õhin test', 'Q');

Becomes with UTF-8 and Quoted-printable encoding

    =?UTF-8?Q?See_on_=C3=B5hin_test?=

### mimeWordDecode

Decodes a string from mime encoded word format (see also `mimeWordEncode`)

    mimeWordDecode(str) -> String

  * **str** - String to be decoded

For example

    mimeWordDecode('=?UTF-8?Q?See_on_=C3=B5hin_test?=');

will become

    See on õhin test

### continuationEncode

Encodes and splits a header param value according to [RFC2231](https://tools.ietf.org/html/rfc2231#section-3) Parameter Value Continuations.

    continuationEncode(key, str [, fromCharset]) -> Array

  * **key** - Parameter key (eg. `filename`)
  * **str** - String or an Uint8Array value to encode
  * **fromCharset** - If `str` is a typed array, use this charset to decode the value to unicode before encoding

The method returns an array of encoded parts with the following structure: `[{key:'...', value: '...'}]`

#### Example

```
continuationEncode('filename', 'filename õäöü.txt', 20);
->
[ { key: 'filename*0*', value: 'utf-8\'\'filename%20' },
  { key: 'filename*1*', value: '%C3%B5%C3%A4%C3%B6' },
  { key: 'filename*2*', value: '%C3%BC.txt' } ]
```

This can be combined into a properly formatted header:

```
Content-disposition: attachment; filename*0*="utf-8''filename%20"
  filename*1*="%C3%B5%C3%A4%C3%B6"; filename*2*="%C3%BC.txt"
```

### quotedPrintableEncode

Encodes a string into Quoted-printable format (see also `quotedPrintableDecode`). Maximum line
length for the generated string is 76 + 2 bytes.

    quotedPrintableEncode(str [, fromCharset]) -> String

  * **str** - String or an Uint8Array to mime encode
  * **fromCharset** - If the first parameter is a typed array, use this charset to decode the value to unicode before encoding

### quotedPrintableDecode

Decodes a string from Quoted-printable format  (see also `quotedPrintableEncode`).

    quotedPrintableDecode(str [, fromCharset]) -> String

  * **str** - Mime encoded string
  * **fromCharset** - Use this charset to decode mime encoded string to unicode

### base64Encode

Encodes a string into Base64 format (see also `base64Decode`). Maximum line
length for the generated string is 76 + 2 bytes.

    base64Encode(str [, fromCharset]) -> String

  * **str** - String or an Uint8Array to base64 encode
  * **fromCharset** - If the first parameter is a typed array, use this charset to decode the value to unicode before encoding

### base64Decode

Decodes a string from Base64 format (see also `base64Encode`) to an unencoded unicode string.

    base64Decode(str [, fromCharset]) -> String

  * **str** Base64 encoded string
  * **fromCharset** Use this charset to decode base64 encoded string to unicode

### mimeWordEncode

Encodes a string to a mime word.

    mimeWordEncode(str[, mimeWordEncoding[, fromCharset]]) -> String

  * **str** - String or Uint8Array to be encoded
  * **mimeWordEncoding** - Encoding for the mime word, either Q or B (default is 'Q')
  * **fromCharset** - If the first parameter is a typed array, use this charset to decode the value to unicode before encoding

### mimeWordsEncode

Encodes non ascii sequences in a string to mime words.

    mimeWordsEncode(str[, mimeWordEncoding[, fromCharset]]) -> String

  * **str** - String or Uint8Array to be encoded
  * **mimeWordEncoding** - Encoding for the mime word, either Q or B (default is 'Q')
  * **fromCharset** - If the first parameter is a typed array, use this charset to decode the value to unicode before encoding

### mimeWordDecode

Decodes a complete mime word encoded string

    mimeWordDecode(str) -> String

  * **str** - String to be decoded. Mime words have charset information included so need to specify it here

### mimeWordsDecode

Decodes a string that might include one or several mime words. If no mime words are found from the string, the original string is returned

    mimeWordsDecode(str) -> String

  * **str** - String to be decoded

### headerLineEncode

Encodes and folds a header line for a MIME message header. Shorthand for `mimeWordsEncode` + `foldLines`.

    headerLineEncode(key, value[, fromCharset])

  * **key** - Key name, will not be encoded
  * **value** - Value to be encoded
  * **fromCharset** - If the `value` parameter is a typed array, use this charset to decode the value to unicode before encoding

### headerLinesDecode

Parses a block of header lines. Does not decode mime words as every header
might have its own rules (eg. formatted email addresses and such).

Return value is an object of headers, where header keys are object keys. NB! Several values with the same key make up an array of values for the same key.

    headerLinesDecode(headers) -> Object

  * **headers** - Headers string

### parseHeaderValue

Parses a header value with `key=value` arguments into a structured object. Useful when dealing with
`content-type` and such.

    parseHeaderValue(valueString) -> Object

  * **valueString** - a header value without the key

Example

```javascript
parseHeaderValue('content-type: text/plain; CHARSET="UTF-8"');
```

Outputs

```json
{
    "value": "text/plain",
    "params": {
        "charset": "UTF-8"
    }
}
```

## License

```
The MIT License

Copyright (c) 2013 Andris Reinman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.```
