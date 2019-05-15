/* eslint-env mocha */
'use strict'

const { expect } = require('chai')
const nock = require('nock')

const Request = require('./request')

const url = 'http://mock.kube.api'

describe('lib.backends.request', () => {
  describe('Request', () => {
    it('handles empty responses', done => {
      nock(url)
        .get('/foo')
        .reply(200)

      const backend = new Request({ url })
      backend.http({
        method: 'GET',
        pathname: '/foo'
      }).then(res => {
        expect(res.body).to.be.an('undefined')
        done()
      })
    })
  })
})
