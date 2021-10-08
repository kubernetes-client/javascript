"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const reposPath = include("api/projects/repos/path");

module.exports = (projectKey, repositorySlug, pullRequestId) =>
  `${reposPath(projectKey, repositorySlug)}/pull-requests/${pullRequestId || ""}`;
