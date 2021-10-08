"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const licensePath = include("api/admin/license/path");
const request = include("lib/request");

// Setup
const toLicense = filterProperties(["license"]);

module.exports = config => Object.freeze({
  get() {
    return request(createOptions.forGet(
      config,
      licensePath()
    ));
  },
  set(values) {
    return request(createOptions.forPost(
      config,
      licensePath(),
      toLicense(values)
    ));
  }
});
