'use strict'

const format = require('util').format

class Context {
  static get (opts) {
    return new Context(opts)
  }

  constructor (opts) {
    opts = opts || {}
    // dependencies
    this._utils = opts.utils
    this._pathLib = opts.pathLib
    this._fsLib = opts.fsLib
    // config
    this.types = {}
    // args to parse per type
    this.args = []
    this.slurped = []
    // values by type, keyed by type.id
    this.values = new Map()
    this.sources = new Map()
    // results of parsing and validation
    this.code = 0
    this.output = ''
    this.argv = {}
    this.knownArgv = {}
    this.details = { args: [], types: [] }
    this.errors = []
    this.messages = []
    // other
    this.commandHandlerRun = false
    this.helpRequested = false
    this.versionRequested = false
  }

  get utils () {
    if (!this._utils) this._utils = require('./lib/utils').get()
    return this._utils
  }

  get pathLib () {
    if (!this._pathLib) this._pathLib = require('path')
    return this._pathLib
  }

  get fsLib () {
    if (!this._fsLib) this._fsLib = require('fs')
    return this._fsLib
  }

  slurpArgs (args) {
    if (typeof args === 'string') args = this.utils.stringToArgs(args)
    if (!args) args = process.argv.slice(2)
    if (!Array.isArray(args)) args = [].concat(args)
    // TODO read from stdin with no args? based on config?
    const parseable = []
    const extra = []
    let isExtra = false
    for (let i = 0, len = args.length, arg; i < len; i++) {
      arg = String(args[i])
      if (arg === '--') {
        isExtra = true
        // continue
      }
      (isExtra ? extra : parseable).push(arg)
    }
    this.args = parseable
    this.details.args = parseable.concat(extra)

    // let prev = [{}]
    // this.argv = this.args.reduce((argv, arg) => {
    //   let kvArray = this.parseSingleArg(arg)
    //   kvArray.forEach(kv => {
    //     if (kv.key) argv[kv.key] = kv.value
    //     else argv._.push(kv.value)
    //   })
    //   if (!kvArray[kvArray.length - 1].key && prev[prev.length - 1].key) {
    //     argv[prev[prev.length - 1].key] = kvArray[kvArray.length - 1].value
    //     argv._ = argv._.slice(0, -1)
    //   }
    //   prev = kvArray
    //   return argv
    // }, { _: [] })
    // console.log('context.js > argv:', this.argv)

    this.slurped = this.args.map((arg, index) => {
      return {
        raw: arg,
        index,
        parsed: this.parseSingleArg(arg)
      }
    })
    // console.log('context.js > slurped:', JSON.stringify(this.slurped, null, 2))

    return this
  }

  parseSingleArg (arg) {
    // short-circuit if no flag
    const numBeginningDashes = (arg.match(/^-+/) || [''])[0].length
    if (numBeginningDashes === 0) {
      return [{
        key: '',
        value: arg
      }]
    }
    // otherwise check for =value somewhere in arg
    const kvDelimIndex = arg.indexOf('=')
    const flags = kvDelimIndex > 1 ? arg.substring(numBeginningDashes, kvDelimIndex) : arg.slice(numBeginningDashes)
    const value = kvDelimIndex > 1 ? arg.substring(kvDelimIndex + 1) : undefined
    // allow an arg of just dashes e.g. '-'
    if (!flags && !value) {
      return [{
        key: '',
        value: arg
      }]
    }
    // can only be one flag with more than 1 dash
    if (numBeginningDashes > 1) {
      return [{
        key: flags,
        value: value || true
      }]
    }
    // may be multiple single-length flags, with value belonging to the last one
    const kvArray = flags.split('').map(flag => {
      return {
        key: flag,
        value: true
      }
    })
    if (value) kvArray[kvArray.length - 1].value = value
    return kvArray
  }

  pushLevel (level, types) {
    this.types[level] = types
    return this
  }

  unexpectedError (err) {
    this.errors.push(err)
    this.output = String((err && err.stack) || err)
    this.code++
  }

  cliMessage (msg) {
    // do NOT modify this.code here - the messages will be disregarded if help is requested
    const argsLen = arguments.length
    const args = new Array(argsLen - 1)
    for (let i = 0; i < argsLen; ++i) {
      args[i] = arguments[i]
      // if any args are an array, join into string
      // this is a hack to get Node 12's util.format working like Node 10's
      // e.g. require('util').format("Value \"%s\" is invalid.", ["web", "docs"])
      // Node 10: Value "web,docs" is invalid.
      // Node 12: Value "[ 'web', 'docs' ]" is invalid.
      if (Array.isArray(args[i])) {
        args[i] = args[i].join(',')
      }
    }
    this.messages.push(format.apply(null, args))
  }

  markTypeInvalid (id) {
    const mappedLevels = Object.keys(this.types)
    for (let i = mappedLevels.length - 1, currentLevel, found; i >= 0; i--) {
      currentLevel = mappedLevels[i]
      found = (this.types[currentLevel] || []).find(type => type.id === id)
      if (found) {
        found.invalid = true
        return
      }
    }
  }

  explicitCommandMatch (level) {
    if (!this.argv._ || !this.argv._.length) return false
    const candidate = this.argv._[0]
    return (this.types[level] || []).some(type => type.datatype === 'command' && type.aliases.some(alias => alias === candidate))
  }

  matchCommand (level, aliases, isDefault) {
    if (!this.argv._ || this.versionRequested) return false // TODO what to do without an unknownType?
    // first determine if argv._ starts with ANY known command alias
    const matchFound = this.explicitCommandMatch(level)
    const candidate = this.argv._[0]
    return {
      explicit: matchFound && aliases.some(alias => alias === candidate),
      implicit: !matchFound && isDefault && !this.helpRequested,
      candidate: candidate
    }
  }

  deferHelp (opts) {
    this.helpRequested = opts || {}
    return this
  }

  addDeferredHelp (helpBuffer) {
    const groups = {}
    const mappedLevels = Object.keys(this.types)
    for (let i = mappedLevels.length - 1, currentLevel; i >= 0; i--) {
      currentLevel = mappedLevels[i]
      ;(this.types[currentLevel] || []).forEach(type => {
        if (currentLevel === helpBuffer._usageName || type.datatype !== 'command') {
          if (this.helpRequested) type.invalid = false
          groups[type.helpGroup] = (groups[type.helpGroup] || []).concat(type)
        }
      })
    }
    helpBuffer.groups = groups

    if (!this.helpRequested) {
      helpBuffer.messages = this.messages
      this.code += this.messages.length
    }

    // add/set output to helpBuffer.toString()
    this.output = helpBuffer.toString(this.helpRequested)
    return this
  }

  addHelp (helpBuffer, opts) {
    return this.deferHelp(opts).addDeferredHelp(helpBuffer)
  }

  deferVersion (opts) {
    this.versionRequested = opts || {}
    return this
  }

  addDeferredVersion () {
    if (!(this.versionRequested && this.versionRequested.version)) {
      let dir = this.pathLib.dirname(require.main.filename)
      const root = this.pathLib.parse(dir).root
      let version
      let attempts = 0 // protect against infinite tight loop if libs misbehave
      while (dir !== root && attempts < 999) {
        attempts++
        try {
          version = JSON.parse(this.fsLib.readFileSync(this.pathLib.join(dir, 'package.json'), 'utf8')).version
          if (version) break
        } catch (_) {
          dir = this.pathLib.dirname(dir)
        }
      }
      if (!this.versionRequested) this.versionRequested = {}
      this.versionRequested.version = version || 'Version unknown'
    }
    if (typeof this.versionRequested.version === 'function') this.output = this.versionRequested.version()
    else this.output = this.versionRequested.version
    return this
  }

  // weird method names make for easier code searching
  assignValue (id, value) {
    this.values.set(id, value)
  }

  lookupValue (id) {
    return this.values.get(id)
  }

  resetSource (id, source) {
    this.sources.set(id, { source: source, position: [], raw: [] })
  }

  employSource (id, source, position, raw) {
    let obj = this.lookupSource(id)
    if (!obj) {
      obj = { source: undefined, position: [], raw: [] }
      this.sources.set(id, obj)
    }
    if (typeof source === 'string') obj.source = source
    if (typeof position === 'number') obj.position.push(position)
    if (typeof raw === 'string') obj.raw.push(raw)
  }

  lookupSource (id) {
    return this.sources.get(id)
  }

  lookupSourceValue (id) {
    const obj = this.lookupSource(id)
    return obj && obj.source
  }

  populateArgv (typeResults) {
    let detailIndex
    typeResults.forEach(tr => {
      // find and reset detailed object; otherwise add it
      detailIndex = this.details.types.findIndex(t => t.parent === tr.parent && t.datatype === tr.datatype && this.utils.sameArrays(tr.aliases, t.aliases))
      if (detailIndex !== -1) this.details.types[detailIndex] = tr
      else this.details.types.push(tr)

      // if not command, set value for each alias in argv
      if (tr.datatype === 'command') return undefined // do not add command aliases to argv
      tr.aliases.forEach(alias => {
        this.argv[alias] = tr.value
        this.knownArgv[alias] = tr.value
      })
    })
  }

  getUnknownArguments () {
    if (!Array.isArray(this.argv._)) return []
    const endOptions = this.argv._.indexOf('--')
    return this.argv._.slice(0, endOptions === -1 ? this.argv._.length : endOptions)
  }

  getUnknownSlurpedOptions () {
    return Object.keys(this.argv).filter(key => !(key in this.knownArgv)).map(key => {
      return this.slurped.find(arg => arg.parsed.some(p => p.key === key))
    })
  }

  toResult () {
    return {
      code: this.code,
      output: this.output,
      errors: this.errors,
      argv: this.argv,
      details: this.details
    }
  }
}

module.exports = Context
