"use strict";

// Third Party
const defaultsDeep = require("lodash/defaultsDeep");

module.exports = (options, formData) => defaultsDeep({
  formData: formData,
  headers: {
    "X-Atlassian-Token": "no-check"
  },
  json: false
}, options);
