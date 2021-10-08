'use strict'

const Type = require('./type')

class TypeBoolean extends Type {
  static get (opts) {
    return new TypeBoolean(opts)
  }

  constructor (opts) {
    super(Object.assign({ defaultValue: false }, opts))
  }

  get datatype () {
    return 'boolean'
  }

  isApplicable (context, currentValue, previousValue, slurpedArg) {
    return typeof currentValue === 'boolean' || currentValue === 'true' || currentValue === 'false'
  }

  setValue (context, value) {
    context.assignValue(this.id, typeof value === 'boolean' ? value : value === 'true')
  }
}

module.exports = TypeBoolean
