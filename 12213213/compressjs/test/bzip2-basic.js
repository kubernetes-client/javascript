var assert = require("assert");
var Bzip2 = require('../').Bzip2;
var fs = require('fs');

describe('bzip2 basic decode', function(){
  it('should correctly decode our example file', function(){
      var compressedData = fs.readFileSync('test/sample0.bz2');
      var data = Bzip2.decompressFile(compressedData);
      data = new Buffer(data).toString('utf8');
      assert.equal(data, "This is a test\n");
  });
  ['sample0', 'sample1', 'sample2', 'sample3', 'sample4'].forEach(function(f) {
      it('should correctly decode '+f, function() {
          var compressedData = fs.readFileSync('test/'+f+'.bz2');
          var referenceData = fs.readFileSync('test/'+f+'.ref');
          var data = Bzip2.decompressFile(compressedData, referenceData.length);
          data = new Buffer(data); // convert to Buffer
          assert.equal(data.toString('hex'), referenceData.toString('hex'));
      });
  });
});
