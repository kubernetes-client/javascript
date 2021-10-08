'use strict'

const Type = require('./type')

class TypeUnknown extends Type {
  static get (opts) {
    return new TypeUnknown(opts)
  }

  constructor (opts) {
    super(Object.assign({
      aliases: '_',
      defaultValue: []
    }, opts))
    this.positionals = []
    this.implicit = {}
  }

  get datatype () {
    return 'array:string'
  }

  addPositional (positional) {
    this.positionals.push(positional)
  }

  addImplicit (aliases, type) {
    aliases.forEach(alias => {
      this.implicit[alias] = type
    })
  }

  parse (context) {
    // console.log('parse', this.constructor.name)
    // find all slurped args that have unclaimed kv pairs
    const unknownSlurped = []
    let unclaimed, argParsedLength
    context.slurped.forEach(arg => {
      // filter arg.parsed to unclaimed
      argParsedLength = arg.parsed.length
      unclaimed = arg.parsed.map((kv, kvIndex) => {
        return {
          key: kv.key,
          value: kv.value,
          claimed: kv.claimed,
          last: kvIndex === argParsedLength - 1
        }
      }).filter(kv => !kv.claimed)
      if (unclaimed.length) {
        unknownSlurped.push({
          raw: arg.raw,
          index: arg.index,
          parsed: unclaimed
        })
      }
    })
    // console.log('unknownSlurped:', JSON.stringify(unknownSlurped, null, 2))

    // TODO when setting context.argv below, add to context.details.types ??
    let unparsed = []
    let prev = [{}]
    let prevIndex
    unknownSlurped.forEach(arg => {
      arg.parsed.forEach(kv => {
        if (kv.key) context.argv[kv.key] = kv.value // TODO attempt to coerce to correct type?
        else unparsed.push({ raw: arg.raw, index: arg.index })
      })
      if (!arg.parsed[arg.parsed.length - 1].key && prev[prev.length - 1].key && typeof prev[prev.length - 1].value !== 'string' && prev[prev.length - 1].last && prevIndex === (arg.index - 1)) {
        context.argv[prev[prev.length - 1].key] = arg.parsed[arg.parsed.length - 1].value // TODO attempt to coerce to correct type?
        unparsed = unparsed.slice(0, -1)
      }
      prev = arg.parsed
      prevIndex = arg.index
    })

    if (unparsed.length) {
      const implicitCommands = Object.keys(this.implicit)
      if (implicitCommands.length) unparsed = this._tryImplicitCommand(unparsed, context, implicitCommands)
    }

    if (unparsed.length && this.positionals && this.positionals.length) {
      unparsed = this._populatePositionals(unparsed, context)
    }

    context.resetSource(this.id, Type.SOURCE_DEFAULT)
    const v = unparsed.map(arg => {
      this.applySource(context, null, arg.index, arg.raw)
      return arg.raw
    }).concat(context.details.args.slice(context.args.length).map((arg, index) => {
      this.applySource(context, null, context.args.length + index, arg)
      return arg
    }))
    context.assignValue(this.id, v)

    if (v.length > 0) this.applySource(context, Type.SOURCE_POSITIONAL)

    if (this.positionals && this.positionals.length) {
      return Promise.all(this.positionals.map(p => p.validateParsed(context))).then(whenDone => super.resolve())
    }

    return super.resolve()
  }

  _tryImplicitCommand (unparsed, context, implicitCommands) {
    const first = unparsed[0]
    const matched = implicitCommands.find(alias => alias === first.raw) // maybe indexOf would be better/faster?
    if (matched) {
      context.slurped[first.index].parsed[0].claimed = true
      this.implicit[matched].implicitCommandFound(context, Type.SOURCE_POSITIONAL, first.index, first.raw)
      return unparsed.slice(1)
    }
    return unparsed
  }

  // <a> <b..> <c>
  // one two three four
  // a = one
  // b = two three
  // c = four

  // <a..> <b..> <c>
  // one two three four
  // a = one two
  // b = three
  // c = four

  // <a> <b> <c..>
  // one two three four
  // a = one
  // b = two
  // c = three four

  _populatePositionals (unparsed, context) {
    // filter out positionals already populated via flags
    // (can populate via flags or positional args, but not both at same time)
    const positionals = this.positionals.filter(p => context.lookupSourceValue(p.id) !== Type.SOURCE_FLAG)
    let numRequiredLeft = positionals.filter(p => p.isRequired).length
    let current = positionals.shift()
    let numArgsLeft = unparsed.length

    unparsed.forEach(arg => {
      if (!current) return // more args than positionals

      // requireds take precedence, skip optionals if insufficient args
      if (numArgsLeft <= numRequiredLeft) {
        while (!current.isRequired) {
          // console.log(`skipping optional "${current.helpFlags}", numArgsLeft: ${numArgsLeft}, numRequiredLeft: ${numRequiredLeft}`)
          current = positionals.shift()
        }
      }

      // assign value and decrement numArgsLeft
      current.setValue(context, arg.raw)
      current.applySource(context, Type.SOURCE_POSITIONAL, arg.index, arg.raw)
      numArgsLeft--

      // determine if we should move on to the next positional
      if (!current.isVariadic || numArgsLeft <= positionals.length) {
        if (current.isRequired) numRequiredLeft--
        current = positionals.shift()
      }
    })

    return unparsed.slice(unparsed.length - numArgsLeft)
  }
}

module.exports = TypeUnknown
