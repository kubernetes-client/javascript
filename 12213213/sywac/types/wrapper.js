'use strict'

const Type = require('./type')

class TypeWrapper extends Type {
  configure (opts, override) {
    opts = opts || {}
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || !this._elementType) this._elementType = opts.elementType || opts.of || this._elementType

    return this
  }

  of (subtype) {
    this._elementType = subtype
    return this
  }

  get elementType () {
    if (!this._elementType) this._elementType = require('./string').get()
    return this._elementType
  }

  get datatype () {
    return this.elementType.datatype
  }

  get shouldValidateDefaultValue () {
    return this.elementType.shouldValidateDefaultValue
  }
}

module.exports = TypeWrapper
