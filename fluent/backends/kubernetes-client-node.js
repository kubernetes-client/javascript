'use strict'

const camelCase = require('camelcase')
const k8s = require('@kubernetes/client-node')
const { PassThrough, Readable } = require('stream')

//
// https://github.com/kubernetes-client/javascript
//
class ClientNodeBackend {
  constructor (options) {
    this.client = options.client || k8s
    this.kubeconfig = options.kubeconfig
    this.apiClients = { }
  }

  _getApiClient (tag) {
    const apiType = camelCase(tag, { pascalCase: true }) + 'Api'
    if (!(apiType in this.apiClients)) {
      this.apiClients[apiType] = this.kubeconfig.makeApiClient(this.client[apiType])
    }
    return this.apiClients[apiType]
  }

  getLogByteStream (options) {
    const log = new this.client.Log(this.kubeconfig)
    const qs = options.qs || options.parameters || {}
    const containerName = qs.container
    const stream = new PassThrough()

    //
    // node-client pipes to the log stream iff the apiserver returns 200. Assume
    // that if the stream is readable, then node-client has attached the pipe
    // and the call was successful.
    //
    // Otherwise, node-client calls the callback with an err.
    //
    // node-client also calls the callback when the connection terminates. We
    // ignore that.
    //
    return new Promise((resolve, reject) => {
      stream.once('readable', () => {
        resolve(stream)
      })
      log.log(options.pathnameParameters.namespace,
        options.pathnameParameters.name,
        containerName,
        stream,
        err => { if (err) return reject(err) },
        qs)
    })
  }

  async getWatchObjectStream (options) {
    const watch = new this.client.Watch(this.kubeconfig)

    const stream = new Readable({
      objectMode: true,
      read: () => { /* .watch callback pushes to stream below */ },
      destroy: (err, cb) => {
        req.destroy(err)
        req.abort()
        cb(err)
      }
    })

    const req = watch.watch(
      options.pathname,
      Object.assign({}, options.qs, options.parameters),
      (type, object) => stream.push({ type, object }),
      err => stream.destroy(err)
    )

    return stream
  }

  http (options) {
    const pathItemObject = options.pathItemObject
    const operationObject = pathItemObject[options.method.toLowerCase()]
    const tag = operationObject.tags[0]

    const apiClient = this._getApiClient(tag)

    //
    // In older Kubernetes API OpenAPI specifications the Operation IDs include
    // the tag, but in newer versions (including the ones used to generate
    // @kubernetes/client-node), the tag is absent.
    //
    // Support older versions of the Swagger specifications by removing the tag
    // part.
    //
    const method = operationObject.operationId.replace(camelCase(tag, { pascalCase: true }), '')

    //
    // @kubernetes/client-node methods take parameters in the order the OpenAPI
    // specification declares them.
    //
    const parameterObjects = (pathItemObject.parameters || []).concat(operationObject.parameters || [])
    const orderedParameterObjects = parameterObjects
      .filter(parameterObject => parameterObject.required)
      .concat(parameterObjects
        .filter(parameterObject => !parameterObject.required))

    //
    // Older versions of the Kubernetes API OpenAPI specifications requires body
    // for _some_ delete operations (e.g., deleteNamespacedDeployment). The API
    // does not actually require it and newer specifications remove the
    // requirement. Try to Workaround this issue by adding an empty body to
    // @kubernetes/client-node calls.
    //
    let body = options.body
    if (options.method.toLowerCase() === 'delete' && !body) {
      body = {}
    }

    const parameters = Object.assign(
      { body },
      options.pathnameParameters,
      options.qs,
      options.parameters)
    const args = orderedParameterObjects.reduce((acc, operationParameter) => {
      const name = operationParameter.name
      if (name in parameters) acc.push(parameters[name])
      else acc.push(undefined)
      return acc
    }, [])

    const extraOptions = {}
    if (options.headers) {
      extraOptions.headers = options.headers
    }
    args.push(extraOptions)

    return apiClient[method].apply(apiClient, args)
      .then(res => {
        res.statusCode = res.response.statusCode
        return res
      })
      .catch(err => {
        if (!err.body) throw err
        const error = new Error(err.body.message)
        // .code is backwards compatible with pre-5.0.0 code.
        error.code = err.response.statusCode
        error.statusCode = err.response.statusCode
        throw error
      })
  }
}

module.exports = ClientNodeBackend
