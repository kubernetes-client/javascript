"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = (config, projectKey, repositorySlug) => Object.freeze({
  hooks() {
    return include("api/projects/repos/settings/hooks")(config, projectKey, repositorySlug);
  }
});
