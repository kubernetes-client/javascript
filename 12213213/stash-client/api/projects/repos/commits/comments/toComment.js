"use strict";

// Third Party
const get = require("lodash/fp/get");
const include = require("include")(__dirname);
const isPlainObject = require("lodash/fp/isPlainObject");
const pipe = require("lodash/fp/pipe");
const set = require("lodash/fp/set");

// Project
const filterProperties = include("src/filterProperties");

module.exports = values => {
  values = values || {};

  const anchorProperties = [
    "fileType",
    "line",
    "lineType",
    "path",
    "srcPath"
  ];
  const parentProperties = ["id"];

  return pipe(
    result => isPlainObject(get("anchor", values)) ?
      set("anchor", filterProperties(anchorProperties, get("anchor", values)), result) :
      result,
    result => isPlainObject(get("parent", values)) ?
      set("parent", filterProperties(parentProperties, get("parent", values)), result) :
      result,
    set("text", get("text", values)),
    Object.seal
  )({});
};
