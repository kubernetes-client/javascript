var assert = require("assert");
var Bzip2 = require('../').Bzip2;
var fs = require('fs');

describe('bzip2 table indexing', function(){
  ['sample0', 'sample1', 'sample2', 'sample3', 'sample4'].forEach(function(f) {
      it('should correctly index '+f, function() {
          var compressedData = fs.readFileSync('test/'+f+'.bz2');
          var referenceData = fs.readFileSync('test/'+f+'.bzt');
          var output = '';
          var report = function(position, blocksize) {
              output += '' + position + '\t' + blocksize + '\n';
          };
          Bzip2.table(compressedData, report);
          assert.equal(output, referenceData.toString());
      });
  });
});
