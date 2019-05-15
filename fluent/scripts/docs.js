#!/usr/bin/env node
'use strict'
/* eslint-disable no-sync, no-console */

const fs = require('fs')
const path = require('path')
const mustache = require('mustache')
const zlib = require('zlib')
const { Client } = require('..')

function getOperationGroup (operation) {
  const kubernetesAction = operation['x-kubernetes-action']
  const group = {
    get: 'read',
    list: 'read',
    watch: 'read',
    watchlist: 'read',

    'delete': 'write',
    deletecollection: 'write',
    patch: 'write',
    post: 'write',
    put: 'write',

    connect: 'proxy'
  }[kubernetesAction]
  return group || 'misc'
}

function _walk (component, kinds) {
  if (component.children.length) {
    component.children.forEach(child => {
      _walk(component[child], kinds)
    })
  }
  if (component.template) {
    _walk(component(`{${component.template}}`), kinds)
  }

  const { pathItemObject = null } = component
  if (pathItemObject) {
    ['get', 'delete', 'options', 'patch', 'post', 'put']
      .filter(key => key in pathItemObject)
      .forEach(key => {
        const operation = {
          ...component.pathItemObject[key],
          path: component.getPath(),
          method: key
        }

        if (component.pathItemObject.parameters) {
          operation.parameters = operation.parameters || []
          operation.parameters = operation.parameters.concat(component.pathItemObject.parameters)
        }

        const { kind = null } = operation['x-kubernetes-group-version-kind'] || { kind: 'Cluster' }
        kinds[kind] = kinds[kind] || []
        //
        // kubernetes-client aliases some kinds (e.g., pods -> [pods, pod, po]. Skip aliases.
        //
        if (!kinds[kind].find(existingOperation => existingOperation.operationId === operation.operationId)) {
          kinds[kind].push(operation)
        }
      })
  }
}

/**
 * Setup data for mustache rendering/viewing.
 * @param {object} client - kubernetes-client object.
 * @returns {object} Object mapping kind (e.g., Deployment) to groups (e.g., read or write)
 *   of OpenAPI operations.
 */
function setup (client) {
  const kinds = {}
  _walk(client, kinds)

  const kindsToGroups = Object.keys(kinds).reduce((acc, kindKey) => {
    acc[kindKey] = kinds[kindKey].reduce((kind, operation) => {
      const operationGroup = getOperationGroup(operation)
      kind[operationGroup] = kind[operationGroup] || []

      let hasQueryParameters = false
      let hasPathParameters = false
      let hasBodyParameters = false
      const parameters = operation.parameters || []
      parameters.forEach(parameter => {
        if (parameter.in === 'query') {
          parameter.isQueryParameter = true
          hasQueryParameters = true
        } else if (parameter.in === 'path') {
          parameter.isPathParameter = true
          hasPathParameters = true
        } else if (parameter.in === 'body') {
          parameter.isBodyParameter = true
          hasBodyParameters = true
        }
      })
      operation.hasQueryParameters = hasQueryParameters
      operation.hasPathParameters = hasPathParameters
      operation.hasBodyParameters = hasBodyParameters

      kind[operationGroup].push(operation)
      return kind
    }, {})
    return acc
  }, {})

  return kindsToGroups
}

function kindFilePath (kind) {
  return `${kind}.md`
}

function generateClient ({ kindsToGroups, output }) {
  const view = {
    kinds: Object.keys(kindsToGroups).map(kind => {
      return Object.assign({ kind }, kindsToGroups[kind])
    }),
    kindTarget: function () {
      if (output) return kindFilePath(this.kind)
      return `#${this.kind}`
    }
  }

  const source = mustache.render(
    fs.readFileSync(path.join(__dirname, 'templates/markdown-client.mustache')).toString(),
    view
  )

  if (output) {
    const filePath = path.join(output, 'README.md')
    fs.writeFileSync(filePath, source)
  } else {
    console.log(source)
  }
}

function generateKind ({ kind, output }) {
  const view = {
    kindKey: kind.kindKey,
    groups: Object.keys(kind.groups).map(group => ({
      groupKey: group,
      operations: kind.groups[group]
    })),
    /**
     * Replace newline characters in rendered text with <br/>s.
     * @returns {function} function
     */
    markdownBreaks: function () {
      return function (text, render) {
        return render(text)
          .replace(/\r\n/g, '<br/>')
          .replace(/\n/g, '<br/>')
      }
    },
    /**
     * When in a method section, return the full kubernetes-client name.
     * @returns {function} function
     */
    jsName: function () {
      return function () {
        const leadingAndTrailingSlashes = /(^\/)|(\/$)/g
        const jsName = this.path
          .replace(leadingAndTrailingSlashes, '')
          .replace(/\/{/g, '(') // replace /{ with (
          .replace(/}\//g, ').') // replace }/ with ).
          .replace(/}/g, ')') // replace } with )
          .replace(/\//g, '.') // replace / with .
        return `${jsName}.${this.method.toLowerCase()}`
      }
    }
  }
  const partials = {
    group: fs.readFileSync(path.join(__dirname, 'templates/markdown-group.mustache')).toString(),
    operation: fs.readFileSync(path.join(__dirname, 'templates/markdown-operation.mustache')).toString()
  }

  const source = mustache.render(
    fs.readFileSync(path.join(__dirname, 'templates/markdown-kind.mustache')).toString(),
    view,
    partials
  )

  if (output) {
    const filePath = path.join(output, kindFilePath(kind.kindKey))
    fs.writeFileSync(filePath, source)
  } else {
    console.log(source)
  }
}

function generate (input, output) {
  let raw = fs.readFileSync(input)
  if (input.endsWith('.gz')) {
    raw = zlib.gunzipSync(raw)
  }
  const spec = JSON.parse(raw)
  const client = new Client({ spec, backend: {} })

  const kindsToGroups = setup(client)

  try {
    fs.mkdirSync(output)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }

  generateClient({ kindsToGroups, output })
  Object.entries(kindsToGroups).forEach(([kindKey, groups]) => {
    generateKind({
      kind: {
        kindKey,
        groups
      },
      output
    })
  })
}

function main (args) {
  if (args.builtins) {
    const specs = './lib/specs'
    fs.readdirSync(specs).forEach(filename => {
      const versionRegExp = /swagger-(.+)\.json.gz/
      const match = filename.match(versionRegExp)
      if (!match) {
        console.log(`Skipping ${filename}`)
        return
      }
      const version = match[1]
      const output = `./docs/${version}`
      generate(path.join(specs, filename), output)
    })
  }

  if (args.spec) {
    generate(args.spec, args.output)
  }
}

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .option('spec', {
    alias: 's',
    describe: 'Swagger / OpenAPI specification'
  })
  .option('output', {
    alias: 'o',
    describe: 'Markdown output file'
  })
  .option('builtins', {
    describe: 'Generate Markdown for builtin specifications'
  })
  .strict()
  .help()
  .argv

main(argv)
