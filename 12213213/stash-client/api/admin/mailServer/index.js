"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const mailServerPath = include("api/admin/mailServer/path");
const request = include("lib/request");

// Setup

module.exports = config => Object.freeze({
  delete() {
    return request(createOptions.forDelete(
      config,
      mailServerPath()
    ));
  },
  get() {
    return request(createOptions.forGet(
      config,
      mailServerPath()
    ));
  },
  update(values) {
    return request(createOptions.forPut(
      config,
      mailServerPath(),
      values
    ));
  }
});
