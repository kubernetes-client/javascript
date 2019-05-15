'use strict'

const request = require('request')
const qs = require('qs')
const urljoin = require('url-join')
const WebSocket = require('ws')

/**
 * Refresh whatever authentication {type} is.
 * @param {String} type - type of authentication
 * @param {Object} config - auth provider config
 * @returns {Promise} with request friendly auth object
 */
function refreshAuth (type, config) {
  return new Promise((resolve, reject) => {
    const provider = require(`../auth-providers/${type}.js`)
    provider.refresh(config)
      .then(result => {
        const auth = {
          bearer: result
        }

        return resolve(auth)
      })
      .catch(err => reject(err))
  })
}

const execChannels = [
  'stdin',
  'stdout',
  'stderr',
  'error',
  'resize'
]

/**
 * Determine whether a failed Kubernetes API response is asking for an upgrade
 * @param {object} body - response body object from Kubernetes
 * @property {string} status - request status
 * @property {number} code - previous request's response code
 * @property {message} message - previous request response message
 * @returns {boolean} Upgrade the request
 */

function isUpgradeRequired (body) {
  return body.status === 'Failure' &&
    body.code === 400 &&
    body.message === 'Upgrade request required'
}

/**
 * Upgrade a request into a Websocket transaction & process the result
 * @param {ApiRequestOptions} options - Options object
 * @param {callback} cb - The callback that handles the response
 */

function upgradeRequest (options, cb) {
  const queryParams = qs.stringify(options.qs, { indices: false })
  const wsUrl = urljoin(options.baseUrl, options.uri, `?${queryParams}`)
  const protocol = 'base64.channel.k8s.io'
  const ws = new WebSocket(wsUrl, protocol, options)

  const messages = []
  ws.on('message', (msg) => {
    const channel = execChannels[msg.slice(0, 1)]
    const message = Buffer.from(msg.slice(1), 'base64').toString('ascii')
    messages.push({ channel, message })
  })

  ws.on('error', (err) => {
    err.messages = messages
    cb(err, messages)
  })

  ws.on('close', (code, reason) => cb(null, {
    messages,
    body: messages.map(({ message }) => message).join(''),
    code,
    reason
  }))

  return ws
}

class Request {
  /**
   * Internal representation of HTTP request object.
   *
   * @param {object} options - Options object
   * @param {string} options.url - Kubernetes API URL
   * @param {object} options.auth - request library auth object
   * @param {string} options.ca - Certificate authority
   * @param {string} options.cert - Client certificate
   * @param {string} options.key - Client key
   * @param {boolean} options.insecureSkipTlsVerify - Skip the validity check
   *   on the server's certificate.
   */
  constructor (options) {
    this.requestOptions = options.request || {}
    this.requestOptions.qsStringifyOptions = { indices: false }
    this.requestOptions.baseUrl = options.url
    this.requestOptions.ca = options.ca
    this.requestOptions.cert = options.cert
    this.requestOptions.key = options.key
    if ('insecureSkipTlsVerify' in options) {
      this.requestOptions.strictSSL = !options.insecureSkipTlsVerify
    }
    if ('timeout' in options) {
      this.requestOptions.timeout = options.timeout
    }

    this.authProvider = {
      type: null
    }
    if (options.auth) {
      this.requestOptions.auth = options.auth
      if (options.auth.provider) {
        this.requestOptions.auth = options.auth.request
        this.authProvider = options.auth.provider
      }
    }
  }

  _request (options, cb) {
    const auth = this.authProvider
    return request(options, (err, res, body) => {
      if (err) return cb(err)

      if (body && isUpgradeRequired(body)) {
        return upgradeRequest(options, cb)
      }

      // Refresh auth if 401 or 403
      if ((res.statusCode === 401 || res.statusCode === 403) && auth.type) {
        return refreshAuth(auth.type, auth.config)
          .then(newAuth => {
            this.requestOptions.auth = newAuth
            options.auth = newAuth
            return request(options, (err, res, body) => {
              if (err) return cb(err)
              return cb(null, { statusCode: res.statusCode, body })
            })
          })
          .catch(err => cb(err))
      }

      return cb(null, { statusCode: res.statusCode, body: body })
    })
  }

  /**
   * @typedef {object} ApiRequestOptions
   * @property {object} body - Request body
   * @property {object} headers - Headers object
   * @property {string} path - version-less path
   * @property {object} qs - {@link https://www.npmjs.com/package/request#requestoptions-callback|
   *                          request query parameter}
   */

  /**
   * Invoke a REST request against the Kubernetes API server
   * @param {string} method - HTTP method, passed directly to `request`
   * @param {ApiRequestOptions} options - Options object
   * @param {callback} cb - The callback that handles the response
   * @returns {Stream} If cb is falsy, return a stream
   */
  http (options) {
    const uri = options.pathname
    const requestOptions = Object.assign({
      method: options.method,
      uri,
      body: options.body,
      json: 'json' in options ? Boolean(options.json) : true,
      qs: options.parameters || options.qs,
      headers: options.headers
    }, this.requestOptions)

    if (options.noAuth) {
      delete requestOptions.auth
    }

    if (options.stream) return request(requestOptions)

    return new Promise((resolve, reject) => {
      this._request(requestOptions, (err, res) => {
        if (err) return reject(err)
        if (res.statusCode < 200 || res.statusCode > 299) {
          const error = new Error(res.body.message || res.body)
          // .code is backwards compatible with pre-5.0.0 code.
          error.code = res.statusCode
          error.statusCode = res.statusCode
          return reject(error)
        }
        resolve(res)
      })
    })
  }
}

module.exports = Request
