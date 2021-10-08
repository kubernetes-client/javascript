"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const commentsPath = include("api/projects/repos/commits/comments/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const toComment = include("api/projects/repos/commits/comments/toComment");

// Setup
const filterCreateParams = filterProperties(["since"]);
const filterDeleteParams = filterProperties(["version"]);
const filterGetParams = filterProperties(["path", "since"]);
const toCommentUpdate = filterProperties(["text", "version"]);

module.exports = curryN(4, (config, projectKey, repositorySlug, commitId) => Object.freeze({
  create(params, values) {
    return request(createOptions.forPost(
      config,
      commentsPath(projectKey, repositorySlug, commitId),
      toComment(values),
      filterCreateParams(params)
    ));
  },
  delete(commentId, params) {
    return request(createOptions.forDelete(
      config,
      commentsPath(projectKey, repositorySlug, commitId, commentId),
      filterDeleteParams(params)
    ));
  },
  get(commentId) {
    return request(createOptions.forGet(
      config,
      commentsPath(projectKey, repositorySlug, commitId, commentId)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      commentsPath(projectKey, repositorySlug, commitId),
      filterGetParams(params)
    ));
  },
  update(commentId, values) {
    return request(createOptions.forPut(
      config,
      commentsPath(projectKey, repositorySlug, commitId, commentId),
      toCommentUpdate(values)
    ));
  }
}));
