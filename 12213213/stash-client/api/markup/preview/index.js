"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const asText = include("src/createOptions/asText");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const previewPath = include("api/markup/preview/path");
const request = include("lib/request");

// Setup
const filterCreateParams = filterProperties(["hardwrap", "htmlEscape", "urlMode"]);

module.exports = config => Object.freeze({
  create(body, params) {
    return request(asText(createOptions.forPost(
      config,
      previewPath(),
      body,
      filterCreateParams(params)
    )));
  }
});
