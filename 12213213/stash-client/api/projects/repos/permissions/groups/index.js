"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const groupsPath = include("api/projects/repos/permissions/groups/path");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterDeleteParams = filterProperties(["name"]);
const filterListParams = filterProperties(asPaged(["filter"]));
const filterUpdateParams = filterProperties(["name", "permission"]);

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  delete(params) {
    return request(createOptions.forDelete(config, groupsPath(projectKey, repositorySlug), filterDeleteParams(params)));
  },
  list(params) {
    return request(createOptions.forGet(config, groupsPath(projectKey, repositorySlug), filterListParams(params)));
  },
  none(params) {
    return include("api/projects/repos/permissions/groups/none")(config, projectKey, repositorySlug, params);
  },
  update(params) {
    const body = "";

    return request(createOptions.forPut(
      config,
      groupsPath(projectKey, repositorySlug),
      body,
      filterUpdateParams(params)
    ));
  }
}));
