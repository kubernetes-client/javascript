#!/usr/bin/env node
'use strict'
/* eslint-disable no-sync, no-console */

const fs = require('fs')
const mustache = require('mustache')
const path = require('path')
const zlib = require('zlib')

const Client = require('..').Client

/**
 * Get the typescript interface name for a swagger-fluent component.
 * @param {object} component - swagger-fluent Component.
 * @returns {string} TypeScript interface name
 */
function interfaceName (component) {
  // Root doesn't have splits
  if (component.splits.length === 0) {
    return 'ApiRoot'
  }

  //
  // Replace '.'s with '_'s and CamelCase.
  //
  return component.splits
    .map(split => split.replace(/\./g, '_').replace(/./, first => first.toUpperCase()))
    .join('')
}

function walk (component, interfaces) {
  const properties = []
  let callable = null

  if (component.children.length) {
    component.children.forEach(child => {
      const type = walk(component[child], interfaces)
      properties.push({ name: child, type })
    })
  }
  if (component.templated) {
    const type = walk(component('name'), interfaces)
    callable = { name: 'name', type }
  }

  const calls = [
    'get',
    'getStream',
    'delete',
    'patch',
    'post',
    'put'
  ].filter(call => call in component)
    .map(method => ({
      method,
      parameterType: 'any',
      returnType: 'any'
    }))

  const tsName = interfaceName(component)
  const templateOptions = {
    callable,
    calls,
    properties,
    tsName
  }
  if (!interfaces.find(iface => iface.tsName === tsName)) {
    interfaces.push(templateOptions)
  }

  return tsName
}

function main (args) {
  let raw = fs.readFileSync(args.spec)
  if (args.spec.endsWith('.gz')) {
    raw = zlib.gunzipSync(raw)
  }
  const spec = JSON.parse(raw)
  let clientSuffix = ''
  if (spec.info.version) {
    clientSuffix = spec.info.version.replace(/v/, '').split('.').slice(0, 2).join('_')
  }
  const interfaces = []

  const backend = {}
  const client = new Client({ backend, spec })
  walk(client, interfaces)

  const templateOptions = {
    clientSuffix,
    interfaces
  }

  const source = mustache.render(
    fs.readFileSync(path.join(__dirname, 'templates/ts-namespace.mustache')).toString(),
    templateOptions,
    {
      tsInterface: fs.readFileSync(path.join(__dirname, 'templates/ts-interface.mustache')).toString()
    })

  if (args.output) {
    fs.writeFileSync(args.output, source)
  } else {
    console.log(source)
  }
}

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .option('spec', {
    alias: 's',
    default: './lib/specs/swagger-1.13.json.gz',
    describe: 'Swagger / OpenAPI specification'
  })
  .option('output', {
    alias: 'o',
    describe: 'Declaration file'
  })
  .strict()
  .help()
  .argv

main(argv)
