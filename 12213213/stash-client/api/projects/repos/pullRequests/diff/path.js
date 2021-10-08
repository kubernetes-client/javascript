"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const pullRequestsPath = include("api/projects/repos/pullRequests/path");

module.exports = (projectKey, repositorySlug, pullRequestId, filePath) =>
  `${pullRequestsPath(projectKey, repositorySlug, pullRequestId)}/diff/${filePath || ""}`;
