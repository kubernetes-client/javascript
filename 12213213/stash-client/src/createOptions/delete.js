"use strict";

module.exports = (config, path, params) => Object.freeze({
  auth: {
    pass: config.password,
    user: config.username
  },
  json: true,
  method: "DELETE",
  qs: params,
  url: config.url + path
});
