'use strict'

const Type = require('./type')

class TypeNumber extends Type {
  static isNumber (value) {
    return typeof value === 'number' || /^0x[0-9a-f]+$/i.test(value) || /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(value)
  }

  static get (opts) {
    return new TypeNumber(opts)
  }

  get datatype () {
    return 'number'
  }

  getValue (context) {
    const v = context.lookupValue(this.id)
    if (typeof v === 'undefined' || v === null) return v
    return TypeNumber.isNumber(v) ? Number(v) : NaN
  }

  setValue (context, value) {
    context.assignValue(this.id, typeof value === 'boolean' ? NaN : value)
  }

  // this is only checked if isStrict
  validateValue (value) {
    return TypeNumber.isNumber(value) && !isNaN(value)
  }

  buildInvalidMessage (context, msgAndArgs) {
    super.buildInvalidMessage(context, msgAndArgs)
    msgAndArgs.msg += ' Please specify a number.'
  }
}

module.exports = TypeNumber
