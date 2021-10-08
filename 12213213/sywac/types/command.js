'use strict'

const Api = require('../api')
const Type = require('./type')

class TypeCommand extends Type {
  static get (opts) {
    return new TypeCommand(opts)
  }

  constructor (opts) {
    // default value is for benefit of context.details.types
    super(Object.assign({ defaultValue: false }, opts))
  }

  configure (opts, override) {
    opts = opts || {}
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || !this._api) {
      this._api = opts.api || this._api
      if (opts.api) this._apiConfigured = false
    }
    if (override || !this._positionalOpts) this._positionalOpts = this._assignPositionalOpts(this._positionalOpts || {}, opts)
    if (override || !this._positionalDsl) this._positionalDsl = opts.paramsDsl || this._positionalDsl
    if (override || typeof this._setupHandler !== 'function') this._setupHandler = opts.setup || this._setupHandler
    if (override || typeof this._runHandler !== 'function') this._runHandler = opts.run || this._runHandler

    return this
  }

  _assignPositionalOpts (target, source) {
    ['params', 'paramsDescription', 'paramsDesc', 'paramsGroup', 'ignore'].forEach(opt => {
      if (opt in source) target[opt] = source[opt]
    })
    return target
  }

  get needsApi () {
    return !this._api
  }

  get api () {
    if (!this._api) this._api = Api.get()
    return this._api
  }

  get isDefault () {
    if (typeof this._default !== 'boolean') this._default = this.aliases.some(alias => alias === Api.DEFAULT_COMMAND_INDICATOR)
    return this._default
  }

  get validAliases () {
    if (!Array.isArray(this._validAliases)) this._validAliases = this.aliases.filter(alias => alias !== Api.DEFAULT_COMMAND_INDICATOR)
    return this._validAliases
  }

  get setupHandler () {
    return typeof this._setupHandler === 'function' ? this._setupHandler : () => {}
  }

  get runHandler () {
    return typeof this._runHandler === 'function' ? this._runHandler : () => {}
  }

  get datatype () {
    return 'command'
  }

  get isHidden () {
    if (this.aliases.length === 1 && this.isDefault) return true
    return super.isHidden
  }

  buildHelpHints (hints) {
    if (this.validAliases.length > 1) hints.push('aliases: ' + this.validAliases.slice(1).join(', '))
    if (this.isDefault) hints.push('default')
  }

  get helpGroup () {
    return this._group || 'Commands:'
  }

  parse (context) {
    return super.resolve()
  }

  postParse (context) {
    const match = context.matchCommand(this.api.parentName, this.validAliases, this.isDefault)
    if (!match.explicit && !match.implicit) return this.resolve()

    if (match.explicit) {
      // "claim" the arg from context.slurped so logic in unknownType works
      const matchedArg = context.slurped.find(arg => {
        return arg.parsed.length === 1 && !arg.parsed[0].key && !arg.parsed[0].claimed && arg.raw === match.candidate
      })
      if (matchedArg) {
        matchedArg.parsed[0].claimed = true
        this.applySource(context, Type.SOURCE_POSITIONAL, matchedArg.index, matchedArg.raw)
      }
    }
    this.setValue(context, true) // set this value to true for context.details
    context.populateArgv([this.toResult(context)]) // apply value to context.details

    if (!this._apiConfigured) {
      this._apiConfigured = true
      // add positionals from preconfigured opts
      if (typeof this._positionalDsl === 'string' && this._positionalDsl.length) {
        this.api.positional(this._positionalDsl, this._positionalOpts)
      } else if (this._positionalOpts && this._positionalOpts.params) {
        this.api.positional(this._positionalOpts)
      }

      // TODO add other types from preconfigured opts ?

      // call sync "setup" handler, if defined
      this.setupHandler(this.api)
    }

    return this.api.parseFromContext(context).then(whenDone => {
      // only run innermost command handler
      if (context.commandHandlerRun) return this.resolve()
      context.commandHandlerRun = true
      this.api.addStrictModeErrors(context)
      if (context.helpRequested || context.messages.length) {
        // console.log('command.js postParse > adding deferred help, implicit:', match.implicit)
        if (!context.output) context.addDeferredHelp(this.api.initHelpBuffer())
        return this.resolve()
      }
      return this.runHandler(context.argv, context)
    })
  }
}

module.exports = TypeCommand
