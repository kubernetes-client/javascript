'use strict'

const TypeString = require('./string')

class TypePath extends TypeString {
  static get (opts) {
    return new TypePath(opts)
  }

  constructor (opts) {
    super(Object.assign({
      dirAllowed: true,
      fileAllowed: true,
      normalize: false,
      asObject: false,
      asPosix: false,
      asWin32: false
    }, opts))
  }

  configure (opts, override) {
    opts = opts || {}
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    // dependencies
    if (override || !this._pathLib) this._pathLib = opts.pathLib || this._pathLib
    if (override || !this._fsLib) this._fsLib = opts.fsLib || this._fsLib

    // booleans with a default value
    if (override || typeof this._dirAllowed === 'undefined') this._dirAllowed = 'dirAllowed' in opts ? opts.dirAllowed : this._dirAllowed
    if (override || typeof this._fileAllowed === 'undefined') this._fileAllowed = 'fileAllowed' in opts ? opts.fileAllowed : this._fileAllowed
    if (override || typeof this._normalize === 'undefined') this._normalize = 'normalize' in opts ? opts.normalize : this._normalize
    if (override || typeof this._asObject === 'undefined') this._asObject = 'asObject' in opts ? opts.asObject : this._asObject
    if (override || typeof this._asPosix === 'undefined') this._asPosix = 'asPosix' in opts ? opts.asPosix : this._asPosix
    if (override || typeof this._asWin32 === 'undefined') this._asWin32 = 'asWin32' in opts ? opts.asWin32 : this._asWin32
    // nullable boolean, no default value
    if (override || typeof this._mustExist === 'undefined') this._mustExist = 'mustExist' in opts ? opts.mustExist : this._mustExist

    return this
  }

  get datatype () {
    if (!this._dirAllowed) return 'file'
    if (!this._fileAllowed) return 'dir'
    return 'path'
  }

  get fulltype () {
    const t = this.datatype
    return t === 'dir' ? 'directory' : t
  }

  buildHelpHints (hints) {
    super.buildHelpHints(hints)
    if (typeof this._mustExist === 'boolean') hints.push(this._mustExist ? 'must exist' : 'must not exist')
  }

  get pathLib () {
    if (!this._pathLib) this._pathLib = require('path')
    if (this._asPosix) return this._pathLib.posix
    if (this._asWin32) return this._pathLib.win32
    return this._pathLib
  }

  get fsLib () {
    if (!this._fsLib) this._fsLib = require('fs')
    return this._fsLib
  }

  // this is used to kick off validateValue in parent or wrapper type
  get isStrict () {
    return typeof this._mustExist === 'boolean'
  }

  get shouldValidateDefaultValue () {
    return true
  }

  // always resolve to true since we add our own validation messages
  validateValue (value, context) {
    if (!value) return true
    return new Promise(resolve => {
      this.fsLib.stat(value, (err, stats) => {
        if (err) this.handleStatErr(err, context, value)
        else this.handleStats(stats, context, value)
        resolve(true)
      })
    })
  }

  handleStatErr (err, context, value) {
    const msgMap = {
      EACCES_true: 'Cannot access %s: %s',
      EACCES_false: 'The %s already exists and is inaccessible: %s',
      ENOENT_true: 'The %s does not exist: %s'
    }
    const msg = msgMap[err.code + '_' + this._mustExist]
    if (msg) this.failValidation(context, msg, this.fulltype, value)
  }

  handleStats (stats, context, value) {
    let msg
    const actualType = stats.isFile() ? 'file' : 'directory'
    const wantedType = this.fulltype
    if (!this._mustExist) {
      if (wantedType === 'path' || actualType === wantedType) msg = 'The %s already exists: %s'
      else msg = 'The path exists and is a %s: %s'
    } else if (wantedType !== 'path' && actualType !== wantedType) {
      msg = 'The path is a %s: %s'
    }
    if (msg) this.failValidation(context, msg, actualType, value)
  }

  getValue (context) {
    let value = super.getValue(context)
    if (value && this._normalize) value = this.pathLib.normalize(value)
    if (value && this._asObject) value = this.pathLib.parse(value)
    return value
  }
}

module.exports = TypePath
