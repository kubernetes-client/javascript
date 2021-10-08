"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const usersPath = include("api/projects/repos/permissions/users/path");

// Setup
const filterDeleteParams = filterProperties(["name"]);
const filterListParams = filterProperties(asPaged(["filter"]));
const filterUpdateParams = filterProperties(["name", "permission"]);

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  delete(params) {
    return request(createOptions.forDelete(config, usersPath(projectKey, repositorySlug), filterDeleteParams(params)));
  },
  list(params) {
    return request(createOptions.forGet(config, usersPath(projectKey, repositorySlug), filterListParams(params)));
  },
  none(params) {
    return include("api/projects/repos/permissions/users/none")(config, projectKey, repositorySlug, params);
  },
  update(params) {
    const body = "";

    return request(createOptions.forPut(
      config,
      usersPath(projectKey, repositorySlug),
      body,
      filterUpdateParams(params)
    ));
  }
}));
