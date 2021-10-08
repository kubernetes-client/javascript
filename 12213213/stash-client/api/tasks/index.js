"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const tasksPath = include("api/tasks/path");
const toTask = include("api/tasks/toTask");

// Setup
const toTaskUpdate = filterProperties(["id", "text"]);

module.exports = config => Object.freeze({
  // NOTE(jlmorgan): Not sure why, but I get 404 for create requests.
  create(values) {
    return request(createOptions.forPost(
      config,
      tasksPath(),
      toTask(values)
    ));
  },
  delete(taskId) {
    return request(createOptions.forDelete(
      config,
      tasksPath(taskId)
    ));
  },
  get(taskId) {
    return request(createOptions.forGet(
      config,
      tasksPath(taskId)
    ));
  },
  update(taskId, values) {
    return request(createOptions.forPut(
      config,
      tasksPath(taskId),
      toTaskUpdate(values)
    ));
  }
});
