"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const usersPath = include("api/admin/users/path");
const request = include("lib/request");

// Setup
const filterCreateParams = filterProperties(
  ["addToDefaultGroup", "displayName", "emailAddress", "name", "notify", "password"]
);
const filterDeleteParams = filterProperties(["name"]);
const filterListParams = filterProperties(asPaged(["filter"]));
const toUserUpdate = filterProperties(["displayName", "email", "name"]);

module.exports = config => Object.freeze({
  addGroups(values) {
    return include("api/admin/users/addGroups")(config, values);
  },
  clearCaptcha(params) {
    return include("api/admin/users/captcha")(config, params);
  },
  create(params) {
    const body = "";

    return request(createOptions.forPost(
      config,
      usersPath(),
      body,
      filterCreateParams(params)
    ));
  },
  credentials(values) {
    return include("api/admin/users/credentials")(config, values);
  },
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
  moreMembers(params) {
    return include("api/admin/users/moreMembers")(config, params);
  },
  moreNonMembers(params) {
    return include("api/admin/users/moreNonMembers")(config, params);
  },
  removeGroup(values) {
    return include("api/admin/users/removeGroup")(config, values);
  },
  rename(values) {
    return include("api/admin/users/rename")(config, values);
  },
  update(values) {
    return request(createOptions.forPut(
      config,
      usersPath(),
      toUserUpdate(values)
    ));
  }
});
