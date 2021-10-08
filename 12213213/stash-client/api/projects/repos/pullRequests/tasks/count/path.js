"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const tasksPath = include("api/projects/repos/pullRequests/tasks/path");

module.exports = (projectKey, repositorySlug, pullRequestId) =>
  `${tasksPath(projectKey, repositorySlug, pullRequestId)}/count`;
