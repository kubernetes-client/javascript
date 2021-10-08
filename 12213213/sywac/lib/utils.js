// copyright license from https://github.com/chalk/ansi-regex/blob/master/license
// for the use of default ansiRegex below
/*
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// copyright license mentioned at https://github.com/stefanpenner/get-caller-file/blob/f6c31f706f3ec17b2d1b398f51d5bc21901477b7/package.json#L21
// for the use of getCallerFile logic below
/*
ISC License

Copyright (c) 2015, Stefan Penner

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
*/

'use strict'

// ansi-regex@3.0.0
const ansiRegexPattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
].join('|')

class Utils {
  static get (opts) {
    return new Utils(opts)
  }

  constructor (opts) {
    opts = opts || {}
    this._ansiRegex = opts.ansiRegex
    // TODO literal strings and regexes below should be configurable
  }

  get ansiRegex () {
    if (!this._ansiRegex) this._ansiRegex = new RegExp(ansiRegexPattern, 'g')
    return this._ansiRegex
  }

  // remove ANSI escape codes (e.g. terminal colors) from a string
  stripAnsi (str) {
    return String(str).replace(this.ansiRegex, '')
  }

  // remove ANSI and any preceding - or --
  normalizeAlias (alias) {
    // return this.stripAnsi(alias).replace(/^-+/, '')
    return this.flagsToAliases(alias)[0] || ''
  }

  // make sure aliases don't look like flags
  normalizeAliases (aliases) {
    return aliases.map(alias => this.normalizeAlias(alias))
  }

  // build flags string from aliases array
  aliasesToFlags (aliases) {
    // add - or --, if needed, preserving ansi
    // then join into string to set flags
    let noAnsi, normalized
    return aliases.map(alias => {
      noAnsi = this.stripAnsi(alias)
      normalized = this.normalizeAlias(alias)
      if (noAnsi !== normalized) return alias
      return (normalized.length === 1 ? '-' : '--') + alias
    }).join(', ')
  }

  // build normalized aliases array from a flags string
  flagsToAliases (flags) {
    // remove ANSI, split on any delimiters
    // then remove any preceding - or --
    const words = this.stripAnsi(flags).split(/[ ,|]+/)
    // first pass: expect dashes
    let aliases = words.map(word => word && word.startsWith('-') && word.replace(/^-+/, '')).filter(Boolean)
    if (!aliases.length) {
      // second pass: take anything but explicit placeholders
      aliases = words.map(word => word.replace(/^-+/, '')).filter(alias => {
        // return alias && !alias.startsWith('<') && !alias.startsWith('[')
        return alias && '<['.indexOf(alias[0]) === -1
      })
    }
    // if (!aliases.length) {
    //   third pass: take anything to satisfy positionals
    // }
    // console.log(`turned flags "${flags}" into aliases:`, aliases)
    return aliases
  }

  // turn a formatted dsl string into an object of type properties
  // e.g. [-c|--charlie] <charlie:string..="some val">
  /*
  {
    flags: "-c|--charlie",
    aliases: ["c", "charlie"],
    acceptFlags: true,
    required: true,
    type: "array:string",
    variadic: true,
    defaultValue: ["some val"]
  }
  */
  inferPositionalProperties (str, validTypes) {
    // both: required, defaultValue, aliases
    // parent: acceptFlags, variadic
    // child: flags, type
    // start new value when (opener and isMatchingCloser) || (!opener and isOpener)
    const values = []
    let opener
    let value = ''
    const req = '<'
    const pairs = { '[': ']' }
    pairs[req] = '>'
    for (const c of str) {
      if ((opener && pairs[opener] === c) || (!opener && pairs[c])) {
        value = value && value.trim()
        if (value) values.push({ value, required: opener === req })
        value = ''

        opener = opener ? '' : c

        continue
      }
      value += c
    }
    value = value && value.trim()
    if (value) values.push({ value, required: true }) // required is true by default

    const props = {}
    let firstColon
    let firstEqual
    let alias
    values.forEach(o => {
      value = o.value
      if (value[0] === '-') {
        props.flags = value
        props.aliases = this.flagsToAliases(props.flags)
        props.acceptFlags = true
        props.type = 'string' // should be overridden on next value below
        return
      }
      props.required = o.required

      props.variadic = value.indexOf('..') !== -1
      value = value.replace(/(\.)\1{1,}/g, '') // remove any two or more consecutive dots

      firstEqual = value.indexOf('=')
      if (firstEqual !== -1) {
        props.defaultValue = value.slice(firstEqual + 1)
        if (props.variadic) props.defaultValue = [].concat(props.defaultValue.split(',')).filter(Boolean).map(s => s.trim())
        value = value.slice(0, firstEqual)
      }

      firstColon = value.indexOf(':')
      if (firstColon !== -1) {
        alias = value.slice(0, firstColon)
        // examples with colon: host:string, array:string, hosts:array:string, file|dir:path
        this.flagsToAliases(alias).forEach(a => {
          if (!props.acceptFlags || (validTypes && validTypes.indexOf(a) === -1)) {
            props.aliases = (props.aliases || []).concat(a) // alias
          }
        })
        if (!value.startsWith('array:')) value = value.slice(firstColon + 1)
        if (props.variadic && !value.startsWith('array')) value = 'array:' + value
        props.type = value
      } else {
        // no colons, value could be one or more aliases or types
        // multiple aliases would look like e.g. "<user | org>" or "file|dir"
        let type
        this.flagsToAliases(value).forEach(v => {
          // check if v represents an alias, a type, or both
          // first type match wins
          if (type || (validTypes && validTypes.indexOf(v) === -1)) {
            props.aliases = (props.aliases || []).concat(v) // alias
          } else {
            // add type as alias, but not for cases like "[--flag] <string>"
            if (!props.acceptFlags) props.aliases = (props.aliases || []).concat(v)
            type = v
            if (props.variadic && !type.startsWith('array')) type = 'array:' + type
          }
        })
        if (!type) type = props.variadic ? 'array:string' : 'string'
        props.type = type
      }
    })

    if (!props.variadic && props.type && props.type.startsWith('array')) props.variadic = true

    // filter duplicates from aliases
    props.aliases = Array.from(new Set(props.aliases))

    // if no flags, set from aliases
    if (!props.flags) props.flags = this.aliasesToFlags(props.aliases)

    return props
  }

  // split a string into an array of positional flags (also strings)
  stringToMultiPositional (str) {
    const positionalFlags = []
    let flags = ''
    this.stringToArgs(this.stripAnsi(str)).forEach(candidate => {
      if (candidate.replace(/\s|\[|</g, '').startsWith('-')) {
        if (flags) {
          positionalFlags.push(flags)
          flags = ''
        }
        flags += candidate
      } else {
        if (flags) flags += ' '
        flags += candidate
        positionalFlags.push(flags)
        flags = ''
      }
    })
    return positionalFlags
  }

  // split a string into an args array
  stringToArgs (str) {
    const args = []
    let prev
    let openQuote
    let arg = ''
    let cIsSpace
    for (const c of str) {
      // console.log('sywac > c:', c)
      cIsSpace = this.isSpace(c)
      if (prev !== '\\' && c === openQuote) {
        // close quote, DO NOT include c in arg
        // args.push(arg)
        // arg = ''
        openQuote = undefined
      } else if (prev === '\\' && c === openQuote) {
        // escaped quote, remove previous backslash and add c
        arg = arg.slice(0, -1) + c
      } else if (!openQuote && '\'"'.indexOf(c) > -1) {
        // open quote, DO NOT include c in arg
        openQuote = c
      } else if (openQuote || !cIsSpace) {
        // either within quote or within group/word, include c in arg
        arg += c
      } else if (cIsSpace) {
        // end of group/word
        if (arg) args.push(arg)
        arg = ''
      }
      prev = c
    }
    if (arg) args.push(arg)
    return args
  }

  // determine if a character represents whitespace
  isSpace (c) {
    // return /\s/.test(c)
    return ' \t\n\r\v'.indexOf(c) !== -1
  }

  sameArrays (one, two) {
    const oneLength = one.length
    if (oneLength !== two.length) return false
    for (let i = 0; i < oneLength; i++) {
      if (one[i] !== two[i]) return false
    }
    return true
  }

  getCallerFile () {
    const oldPrepareStackTrace = Error.prepareStackTrace
    Error.prepareStackTrace = (_, stack) => stack
    const stack = new Error().stack
    Error.prepareStackTrace = oldPrepareStackTrace
    return stack[2] ? stack[2].getFileName() : undefined
  }
}

module.exports = Utils
