'use strict'

class Type {
  static get SOURCE_DEFAULT () {
    return 'default'
  }

  static get SOURCE_FLAG () {
    return 'flag'
  }

  static get SOURCE_POSITIONAL () {
    return 'positional'
  }

  constructor (opts) {
    this._aliases = []
    this.configure(opts, true)
  }

  configure (opts, override) {
    opts = opts || {}
    if (typeof override === 'undefined') override = true
    // configurable for parsing
    if (override || !this._aliases.length) this._aliases = opts.aliases ? (this._aliases || []).concat(opts.aliases) : this._aliases
    if (override || typeof this._defaultVal === 'undefined') this._defaultVal = 'defaultValue' in opts ? opts.defaultValue : this._defaultVal
    if (override || typeof this._required === 'undefined') this._required = 'required' in opts ? opts.required : this._required
    if (override || typeof this._strict === 'undefined') this._strict = 'strict' in opts ? opts.strict : this._strict
    if (override || typeof this._coerceHandler !== 'function') this._coerceHandler = opts.coerce || this._coerceHandler
    // configurable for help text
    if (override || !this._flags) this._flags = opts.flags || this._flags
    if (override || !this._desc) this._desc = opts.description || opts.desc || this._desc
    if (override || typeof this._hints === 'undefined') this._hints = 'hints' in opts ? opts.hints : this._hints
    if (override || !this._group) this._group = opts.group || this._group
    if (override || typeof this._hidden === 'undefined') this._hidden = 'hidden' in opts ? opts.hidden : this._hidden
    return this
  }

  // returns a string uniquely identifying this type across all levels
  // used for mapping values and sources in context
  get id () {
    return `${this.parent}|${this.datatype}|${this.aliases.join(',')}`
  }

  withParent (apiName) {
    this._parent = apiName
    return this
  }

  get parent () {
    return this._parent || 'node'
  }

  get datatype () {
    // subtypes should override this!
    return 'value'
  }

  get shouldValidateDefaultValue () {
    return false
  }

  // == before parsing ==
  alias (a) {
    if (a) this._aliases = this._aliases.concat(a)
    return this
  }

  get aliases () {
    return this._aliases
  }

  defaultValue (dv) {
    this._defaultVal = dv
    return this
  }

  get defaultVal () {
    return this._defaultVal
  }

  required (r) {
    this._required = r
    return this
  }

  get isRequired () {
    return !!this._required
  }

  strict (s) {
    this._strict = s
    return this
  }

  get isStrict () {
    return !!this._strict
  }

  coerce (syncFunction) {
    this._coerceHandler = syncFunction
    return this
  }

  get coerceHandler () {
    return typeof this._coerceHandler === 'function' ? this._coerceHandler : v => v
  }

  flags (f) {
    this._flags = f
    return this
  }

  get helpFlags () {
    return this._flags
  }

  description (d) {
    this._desc = d
    return this
  }

  desc (d) {
    return this.description(d)
  }

  get helpDesc () {
    // if this isn't a string, it can mess up buffer.js logic
    return typeof this._desc === 'string' ? this._desc : ''
  }

  hints (h) {
    this._hints = h
    return this
  }

  get helpHints () {
    if (typeof this._hints !== 'undefined') return this._hints
    const hints = []
    this.buildHelpHints(hints)
    return hints.length ? '[' + hints.join('] [') + ']' : ''
  }

  buildHelpHints (hintsArray) {
    // required
    if (this.isRequired) hintsArray.push('required')
    // datatype
    if (this.datatype) hintsArray.push(this.datatype)
    // default value
    const dv = this._defaultVal
    if (dv && (!Array.isArray(dv) || dv.length)) hintsArray.push(`default: ${dv}`)
  }

  group (g) {
    this._group = g
    return this
  }

  get helpGroup () {
    return this._group || 'Options:'
  }

  hidden (h) {
    this._hidden = h
    return this
  }

  get isHidden () {
    return !!this._hidden
  }

  validateConfig (utils) {
    // derive flags from aliases
    if (typeof this._flags !== 'string' && this._aliases.length) {
      this._flags = utils.aliasesToFlags(this._aliases)
    }
    // nornalize aliases or derive from flags
    if (this._aliases.length) {
      this._aliases = utils.normalizeAliases(this._aliases)
    } else if (typeof this._flags === 'string' && this._flags.length) {
      this._aliases = utils.flagsToAliases(this._flags)
    }
    // console.log(`aliases=${this.aliases}, flags=${this.helpFlags}`)
    // validate aliases
    if (!this._aliases.length) {
      throw new Error(`${this.constructor.name} requires aliases or flags.`)
    }
  }

  // + parse <-- async?
  // - interactivePrompt ?
  // + rawGiven
  // + keys or aliases
  // + value
  // + positions (key + values?)
  // - required
  // + helpGroup
  // + helpKeys: all flagged aliases
  // x helpPlaceholder: all value aliases
  // + helpDesc
  // + helpHints
  // typeName ?

  // resolveSlow () {
  //   let self = this
  //   let timeout = Math.floor(Math.random() * 500)
  //   console.log('resolving %s in %d ms', self.constructor.name, timeout)
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log('resolve', self.constructor.name)
  //       resolve(self)
  //     }, timeout)
  //   })
  // }

  resolve () {
    // console.log('resolve', this.constructor.name)
    return Promise.resolve(this)
    // return this.resolveSlow()
  }

  // async parsing
  parse (context) {
    return this._internalParse(context, true)
  }

  _internalParse (context, validate) {
    // console.log('parse', this.constructor.name, this.helpFlags)
    let lastKeyMatchesAlias = false
    let previousUsedValue
    // iterate over each slurped arg and determine if its key-value pairs are relevant to this type/option
    context.slurped.forEach(arg => {
      // if the last key seen applies to this type, see if a keyless value applies as the value
      // e.g. --key value1 value2 => (1) k=key v=true, (2) k='' v=value1, (3) k='' v=value2
      //      does value1 apply to key? how about value2?
      if (lastKeyMatchesAlias && arg.parsed.length === 1 && !arg.parsed[0].key && this.isApplicable(context, arg.parsed[0].value, previousUsedValue, arg)) {
        previousUsedValue = arg.parsed[0].value
        this.setValue(context, previousUsedValue)
        this.applySource(context, Type.SOURCE_FLAG, arg.index, arg.raw)
        arg.parsed[0].claimed = true
        return
      }

      arg.parsed.forEach((kv, kvIndex) => {
        if (!kv.key) return undefined
        const matchedAlias = this.aliases.find(alias => alias === kv.key)
        lastKeyMatchesAlias = !!matchedAlias
        if (matchedAlias) {
          this.observeAlias(context, matchedAlias)
          previousUsedValue = kv.value
          this.setValue(context, previousUsedValue)
          this.applySource(context, Type.SOURCE_FLAG, arg.index, arg.raw)
          kv.claimed = true
        }
      })
    })

    return validate ? this.validateParsed(context) : this.resolve()
  }

  // async validation called from parse
  validateParsed (context) {
    const promises = []

    promises.push(new Promise(resolve => {
      if (this.isRequired && !this.hasRequiredValue(context)) {
        const msgAndArgs = { msg: '', args: [] }
        this.buildRequiredMessage(context, msgAndArgs)
        if (msgAndArgs.msg) this.failValidation(context, [msgAndArgs.msg].concat(msgAndArgs.args || []))
      }
      resolve()
    }))

    promises.push(new Promise(resolve => {
      if (this.isStrict && (context.lookupSourceValue(this.id) !== Type.SOURCE_DEFAULT || this.shouldValidateDefaultValue)) {
        return Promise.resolve(this.validateValue(this.getValue(context), context)).then(isValid => {
          if (!isValid) {
            const msgAndArgs = { msg: '', args: [] }
            this.buildInvalidMessage(context, msgAndArgs)
            if (msgAndArgs.msg) this.failValidation(context, [msgAndArgs.msg].concat(msgAndArgs.args || []))
          }
          resolve()
        })
      }
      resolve()
    }))

    return Promise.all(promises).then(this.resolve)
  }

  failValidation (context, msg) {
    let args
    if (Array.isArray(msg)) {
      args = msg
    } else {
      // DO NOT PASS OR LEAK arguments!
      // see https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
      const argsLen = arguments.length
      args = new Array(argsLen - 1)
      for (let i = 1; i < argsLen; ++i) {
        args[i - 1] = arguments[i]
      }
    }
    context.cliMessage.apply(context, args)
    context.markTypeInvalid(this.id)
  }

  hasRequiredValue (context) {
    return context.lookupSourceValue(this.id) !== Type.SOURCE_DEFAULT
  }

  buildRequiredMessage (context, msgAndArgs) {
    msgAndArgs.msg = 'Missing required argument: %s'
    msgAndArgs.args = [this.aliases.join(' or ')]
  }

  buildInvalidMessage (context, msgAndArgs) {
    msgAndArgs.msg = 'Value "%s" is invalid for argument %s.'
    msgAndArgs.args = [this.getValue(context), this.aliases.join(' or ')]
  }

  // async hook to execute after all parsing
  postParse (context) {
    // console.log('postParse', this.constructor.name)
    return this.resolve()
  }

  applySource (context, source, position, raw) {
    context.employSource(this.id, source, position, raw)
    // source precedence, most to least direct (for future reference):
    // 1. prompt (interactive mode only)
    // 2. arg
    // 3. stdin
    // 4. env
    // 5. configfile
    // 6. default
  }

  isApplicable (context, currentValue, previousValue, slurpedArg) {
    // assumes (1) this type should hold a single value
    // and (2) a non-string previous value was not explicit
    // e.g. previous was not --key=value
    return typeof previousValue !== 'string'
  }

  observeAlias (context, alias) {}

  setValue (context, value) {
    context.assignValue(this.id, value)
  }

  getValue (context) {
    return context.lookupValue(this.id)
  }

  // subtype impls can be async (return a promise)
  validateValue (value, context) {
    return true
  }

  toObject () {
    return {
      // populated via config
      id: this.id,
      aliases: this.aliases,
      datatype: this.datatype,
      // defaultVal: this.defaultVal,
      isRequired: this.isRequired,
      helpFlags: this.helpFlags,
      helpDesc: this.helpDesc,
      helpHints: this.helpHints,
      helpGroup: this.helpGroup,
      isHidden: this.isHidden
    }
  }

  toResult (context, shouldCoerce) {
    const obj = context.lookupSource(this.id)
    return {
      // populated via config
      parent: this.parent,
      aliases: this.aliases,
      datatype: this.datatype,
      // defaultVal: this.defaultVal,
      // helpFlags: this.helpFlags,
      // helpDesc: this.helpDesc,
      // helpHints: this.helpHints,
      // helpGroup: this.helpGroup,
      // populated via parse
      value: shouldCoerce ? this.coerceHandler(this.getValue(context)) : this.getValue(context),
      source: obj && obj.source,
      position: obj && obj.position,
      raw: obj && obj.raw
    }
  }
}

module.exports = Type
