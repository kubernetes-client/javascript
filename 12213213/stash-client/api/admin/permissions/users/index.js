"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const usersPath = include("api/admin/permissions/users/path");
const request = include("lib/request");

// Setup
const filterDeleteParams = filterProperties(["name"]);
const filterListParams = filterProperties(asPaged(["filter"]));
const filterUpdateParams = filterProperties(["name", "permission"]);

module.exports = config => Object.freeze({
  delete(params) {
    return request(createOptions.forDelete(
      config,
      usersPath(),
      filterDeleteParams(params)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      usersPath(),
      filterListParams(params)
    ));
  },
  none(params) {
    return include("api/admin/permissions/users/none")(config, params);
  },
  update(params) {
    const body = "";

    return request(createOptions.forPut(
      config,
      usersPath(),
      body,
      filterUpdateParams(params)
    ));
  }
});
