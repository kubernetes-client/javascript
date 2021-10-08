"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const loggerPath = include("api/logs/logger/path");
const request = include("lib/request");

module.exports = curry((config, loggerName) => Object.freeze({
  get() {
    return request(createOptions.forGet(
      config,
      loggerPath(loggerName)
    ));
  },
  update(levelName) {
    return request(createOptions.forPut(
      config,
      loggerPath(loggerName, levelName)
    ));
  }
}));
