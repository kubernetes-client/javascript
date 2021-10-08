"use strict";

// Third Party
const defaults = require("lodash/defaults");

module.exports = options => defaults({
  encoding: "binary",
  json: false
}, options);
