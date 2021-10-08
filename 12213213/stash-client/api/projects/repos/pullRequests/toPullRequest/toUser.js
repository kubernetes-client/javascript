"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const filterProperties = include("src/filterProperties");

module.exports = values => filterProperties(["name"], values);
