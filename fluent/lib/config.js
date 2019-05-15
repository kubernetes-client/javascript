'use strict'
/* eslint no-process-env: 0 no-sync:0 */

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const merge = require('deepmerge')

const root = process.env.KUBERNETES_CLIENT_SERVICEACCOUNT_ROOT || '/var/run/secrets/kubernetes.io/serviceaccount/'
const caPath = path.join(root, 'ca.crt')
const tokenPath = path.join(root, 'token')
const namespacePath = path.join(root, 'namespace')

function defaultConfigPaths () {
  if (process.env.KUBECONFIG) {
    // From https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/#set-the-kubeconfig-environment-variable
    // KUBECONFIG can support multiple config files.
    const delimiter = process.platform === 'win32' ? ';' : ':'
    return process.env.KUBECONFIG.split(delimiter)
  }
  const homeDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
  return [path.join(homeDir, '.kube', 'config')]
}

/**
* Returns with in cluster config
* Based on: https://github.com/kubernetes/client-go/blob/124670e99da15091e13916f0ad4b2b2df2a39cd5/rest/config.go#L274
* and http://kubernetes.io/docs/user-guide/accessing-the-cluster/#accessing-the-api-from-a-pod
*
* @function getInCluster
* @returns {Object} { url, cert, auth, namespace }
*/
function getInCluster () {
  const host = process.env.KUBERNETES_SERVICE_HOST
  const port = process.env.KUBERNETES_SERVICE_PORT
  if (!host || !port) {
    throw new TypeError(
      'Unable to load in-cluster configuration, KUBERNETES_SERVICE_HOST' +
      ' and KUBERNETES_SERVICE_PORT must be defined')
  }

  const ca = fs.readFileSync(caPath, 'utf8')
  const bearer = fs.readFileSync(tokenPath, 'utf8')
  const namespace = fs.readFileSync(namespacePath, 'utf8')

  return {
    url: `https://${host}:${port}`,
    ca,
    auth: { bearer },
    namespace
  }
}

module.exports.getInCluster = getInCluster

//
// Accept a manually specified current-context to take precedence over
// `current-context`
//
/* eslint-disable complexity, max-statements */
function fromKubeconfig (kubeconfig, current) {
  if (!kubeconfig) kubeconfig = loadKubeconfig()
  // if kubeconfig is provided as a path to the yaml file,
  // or array of paths to the yaml files,
  // automatically load it.
  if (typeof kubeconfig === 'string' || Array.isArray(kubeconfig)) {
    kubeconfig = loadKubeconfig(kubeconfig)
  }

  current = current || kubeconfig['current-context']
  const context = kubeconfig.contexts
    .find(item => item.name === current).context
  const cluster = kubeconfig.clusters
    .find(item => item.name === context.cluster).cluster
  const userConfig = kubeconfig.users
    .find(user => user.name === context.user)
  const user = userConfig ? userConfig.user : null
  const namespace = context.namespace

  let ca
  let insecureSkipTlsVerify = false
  if (cluster) {
    if (cluster['certificate-authority']) {
      ca = fs.readFileSync(path.normalize(cluster['certificate-authority']))
    } else if (cluster['certificate-authority-data']) {
      ca = Buffer.from(cluster['certificate-authority-data'], 'base64').toString()
    }

    if (cluster['insecure-skip-tls-verify']) {
      insecureSkipTlsVerify = cluster['insecure-skip-tls-verify']
    }
  }

  let cert
  let key

  let auth = {}
  if (user) {
    if (user['client-certificate']) {
      cert = fs.readFileSync(path.normalize(user['client-certificate']))
    } else if (user['client-certificate-data']) {
      cert = Buffer.from(user['client-certificate-data'], 'base64').toString()
    }

    if (user['client-key']) {
      key = fs.readFileSync(path.normalize(user['client-key']))
    } else if (user['client-key-data']) {
      key = Buffer.from(user['client-key-data'], 'base64').toString()
    }

    if (user.token) {
      auth.bearer = user.token
    }

    if (user['auth-provider']) {
      const config = user['auth-provider'].config

      // if we can't determine the type, just fail later (or don't refresh).
      let type = null
      let token = null
      if (config['cmd-path']) {
        type = 'cmd'
        token = config['access-token']
      } else if (config['idp-issuer-url']) {
        type = 'openid'
        token = config['id-token']
      }

      // If we have just an access-token, allow that... will expire later though.
      if (config['access-token'] && !type) {
        token = config['access-token']
      }

      auth = {
        request: {
          bearer: token
        },
        provider: {
          config,
          type
        }
      }
    }

    if (user.exec) {
      const env = {}
      if (user.exec.env) {
        user.exec.env.forEach(variable => {
          env[variable.name] = variable.value
        })
      }
      let args = ''
      if (user.exec.args) {
        args = user.exec.args.join(' ')
      }
      auth = {
        provider: {
          type: 'cmd',
          config: {
            'cmd-args': args,
            'cmd-path': user.exec.command,
            'token-key': 'status.token',
            'cmd-env': env
          }
        }
      }
    }

    if (user.username) auth.user = user.username
    if (user.password) auth.pass = user.password
  }

  return {
    url: cluster.server,
    namespace,
    auth: Object.keys(auth).length ? auth : null,
    ca,
    insecureSkipTlsVerify,
    key,
    cert
  }
}
/* eslint-enable complexity, max-statements */

module.exports.fromKubeconfig = fromKubeconfig

function mapCertificates (cfgPath, config) {
  const configDir = path.dirname(cfgPath)

  if (config.clusters) {
    config.clusters.filter(cluster => cluster.cluster['certificate-authority']).forEach(cluster => {
      cluster.cluster['certificate-authority'] = path.resolve(configDir, cluster.cluster['certificate-authority'])
    })
  }

  if (config.users) {
    config.users.filter(user => user.user['client-certificate']).forEach(user => {
      user.user['client-certificate'] = path.resolve(configDir, user.user['client-certificate'])
    })

    config.users.filter(user => user.user['client-key']).forEach(user => {
      user.user['client-key'] = path.resolve(configDir, user.user['client-key'])
    })
  }

  return config
}

function loadKubeconfig (cfgPath) {
  let cfgPaths

  if (!cfgPath) {
    cfgPaths = defaultConfigPaths()
  } else if (Array.isArray(cfgPath)) {
    cfgPaths = cfgPath
  } else {
    cfgPaths = [cfgPath]
  }

  const configs = cfgPaths.map(cfgPath => {
    const config = yaml.safeLoad(fs.readFileSync(cfgPath))
    return mapCertificates(cfgPath, config)
  })

  return merge.all(configs)
}

module.exports.loadKubeconfig = loadKubeconfig
