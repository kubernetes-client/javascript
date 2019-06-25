/* eslint-env mocha */
'use strict'

const { expect } = require('chai')
const nock = require('nock')

const KubeConfig = require('../../lib/config')
const Request = require('./client')

const url = 'http://mock.kube.api'
const kubeconfig = new KubeConfig()
kubeconfig.loadFromClusterAndUser(
  { name: 'cluster', server: url },
  { name: 'user' })

describe('lib.backends.request', () => {
  describe('Request', () => {
    it('handles empty responses', done => {
      nock(url)
        .get('/foo')
        .reply(200)

      const backend = new Request({ kubeconfig })
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
