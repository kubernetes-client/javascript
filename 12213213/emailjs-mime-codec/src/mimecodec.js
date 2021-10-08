import { encode as encodeBase64, decode as decodeBase64, OUTPUT_TYPED_ARRAY } from 'emailjs-base64'
import { encode, decode, convert, arr2str } from './charset'
import { pipe } from 'ramda'

// Lines can't be longer than 76 + <CR><LF> = 78 bytes
// http://tools.ietf.org/html/rfc2045#section-6.7
const MAX_LINE_LENGTH = 76
const MAX_MIME_WORD_LENGTH = 52
const MAX_B64_MIME_WORD_BYTE_LENGTH = 39

/**
 * Encodes all non printable and non ascii bytes to =XX form, where XX is the
 * byte value in hex. This function does not convert linebreaks etc. it
 * only escapes character sequences
 *
 * @param {String|Uint8Array} data Either a string or an Uint8Array
 * @param {String} [fromCharset='UTF-8'] Source encoding
 * @return {String} Mime encoded string
 */
export function mimeEncode (data = '', fromCharset = 'UTF-8') {
  const buffer = convert(data, fromCharset)
  return buffer.reduce((aggregate, ord, index) =>
    _checkRanges(ord) && !((ord === 0x20 || ord === 0x09) && (index === buffer.length - 1 || buffer[index + 1] === 0x0a || buffer[index + 1] === 0x0d))
      ? aggregate + String.fromCharCode(ord) // if the char is in allowed range, then keep as is, unless it is a ws in the end of a line
      : aggregate + '=' + (ord < 0x10 ? '0' : '') + ord.toString(16).toUpperCase(), '')

  function _checkRanges (nr) {
    const ranges = [ // https://tools.ietf.org/html/rfc2045#section-6.7
      [0x09], // <TAB>
      [0x0A], // <LF>
      [0x0D], // <CR>
      [0x20, 0x3C], // <SP>!"#$%&'()*+,-./0123456789:;
      [0x3E, 0x7E] // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
    ]
    return ranges.reduce((val, range) => val || (range.length === 1 && nr === range[0]) || (range.length === 2 && nr >= range[0] && nr <= range[1]), false)
  }
}

/**
 * Decodes mime encoded string to an unicode string
 *
 * @param {String} str Mime encoded string
 * @param {String} [fromCharset='UTF-8'] Source encoding
 * @return {String} Decoded unicode string
 */
export function mimeDecode (str = '', fromCharset = 'UTF-8') {
  const encodedBytesCount = (str.match(/=[\da-fA-F]{2}/g) || []).length
  let buffer = new Uint8Array(str.length - encodedBytesCount * 2)

  for (var i = 0, len = str.length, bufferPos = 0; i < len; i++) {
    let hex = str.substr(i + 1, 2)
    const chr = str.charAt(i)
    if (chr === '=' && hex && /[\da-fA-F]{2}/.test(hex)) {
      buffer[bufferPos++] = parseInt(hex, 16)
      i += 2
    } else {
      buffer[bufferPos++] = chr.charCodeAt(0)
    }
  }

  return decode(buffer, fromCharset)
}

/**
 * Encodes a string or an typed array of given charset into unicode
 * base64 string. Also adds line breaks
 *
 * @param {String|Uint8Array} data String or typed array to be base64 encoded
 * @param {String} Initial charset, e.g. 'binary'. Defaults to 'UTF-8'
 * @return {String} Base64 encoded string
 */
export function base64Encode (data, fromCharset = 'UTF-8') {
  const buf = (typeof data !== 'string' && fromCharset === 'binary') ? data : convert(data, fromCharset)
  const b64 = encodeBase64(buf)
  return _addBase64SoftLinebreaks(b64)
}

/**
 * Decodes a base64 string of any charset into an unicode string
 *
 * @param {String} str Base64 encoded string
 * @param {String} [fromCharset='UTF-8'] Original charset of the base64 encoded string
 * @return {String} Decoded unicode string
 */
export function base64Decode (str, fromCharset) {
  const buf = decodeBase64(str, OUTPUT_TYPED_ARRAY)
  return fromCharset === 'binary' ? arr2str(buf) : decode(buf, fromCharset)
}

/**
 * Encodes a string or an Uint8Array into a quoted printable encoding
 * This is almost the same as mimeEncode, except line breaks will be changed
 * as well to ensure that the lines are never longer than allowed length
 *
 * @param {String|Uint8Array} data String or an Uint8Array to mime encode
 * @param {String} [fromCharset='UTF-8'] Original charset of the string
 * @return {String} Mime encoded string
 */
export function quotedPrintableEncode (data = '', fromCharset = 'UTF-8') {
  const mimeEncodedStr = mimeEncode(data, fromCharset)
    .replace(/\r?\n|\r/g, '\r\n') // fix line breaks, ensure <CR><LF>
    .replace(/[\t ]+$/gm, spaces => spaces.replace(/ /g, '=20').replace(/\t/g, '=09')) // replace spaces in the end of lines

  return _addQPSoftLinebreaks(mimeEncodedStr) // add soft line breaks to ensure line lengths sjorter than 76 bytes
}

/**
 * Decodes a string from a quoted printable encoding. This is almost the
 * same as mimeDecode, except line breaks will be changed as well
 *
 * @param {String} str Mime encoded string to decode
 * @param {String} [fromCharset='UTF-8'] Original charset of the string
 * @return {String} Mime decoded string
 */
export function quotedPrintableDecode (str = '', fromCharset = 'UTF-8') {
  const rawString = str
    .replace(/[\t ]+$/gm, '') // remove invalid whitespace from the end of lines
    .replace(/=(?:\r?\n|$)/g, '') // remove soft line breaks

  return mimeDecode(rawString, fromCharset)
}

/**
 * Encodes a string or an Uint8Array to an UTF-8 MIME Word
 *   https://tools.ietf.org/html/rfc2047
 *
 * @param {String|Uint8Array} data String to be encoded
 * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
 * @param {String} [fromCharset='UTF-8'] Source sharacter set
 * @return {String} Single or several mime words joined together
 */
export function mimeWordEncode (data, mimeWordEncoding = 'Q', fromCharset = 'UTF-8') {
  let parts = []
  const str = (typeof data === 'string') ? data : decode(data, fromCharset)

  if (mimeWordEncoding === 'Q') {
    const str = (typeof data === 'string') ? data : decode(data, fromCharset)
    let encodedStr = pipe(mimeEncode, qEncodeForbiddenHeaderChars)(str)
    parts = encodedStr.length < MAX_MIME_WORD_LENGTH ? [encodedStr] : _splitMimeEncodedString(encodedStr, MAX_MIME_WORD_LENGTH)
  } else {
    // Fits as much as possible into every line without breaking utf-8 multibyte characters' octets up across lines
    let j = 0
    let i = 0
    while (i < str.length) {
      if (encode(str.substring(j, i)).length > MAX_B64_MIME_WORD_BYTE_LENGTH) {
        // we went one character too far, substring at the char before
        parts.push(str.substring(j, i - 1))
        j = i - 1
      } else {
        i++
      }
    }
    // add the remainder of the string
    str.substring(j) && parts.push(str.substring(j))
    parts = parts.map(encode).map(encodeBase64)
  }

  const prefix = '=?UTF-8?' + mimeWordEncoding + '?'
  const suffix = '?= '
  return parts.map(p => prefix + p + suffix).join('').trim()
}

/**
 * Q-Encodes remaining forbidden header chars
 *   https://tools.ietf.org/html/rfc2047#section-5
 */
const qEncodeForbiddenHeaderChars = function (str) {
  const qEncode = chr => chr === ' ' ? '_' : ('=' + (chr.charCodeAt(0) < 0x10 ? '0' : '') + chr.charCodeAt(0).toString(16).toUpperCase())
  return str.replace(/[^a-z0-9!*+\-/=]/ig, qEncode)
}

/**
 * Finds word sequences with non ascii text and converts these to mime words
 *
 * @param {String|Uint8Array} data String to be encoded
 * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
 * @param {String} [fromCharset='UTF-8'] Source sharacter set
 * @return {String} String with possible mime words
 */
export function mimeWordsEncode (data = '', mimeWordEncoding = 'Q', fromCharset = 'UTF-8') {
  const regex = /([^\s\u0080-\uFFFF]*[\u0080-\uFFFF]+[^\s\u0080-\uFFFF]*(?:\s+[^\s\u0080-\uFFFF]*[\u0080-\uFFFF]+[^\s\u0080-\uFFFF]*\s*)?)+(?=\s|$)/g
  return decode(convert(data, fromCharset)).replace(regex, match => match.length ? mimeWordEncode(match, mimeWordEncoding, fromCharset) : '')
}

/**
 * Decode a complete mime word encoded string
 *
 * @param {String} str Mime word encoded string
 * @return {String} Decoded unicode string
 */
export function mimeWordDecode (str = '') {
  const match = str.match(/^=\?([\w_\-*]+)\?([QqBb])\?([^?]*)\?=$/i)
  if (!match) return str

  // RFC2231 added language tag to the encoding
  // see: https://tools.ietf.org/html/rfc2231#section-5
  // this implementation silently ignores this tag
  const fromCharset = match[1].split('*').shift()
  const encoding = (match[2] || 'Q').toString().toUpperCase()
  const rawString = (match[3] || '').replace(/_/g, ' ')

  if (encoding === 'B') {
    return base64Decode(rawString, fromCharset)
  } else if (encoding === 'Q') {
    return mimeDecode(rawString, fromCharset)
  } else {
    return str
  }
}

/**
 * Decode a string that might include one or several mime words
 *
 * @param {String} str String including some mime words that will be encoded
 * @return {String} Decoded unicode string
 */
export function mimeWordsDecode (str = '') {
  str = str.toString().replace(/(=\?[^?]+\?[QqBb]\?[^?]+\?=)\s+(?==\?[^?]+\?[QqBb]\?[^?]*\?=)/g, '$1')
  // join bytes of multi-byte UTF-8
  let prevEncoding
  str = str.replace(/(\?=)?=\?[uU][tT][fF]-8\?([QqBb])\?/g, (match, endOfPrevWord, encoding) => {
    const result = (endOfPrevWord && encoding === prevEncoding) ? '' : match
    prevEncoding = encoding
    return result
  })
  str = str.replace(/=\?[\w_\-*]+\?[QqBb]\?[^?]*\?=/g, mimeWord => mimeWordDecode(mimeWord.replace(/\s+/g, '')))

  return str
}

/**
 * Folds long lines, useful for folding header lines (afterSpace=false) and
 * flowed text (afterSpace=true)
 *
 * @param {String} str String to be folded
 * @param {Boolean} afterSpace If true, leave a space in th end of a line
 * @return {String} String with folded lines
 */
export function foldLines (str = '', afterSpace) {
  let pos = 0
  const len = str.length
  let result = ''
  let line, match

  while (pos < len) {
    line = str.substr(pos, MAX_LINE_LENGTH)
    if (line.length < MAX_LINE_LENGTH) {
      result += line
      break
    }
    if ((match = line.match(/^[^\n\r]*(\r?\n|\r)/))) {
      line = match[0]
      result += line
      pos += line.length
      continue
    } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || '').length : 0) < line.length) {
      line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || '').length : 0)))
    } else if ((match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/))) {
      line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || '').length : 0))
    }

    result += line
    pos += line.length
    if (pos < len) {
      result += '\r\n'
    }
  }

  return result
}

/**
 * Encodes and folds a header line for a MIME message header.
 * Shorthand for mimeWordsEncode + foldLines
 *
 * @param {String} key Key name, will not be encoded
 * @param {String|Uint8Array} value Value to be encoded
 * @param {String} [fromCharset='UTF-8'] Character set of the value
 * @return {String} encoded and folded header line
 */
export function headerLineEncode (key, value, fromCharset) {
  var encodedValue = mimeWordsEncode(value, 'Q', fromCharset)
  return foldLines(key + ': ' + encodedValue)
}

/**
 * The result is not mime word decoded, you need to do your own decoding based
 * on the rules for the specific header key
 *
 * @param {String} headerLine Single header line, might include linebreaks as well if folded
 * @return {Object} And object of {key, value}
 */
export function headerLineDecode (headerLine = '') {
  const line = headerLine.toString().replace(/(?:\r?\n|\r)[ \t]*/g, ' ').trim()
  const match = line.match(/^\s*([^:]+):(.*)$/)

  return {
    key: ((match && match[1]) || '').trim(),
    value: ((match && match[2]) || '').trim()
  }
}

/**
 * Parses a block of header lines. Does not decode mime words as every
 * header might have its own rules (eg. formatted email addresses and such)
 *
 * @param {String} headers Headers string
 * @return {Object} An object of headers, where header keys are object keys. NB! Several values with the same key make up an Array
 */
export function headerLinesDecode (headers) {
  const lines = headers.split(/\r?\n|\r/)
  const headersObj = {}

  for (let i = lines.length - 1; i >= 0; i--) {
    if (i && lines[i].match(/^\s/)) {
      lines[i - 1] += '\r\n' + lines[i]
      lines.splice(i, 1)
    }
  }

  for (let i = 0, len = lines.length; i < len; i++) {
    const header = headerLineDecode(lines[i])
    const key = header.key.toLowerCase()
    const value = header.value

    if (!headersObj[key]) {
      headersObj[key] = value
    } else {
      headersObj[key] = [].concat(headersObj[key], value)
    }
  }

  return headersObj
}

/**
 * Parses a header value with key=value arguments into a structured
 * object.
 *
 *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
 *   {
 *     'value': 'text/plain',
 *     'params': {
 *       'charset': 'UTF-8'
 *     }
 *   }
 *
 * @param {String} str Header value
 * @return {Object} Header value as a parsed structure
 */
export function parseHeaderValue (str) {
  let response = {
    value: false,
    params: {}
  }
  let key = false
  let value = ''
  let type = 'value'
  let quote = false
  let escaped = false
  let chr

  for (let i = 0, len = str.length; i < len; i++) {
    chr = str.charAt(i)
    if (type === 'key') {
      if (chr === '=') {
        key = value.trim().toLowerCase()
        type = 'value'
        value = ''
        continue
      }
      value += chr
    } else {
      if (escaped) {
        value += chr
      } else if (chr === '\\') {
        escaped = true
        continue
      } else if (quote && chr === quote) {
        quote = false
      } else if (!quote && chr === '"') {
        quote = chr
      } else if (!quote && chr === ';') {
        if (key === false) {
          response.value = value.trim()
        } else {
          response.params[key] = value.trim()
        }
        type = 'key'
        value = ''
      } else {
        value += chr
      }
      escaped = false
    }
  }

  if (type === 'value') {
    if (key === false) {
      response.value = value.trim()
    } else {
      response.params[key] = value.trim()
    }
  } else if (value.trim()) {
    response.params[value.trim().toLowerCase()] = ''
  }

  // handle parameter value continuations
  // https://tools.ietf.org/html/rfc2231#section-3

  // preprocess values
  Object.keys(response.params).forEach(function (key) {
    var actualKey, nr, match, value
    if ((match = key.match(/(\*(\d+)|\*(\d+)\*|\*)$/))) {
      actualKey = key.substr(0, match.index)
      nr = Number(match[2] || match[3]) || 0

      if (!response.params[actualKey] || typeof response.params[actualKey] !== 'object') {
        response.params[actualKey] = {
          charset: false,
          values: []
        }
      }

      value = response.params[key]

      if (nr === 0 && match[0].substr(-1) === '*' && (match = value.match(/^([^']*)'[^']*'(.*)$/))) {
        response.params[actualKey].charset = match[1] || 'iso-8859-1'
        value = match[2]
      }

      response.params[actualKey].values[nr] = value

      // remove the old reference
      delete response.params[key]
    }
  })

  // concatenate split rfc2231 strings and convert encoded strings to mime encoded words
  Object.keys(response.params).forEach(function (key) {
    var value
    if (response.params[key] && Array.isArray(response.params[key].values)) {
      value = response.params[key].values.map(function (val) {
        return val || ''
      }).join('')

      if (response.params[key].charset) {
        // convert "%AB" to "=?charset?Q?=AB?="
        response.params[key] = '=?' + response.params[key].charset + '?Q?' + value
          .replace(/[=?_\s]/g, function (s) {
            // fix invalidly encoded chars
            var c = s.charCodeAt(0).toString(16)
            return s === ' ' ? '_' : '%' + (c.length < 2 ? '0' : '') + c
          })
          .replace(/%/g, '=') + '?=' // change from urlencoding to percent encoding
      } else {
        response.params[key] = value
      }
    }
  })

  return response
}

/**
 * Encodes a string or an Uint8Array to an UTF-8 Parameter Value Continuation encoding (rfc2231)
 * Useful for splitting long parameter values.
 *
 * For example
 *      title="unicode string"
 * becomes
 *     title*0*="utf-8''unicode"
 *     title*1*="%20string"
 *
 * @param {String|Uint8Array} data String to be encoded
 * @param {Number} [maxLength=50] Max length for generated chunks
 * @param {String} [fromCharset='UTF-8'] Source sharacter set
 * @return {Array} A list of encoded keys and headers
 */
export function continuationEncode (key, data, maxLength, fromCharset) {
  const list = []
  var encodedStr = typeof data === 'string' ? data : decode(data, fromCharset)
  var line

  maxLength = maxLength || 50

  // process ascii only text
  if (/^[\w.\- ]*$/.test(data)) {
    // check if conversion is even needed
    if (encodedStr.length <= maxLength) {
      return [{
        key: key,
        value: /[\s";=]/.test(encodedStr) ? '"' + encodedStr + '"' : encodedStr
      }]
    }

    encodedStr = encodedStr.replace(new RegExp('.{' + maxLength + '}', 'g'), function (str) {
      list.push({
        line: str
      })
      return ''
    })

    if (encodedStr) {
      list.push({
        line: encodedStr
      })
    }
  } else {
    // process text with unicode or special chars
    const uriEncoded = encodeURIComponent('utf-8\'\'' + encodedStr)
    let i = 0
    while (true) {
      let len = maxLength
      // must not split hex encoded byte between lines
      if (uriEncoded[i + maxLength - 1] === '%') {
        len -= 1
      } else if (uriEncoded[i + maxLength - 2] === '%') {
        len -= 2
      }
      line = uriEncoded.substr(i, len)
      if (!line) {
        break
      }
      list.push({
        line: line,
        encoded: true
      })
      i += line.length
    }
  }

  return list.map(function (item, i) {
    return {
      // encoded lines: {name}*{part}*
      // unencoded lines: {name}*{part}
      // if any line needs to be encoded then the first line (part==0) is always encoded
      key: key + '*' + i + (item.encoded ? '*' : ''),
      value: /[\s";=]/.test(item.line) ? '"' + item.line + '"' : item.line
    }
  })
}

/**
 * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
 *
 * @param {String} str Mime encoded string to be split up
 * @param {Number} maxlen Maximum length of characters for one part (minimum 12)
 * @return {Array} Split string
 */
function _splitMimeEncodedString (str, maxlen = 12) {
  const minWordLength = 12 // require at least 12 symbols to fit possible 4 octet UTF-8 sequences
  const maxWordLength = Math.max(maxlen, minWordLength)
  const lines = []

  while (str.length) {
    let curLine = str.substr(0, maxWordLength)

    const match = curLine.match(/=[0-9A-F]?$/i) // skip incomplete escaped char
    if (match) {
      curLine = curLine.substr(0, match.index)
    }

    let done = false
    while (!done) {
      let chr
      done = true
      const match = str.substr(curLine.length).match(/^=([0-9A-F]{2})/i) // check if not middle of a unicode char sequence
      if (match) {
        chr = parseInt(match[1], 16)
        // invalid sequence, move one char back anc recheck
        if (chr < 0xC2 && chr > 0x7F) {
          curLine = curLine.substr(0, curLine.length - 3)
          done = false
        }
      }
    }

    if (curLine.length) {
      lines.push(curLine)
    }
    str = str.substr(curLine.length)
  }

  return lines
}

function _addBase64SoftLinebreaks (base64EncodedStr = '') {
  return base64EncodedStr.trim().replace(new RegExp('.{' + MAX_LINE_LENGTH + '}', 'g'), '$&\r\n').trim()
}

/**
 * Adds soft line breaks(the ones that will be stripped out when decoding QP)
 *
 * @param {String} qpEncodedStr String in Quoted-Printable encoding
 * @return {String} String with forced line breaks
 */
function _addQPSoftLinebreaks (qpEncodedStr = '') {
  let pos = 0
  const len = qpEncodedStr.length
  const lineMargin = Math.floor(MAX_LINE_LENGTH / 3)
  let result = ''
  let match, line

  // insert soft linebreaks where needed
  while (pos < len) {
    line = qpEncodedStr.substr(pos, MAX_LINE_LENGTH)
    if ((match = line.match(/\r\n/))) {
      line = line.substr(0, match.index + match[0].length)
      result += line
      pos += line.length
      continue
    }

    if (line.substr(-1) === '\n') {
      // nothing to change here
      result += line
      pos += line.length
      continue
    } else if ((match = line.substr(-lineMargin).match(/\n.*?$/))) {
      // truncate to nearest line break
      line = line.substr(0, line.length - (match[0].length - 1))
      result += line
      pos += line.length
      continue
    } else if (line.length > MAX_LINE_LENGTH - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
      // truncate to nearest space
      line = line.substr(0, line.length - (match[0].length - 1))
    } else if (line.substr(-1) === '\r') {
      line = line.substr(0, line.length - 1)
    } else {
      if (line.match(/=[\da-f]{0,2}$/i)) {
        // push incomplete encoding sequences to the next line
        if ((match = line.match(/=[\da-f]{0,1}$/i))) {
          line = line.substr(0, line.length - match[0].length)
        }

        // ensure that utf-8 sequences are not split
        while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/=[\da-f]{2}$/ig))) {
          const code = parseInt(match[0].substr(1, 2), 16)
          if (code < 128) {
            break
          }

          line = line.substr(0, line.length - 3)

          if (code >= 0xC0) {
            break
          }
        }
      }
    }

    if (pos + line.length < len && line.substr(-1) !== '\n') {
      if (line.length === MAX_LINE_LENGTH && line.match(/=[\da-f]{2}$/i)) {
        line = line.substr(0, line.length - 3)
      } else if (line.length === MAX_LINE_LENGTH) {
        line = line.substr(0, line.length - 1)
      }
      pos += line.length
      line += '=\r\n'
    } else {
      pos += line.length
    }

    result += line
  }

  return result
}

export { decode, encode, convert }
