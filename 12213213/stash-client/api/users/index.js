"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const usersPath = include("api/users/path");

// Setup
const toUserUpdate = filterProperties(["displayName", "email", "name"]);

module.exports = config => Object.freeze({
  avatar(userSlug) {
    return include("api/users/avatar")(config, userSlug);
  },
  credentials() {
    return include("api/users/credentials")(config);
  },
  get(userSlug) {
    return request(createOptions.forGet(
      config,
      usersPath(userSlug)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      usersPath(),
      params
    ));
  },
  settings(userSlug) {
    return include("api/users/settings")(config, userSlug);
  },
  update(userSlug, values) {
    return request(createOptions.forPut(
      config,
      usersPath(userSlug),
      toUserUpdate(values)
    ));
  }
});
