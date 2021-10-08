"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const applicationPropertiesPath = include("api/applicationProperties/path");
const createOptions = include("src/createOptions");
const request = include("lib/request");

module.exports = config => Object.freeze({
  get() {
    return request(createOptions.forGet(
      config,
      applicationPropertiesPath()
    ));
  }
});
