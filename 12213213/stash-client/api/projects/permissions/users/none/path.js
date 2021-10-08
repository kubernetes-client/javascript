"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const usersPath = include("api/projects/permissions/users/path");

module.exports = projectKey => `${usersPath(projectKey)}/none`;
