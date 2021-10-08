"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const commentsPath = include("api/projects/repos/pullRequests/comments/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const toComment = include("api/projects/repos/pullRequests/comments/toComment");

// Setup
const filterDeleteParams = filterProperties(["version"]);
const filterGetParams = filterProperties(["path"]);
const toCommentUpdate = filterProperties(["text", "version"]);

module.exports = curryN(4, (config, projectKey, repositorySlug, pullRequestId) => Object.freeze({
  create(values) {
    return request(createOptions.forPost(
      config,
      commentsPath(projectKey, repositorySlug, pullRequestId),
      toComment(values)
    ));
  },
  delete(commentId, params) {
    return request(createOptions.forDelete(
      config,
      commentsPath(projectKey, repositorySlug, pullRequestId, commentId),
      filterDeleteParams(params)
    ));
  },
  get(commentId) {
    return request(createOptions.forGet(
      config,
      commentsPath(projectKey, repositorySlug, pullRequestId, commentId)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      commentsPath(projectKey, repositorySlug, pullRequestId),
      filterGetParams(params)
    ));
  },
  update(commentId, values) {
    return request(createOptions.forPut(
      config,
      commentsPath(projectKey, repositorySlug, pullRequestId, commentId),
      toCommentUpdate(values)
    ));
  }
}));
