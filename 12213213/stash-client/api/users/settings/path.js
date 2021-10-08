"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const usersPath = include("api/users/path");

module.exports = userSlug => `${usersPath(userSlug)}/settings`;
