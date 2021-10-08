"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const groupsPath = include("api/projects/permissions/groups/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterDeleteParams = filterProperties(["name"]);
const filterListParams = filterProperties(asPaged(["filter"]));
const filterUpdateParams = filterProperties(["name", "permission"]);

module.exports = curry((config, projectKey) => Object.freeze({
  delete(params) {
    return request(createOptions.forDelete(
      config,
      groupsPath(projectKey),
      filterDeleteParams(params)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      groupsPath(projectKey),
      filterListParams(params)
    ));
  },
  none(params) {
    return include("api/projects/permissions/groups/none")(config, projectKey, params);
  },
  update(params) {
    const body = "";

    return request(createOptions.forPut(
      config,
      groupsPath(projectKey),
      body,
      filterUpdateParams(params)
    ));
  }
}));
