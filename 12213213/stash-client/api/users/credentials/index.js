"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const credentialsPath = include("api/users/credentials/path");

// Setup
const toCredentialUpdate = filterProperties(["oldPassword", "password", "passwordConfirm"]);

module.exports = config => Object.freeze({
  update(values) {
    return request(createOptions.forPut(
      config,
      credentialsPath(),
      toCredentialUpdate(values)
    ));
  }
});
