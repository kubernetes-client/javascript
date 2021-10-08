"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const groupsPath = include("api/admin/permissions/groups/path");
const request = include("lib/request");

// Setup
const filterDeleteParams = filterProperties(["name"]);
const filterListParams = filterProperties(asPaged(["filter"]));
const filterUpdateParams = filterProperties(["name", "permission"]);

module.exports = config => Object.freeze({
  delete(params) {
    return request(createOptions.forDelete(
      config,
      groupsPath(),
      filterDeleteParams(params)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      groupsPath(),
      filterListParams(params)
    ));
  },
  none(params) {
    return include("api/admin/permissions/groups/none")(config, params);
  },
  update(params) {
    const body = "";

    return request(createOptions.forPut(
      config,
      groupsPath(),
      body,
      filterUpdateParams(params)
    ));
  }
});
