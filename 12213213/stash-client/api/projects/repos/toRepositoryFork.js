"use strict";

// Third Party
const get = require("lodash/get");

module.exports = (repositorySlug, values) => {
  values = values || {};

  return Object.seal({
    name: values.name,
    project: Object.seal({
      key: get(values, "project.key")
    }),
    slug: repositorySlug
  });
};
