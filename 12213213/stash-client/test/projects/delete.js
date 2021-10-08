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
stash(config).api().projects().delete(projectKey)
  .then(response => console.log(response.statusCode === 204))
  .catch(console.error);
