"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const asBinary = include("src/createOptions/asBinary");
const avatarPath = include("api/hooks/avatar/path");
const createOptions = include("src/createOptions");
const filterParams = include("src/filterProperties")(["version"]);
const request = include("lib/request");

module.exports = curry((config, hookKey) => Object.freeze({
  get(params) {
    return request(asBinary(createOptions.forGet(
      config,
      avatarPath(hookKey),
      filterParams(params)
    )));
  }
}));
