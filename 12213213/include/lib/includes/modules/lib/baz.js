var path = require('path');

var values = {
  path: path.resolve(__dirname, path.basename(__filename, '.js')),
  name: path.basename(__filename, '.js'),
};

module.exports = values;