/**
 * Fetches a bearer token via comamnd
 */

'use strict'

// for API compatability
/* eslint no-sync: 0 */
const spawnSync = require('child_process').spawnSync

function getProperty (propertyName, object) {
  // remove leading .
  if (propertyName.match(/^\./)) {
    propertyName = propertyName.replace(/^\./, '')
  }

  const parts = propertyName.split('.')
  const length = parts.length

  let property = object || this
  for (let i = 0; i < length; i++) {
    property = property[parts[i]]
  }

  return property
}

module.exports = {
  refresh: function (config) {
    return new Promise((resolve, reject) => {
      const cmd = config['cmd-path']
      const args = config['cmd-args'].split(' ')
      const cmdEnv = config['cmd-env']

      const output = spawnSync(cmd, args, {
        env: Object.assign({}, process.env, cmdEnv),
        windowsHide: true
      })

      let result
      try {
        result = JSON.parse(output.stdout.toString('utf8'))
      } catch (err) {
        return reject(new Error('Failed to run cmd.'))
      }

      const token = getProperty(config['token-key'].replace(/[{}]+/g, ''), result)

      return resolve(token)
    })
  }
}
