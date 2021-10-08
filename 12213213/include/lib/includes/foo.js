var path = require('path');
var include = require('../../include')(__dirname);

var barPath = 'includes/modules/bar';
var bazPath = 'includes/modules/lib/baz';

var bar = include(barPath);
var baz = include(bazPath);

var values = {
  path: path.resolve(__dirname, path.basename(__filename, '.js')),
  name: path.basename(__filename, '.js'),
  includedPath: [barPath, bazPath],
  included: [bar, baz]
};

module.exports = values;