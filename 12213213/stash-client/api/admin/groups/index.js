"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const groupsPath = include("api/admin/groups/path");
const request = include("lib/request");

// Setup
const filterCreateParams = filterProperties(["name"]);
const filterDeleteParams = filterProperties(["name"]);
const filterListParams = filterProperties(asPaged(["filter"]));

module.exports = config => Object.freeze({
  addUsers(values) {
    return include("api/admin/groups/addUsers")(config, values);
  },
  create(params) {
    const body = "";

    return request(createOptions.forPost(
      config,
      groupsPath(),
      body,
      filterCreateParams(params)
    ));
  },
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
  moreMembers(params) {
    return include("api/admin/groups/moreMembers")(config, params);
  },
  moreNonMembers(params) {
    return include("api/admin/groups/moreNonMembers")(config, params);
  }
});
