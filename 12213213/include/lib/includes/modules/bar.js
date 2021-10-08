var path = require('path');
var include = require('../../../include')(__dirname);

var bazPath = 'lib/baz';
var baz = include(bazPath);

var values = {
  path: path.resolve(__dirname, path.basename(__filename, '.js')),
  name: path.basename(__filename, '.js'),
  includedPath: bazPath,
  included: baz
};

module.exports = values;