"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const usersPath = include("api/projects/permissions/users/path");

// Setup
const filterDeleteParams = filterProperties(["name"]);
const filterListParams = filterProperties(asPaged(["filter"]));
const filterUpdateParams = filterProperties(["name", "permission"]);

module.exports = curry((config, projectKey) => Object.freeze({
  delete(params) {
    return request(createOptions.forDelete(
      config,
      usersPath(projectKey),
      filterDeleteParams(params)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      usersPath(projectKey),
      filterListParams(params)
    ));
  },
  none(params) {
    return include("api/projects/permissions/users/none")(config, projectKey, params);
  },
  update(params) {
    const body = "";

    return request(createOptions.forPut(
      config,
      usersPath(projectKey),
      body,
      filterUpdateParams(params)
    ));
  }
}));
