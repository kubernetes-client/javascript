/* eslint-env mocha */
'use strict'

const expect = require('chai').expect

const matchExpression = require('./match-expression')

describe('lib.match-expressions', () => {
  describe('.stringify', () => {
    it('compiles arrays', () => {
      const s = matchExpression.stringify([{
        key: 'name',
        operator: 'In',
        values: ['name0']
      }, {
        key: 'service',
        operator: 'NotIn',
        values: ['service0']
      }])
      expect(s).is.equal('name in (name0),service notin (service0)')
    })
    it('handles exists', () => {
      const s = matchExpression.stringify({ key: 'name' })
      expect(s).is.equal('name')
    })
    it('handles does not exist', () => {
      const s = matchExpression.stringify({ key: 'name', operator: 'DoesNotExist' })
      expect(s).is.equal('!name')
    })
  })
})
