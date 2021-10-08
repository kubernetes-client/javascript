"use strict";

// Third Party
const defaults = require("lodash/defaults");

module.exports = (config, path, params) => {
  const defaultLimit = 100;

  return Object.freeze({
    auth: {
      pass: config.password,
      user: config.username
    },
    json: true,
    method: "GET",
    qs: defaults({}, params || {}, {
      limit: config.limit || defaultLimit
    }),
    url: config.url + path
  });
};
