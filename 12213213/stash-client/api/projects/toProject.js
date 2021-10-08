"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const filterProperties = include("src/filterProperties")(["avatar", "description", "key", "name"]);

module.exports = filterProperties;
