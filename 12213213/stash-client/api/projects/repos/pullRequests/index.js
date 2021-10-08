"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const pullRequestsPath = include("api/projects/repos/pullRequests/path");
const request = include("lib/request");
const toPullRequest = include("api/projects/repos/pullRequests/toPullRequest");
const toPullRequestUpdate = include("api/projects/repos/pullRequests/toPullRequestUpdate");

// Setup
const filterListParams = filterProperties(asPaged(
  ["at", "direction", "order", "state", "withAttributes", "withProperties"]
));

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  activities(pullRequestId, params) {
    return include("api/projects/repos/pullRequests/activities")(
      config, projectKey, repositorySlug, pullRequestId, params
    );
  },
  approve(pullRequestId) {
    return include("api/projects/repos/pullRequests/approve")(config, projectKey, repositorySlug, pullRequestId);
  },
  canMerge(pullRequestId) {
    return include("api/projects/repos/pullRequests/canMerge")(config, projectKey, repositorySlug, pullRequestId);
  },
  changes(pullRequestId, params) {
    return include("api/projects/repos/pullRequests/changes")(
      config, projectKey, repositorySlug, pullRequestId, params
    );
  },
  comments(pullRequestId) {
    return include("api/projects/repos/pullRequests/comments")(config, projectKey, repositorySlug, pullRequestId);
  },
  commits(pullRequestId, params) {
    return include("api/projects/repos/pullRequests/commits")(
      config, projectKey, repositorySlug, pullRequestId, params
    );
  },
  create(values) {
    return request(createOptions.forPost(
      config,
      pullRequestsPath(projectKey, repositorySlug),
      toPullRequest(values)
    ));
  },
  decline(pullRequestId, params) {
    return include("api/projects/repos/pullRequests/decline")(
      config, projectKey, repositorySlug, pullRequestId, params
    );
  },
  diff(pullRequestId, filePath, params) {
    return include("api/projects/repos/pullRequests/diff")(
      config, projectKey, repositorySlug, pullRequestId, filePath, params
    );
  },
  get(pullRequestId) {
    return request(createOptions.forGet(
      config,
      pullRequestsPath(projectKey, repositorySlug, pullRequestId)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      pullRequestsPath(projectKey, repositorySlug),
      filterListParams(params)
    ));
  },
  merge(pullRequestId, params) {
    return include("api/projects/repos/pullRequests/merge")(config, projectKey, repositorySlug, pullRequestId, params);
  },
  participants(pullRequestId) {
    return include("api/projects/repos/pullRequests/participants")(config, projectKey, repositorySlug, pullRequestId);
  },
  reopen(pullRequestId, params) {
    return include("api/projects/repos/pullRequests/reopen")(config, projectKey, repositorySlug, pullRequestId, params);
  },
  tasks(pullRequestId) {
    return include("api/projects/repos/pullRequests/tasks")(config, projectKey, repositorySlug, pullRequestId);
  },
  unapprove(pullRequestId) {
    return include("api/projects/repos/pullRequests/unapprove")(config, projectKey, repositorySlug, pullRequestId);
  },
  unwatch(pullRequestId) {
    return include("api/projects/repos/pullRequests/unwatch")(config, projectKey, repositorySlug, pullRequestId);
  },
  update(pullRequestId, values) {
    return request(createOptions.forPut(
      config,
      pullRequestsPath(projectKey, repositorySlug, pullRequestId),
      toPullRequestUpdate(values)
    ));
  },
  watch(pullRequestId) {
    return include("api/projects/repos/pullRequests/watch")(config, projectKey, repositorySlug, pullRequestId);
  }
}));
