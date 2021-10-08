"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = config => Object.freeze({
  logger(loggerName) {
    return include("api/logs/logger")(config, loggerName);
  },
  rootLogger() {
    return include("api/logs/rootLogger")(config);
  }
});
