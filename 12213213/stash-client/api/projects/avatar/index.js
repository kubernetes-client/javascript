"use strict";

// Node
const fs = require("fs");

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);
const isString = require("lodash/isString");

// Project
const asBinary = include("src/createOptions/asBinary");
const avatarPath = include("api/projects/avatar/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const withForm = include("src/createOptions/withForm");

// Setup
const filterGetParams = filterProperties(["s"]);

module.exports = curry((config, projectKey) => Object.freeze({
  get(params) {
    return request(asBinary(
      createOptions.forGet(config, avatarPath(projectKey), filterGetParams(params))
    ));
  },
  set(imageData) {
    const formData = {
      avatar: isString(imageData) ? fs.createReadStream(imageData) : imageData
    };

    return request(withForm(
      createOptions.forPost(config, avatarPath(projectKey)),
      formData
    ));
  }
}));
