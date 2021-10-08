"use strict";

// Third Party
const defaults = require("lodash/defaults");
const include = require("include")(__dirname);

// Project
const stash = include("index"); // Normally: require("stash-client");

// Test
const stashConfig = include("test/config");
const config = defaults({}, stashConfig);
const values = {
  oldPassword: "OldPassword@1",
  password: "NewPassword@2",
  passwordConfirm: "NewPassword@2"
};

// jscs:disable jsDoc
stash(config).api().users().credentials().update(values)
  .then(response => console.log(response.body))
  .catch(console.error);
