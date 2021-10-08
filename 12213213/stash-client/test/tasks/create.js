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
  "anchor": {
    "id": 1,
    "type": "COMMENT"
  },
  "text": "Fix the missing imports"
};

// jscs:disable jsDoc
stash(config).api().tasks().create(values)
  .then(response => console.log(response.body))
  .catch(console.error);
