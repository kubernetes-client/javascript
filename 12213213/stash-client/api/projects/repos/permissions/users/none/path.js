"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const usersPath = include("api/projects/repos/permissions/users/path");

module.exports = (projectKey, repositorySlug) => `${usersPath(projectKey, repositorySlug)}/none`;
