"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const pullRequestsPath = include("api/projects/repos/pullRequests/path");

module.exports = (projectKey, repositorySlug, pullRequestId) =>
  `${pullRequestsPath(projectKey, repositorySlug, pullRequestId)}/tasks`;
