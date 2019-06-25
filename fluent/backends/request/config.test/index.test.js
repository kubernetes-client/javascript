/* eslint no-process-env: 0 */
/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const fs = require('fs')
const k8s = require('@kubernetes/client-node')
const sinon = require('sinon')
const yaml = require('js-yaml')

const config = require('../config')

describe('Config', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.convertKubeconfig', () => {
    it('handles basic KubeConfig conversion', () => {
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              server: 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              password: 'foo-password',
              username: 'foo-user'
            }
          }
        ]
      }))
      const covertedOptions = config.convertKubeconfig(kubeconfig)
      expect(covertedOptions.url).to.equal('https://192.168.42.121:8443')
      expect(covertedOptions.auth.user).to.equal('foo-user')
      expect(covertedOptions.auth.pass).to.equal('foo-password')
    })

    it('handles base64 encoded certs and keys', () => {
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              'certificate-authority-data': Buffer.from('certificate-authority-data').toString('base64'),
              'server': 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              'client-certificate-data': Buffer.from('client-certificate').toString('base64'),
              'client-key-data': Buffer.from('client-key').toString('base64')
            }
          }
        ]
      }))
      const args = config.convertKubeconfig(kubeconfig)
      expect(args.ca).equals('certificate-authority-data')
      expect(args.key).equals('client-key')
      expect(args.cert).equals('client-certificate')
    })

    it('handles relative and absolute certs and keys', () => {
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              'certificate-authority': 'ca.pem',
              'server': 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              'client-certificate': '/absolute/path/client.cert',
              'client-key': 'subdir/client.key'
            }
          }
        ]
      }))
      kubeconfig.makePathsAbsolute('/.kube')

      const fsReadFileSync = sandbox.stub(fs, 'readFileSync')
      const yamlSafeLoad = sandbox.stub(yaml, 'safeLoad')

      fsReadFileSync
        .withArgs(sinon.match(/config$/))
        .returns('mock-config')

      fsReadFileSync
        .withArgs(sinon.match('/.kube/ca.pem'))
        .returns('certificate-authority-data')

      fsReadFileSync
        .withArgs(sinon.match('/.kube/subdir/client.key'))
        .returns('client-key-data')

      fsReadFileSync
        .withArgs('/absolute/path/client.cert')
        .returns('client-certificate-data')

      yamlSafeLoad
        .withArgs('mock-config')
        .returns(kubeconfig)

      const args = config.convertKubeconfig(kubeconfig)
      expect(args.ca).equals('certificate-authority-data')
      expect(args.key).equals('client-key-data')
      expect(args.cert).equals('client-certificate-data')
    })

    it('handles token', () => {
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              server: 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              token: 'foo-token'
            }
          }
        ]
      }))
      const args = config.convertKubeconfig(kubeconfig)
      expect(args.auth.bearer).equals('foo-token')
    })

    it('handles auth-provider.config.access-token', () => {
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              server: 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              'auth-provider': {
                config: {
                  'access-token': 'foo-token'
                }
              }
            }
          }
        ]
      }))
      const args = config.convertKubeconfig(kubeconfig)
      expect(args.auth.request.bearer).equals('foo-token')
    })

    it('handles auth-provider.config.idp-issuer-url', () => {
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              server: 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              'auth-provider': {
                config: {
                  'idp-issuer-url': 'https://accounts.google.com'
                }
              }
            }
          }
        ]
      }))
      const args = config.convertKubeconfig(kubeconfig)
      expect(args.auth.provider.type).equals('openid')
    })

    it('handles auth-provider.config.cmd-path', () => {
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              server: 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              'auth-provider': {
                config: {
                  'cmd-path': 'gcloud',
                  'cmd-args': 'config config-helper --format=json'
                }
              }
            }
          }
        ]
      }))
      const args = config.convertKubeconfig(kubeconfig)
      expect(args.auth.provider.type).equals('cmd')
    })

    it('handles user.exec', () => {
      const command = 'foo-command'
      const cmdArgs = ['arg1', 'arg2']
      const envKey = 'foo-env-key'
      const envValue = 'foo-env-value'
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              server: 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              exec: {
                command,
                args: cmdArgs,
                env: [{
                  name: envKey,
                  value: envValue
                }]
              }
            }
          }
        ]
      }))
      const args = config.convertKubeconfig(kubeconfig)
      expect(args.auth.provider.type).equals('cmd')
      expect(args.auth.provider.config['cmd-args']).equals(cmdArgs.join(' '))
      expect(args.auth.provider.config['cmd-path']).equals(command)
      expect(args.auth.provider.config['cmd-env']).deep.equals({ [envKey]: envValue })
    })

    it('handles user.exec without optional env and args', () => {
      const command = 'foo-command'
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context',
        'contexts': [
          {
            name: 'foo-context',
            context: {
              cluster: 'foo-cluster',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster',
            cluster: {
              server: 'https://192.168.42.121:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              exec: {
                command
              }
            }
          }
        ]
      }))
      const args = config.convertKubeconfig(kubeconfig)
      expect(args.auth.provider.type).equals('cmd')
      expect(args.auth.provider.config['cmd-args']).equals('')
      expect(args.auth.provider.config['cmd-path']).equals(command)
      expect(args.auth.provider.config['cmd-env']).deep.equals({})
    })

    it('handles manually specified current-context', () => {
      const kubeconfig = new k8s.KubeConfig()
      kubeconfig.loadFromString(JSON.stringify({
        'apiVersion': 'v1',
        'kind': 'Config',
        'preferences': {},
        'current-context': 'foo-context-1',
        'contexts': [
          {
            name: 'foo-context-1',
            context: {
              cluster: 'foo-cluster-1',
              user: 'foo-user'
            }
          },
          {
            name: 'foo-context-2',
            context: {
              cluster: 'foo-cluster-2',
              user: 'foo-user'
            }
          }
        ],
        'clusters': [
          {
            name: 'foo-cluster-1',
            cluster: {
              server: 'https://192.168.42.121:8443'
            }
          },
          {
            name: 'foo-cluster-2',
            cluster: {
              server: 'https://192.168.42.122:8443'
            }
          }
        ],
        'users': [
          {
            name: 'foo-user',
            user: {
              token: 'foo-token'
            }
          }
        ]
      }))
      kubeconfig.setCurrentContext('foo-context-2')
      const args = config.convertKubeconfig(kubeconfig)
      expect(args.url).equals('https://192.168.42.122:8443')
    })
  })
})
