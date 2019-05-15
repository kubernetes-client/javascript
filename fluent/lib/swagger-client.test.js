/* eslint-disable max-nested-callbacks */
/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const nock = require('nock')

const Client = require('./swagger-client').Client

const url = 'http://mock.kube.api'

describe('lib.swagger-client', () => {
  describe('.Client', () => {
    describe('.loadSpec', () => {
      describe('on a cluster with the /openapi/v2 route', () => {
        before(() => {
          nock(url)
            .get('/openapi/v2')
            .reply(200, {
              paths: {
                '/api/': {
                  get: {
                    operationId: 'getCoreAPIVersions'
                  }
                }
              }
            })
        })

        it('creates a dynamically generated client', done => {
          const config = { url }
          const client = new Client({ config })
          client.loadSpec()
            .then(() => {
              expect(client.api.get).is.a('function')
              done()
            })
            .catch(err => done(err))
        })
      })

      describe('on a cluster without the /openapi/v2 route but with the /swagger.json route', () => {
        before(() => {
          nock(url)
            .get('/openapi/v2')
            .reply(404, 'Not Found')

          nock(url)
            .get('/swagger.json')
            .reply(200, {
              paths: {
                '/api/': {
                  get: {
                    operationId: 'getCoreAPIVersions'
                  }
                }
              }
            })
        })

        it('creates a dynamically generated client', (done) => {
          const config = { url }
          const client = new Client({ config })
          client.loadSpec()
            .then(() => {
              expect(client.api.get).is.a('function')
              done()
            })
            .catch(err => done(err))
        })
      })

      describe('on a cluster without the /openapi/v2 route and a non-200 status code on /swagger.json', () => {
        before(() => {
          nock(url)
            .get('/openapi/v2')
            .reply(404, 'Not Found')

          nock(url)
            .get('/swagger.json')
            .reply(500, {
              paths: {
                '/api/': {
                  get: {
                    operationId: 'getCoreAPIVersions'
                  }
                }
              }
            })
        })

        it('returns an error message with the status code', (done) => {
          const config = { url }
          const client = new Client({ config })
          client.loadSpec()
            .then(() => {
              const err = new Error('This test should have caused an error')
              done(err)
            })
            .catch(err => {
              expect(err).to.be.an('Error')
              done()
            })
        })
      })

      describe('on a cluster returning a non-200, non-404 status code on the /openapi/v2 route', () => {
        before(() => {
          nock(url)
            .get('/openapi/v2')
            .reply(500, 'Internal Error')

          nock(url)
            .get('/swagger.json')
            .reply(500, {
              paths: {
                '/api/': {
                  get: {
                    operationId: 'getCoreAPIVersions'
                  }
                }
              }
            })
        })

        it('returns an error message with the status code', (done) => {
          const config = { url }
          const client = new Client({ config })
          client.loadSpec()
            .then(() => {
              const err = new Error('This test should have caused an error')
              done(err)
            })
            .catch(err => {
              expect(err).to.be.an('Error')
              done()
            })
        })
      })
    })

    describe('.constructor', () => {
      it('creates a dynamically generated client synchronously based on version', () => {
        const options = { config: {}, version: '1.9' }
        const client = new Client(options)
        expect(client.api.get).is.a('function')
      })

      it('aliases resources', () => {
        const spec = {
          paths: {
            '/foo/deployments': {
              get: {
                operationId: 'fooDeploymentsGet'
              }
            }
          }
        }
        const client = new Client({ spec, backend: {} })
        expect(client.foo.deployments).is.an('object')
        expect(client.foo.deployment).is.an('object')
        expect(client.foo.deploy).is.an('object')
      })

      it('adds functions for Namespaced CustomResourceDefinitions', () => {
        const client = new Client({ spec: { paths: {} }, backend: {} })
        const crd = {
          spec: {
            scope: 'Namespaced',
            group: 'stable.example.com',
            version: 'v1',
            names: {
              plural: 'foos'
            }
          }
        }
        client.addCustomResourceDefinition(crd)
        expect(client.apis['stable.example.com'].v1.foos.get).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').foos.get).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').foos.post).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').foos('blah').get).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').foos('blah').delete).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').foos('blah').get).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').foos('blah').patch).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').foos('blah').put).is.a('function')
        expect(client.apis['stable.example.com'].v1.watch.foos.getStream).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').watch.foos.getStream).is.a('function')
        expect(client.apis['stable.example.com'].v1.namespaces('default').watch.foos('blah').getStream).is.a('function')
      })

      it('adds functions for Cluster CustomResourceDefinitions', () => {
        const client = new Client({ spec: { paths: {} }, backend: {} })
        const crd = {
          spec: {
            scope: 'Cluster',
            group: 'stable.example.com',
            version: 'v1',
            names: {
              plural: 'foos'
            }
          }
        }
        client.addCustomResourceDefinition(crd)
        expect(client.apis['stable.example.com'].v1.foos.get).is.a('function')
        expect(client.apis['stable.example.com'].v1.foos.post).is.a('function')
        expect(client.apis['stable.example.com'].v1.foos('blah').get).is.a('function')
        expect(client.apis['stable.example.com'].v1.foos('blah').delete).is.a('function')
        expect(client.apis['stable.example.com'].v1.foos('blah').get).is.a('function')
        expect(client.apis['stable.example.com'].v1.foos('blah').patch).is.a('function')
        expect(client.apis['stable.example.com'].v1.foos('blah').put).is.a('function')
        expect(client.apis['stable.example.com'].v1.watch.foos.getStream).is.a('function')
        expect(client.apis['stable.example.com'].v1.watch.foos.getStream).is.a('function')
        expect(client.apis['stable.example.com'].v1.watch.foos('blah').getStream).is.a('function')
      })
    })
  })
})
