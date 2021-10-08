"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const request = include("lib/request");
const settingsPath = include("api/users/settings/path");

module.exports = curry((config, userSlug) => Object.freeze({
  get() {
    return request(createOptions.forGet(
      config,
      settingsPath(userSlug)
    ));
  },
  update(values) {
    return request(createOptions.forPost(
      config,
      settingsPath(userSlug),
      values
    ));
  }
}));
