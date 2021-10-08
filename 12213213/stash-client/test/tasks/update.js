"use strict";

// Third Party
const defaults = require("lodash/defaults");
const include = require("include")(__dirname);

// Project
const stash = include("index"); // Normally: require("stash-client");

// Test
const stashConfig = include("test/config");
const config = defaults({}, stashConfig);
const taskId = "1";
const values = {
  "id": "1",
  "text": "Fix the missing imports -- updated"
};

// jscs:disable jsDoc
stash(config).api().tasks().update(taskId, values)
  .then(response => console.log(response.body))
  .catch(console.error);
