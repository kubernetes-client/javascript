"use strict";

// Third Party
const defaultsDeep = require("lodash/defaultsDeep");

module.exports = options => defaultsDeep({
  headers: {
    "Content-Type": "text/plain"
  },
  json: false
}, options);
