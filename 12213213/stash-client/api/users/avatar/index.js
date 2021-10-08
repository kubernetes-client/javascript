"use strict";

// Node
const fs = require("fs");

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);
const isString = require("lodash/isString");

// Project
const avatarPath = include("api/users/avatar/path");
const createOptions = include("src/createOptions");
const request = include("lib/request");
const withForm = include("src/createOptions/withForm");

module.exports = curry((config, userSlug) => Object.freeze({
  delete() {
    return request(createOptions.forDelete(
      config, avatarPath(userSlug)
    ));
  },
  set(imageData) {
    const formData = {
      avatar: isString(imageData) ? fs.createReadStream(imageData) : imageData
    };

    return request(withForm(
      createOptions.forPost(config, avatarPath(userSlug)),
      formData
    ));
  }
}));
