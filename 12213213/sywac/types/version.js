'use strict'

const TypeImplicitCommand = require('./implicit')

class TypeVersion extends TypeImplicitCommand {
  static get (opts) {
    return new TypeVersion(opts)
  }

  constructor (opts) {
    super(Object.assign({ desc: 'Show version number' }, opts))
  }

  configure (opts, override) {
    opts = opts || {}
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || !this._versionOpts) this._versionOpts = this._assignVersionOpts(this._versionOpts || {}, opts)

    return this
  }

  _assignVersionOpts (target, source) {
    ['version'].forEach(opt => {
      if (opt in source) target[opt] = source[opt]
    })
    return target
  }

  get versionOpts () {
    return this._versionOpts || {}
  }

  validateConfig (utils) {
    if (!this._flags && !this._aliases.length) this._aliases.push('version')
    super.validateConfig(utils)
  }

  validateParsed (context) {
    if (this.getValue(context)) this.requestVersion(context) // must call this before postParse in case of commands
    return this.resolve()
  }

  implicitCommandFound (context, source, position, raw) {
    super.implicitCommandFound(context, source, position, raw)
    this.requestVersion(context) // must call this before postParse in case of commands
  }

  requestVersion (context) {
    context.deferVersion(this.versionOpts)
  }
}

module.exports = TypeVersion
