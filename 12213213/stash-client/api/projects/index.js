"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const projectsPath = include("api/projects/path");
const request = include("lib/request");
const toProject = include("api/projects/toProject");

// Setup
const filterListParams = filterProperties(asPaged(["name", "permission"]));

module.exports = config => Object.freeze({
  avatar(projectKey) {
    return include("api/projects/avatar")(config, projectKey);
  },
  create(values) {
    return request(createOptions.forPost(config, projectsPath(), toProject(values)));
  },
  delete(projectKey) {
    return request(createOptions.forDelete(config, projectsPath(projectKey)));
  },
  get(projectKey) {
    return request(createOptions.forGet(config, projectsPath(projectKey)));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      projectsPath(),
      filterListParams(params)
    ));
  },
  permissions(projectKey) {
    return include("api/projects/permissions")(config, projectKey);
  },
  repos(projectKey) {
    return include("api/projects/repos")(config, projectKey);
  },
  update(projectKey, values) {
    return request(createOptions.forPut(config, projectsPath(projectKey), toProject(values)));
  }
});
