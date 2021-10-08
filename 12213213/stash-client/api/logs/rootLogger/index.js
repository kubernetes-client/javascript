"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const rootLoggerPath = include("api/logs/rootLogger/path");
const request = include("lib/request");

module.exports = config => Object.freeze({
  get() {
    return request(createOptions.forGet(
      config,
      rootLoggerPath()
    ));
  },
  update(levelName) {
    return request(createOptions.forPut(
      config,
      rootLoggerPath(levelName)
    ));
  }
});
