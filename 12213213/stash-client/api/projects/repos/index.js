"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const reposPath = include("api/projects/repos/path");
const request = include("lib/request");
const toRepository = include("api/projects/repos/toRepository");
const toRepositoryFork = include("api/projects/repos/toRepositoryFork");
const toRepositoryUpdate = include("api/projects/repos/toRepositoryUpdate");

// Setup
const filterListParams = filterProperties(asPaged());

module.exports = (config, projectKey) => Object.freeze({
  branches(repositorySlug) {
    return include("api/projects/repos/branches")(config, projectKey, repositorySlug);
  },
  browse(repositorySlug, filePath, params) {
    return include("api/projects/repos/browse")(config, projectKey, repositorySlug, filePath, params);
  },
  changes(repositorySlug, params) {
    return include("api/projects/repos/changes")(config, projectKey, repositorySlug, params);
  },
  create(values) {
    return request(createOptions.forPost(config, reposPath(projectKey), toRepository(values)));
  },
  commits(repositorySlug, params) {
    return include("api/projects/repos/commits")(config, projectKey, repositorySlug, params);
  },
  compare(repositorySlug) {
    return include("api/projects/repos/compare")(config, projectKey, repositorySlug);
  },
  delete(repositorySlug) {
    return request(createOptions.forDelete(config, reposPath(projectKey, repositorySlug)));
  },
  diff(repositorySlug, filePath, params) {
    return include("api/projects/repos/diff")(config, projectKey, repositorySlug, filePath, params);
  },
  files(repositorySlug, filePath, params) {
    return include("api/projects/repos/files")(config, projectKey, repositorySlug, filePath, params);
  },
  fork(repositorySlug, values) {
    return request(createOptions.forPost(
      config,
      reposPath(projectKey, repositorySlug),
      toRepositoryFork(repositorySlug, values)
    ));
  },
  forks(repositorySlug) {
    return include("api/projects/repos/forks")(config, projectKey, repositorySlug);
  },
  get(repositorySlug) {
    return request(createOptions.forGet(config, reposPath(projectKey, repositorySlug)));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      reposPath(projectKey),
      filterListParams(params)
    ));
  },
  permissions(repositorySlug) {
    return include("api/projects/repos/permissions")(config, projectKey, repositorySlug);
  },
  pullRequests(repositorySlug) {
    return include("api/projects/repos/pullRequests")(config, projectKey, repositorySlug);
  },
  recreate(repositorySlug) {
    return include("api/projects/repos/recreate")(config, projectKey, repositorySlug);
  },
  related(repositorySlug) {
    return include("api/projects/repos/related")(config, projectKey, repositorySlug);
  },
  settings(repositorySlug) {
    return include("api/projects/repos/settings")(config, projectKey, repositorySlug);
  },
  tags(repositorySlug, params) {
    return include("api/projects/repos/tags")(config, projectKey, repositorySlug, params);
  },
  update(repositorySlug, values) {
    return request(createOptions.forPut(config, reposPath(projectKey, repositorySlug), toRepositoryUpdate(values)));
  }
});
