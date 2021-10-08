/** Simple range coding model w/ escape, suitable for sparse symbol sets.
 *  Uses a move-to-front list, which is simple and relatively performant,
 *  but slows down a lot if you want to try to model escapes more precisely
 *  (which is why this feature is disabled by default).
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./RangeCoder','./Stream','./Util'],function(RangeCoder,Stream,Util){

var DEFAULT_MAX_PROB = 0xFF00;
var DEFAULT_INCREMENT= 0x0100;

var NUMERIC_SORT = function(a, b) { return a - b; };

var MTFModel = function(coder, size, max_prob, increment, betterEscape) {
    this.coder = coder;
    this.increment = (+increment) || DEFAULT_INCREMENT;
    this.max_prob = (+max_prob) || DEFAULT_MAX_PROB;
    console.assert((this.max_prob + (this.increment-1)) <= 0xFFFF);
    this.sym = Util.makeU16Buffer(size+1);
    this.prob= Util.makeU16Buffer(size+2);
    this.sym[0] = size; // escape code
    this.prob[0]= 0;
    this.seenSyms = 1;
    // total probability always found in this.prob[this.seenSyms]
    this.prob[this.seenSyms] = this.increment;
    this.numSyms = size;
    if (betterEscape) {
        this.sortedSeen = [size];
    }
};
MTFModel.factory = function(coder, max_prob, increment, betterEscape) {
    return function(size) {
        return new MTFModel(coder, size, max_prob, increment, betterEscape);
    };
};
MTFModel.prototype.clone = function() {
    var newModel = new MTFModel(this.coder, this.numSyms, this.max_prob,
                                this.increment, !!this.sortedSeen);
    var i;
    for (i=0; i<this.seenSyms; i++) {
        newModel.sym[i] = this.sym[i];
        newModel.prob[i] = this.prob[i];
    }
    newModel.prob[i] = this.prob[i]; // total probability
    newModel.seenSyms = this.seenSyms;
    if (this.sortedSeen) {
        newModel.sortedSeen = this.sortedSeen.slice(0);
    }
    return newModel;
};
MTFModel.prototype._update = function(symbol, index, sy_f) {
    var j, tot_f;
    // move this symbol to the end
    for (j=index; j<this.seenSyms-1; j++) {
        this.sym[j] = this.sym[j+1];
        this.prob[j] = this.prob[j+1] - sy_f;
    }
    if (index < this.seenSyms) {
        this.sym[j] = symbol;
        this.prob[j] = this.prob[j+1] - sy_f;
        // increase frequency for this symbol, and total freq at same time
        this.prob[this.seenSyms] = tot_f =
            this.prob[this.seenSyms] + this.increment;
        if (symbol === this.numSyms && this.seenSyms >= this.numSyms) {
            // this is the last time we'll see an escape! remove it.
            tot_f = this.prob[--this.seenSyms];
            if (this.sortedSeen) { this.sortedSeen.length--; }
        }
    } else { // add to the end
        tot_f = this.prob[this.seenSyms];
        this.sym[index] = symbol;
        this.prob[index] = tot_f;
        tot_f += this.increment;
        this.prob[++this.seenSyms] = tot_f;
        if (this.sortedSeen) {
            this.sortedSeen.push(symbol);
            // hopefully sort is very fast on a mostly-sorted array
            this.sortedSeen.sort(NUMERIC_SORT);
        }
    }
    if (tot_f >= this.max_prob) { this._rescale(); }
    return;
};
MTFModel.prototype._rescale = function() {
    var i, j, total=0;
    var noEscape = true;
    if (this.sortedSeen) { this.sortedSeen.length = 0; }
    for(i=0, j=0; i<this.seenSyms; i++) {
        var sym = this.sym[i];
        var sy_f = this.prob[i+1] - this.prob[i];
        sy_f >>>= 1;
        if (sy_f > 0) {
            if (sym === this.numSyms) {
                noEscape = false;
            }
            this.sym[j] = sym;
            this.prob[j++] = total;
            total += sy_f;
            if (this.sortedSeen) { this.sortedSeen.push(sym); }
        }
    }
    this.prob[j] = total;
    this.seenSyms = j;
    if (this.sortedSeen) {
        this.sortedSeen.sort(NUMERIC_SORT);
    }
    // don't allow escape to go to zero prob if we still need it
    if (noEscape && this.seenSyms < this.numSyms) {
        // NOTE this adds this.increment to escape freq; the FenwickModel
        //      just adds one.
        this._update(this.numSyms/*escape*/, this.seenSyms/*at end*/);
    }
};
MTFModel.prototype.decode = function() {
    var tot_f = this.prob[this.seenSyms];
    var prob = this.coder.decodeCulFreq(tot_f);
    // we're expecting to find the probability near the "most recent" side
    // of our array
    var i;
    for (i=this.seenSyms-1; i>=0; i--) {
        if (this.prob[i] <= prob /*&& prob < this.prob[i+1]*/)
            break;
    }
    console.assert(i>=0);
    var symbol = this.sym[i];
    var lt_f = this.prob[i];
    var sy_f = this.prob[i + 1] - lt_f;
    this.coder.decodeUpdate(sy_f, lt_f, tot_f);
    this._update(symbol, i, sy_f);
    if (symbol === this.numSyms) {
        /* this is an escape */
        /* decode the literal */
        sy_f = 1;
        tot_f = this.numSyms;
        if (this.sortedSeen) {
            // do a slower, but more precise decoding of the literal
            // by excluding the already-seen symbols.
            var seen = this.sortedSeen;
            tot_f = this.numSyms - this.seenSyms;
            if (seen[seen.length-1] === this.numSyms) { tot_f++; }
            symbol = lt_f = this.coder.decodeCulFreq(tot_f);
            for (i=0; i < seen.length && seen[i] <= symbol ; i++) {
                symbol++;
            }
        } else {
            symbol = lt_f = this.coder.decodeCulFreq(tot_f);
        }
        this.coder.decodeUpdate(sy_f, lt_f, tot_f);
        this._update(symbol, this.seenSyms);
    }
    return symbol;
};
MTFModel.prototype.encode = function(symbol) {
    // look for symbol, from most-recent to oldest
    var i, sy_f, lt_f, tot_f;
    for (i=this.seenSyms-1; i>=0; i--) {
        if (symbol === this.sym[i]) {
            // ok, found it.
            lt_f = this.prob[i];
            sy_f = this.prob[i + 1] - lt_f;
            tot_f = this.prob[this.seenSyms];
            this.coder.encodeFreq(sy_f, lt_f, tot_f);
            return this._update(symbol, i, sy_f);
        }
    }
    // couldn't find this symbol.  encode as escape.
    console.assert(symbol !== this.numSyms); // catch infinite recursion
    this.encode(this.numSyms); // guaranteed to be found in the table.
    // code symbol as literal
    sy_f = 1;
    lt_f = symbol;
    tot_f = this.numSyms;
    if (this.sortedSeen) {
        // do a slower, but more precise encoding of the literal
        // by excluding the already-seen symbols.
        var seen = this.sortedSeen;
        tot_f -= this.seenSyms;
        if (seen[seen.length-1] === this.numSyms) { tot_f++; }
        for (i=0; i < seen.length && seen[i] < symbol; i++) {
            lt_f--;
        }
    }
    this.coder.encodeFreq(sy_f, lt_f, tot_f);
    // now add symbol to the end.
    return this._update(symbol, this.seenSyms);
};

MTFModel.MAGIC = 'mtfm';
/** Simple order-0 compressor, as self-test. */
MTFModel.compressFile = Util.compressFileHelper(MTFModel.MAGIC, function(inStream, outStream, fileSize, props, finalByte) {
  var range = new RangeCoder(outStream);
  range.encodeStart(finalByte, 1);
  var model = new MTFModel(range, (fileSize<0) ? 257 : 256);
  Util.compressWithModel(inStream, fileSize, model);
  range.encodeFinish();
}, true);

/** Simple order-0 decompresser, as self-test. */
MTFModel.decompressFile = Util.decompressFileHelper(MTFModel.MAGIC, function(inStream, outStream, fileSize) {
  var range = new RangeCoder(inStream);
  range.decodeStart(true/*we already read the 'free' byte*/);
  var model = new MTFModel(range, (fileSize<0) ? 257 : 256);
  Util.decompressWithModel(outStream, fileSize, model);
  range.decodeFinish();
});

return MTFModel;
});
