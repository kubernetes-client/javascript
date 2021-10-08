/** Simple "lack of model" -- just encode the bits directly.
 *  Useful especially with sparse spaces or Huffman coders where there's
 *  no obvious prediction to be made that will pay for itself.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./BitStream','./Util'],function(BitStream,Util) {

var NoModel = function(bitstream, size) {
  this.bitstream = bitstream;
  this.bits = Util.fls(size-1);
};
NoModel.factory = function(bitstream) {
  return function(size) { return new NoModel(bitstream, size); };
};
NoModel.prototype.encode = function(symbol) {
  var i;
  for (i=this.bits-1; i>=0; i--) {
    var b = (symbol >>> i) & 1;
    this.bitstream.writeBit(b);
  }
};
NoModel.prototype.decode = function() {
  var i, r = 0;
  for (i=this.bits-1; i>=0; i--) {
    r <<= 1;
    if (this.bitstream.readBit()) r++;
  }
  return r;
};

/** Brain-dead self-test. */
NoModel.MAGIC = 'nomo';
NoModel.compressFile = Util.compressFileHelper(NoModel.MAGIC, function(inStream, outStream, fileSize, props) {
    var bitstream = new BitStream(outStream);
    var model = new NoModel(bitstream, (fileSize<0) ? 257 : 256);
    Util.compressWithModel(inStream, fileSize, model);
    bitstream.flush();
});
NoModel.decompressFile = Util.decompressFileHelper(NoModel.MAGIC, function(inStream, outStream, fileSize) {
    var bitstream = new BitStream(inStream);
    var model = new NoModel(bitstream, (fileSize<0) ? 257 : 256);
    Util.decompressWithModel(outStream, fileSize, model);
});

return NoModel;
});
