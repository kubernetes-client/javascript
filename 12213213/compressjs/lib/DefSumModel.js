/** Deferred-sum model, suitable for small ( ~ 256 ) ranges. */
// See http://cbloom.com/src/defsum.zip
//     http://cbloom.com/papers/context.pdf
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./RangeCoder','./Stream','./Util'],function(RangeCoder,Stream,Util){

var LOG_PROB_TOTAL = 8;
var PROB_TOTAL = 1 << LOG_PROB_TOTAL;
var MAX_ESCAPE_COUNT = 40;

var DefSumModel = function(coder, size, isDecoder) {
  var i;
  console.assert(size < 300); // not meant for sparse
  var ESCAPE = this.numSyms = size;
  this.coder = coder;
  this.prob = Util.makeU16Buffer(size+2); /* size + ESC + 1 */
  this.escape = Util.makeU16Buffer(size+1);  /* size + 1*/
  this.update = Util.makeU16Buffer(size+1); /* size + ESC */
  this.prob[ESCAPE+1] = PROB_TOTAL;
  for (i=0; i<=this.numSyms; i++) {
    this.escape[i] = i;
  }
  this.updateCount = 0;
  this.updateThresh = PROB_TOTAL - Math.floor(PROB_TOTAL / 2);
  if (!isDecoder) { return; }
  // extra tables for fast decoding
  this.probToSym = Util.makeU16Buffer(PROB_TOTAL);
  this.escProbToSym = Util.makeU16Buffer(this.numSyms);
  for (i=0; i<PROB_TOTAL; i++) {
    this.probToSym[i] = ESCAPE;
  }
  for (i=0; i<this.numSyms; i++) {
    this.escProbToSym[i] = i;
  }
};
DefSumModel.factory = function(coder, isDecoder) {
  return function(size) { return new DefSumModel(coder, size, isDecoder); };
};
DefSumModel.prototype._update = function(symbol, isDecoder) {
  if (symbol === this.numSyms) {
    // some special cases for the escape character
    if (this.update[symbol] >= MAX_ESCAPE_COUNT) { return; } // hard limit
    // don't let an escape character trigger an update, because then the
    // escaped character might find itself unescaped after the tables have
    // been updated!
    if (this.updateCount >= (this.updateThresh - 1)) { return; }
  }
  this.update[symbol]++;
  this.updateCount++;
  // is it time to transfer the updated probabilities?
  if (this.updateCount < this.updateThresh) {
    return; //defer update
  }
  var cumProb, cumEscProb, odd, i, j, k;
  this.escape[0] = this.prob[0] = cumProb = cumEscProb = odd = 0;
  for (i=0; i < this.numSyms+1; i++) {
    var newProb = ((this.prob[i+1]-this.prob[i]) >>> 1) + this.update[i];
    if (newProb) {
      // live 'un
      this.prob[i] = cumProb;
      cumProb += newProb;
      if (newProb & 1) { odd++; }
      this.escape[i] = cumEscProb;
    } else {
      // this symbol will escape
      this.prob[i] = cumProb;
      this.escape[i] = cumEscProb;
      cumEscProb++;
    }
  }
  this.prob[i] = cumProb;
  console.assert(cumProb === PROB_TOTAL);
  /* how many updates will be required after current probs are halved? */
  this.updateThresh = PROB_TOTAL - Math.floor((cumProb-odd) / 2);
  /* reset the update table */
  for (i=0; i < (this.numSyms + 1); i++) {
    this.update[i] = 0;
  }
  this.update[this.numSyms] = 1; // ensure that escape never goes away
  this.updateCount = 1;
  /* compute decode table, if this is a decoder */
  if (!isDecoder) { return; }
  for (i=0, j=0, k=0; i<(this.numSyms+1); i++) {
    var probLimit = this.prob[i+1];
    for (; j<probLimit; j++) {
      this.probToSym[j] = i;
    }
    var escProbLimit = this.escape[i+1];
    for (; k<escProbLimit; k++) {
      this.escProbToSym[k] = i;
    }
  }
};
DefSumModel.prototype.encode = function(symbol) {
  var lt_f = this.prob[symbol];
  var sy_f = this.prob[symbol+1] - lt_f;
  console.assert(this.prob[this.numSyms+1] === PROB_TOTAL);
  if (sy_f) {
    this.coder.encodeShift(sy_f, lt_f, LOG_PROB_TOTAL);
    return this._update(symbol);
  }
  // escape!
  console.assert(symbol !== this.numSyms); // catch infinite recursion
  this.encode(this.numSyms); // guaranteed non-zero probability
  // code symbol as literal, taking advantage of reduced escape range.
  lt_f = this.escape[symbol];
  sy_f = this.escape[symbol+1] - lt_f;
  var tot_f = this.escape[this.numSyms];
  this.coder.encodeFreq(sy_f, lt_f, tot_f);
  return this._update(symbol);
};
DefSumModel.prototype.decode = function() {
  var prob = this.coder.decodeCulShift(LOG_PROB_TOTAL);
  var symbol = this.probToSym[prob];
  var lt_f = this.prob[symbol];
  var sy_f = this.prob[symbol+1] - lt_f;
  this.coder.decodeUpdate(sy_f, lt_f, PROB_TOTAL);
  this._update(symbol, true);
  if (symbol !== this.numSyms) {
    return symbol;
  }
  // escape!
  var tot_f = this.escape[this.numSyms];
  prob = this.coder.decodeCulFreq(tot_f);
  symbol = this.escProbToSym[prob];
  lt_f = this.escape[symbol];
  sy_f = this.escape[symbol+1] - lt_f;
  this.coder.decodeUpdate(sy_f, lt_f, tot_f);
  this._update(symbol, true);
  return symbol;
};

DefSumModel.MAGIC='dfsm';
/** Simple order-0 compressor, as self-test. */
DefSumModel.compressFile = Util.compressFileHelper(DefSumModel.MAGIC, function(inStream, outStream, fileSize, props, finalByte) {
  var range = new RangeCoder(outStream);
  range.encodeStart(finalByte, 1);
  var model = new DefSumModel(range, (fileSize<0) ? 257 : 256);
  Util.compressWithModel(inStream, fileSize, model);
  range.encodeFinish();
},true);
/** Simple order-0 decompresser, as self-test. */
DefSumModel.decompressFile = Util.decompressFileHelper(DefSumModel.MAGIC, function(inStream, outStream, fileSize) {
  var range = new RangeCoder(inStream);
  range.decodeStart(true/*already read the final byte*/);
  var model = new DefSumModel(range, (fileSize<0) ? 257 : 256, true);
  Util.decompressWithModel(outStream, fileSize, model);
  range.decodeFinish();
});

return DefSumModel;
});
