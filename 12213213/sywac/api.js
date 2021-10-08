'use strict'

const SOURCE_DEFAULT = require('./types/type').SOURCE_DEFAULT

class Api {
  static get DEFAULT_COMMAND_INDICATOR () {
    return '*'
  }

  static get (opts) {
    return new Api(opts)
  }

  constructor (opts) {
    opts = opts || {}
    this.types = []
    this._helpOpts = opts.helpOpts || {}
    this._factories = {
      // meta
      unknownType: this.getUnknownType,
      _context: this.getContext,
      helpBuffer: this.getHelpBuffer,
      // common types
      boolean: this.getBoolean,
      string: this.getString,
      number: this.getNumber,
      path: this.getPath,
      file: this.getFile,
      dir: this.getDir,
      enum: this.getEnum,
      array: this.getArray,
      // specialty types
      helpType: this.getHelpType,
      versionType: this.getVersionType,
      // advanced types
      positional: this.getPositional,
      commandType: this.getCommand
    }
    this._showHelpByDefault = 'showHelpByDefault' in opts ? opts.showHelpByDefault : false
    this._strictMode = 'strictMode' in opts ? opts.strictMode : false
    this._magicCommandAdded = false
    this._modulesSeen = opts.modulesSeen || []
    this.configure(opts)
    if (!Api.ROOT_NAME) Api.ROOT_NAME = this.name
  }

  configure (opts) {
    opts = opts || {}
    // lazily configured instance dependencies (expects a single instance)
    this._utils = opts.utils || this._utils
    this._pathLib = opts.pathLib || this._pathLib
    this._fsLib = opts.fsLib || this._fsLib

    // lazily configured factory dependencies (expects a function to call per instance)
    if ('factories' in opts) {
      Object.keys(opts.factories).forEach(name => this.registerFactory(name, opts.factories[name]))
    }

    // other
    this._name = opts.name || this._name
    this._parentName = opts.parentName || this._parentName // TODO this seems awfully hacky
    return this
  }

  newChild (commandName, childOptions) {
    return new Api(Object.assign({
      factories: this._factories,
      utils: this.utils,
      pathLib: this.pathLib,
      fsLib: this.fsLib,
      name: this.name + ' ' + commandName,
      parentName: this.name,
      modulesSeen: this._modulesSeen.slice(),
      helpOpts: this._assignHelpOpts({}, this.helpOpts),
      showHelpByDefault: this._showHelpByDefault,
      strictMode: this._strictMode
    }, childOptions))
  }

  _assignHelpOpts (target, source) {
    [
      'lineSep', 'sectionSep', 'pad', 'indent', 'split', 'icon', 'slogan',
      'usagePrefix', 'usageHasOptions', 'groupOrder', 'epilogue', 'maxWidth',
      'examplePrefix', 'exampleOrder', 'usageCommandPlaceholder',
      'usageArgsPlaceholder', 'usageOptionsPlaceholder', 'showHelpOnError',
      'styleGroup', 'styleGroupError', 'styleFlags', 'styleFlagsError',
      'styleDesc', 'styleDescError', 'styleHints', 'styleHintsError', 'styleMessages',
      'styleUsagePrefix', 'styleUsagePositionals', 'styleUsageCommandPlaceholder',
      'styleUsageArgsPlaceholder', 'styleUsageOptionsPlaceholder', 'styleExample',
      'styleAll'
    ].forEach(opt => {
      if (opt in source) target[opt] = source[opt]
    })
    return target
  }

  // lazy dependency accessors
  get unknownType () {
    if (!this._unknownType) this._unknownType = this.get('unknownType').withParent(Api.ROOT_NAME)
    return this._unknownType
  }

  get utils () {
    if (!this._utils) this._utils = require('./lib/utils').get()
    return this._utils
  }

  get helpOpts () {
    return this._helpOpts
  }

  get pathLib () {
    if (!this._pathLib) this._pathLib = require('path')
    return this._pathLib
  }

  get fsLib () {
    if (!this._fsLib) this._fsLib = require('fs')
    return this._fsLib
  }

  get name () {
    if (typeof this._name !== 'string') this._name = this.pathLib.basename(process.argv[1], '.js')
    return this._name
  }

  get parentName () {
    return this._parentName || 'node'
  }

  // type factories
  registerFactory (name, factory) {
    if (name && typeof factory === 'function') this._factories[name] = factory
    return this
  }

  get (name, opts) {
    if (name && this._factories[name]) return this._factories[name].call(this, opts)
    return null
  }

  // meta factories
  getUnknownType (opts) {
    return require('./types/unknown').get(opts)
  }

  getContext (opts) {
    return require('./context').get(opts)
  }

  getHelpBuffer (opts) {
    return require('./buffer').get(opts)
  }

  // common type factories
  getBoolean (opts) {
    return require('./types/boolean').get(opts)
  }

  getString (opts) {
    return require('./types/string').get(opts)
  }

  getNumber (opts) {
    return require('./types/number').get(opts)
  }

  getPath (opts) {
    return require('./types/path').get(Object.assign({
      pathLib: this.pathLib,
      fsLib: this.fsLib
    }, opts))
  }

  getFile (opts) {
    return this.getPath(Object.assign({ dirAllowed: false }, opts))
  }

  getDir (opts) {
    return this.getPath(Object.assign({ fileAllowed: false }, opts))
  }

  getEnum (opts) {
    return require('./types/enum').get(opts)
  }

  getArray (opts) {
    return require('./types/array').get(opts)
  }

  // specialty type factories
  getHelpType (opts) {
    return require('./types/help').get(opts)
  }

  getVersionType (opts) {
    return require('./types/version').get(opts)
  }

  // advanced type factories
  getPositional (opts) {
    return require('./types/positional').get(opts)
  }

  getCommand (opts) {
    return require('./types/command').get(opts)
  }

  // help text
  preface (icon, slogan) {
    this.helpOpts.icon = icon
    this.helpOpts.slogan = slogan
    return this
  }

  usage (usage) {
    if (typeof usage === 'string') this.helpOpts.usage = usage
    else if (usage) {
      const keyMap = {
        usage: 'usage',
        prefix: 'usagePrefix',
        commandPlaceholder: 'usageCommandPlaceholder',
        argsPlaceholder: 'usageArgsPlaceholder',
        optionsPlaceholder: 'usageOptionsPlaceholder'
      }
      Object.keys(keyMap).forEach(key => {
        if (key in usage) this.helpOpts[keyMap[key]] = usage[key]
      })
    }
    return this
  }

  groupOrder (orderArray) {
    if (Array.isArray(orderArray) || typeof orderArray === 'undefined') this.helpOpts.groupOrder = orderArray
    return this
  }

  example (example, opts) {
    opts = opts || {}
    if (typeof example === 'string') {
      opts.flags = example
    } else if (!Array.isArray(example) && typeof example === 'object') {
      opts = example
    }
    const group = opts.group || 'Examples:'
    if (!this.helpOpts.examples) this.helpOpts.examples = {}
    this.helpOpts.examples[group] = (this.helpOpts.examples[group] || []).concat(opts)
    return this
  }

  exampleOrder (orderArray) {
    if (Array.isArray(orderArray) || typeof orderArray === 'undefined') this.helpOpts.exampleOrder = orderArray
    return this
  }

  epilogue (epilogue) {
    this.helpOpts.epilogue = epilogue
    return this
  }

  outputSettings (settings) {
    if (!settings) return this
    ;['lineSep', 'sectionSep', 'pad', 'indent', 'split', 'maxWidth', 'examplePrefix', 'showHelpOnError'].forEach(opt => {
      if (opt in settings) this.helpOpts[opt] = settings[opt]
    })
    return this
  }

  style (hooks) {
    if (!hooks) return this
    ;[
      'group', 'groupError', 'flags', 'flagsError', 'desc', 'descError', 'hints',
      'hintsError', 'messages', 'usagePrefix', 'usagePositionals', 'usageCommandPlaceholder',
      'usageArgsPlaceholder', 'usageOptionsPlaceholder', 'example', 'all'
    ].forEach(key => {
      if (typeof hooks[key] === 'function') {
        const helpOptsKey = 'style' + key[0].toUpperCase() + key.slice(1)
        this.helpOpts[helpOptsKey] = hooks[key]
      }
    })
    return this
  }

  showHelpByDefault (boolean) {
    this._showHelpByDefault = boolean !== false
    return this
  }

  strict (boolean) {
    this._strictMode = boolean !== false
    return this
  }

  addStrictModeErrors (context) {
    if (this._strictMode) {
      const unknownOptions = context.getUnknownSlurpedOptions()
      if (unknownOptions.length > 0) {
        context.cliMessage(`Unknown options: ${unknownOptions.map(u => u.raw).join(', ')}`)
      }
      const unknownArguments = context.getUnknownArguments()
      if (unknownArguments.length > 0) {
        context.cliMessage(`Unknown arguments: ${unknownArguments.join(' ')}`)
      }
    }
  }

  // complex types
  commandDirectory (dir, opts) {
    if (typeof dir === 'object') {
      opts = dir
      dir = ''
    }
    opts = Object.assign({}, opts)
    if (!Array.isArray(opts.extensions)) opts.extensions = ['.js']
    let searchDir
    if (dir && typeof dir === 'string' && this.pathLib.isAbsolute(dir)) {
      searchDir = dir
    } else {
      const callerFile = this.utils.getCallerFile()
      if (this._modulesSeen.indexOf(callerFile) === -1) this._modulesSeen.push(callerFile)
      searchDir = this.pathLib.dirname(callerFile)
      if (dir && typeof dir === 'string') searchDir = this.pathLib.resolve(searchDir, dir)
    }
    let filepath
    let mod
    this.fsLib.readdirSync(searchDir).forEach(fileInDir => {
      filepath = this.pathLib.join(searchDir, fileInDir)
      if (opts.extensions.indexOf(this.pathLib.extname(fileInDir)) !== -1 && this._modulesSeen.indexOf(filepath) === -1) {
        this._modulesSeen.push(filepath)
        mod = require(filepath)
        if (mod.flags || mod.aliases) {
          this._internalCommand(mod)
        } else if (typeof mod === 'function') {
          this._internalCommand({
            aliases: this.pathLib.basename(fileInDir, this.pathLib.extname(fileInDir)),
            run: mod
          })
        }
      }
    })
    return this
  }

  command (dsl, opts) {
    this._internalCommand(dsl, opts)
    return this
  }

  _internalCommand (dsl, opts) {
    opts = opts || {}

    // argument shuffling
    if (typeof opts === 'function') {
      opts = { run: opts }
    }
    if (dsl && typeof dsl === 'object') {
      opts = Object.assign({}, dsl, opts)
    } else if (typeof dsl === 'string') {
      opts = Object.assign({}, opts)
      opts.flags = dsl
    } else {
      opts = Object.assign({}, opts)
    }
    if (!opts.flags && opts.aliases) opts.flags = [].concat(opts.aliases)[0]

    // opts is an object and opts.flags is the dsl
    // split dsl into name/alias and positionals
    // then populate opts.aliases and opts.params
    const mp = this.utils.stringToMultiPositional(opts.flags)
    const name = mp.shift()
    opts.aliases = opts.aliases ? Array.from(new Set([name].concat(opts.aliases))) : [name]
    if (mp.length) {
      this.helpOpts.usageHasArgs = true
      if (!opts.params) opts.params = mp
      else if (!opts.paramsDsl) opts.paramsDsl = mp.join(' ')
    }

    this.helpOpts.usageHasCommand = true

    const commandType = this.get('commandType', opts)
    this.custom(commandType)
    return commandType
  }

  positional (dsl, opts) {
    opts = Object.assign({}, opts) // copy object so we don't alter object with external refs
    let addedToHelp = false

    // TODO this logic is repetitive and messy
    if (Array.isArray(dsl)) {
      opts.params = dsl.slice()
    } else if (typeof dsl === 'object') {
      if (dsl.params) opts = Object.assign({}, dsl)
      else opts.params = Object.assign({}, dsl)
    } else if (typeof dsl === 'string') {
      this.helpOpts.usagePositionals = (this.helpOpts.usagePositionals || []).concat(dsl)
      addedToHelp = true
      const array = this.utils.stringToMultiPositional(dsl)
      if (!opts.params) {
        opts.params = array
      } else if (Array.isArray(opts.params)) {
        opts.params = array.map((string, index) => {
          return opts.params[index] ? Object.assign({ flags: string }, opts.params[index]) : string
        })
      } else {
        opts.params = Object.keys(opts.params).map((key, index) => {
          let obj = opts.params[key]
          if (obj && !obj.flags) obj = Object.assign({ flags: array[index] }, obj)
          // if (obj && !obj.aliases) obj.aliases = key
          return obj
        })
      }
    }

    opts.ignore = [].concat(opts.ignore).filter(Boolean)

    const params = Array.isArray(opts.params) ? opts.params.slice() : Object.keys(opts.params).map(key => {
      let obj = opts.params[key]
      if (obj && !obj.flags) obj = Object.assign({ flags: key }, obj)
      return obj
    })

    let numSkipped = 0
    params.forEach((param, index) => {
      if (!param) return numSkipped++

      // accept an array of strings or objects
      if (typeof param === 'string') param = { flags: param }
      else param = Object.assign({}, param)
      if (!param.flags && param.aliases) param.flags = [].concat(param.aliases)[0]

      if (!addedToHelp) this.helpOpts.usagePositionals = (this.helpOpts.usagePositionals || []).concat(param.flags)

      // allow "commentary" things in positional dsl string via opts.ignore
      if (~opts.ignore.indexOf(param.flags)) return numSkipped++

      // TODO if no flags or aliases, throw error

      // convenience to define descriptions in opts
      if (!(param.description || param.desc) && (opts.paramsDescription || opts.paramsDesc)) {
        param.desc = [].concat(opts.paramsDescription || opts.paramsDesc)[index - numSkipped]
      }
      if (!param.group && opts.paramsGroup) param.group = opts.paramsGroup

      // don't apply command desc to positional params (via configure calls below)
      const optsDescription = opts.description
      const optsDesc = opts.desc
      delete opts.description
      delete opts.desc

      // inferPositionalProperties will generate flags/aliases for wrapped elementType needed for parsing
      const positionalFlags = param.flags
      delete param.flags

      param = Object.assign(this.utils.inferPositionalProperties(positionalFlags, Object.keys(this._factories)), param)
      if (!param.elementType) param.elementType = this._getType(param).configure(opts, false)

      param.flags = positionalFlags
      const positional = this.get('positional', param).configure(opts, false)

      opts.description = optsDescription
      opts.desc = optsDesc

      if (this.unknownType) this.unknownType.addPositional(positional)
      this.custom(positional)
    })

    return this
  }

  // configure any arg type
  custom (type) {
    if (type) {
      if (typeof type.withParent === 'function') type.withParent(this.name)
      if (typeof type.validateConfig === 'function') type.validateConfig(this.utils)
      this.types.push(type)
    }
    return this
  }

  _normalizeOpts (flags, opts) {
    opts = opts || {}
    if (Array.isArray(flags)) {
      opts.aliases = flags // treat an array as aliases
    } else if (typeof flags === 'string') {
      opts.flags = flags // treat a string as flags
    } else if (typeof flags === 'object') {
      opts = flags
    }
    return opts
  }

  _addOptionType (flags, opts, name) {
    this.helpOpts.usageHasOptions = true
    return this.custom(this._getType(flags, opts, name))
  }

  _getType (flags, opts, name) {
    opts = this._normalizeOpts(flags, opts)

    name = String(name || opts.type)
    if (name.indexOf(':') !== -1) {
      const types = name.split(':').filter(Boolean)
      if (types[0] === 'array') return this._getArrayType(flags, opts, types.slice(1).join(':') || 'string')
      name = types[0]
    }

    return this.get(name, opts)
  }

  _getArrayType (flags, opts, subtypeName) {
    opts = this._normalizeOpts(flags, opts) // TODO this may be redundant

    subtypeName = String(subtypeName || opts.type)
    if (subtypeName.indexOf(':') !== -1) {
      const types = subtypeName.split(':').filter(Boolean)
      if (types[0] === 'array') {
        opts.elementType = this._getArrayType(flags, opts, types.slice(1).join(':') || 'string')
        return this.get('array', opts)
      }
      subtypeName = types[0]
    }

    opts.elementType = this.get(subtypeName, opts)
    return this.get('array', opts)
  }

  // specify 'type' (as string) in opts
  option (flags, opts) {
    return this._addOptionType(flags, opts)
  }

  // common individual value types
  boolean (flags, opts) {
    return this._addOptionType(flags, opts, 'boolean')
  }

  string (flags, opts) {
    return this._addOptionType(flags, opts, 'string')
  }

  number (flags, opts) {
    return this._addOptionType(flags, opts, 'number')
  }

  path (flags, opts) {
    return this._addOptionType(flags, opts, 'path')
  }

  file (flags, opts) {
    return this._addOptionType(flags, opts, 'file')
  }

  dir (flags, opts) {
    return this._addOptionType(flags, opts, 'dir')
  }

  enumeration (flags, opts) {
    return this._addOptionType(flags, opts, 'enum')
  }

  // specialty types
  help (flags, opts) {
    return this._addOptionType(flags, opts, 'helpType')
  }

  version (flags, opts) {
    return this._addOptionType(flags, opts, 'versionType')
  }

  // multiple value types
  array (flags, opts) {
    return this._addOptionType(flags, opts, 'array')
  }

  stringArray (flags, opts) {
    return this._addOptionType(flags, opts, 'array:string')
  }

  numberArray (flags, opts) {
    return this._addOptionType(flags, opts, 'array:number')
  }

  // TODO more types

  // lifecycle hook
  check (handler) {
    this._checkHandler = handler
    return this
  }

  // parse and exit if there's output (e.g. help text) or a non-zero code; otherwise resolves to argv
  // useful for standard CLIs
  parseAndExit (args) {
    return this.parse(args).then(result => {
      if (result.output) {
        console.log(result.output)
        process.exit(result.code)
      }
      if (result.code !== 0) process.exit(result.code)
      return result.argv
    })
  }

  // parse and resolve to a context result (never exits)
  // useful for chatbots or checking results
  parse (args) {
    // init context and kick off recursive type parsing/execution
    const context = this.initContext(false).slurpArgs(args)

    // init unknownType in context only for the top-level (all levels share/overwrite the same argv._)
    if (this.unknownType) {
      this.unknownType.setValue(context, this.unknownType.defaultVal)
      this.unknownType.applySource(context, SOURCE_DEFAULT)
    }

    if (this._showHelpByDefault && !context.details.args.length) context.deferHelp() // preemptively request help

    return this.parseFromContext(context).then(whenDone => {
      if (!context.commandHandlerRun && !context.output) {
        this.addStrictModeErrors(context)
      }

      if (context.helpRequested && !context.output) {
        context.addDeferredHelp(this.initHelpBuffer())
      } else if (context.versionRequested && !context.output) {
        context.addDeferredVersion()
      } else if (context.messages.length && !context.output) {
        context.addDeferredHelp(this.initHelpBuffer())
      }
      return whenDone
    }).catch(err => {
      context.unexpectedError(err)
    }).then(whenDone => {
      return context.toResult()
    })
  }

  // recursive, meant to be used internally
  parseFromContext (context) {
    // first complete configuration for special types
    let hasCommands = false
    let hasDefaultCommand = false
    this.types.forEach(type => {
      if (type.needsApi) type.configure({ api: this.newChild(type.aliases[0]) }, false)

      const implicit = type.implicitCommands
      if (implicit && implicit.length) this.unknownType.addImplicit(implicit, type)

      if (type.datatype === 'command') {
        hasCommands = true
        if (type.isDefault) hasDefaultCommand = true
      }
    })
    if (!this._magicCommandAdded && this._showHelpByDefault && hasCommands && !hasDefaultCommand) {
      this._magicCommandAdded = true
      this._internalCommand(Api.DEFAULT_COMMAND_INDICATOR, (argv, context) => {
        context.deferHelp().addDeferredHelp(this.initHelpBuffer())
      }).configure({ api: this.newChild(Api.DEFAULT_COMMAND_INDICATOR, { strictMode: false }) }, false)
    }

    // add known types to context
    this.applyTypes(context)
    // run async parsing for all types except unknown
    const parsePromises = this.types.map(type => type.parse(context))

    return Promise.all(parsePromises).then(whenDone => {
      // now run async parsing for unknown
      return (this.unknownType && this.unknownType.parse(context)) || Promise.resolve(true)
    }).then(whenDone => {
      // once all parsing is complete, populate argv in context (sync)
      // first add unknownType to context.argv (because it's needed to determine shouldCoerceAndCheck)
      if (this.unknownType) context.populateArgv([this.unknownType.toResult(context, true)])
      // next determine shouldCoerceAndCheck
      const shouldCoerceAndCheck = this.shouldCoerceAndCheck(context)
      // then populate argv with other types, letting them know if it makes sense to apply coercion
      context.populateArgv(this.types.map(type => type.toResult(context, shouldCoerceAndCheck)))

      // TODO before postParse, determine if any are promptable (and need prompting) and prompt each in series

      // run custom api-level async argv check/hook between argv population and command execution
      // it should use context.cliMessage to report errors (or can otherwise manipulate context)
      if (typeof this._checkHandler === 'function' && shouldCoerceAndCheck) return this._checkHandler(context.argv, context)
      return Promise.resolve(true)
    }).then(whenDone => {
      // run async post-parsing
      let postParse = this.types.map(type => type.postParse(context)) // this potentially runs commands
      if (this.unknownType) postParse = postParse.concat(this.unknownType.postParse(context))
      return Promise.all(postParse)
    })
  }

  initContext (includeTypes) {
    const context = this.get('_context', {
      utils: this.utils,
      pathLib: this.pathLib,
      fsLib: this.fsLib
    })
    return includeTypes ? this.applyTypes(context) : context
  }

  applyTypes (context) {
    context.pushLevel(this.name, this.types.map(type => {
      type.setValue(context, type.defaultVal)
      type.applySource(context, SOURCE_DEFAULT)
      return type.toObject()
    }))
    return context
  }

  initHelpBuffer () {
    const helpOpts = Object.assign({ utils: this.utils, usageName: this.name }, this.helpOpts)
    return this.get('helpBuffer', helpOpts)
  }

  // clear as mud? this predicts the future, essentially the inverse of conditions found in parse after
  // parseFromContext and also the conditions that would make the showHelpByDefault command run
  // basically, we don't want to run the custom check handler if help text or version will be output
  shouldCoerceAndCheck (context) {
    return !context.helpRequested &&
      !context.versionRequested &&
      !(context.messages && context.messages.length) &&
      (!this._magicCommandAdded || context.explicitCommandMatch(this.name))
  }

  // optional convenience methods
  getHelp (opts) {
    return this.initContext(true).addHelp(this.initHelpBuffer(), opts).output
  }
}

Api.ROOT_NAME = undefined // defined by first Api instance in constructor

module.exports = Api
