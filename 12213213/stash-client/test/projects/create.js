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
  "key": "TEST",
  "name": "Test Project",
  "description": "Testing project for using Stash REST API."
};

// jscs:disable jsDoc
stash(config).api().projects().create(values)
  .then(response => console.log(response.body))
  .catch(console.error);
