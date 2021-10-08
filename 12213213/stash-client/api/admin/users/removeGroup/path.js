"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const usersPath = include("api/admin/users/path");

module.exports = () => `${usersPath()}/remove-group`;
