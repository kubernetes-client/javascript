/**
 * Implementation of Dynamic Markov Compression, using byte-oriented
 * nodes/transitions.
 *
 * Currently no model-shrinking is done, so be careful trying to use
 * this on large inputs!
 *
 * Notes for the future / TO DO:
 *
 * Add node merging to Dmc:
 *  - once (total states traversed / total node count) exceeds a certain value
 *    - find the median node w/rt total visits
 *    - combine all nodes w/ less visits into a single node, with transitions
 *      to node[0] - node[255] (initial context-1 states)
 *      - initially transition counts are zero?  or summed from components?
 *        needs to be summed so kirchoff principle holds
 *    - halve the edge counts of all nodes, to provide for adaptation
 *      - enforce property that all nodes point "higher" except for
 *        links to nodes 0-255.  So we can resum all nodes in one pass,
 *        after resetting all node.sum to zero. X YES because we know
 *        what the total sum must be, so we can arrange to scale to maintain
 *        proper sum. XXX what about node 0-255? XXX maybe just clear all
 *        edge counts XXX
 *
 * Fix buglet: ensure that kirchoff principle *exactly* holds by
 * paying attention to rounding when we distribute edge counts.  track
 * highest edge and give (desiredSum - newSum) extra counts to that
 * outgoing edge? add one to each nonzero edge until all gone?
 *
 * Split 'to' nodes when to.sum grows too high -- only if we're
 * highest incoming edge?  Fix bug again here with saturating counts;
 * we can't ignore counts w/o violating kirchoff principle, so we need
 * to clone it.  Maybe start trying to clone early (before our counter
 * saturates) so we have a better chance of cloning on the high
 * incoming edge? XXX we don't track incoming edges.  XXX so just
 * clone when we visit.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./MTFModel', './RangeCoder', './Stream', './Util'],function(MTFModel, RangeCoder, Stream, Util){

// nm = no model cloning, MAX_TRANS_CNT=0xFF, MAX_MODEL_PROB=0xFFFF
// nm2 = "                            0xFFFF                 0xFFFF
// nm3 = "                             0xFFF                 0x0FFF
// nm4 = "                            0xFFFF                   0xFF
// cl1 = model cloning, MAX_TRANS_CNT=0xFFFF  MAX_MODEL_PROB=0xFF
// cl2 = model cloning, MAX_TRANS_CNT=  0xFF  MAX_MODEL_PROB=0xFF
// cl3 = model cloning, MAX_TRANS_CNT=0xFFFF  MAX_MODEL_PROB=0xFFFF
var MAX_TRANS_CNT = 0xFFFF;
var DEFAULT_MIN_CNT1 = 8;
var DEFAULT_MIN_CNT2 = 128;
var MODEL_PROB_MAX = 0xFF00;
var MODEL_PROB_INCR= 0x0100;
var CLONE_MODELS=false;
var PRINT_STATS=false; // for quick benchmarking

// XXX need to limit growth of model (throw away and retrain if model
//     gets too large)

var Dmc = Object.create(null);
Dmc.MAGIC = 'dmc!';

var MarkovNode = function(coder, size, optModel) {
  this.out = [];
  this.model = optModel ? optModel.clone() :
    new MTFModel(coder, size, MODEL_PROB_MAX, MODEL_PROB_INCR);
  this.count = Util.makeU16Buffer(size);
  this.sum = 0;
};
MarkovNode.prototype.clone = function(coder, size) {
  var i;
  var newNode = new MarkovNode(coder, size, CLONE_MODELS ? this.model : null);
  for (i=0; i<size; i++) {
    newNode.out[i] = this.out[i];
  }
  return newNode;
};

var MarkovModel = function(coder, size, MIN_CNT1, MIN_CNT2) {
  var i, j;
  // initial model is 'size' states, completely linked.
  this.coder = coder;
  this.size = size;
  this.MIN_CNT1 = MIN_CNT1 || DEFAULT_MIN_CNT1;
  this.MIN_CNT2 = MIN_CNT2 || DEFAULT_MIN_CNT2;
  this.nodes = [];
  for (i=0; i<size; i++) {
    this.nodes[i] = new MarkovNode(coder, size);
  }
  // now link nodes
  for (i=0; i<size; i++) {
    for (j=0; j<size; j++) {
      this.nodes[i].out[j] = this.nodes[j];
    }
  }
  // select an arbitrary node as the start state.
  this.current = this.nodes[0];
};
MarkovModel.prototype.maybeSplit = function(from, symbol, to) {
  var trans_cnt = from.count[symbol];
  var next_cnt = to.sum;
  var i;
  if ( (trans_cnt <= this.MIN_CNT1) ||
       (next_cnt - trans_cnt <= this.MIN_CNT2) ) {
    return to; // no split
  }

  // split this guy!
  var newNode = to.clone(this.coder, this.size);
  this.nodes.push(newNode);
  from.out[symbol] = newNode;
  // distribute transition counts among new and cloned node
  newNode.sum = to.sum = 0;
  for (i=0; i<this.size; i++) {
    newNode.count[i] = to.count[i] * trans_cnt / next_cnt;
    newNode.sum += newNode.count[i];
    to.count[i] -= newNode.count[i];
    to.sum += to.count[i];
  }

  return newNode;
};
MarkovModel.prototype.encode = function(symbol) {
  var from = this.current;
  from.model.encode(symbol);
  var to = from.out[symbol];
  if (from.count[symbol] !== MAX_TRANS_CNT) {
      from.count[symbol]++;
      from.sum++;
  }
  this.current = this.maybeSplit(from, symbol, to);
};
MarkovModel.prototype.decode = function() {
  var from = this.current;
  var symbol = from.model.decode();
  var to = from.out[symbol];
  if (from.count[symbol] !== MAX_TRANS_CNT) {
      from.count[symbol]++;
      from.sum++;
  }
  this.current = this.maybeSplit(from, symbol, to);
  return symbol;
};

Dmc.compressFile = Util.compressFileHelper(Dmc.MAGIC, function(inStream, outStream, fileSize, props) {

  props = props || {};
  var MIN_CNT1 = (+props.m) || DEFAULT_MIN_CNT1;
  var MIN_CNT2 = (+props.n) || DEFAULT_MIN_CNT2;
  Util.writeUnsignedNumber(outStream, MIN_CNT1);
  Util.writeUnsignedNumber(outStream, MIN_CNT2);

  var range = new RangeCoder(outStream);
  range.encodeStart(0xCA, 0);

  var mm = new MarkovModel(range, (fileSize<0) ? 257 : 256,
                           MIN_CNT1, MIN_CNT2);
  var inSize = 0;
  while (inSize !== fileSize) {
    var ch = inStream.readByte();
    if (ch===Stream.EOF) {
      mm.encode(256); // end of stream
      break;
    }
    mm.encode(ch);
    inSize++;
  }
  var outSize = range.encodeFinish();
  if (PRINT_STATS) {
    console.log('M1', mm.MIN_CNT1, 'M2', mm.MIN_CNT2,
                'states', mm.nodes.length, 'size', outSize);
  }
});

Dmc.decompressFile = Util.decompressFileHelper(Dmc.MAGIC, function(inStream, outStream, fileSize) {

  var MIN_CNT1 = Util.readUnsignedNumber(inStream);
  var MIN_CNT2 = Util.readUnsignedNumber(inStream);

  var range = new RangeCoder(inStream);
  range.decodeStart();

  var mm = new MarkovModel(range, (fileSize<0) ? 257 : 256,
                           MIN_CNT1, MIN_CNT2);
  var outSize = 0;
  while (outSize !== fileSize) {
    var ch = mm.decode();
    if (ch===256) {
      break; // EOF
    }
    outStream.writeByte(ch);
    outSize++;
  }
  range.decodeFinish();
});

return Dmc;
});
