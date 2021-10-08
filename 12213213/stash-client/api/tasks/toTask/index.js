"use strict";

// Third Party
const include = require("include")(__dirname);
const reduce = require("lodash/reduce");
const set = require("lodash/set");

// Project
const filterProperties = include("src/filterProperties");
const valuesMap = include("api/tasks/toTask/valuesMap");

module.exports = values => reduce(
  valuesMap,
  (result, mapper, key) => set(result, key, mapper(result[key])),
  filterProperties(["anchor", "text"], values || {})
);
