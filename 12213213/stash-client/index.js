"use strict";

module.exports = function clientFactory(config) {
  return Object.freeze({
    api() {
      return require("./api")(config);
    }
  });
};
