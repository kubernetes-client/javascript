/**
 * Refreshes a OpenID token.
 */

'use strict'

const Issuer = require('openid-client').Issuer

module.exports = {
  refresh: function (config) {
    return new Promise((resolve, reject) => {
      Issuer.discover(config['idp-issuer-url'])
        .then(function (ourIssuer) {
          const client = new ourIssuer.Client({
            client_id: config['client-id'],
            client_secret: config['client-secret']
          })

          return client.refresh(config['refresh-token'])
        })
        .then(tokenSet => {
          return resolve(tokenSet.id_token)
        })
        .catch(reject)
    })
  }
}
