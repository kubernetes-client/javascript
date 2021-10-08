"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const allPath = include("api/projects/permissions/all/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterSetParams = filterProperties(["allow"]);

module.exports = curry((config, projectKey, permission) => Object.freeze({
  get() {
    return request(createOptions.forGet(
      config,
      allPath(projectKey, permission)
    ));
  },
  set(params) {
    const body = "";

    return request(createOptions.forPost(
      config,
      allPath(projectKey, permission),
      body,
      filterSetParams(params)
    ));
  }
}));
