"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const captchaPath = include("api/admin/users/captcha/path");
const request = include("lib/request");

// Setup
const filterParams = filterProperties(["name"]);

module.exports = curry((config, params) => request(createOptions.forDelete(
  config,
  captchaPath(),
  filterParams(params)
)));
