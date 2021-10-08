var assert = require("assert");
var compressjs = require('../');
var fs = require('fs');

var testRoundTrip = function(cmp, level, filename) {
    var referenceData = fs.readFileSync('test/'+filename+'.ref');
    var data = cmp.compressFile(referenceData, null, level);
    // convert to buffer
    data = new Buffer(data);
    // round trip
    var data2 = cmp.decompressFile(data);
    // convert to buffer
    data2 = new Buffer(data2);
    assert.ok(referenceData.toString('hex') === data2.toString('hex'));
};

// test round-trip encode/decode for all compression variants
ALL_LEVELS=[null, 1, 2, 3, 4, 5, 6, 7, 8, 9];
[{name:"simple", cmp:compressjs.Simple, levels:[null]},
 {name:"huffman", cmp:compressjs.Huffman, levels:[null]},
 {name:"deferred-summation model",cmp:compressjs.DefSumModel, levels:[null]},
 {name:"fenwick model",cmp:compressjs.FenwickModel, levels:[null]},
 {name:"mtf model",cmp:compressjs.MTFModel, levels:[null]},
 {name:"context-1 model",cmp:compressjs.Context1Model, levels:[null]},
 {name:"no model", cmp:compressjs.NoModel, levels:[null]},
 {name:"lzjb", cmp:compressjs.Lzjb, levels:ALL_LEVELS},
 {name:"lzjb-rangecoder", cmp:compressjs.LzjbR, levels:ALL_LEVELS},
 {name:"lzp3(ish)", cmp:compressjs.Lzp3, levels:[null]},
 {name:"dmc", cmp:compressjs.Dmc, levels:[null]},
 {name:"ppm", cmp:compressjs.PPM, levels:[null]},
 {name:"bwtc", cmp:compressjs.BWTC, levels:ALL_LEVELS},
 {name:"bzip2", cmp:compressjs.Bzip2, levels:ALL_LEVELS}].forEach(function(compressor) {
     describe(compressor.name+" round-trip encode/decode", function() {
         compressor.levels.forEach(function(level) {
             var desc = (level===null) ? 'default' : ('-'+level);
             describe("compression level "+desc, function() {
                 ['sample0', 'sample1', 'sample2', 'sample3', 'sample4','sample5'].forEach(function(f) {
                     it('should correctly round-trip '+f, function() {
                         this.timeout(0); // no timeout -- can take a while.
                         testRoundTrip(compressor.cmp, level, f);
                     });
                 });
             });
         });
     });
 });
