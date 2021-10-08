"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const pullRequestsPath = include("api/projects/repos/pullRequests/path");

module.exports = (projectKey, repositorySlug, pullRequestId, commentId) =>
  `${pullRequestsPath(projectKey, repositorySlug, pullRequestId)}/comments/${commentId || ""}`;
