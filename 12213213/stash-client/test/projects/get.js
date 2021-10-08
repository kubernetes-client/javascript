"use strict";

// Third Party
const defaults = require("lodash/defaults");
const include = require("include")(__dirname);

// Project
const stash = include("index"); // Normally: require("stash-client");

// Test
const stashConfig = include("test/config");
const config = defaults({}, stashConfig);
const projectKey = "TEST";

// jscs:disable jsDoc
stash(config).api().projects().get(projectKey)
  .then(response => console.log(response.body))
  .catch(console.error);
