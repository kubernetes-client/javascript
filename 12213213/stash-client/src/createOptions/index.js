"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = Object.freeze({
  forDelete: include("src/createOptions/delete"),
  forGet: include("src/createOptions/get"),
  forPost: include("src/createOptions/post"),
  forPut: include("src/createOptions/put")
});
