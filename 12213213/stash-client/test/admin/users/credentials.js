"use strict";

// Third Party
const defaults = require("lodash/defaults");
const include = require("include")(__dirname);

// Project
const stash = include("index"); // Normally: require("stash-client");

// Test
const stashConfig = include("test/config");
const config = defaults({
  limit: 100
}, stashConfig);
const values = {
  name: "test.user",
  password: "SuperUltraMegaAwesomeTestPassword(1)",
  passwordConfirm: "SuperUltraMegaAwesomeTestPassword(1)"
};

// jscs:disable jsDoc
stash(config).api().admin().users().credentials(values)
  .then(response => console.log(response.body))
  .catch(console.error);
