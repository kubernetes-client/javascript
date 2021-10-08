var path = require('path');
var include = require('../include')(__dirname);

var fooPath = 'includes/foo';
var foo = include(fooPath);

var values = {
  path: path.resolve(__dirname, path.basename(__filename, '.js')),
  name: path.basename(__filename, '.js'),
  includedPath: fooPath,
  included: foo
};

module.exports = values;