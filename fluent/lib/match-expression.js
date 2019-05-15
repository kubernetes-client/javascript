'use strict'

/**
 * Kubernetes Match Expression.
 * @typedef {object} MatchExpression
 * @property {string} key - Label key
 * @property {string} operator - 'In', 'NotIn', 'Exists', or 'DoesNotExist'
 * @property {string[]} values - Array of lable values
 */

function stringify (expressions) {
  if (Array.isArray(expressions)) {
    return expressions.map(stringify).join(',')
  }

  if (!expressions.operator) return expressions.key

  const operator = expressions.operator.toLowerCase()
  if (operator === 'doesnotexist') return `!${expressions.key}`
  if (operator === 'exits') return expressions.key
  return [
    expressions.key,
    operator,
    `(${expressions.values.join(',')})`].join(' ')
}

module.exports.stringify = stringify
