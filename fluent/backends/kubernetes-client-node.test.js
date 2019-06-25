'use strict'
/* eslint-env mocha */

const { expect } = require('chai')
const sinon = require('sinon')

const ClientNodeBackend = require('./kubernetes-client-node')

describe('lib.backends.kubernetes-client-node', () => {
  it('calls the expected method', done => {
    const fakeK8sClient = { Core_v1Api: 'foo' }
    const fakeKubeconfig = {
      makeApiClient: sinon.spy(() => {
        return {
          getStuff: (bar, foo) => {
            return new Promise((resolve, reject) => {
              expect(bar).to.equal('bar')
              expect(foo).to.equal('foo')
              resolve({
                response: {
                  statusCode: 200
                }
              })
            })
          }
        }
      })
    }

    const options = {
      method: 'GET',
      pathnameParameters: {
        foo: 'foo'
      },
      parameters: {
        bar: 'bar'
      },
      pathItemObject: {
        get: {
          operationId: 'getStuff',
          parameters: [{
            name: 'foo'
          }],
          tags: ['core_v1']
        },
        parameters: [{
          name: 'bar'
        }]
      }
    }

    const client = new ClientNodeBackend({
      client: fakeK8sClient,
      kubeconfig: fakeKubeconfig
    })

    client.http(options)
      .then(res => done())
      .catch(done)
  })
})
