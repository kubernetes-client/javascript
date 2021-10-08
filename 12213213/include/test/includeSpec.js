var path = require('path');
var expect = require('chai').expect;
var include = require('../include')(__dirname);

describe('include', function () {
  var example = include('lib/example');
  var foo = undefined;
  var bar = undefined;
  var baz = undefined;

  it('should return a module given a path relative to the package root.', function () {
    expect(example).to.be.a('object');
    expect(example.name).to.equal('example');
  });

  it('should allow installed modules to include a module given a path relative to the installed module\'s package root.', function () {
    foo = example.included;

    expect(foo).to.be.a('object');
    expect(foo.path).to.equal(path.resolve('.', 'lib', example.includedPath))
  });

  it('should allow installed modules within modules to include a module given a path relative to the module\'s package root, not the parent\'s root.', function () {
    bar = foo.included[0];
    baz = foo.included[1];

    expect(bar).to.be.a('object');
    expect(bar.path).to.equal(path.resolve('.', 'lib', foo.includedPath[0]));
    expect(baz).to.be.a('object');
    expect(baz.path).to.equal(path.resolve('.', 'lib/includes/modules', bar.includedPath));
 });
});