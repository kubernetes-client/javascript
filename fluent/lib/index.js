const deprecate = require('depd')('kubernetes-client')

module.exports = {
  Client: require('./swagger-client').Client,
  Client1_13: require('./swagger-client').Client1_13,
  alias: require('./alias'),
  config: require('../backends/request/config'),
  KubeConfig: require('./config')
}

deprecate.property(
  module.exports,
  'config',
  'require(\'kubernetes-client\').config,' +
    ' use require(\'kubernetes-client/backends/request\').config.')
