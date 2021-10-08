"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const groupsPath = include("api/projects/repos/permissions/groups/path");

module.exports = (projectKey, repositorySlug) => `${groupsPath(projectKey, repositorySlug)}/none`;
