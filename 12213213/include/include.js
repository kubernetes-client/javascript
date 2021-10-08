'use strict';

// Node
var lstatSync = require('fs').lstatSync;
var path = require('path');

/**
 * Attempts to find the project root by finding the nearest package.json file.
 * @private
 * @param {String} currentPath - Path of the file doing the including.
 * @return {String?}
 */
function findProjectRoot(currentPath) {
  var result = undefined;

  try {
    var packageStats = lstatSync(path.join(currentPath, 'package.json'));

    if (packageStats.isFile()) {
      result = currentPath;
    }
  } catch (error) {
    if (currentPath !== path.resolve('/')) {
      result = findProjectRoot(path.join(currentPath, '..'));
    }
  }

  return result;
}

/**
 * Creates the include function wrapper around <code>require</code> based on the path of the calling file and not the
 * install location of the module.
 * @param {String} callerPath - Path of the calling file.
 * @return {Function}
 * @example
 *
 * var include = require('include')(__dirname);
 *
 * var projectFn = include('src/method');
 */
function createInclude(callerPath) {
  return function (target) {
    var projectRoot = findProjectRoot(callerPath);

    return projectRoot ?
      require(path.join(projectRoot, target)) :
      require(target);
  };
}

module.exports = createInclude;
