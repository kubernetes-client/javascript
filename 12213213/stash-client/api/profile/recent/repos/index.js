"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const reposPath = include("api/profile/recent/repos/path");
const request = include("lib/request");

// Setup
const filterGetParams = filterProperties(asPaged(["permission"]));

module.exports = config => Object.freeze({
  list(params) {
    return request(createOptions.forGet(
      config,
      reposPath(),
      filterGetParams(params)
    ));
  }
});
