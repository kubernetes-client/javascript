"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const participantsPath = include("api/projects/repos/pullRequests/participants/path");
const request = include("lib/request");
const toParticipant = include("api/projects/repos/pullRequests/participants/toParticipant");

// Setup
const filterDeleteParams = filterProperties(["username"]);
const filterListParams = filterProperties(asPaged());

module.exports = curryN(4, (config, projectKey, repositorySlug, pullRequestId) => Object.freeze({
  create(values) {
    return request(createOptions.forPost(
      config,
      participantsPath(projectKey, repositorySlug, pullRequestId),
      toParticipant(values)
    ));
  },
  delete(params) {
    return request(createOptions.forDelete(
      config,
      participantsPath(projectKey, repositorySlug, pullRequestId),
      filterDeleteParams(params)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      participantsPath(projectKey, repositorySlug, pullRequestId),
      filterListParams(params)
    ));
  }
}));
