/** A simple context-1 model. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./BitStream','./Huffman','./Util'], function(BitStream,Huffman,Util) {

var Context1Model = function(modelFactory, contextSize, alphabetSize) {
  var i;
  this.literalModel = [];
  // even if there's an EOF symbol, we don't need a context for it!
  for (i=0; i<contextSize; i++) {
    this.literalModel[i] = modelFactory(alphabetSize);
  }
};
Context1Model.prototype.encode = function(ch, context) {
  this.literalModel[context].encode(ch);
};
Context1Model.prototype.decode = function(context) {
  return this.literalModel[context].decode();
};

/** Simple self-test. */
Context1Model.MAGIC='ctx1';
Context1Model.compressFile = Util.compressFileHelper(Context1Model.MAGIC, function(inStream, outStream, fileSize, props) {
  var bitstream = new BitStream(outStream);
  var alphabetSize = 256;
  if (fileSize < 0) { alphabetSize++; }
  var coder = Huffman.factory(bitstream, 8191);
  var model = new Context1Model(coder, 256, alphabetSize);
  var lastchar = 0x20;
  var modelp = {
    encode: function(symbol) {
      model.encode(symbol, lastchar);
      lastchar = symbol;
    }
  };
  Util.compressWithModel(inStream, fileSize, modelp);
  bitstream.flush();
});
Context1Model.decompressFile = Util.decompressFileHelper(Context1Model.MAGIC, function(inStream, outStream, fileSize) {
  var bitstream = new BitStream(inStream);
  var alphabetSize = 256;
  if (fileSize < 0) { alphabetSize++; }
  var coder = Huffman.factory(bitstream, 8191);
  var model = new Context1Model(coder, 256, alphabetSize);
  var lastchar = 0x20;
  var modelp = {
    decode: function() {
      var symbol = model.decode(lastchar);
      lastchar = symbol;
      return symbol;
    }
  };
  Util.decompressWithModel(outStream, fileSize, modelp);
});

return Context1Model;
});
