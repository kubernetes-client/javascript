/** Range coding model based on Fenwick trees for O(ln N) query/update. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./RangeCoder','./Stream','./Util'],function(RangeCoder,Stream,Util){

/** We store two probabilities in a U32, so max prob is going to be 0xFFFF */
var DEFAULT_MAX_PROB = 0xFF00;
var DEFAULT_INCREMENT= 0x0100;

var ESC_MASK = 0x0000FFFF, ESC_SHIFT = 0;
var SYM_MASK = 0xFFFF0000, SYM_SHIFT = 16;
var SCALE_MASK=0xFFFEFFFE;

var FenwickModel = function(coder, size, max_prob, increment) {
    this.coder = coder;
    this.numSyms = size + 1; // save space for an escape symbol
    this.tree = Util.makeU32Buffer(this.numSyms*2);
    this.increment = (+increment) || DEFAULT_INCREMENT;
    this.max_prob = (+max_prob) || DEFAULT_MAX_PROB;
    // sanity-check to prevent overflow.
    console.assert((this.max_prob + (this.increment-1)) <= 0xFFFF);
    console.assert(size <= 0xFFFF);
    // record escape probability as 1.
    var i;
    for (i=0; i<size; i++) {
        this.tree[this.numSyms + i] = // escape prob=1, sym prob = 0
            (1 << ESC_SHIFT) | (0 << SYM_SHIFT);
    }
    this.tree[this.numSyms + i] = // escape prob = 0, sym prob = 1
        (0 << ESC_SHIFT) | (this.increment << SYM_SHIFT);
    this._sumTree();
    // probability sums are in this.tree[1].  this.tree[0] is unused.
};
FenwickModel.factory = function(coder, max_prob, increment) {
    return function(size) {
        return new FenwickModel(coder, size, max_prob, increment);
    };
};
FenwickModel.prototype.clone = function() {
    var newModel = new FenwickModel(this.coder, this.size,
                                    this.max_prob, this.increment);
    var i;
    for (i=1; i<this.tree.length; i++) {
        newModel.tree[i] = this.tree[i];
    }
    return newModel;
};
FenwickModel.prototype.encode = function(symbol) {
    var i = this.numSyms + symbol;
    var sy_f = this.tree[i];
    var mask = SYM_MASK, shift = SYM_SHIFT;
    var update = (this.increment << SYM_SHIFT);

    if ((sy_f & SYM_MASK) === 0) { // escape!
        this.encode(this.numSyms-1);
        mask = ESC_MASK;
        update -= (1<<ESC_SHIFT); // not going to escape no mo'
        shift = ESC_SHIFT;
    } else if (symbol === (this.numSyms-1) &&
               ((this.tree[1] & ESC_MASK) >>> ESC_SHIFT) === 1) {
        // this is the last escape, zero it out
        update = -this.tree[i];
    }
    // sum up the proper lt_f
    var lt_f = 0;
    while (i > 1) {
        var isRight = (i & 1);
        var parent = (i >>> 1);
        // if we're the right child, we need to
        // add the prob from the left child
        if (isRight) {
            lt_f += this.tree[2*parent];
        }
        // update sums
        this.tree[i] += update; // increase sym / decrease esc
        i = parent;
    }
    var tot_f = this.tree[1];
    this.tree[1] += update; // update prob in root
    sy_f = (sy_f & mask) >>> shift;
    lt_f = (lt_f & mask) >>> shift;
    tot_f =(tot_f& mask) >>> shift;
    this.coder.encodeFreq(sy_f, lt_f, tot_f);
    // rescale?
    if ((( this.tree[1] & SYM_MASK ) >>> SYM_SHIFT) >= this.max_prob) {
        this._rescale();
    }
};
FenwickModel.prototype._decode = function(isEscape) {
    var mask = SYM_MASK, shift = SYM_SHIFT;
    var update = (this.increment << SYM_SHIFT);
    if (isEscape) {
        mask = ESC_MASK;
        update -= (1 << ESC_SHIFT);
        shift = ESC_SHIFT;
    }
    var tot_f = (this.tree[1] & mask) >>> shift;
    var prob = this.coder.decodeCulFreq(tot_f);
    // travel down the tree looking for this
    var i = 1, lt_f = 0;
    while (i < this.numSyms) {
        this.tree[i] += update;
        // look at probability in left child.
        var leftProb = (this.tree[2*i] & mask) >>> shift;
        i *= 2;
        if ((prob-lt_f) >= leftProb) {
            lt_f += leftProb;
            i++; // take the right child.
        }
    }
    var symbol = i - this.numSyms;
    var sy_f = (this.tree[i] & mask) >>> shift;
    this.tree[i] += update;
    this.coder.decodeUpdate(sy_f, lt_f, tot_f);
    // was this the last escape?
    if (symbol === (this.numSyms-1) &&
        ((this.tree[1] & ESC_MASK) >>> ESC_SHIFT) === 1) {
        update = -this.tree[i]; // zero it out
        while (i >= 1) {
            this.tree[i] += update;
            i = (i >>> 1); // parent
        }
    }
    // rescale?
    if ((( this.tree[1] & SYM_MASK ) >>> SYM_SHIFT) >= this.max_prob) {
        this._rescale();
    }
    return symbol;
};
FenwickModel.prototype.decode = function() {
    var symbol = this._decode(false); // not escape
    if (symbol === (this.numSyms-1)) {
        // this was an escape!
        symbol = this._decode(true); // an escape!
    }
    return symbol;
};
FenwickModel.prototype._rescale = function() {
    var i, prob, noEscape = true;
    // scale symbols (possible causing them to escape)
    for (i=0; i < this.numSyms-1; i++) {
        prob = this.tree[this.numSyms + i];
        if ((prob & ESC_MASK) !== 0) {
            // this symbol escapes
            noEscape = false;
            continue;
        }
        prob = (prob & SCALE_MASK) >>> 1;
        if (prob === 0) {
            // this symbol newly escapes
            prob = (1 << ESC_SHIFT);
            noEscape = false;
        }
        this.tree[this.numSyms + i] = prob;
    }
    // scale the escape symbol
    prob = this.tree[this.numSyms + i];
    prob = (prob & SCALE_MASK) >>> 1;
    // prob should be zero if there are no escaping symbols, otherwise
    // it must be at least 1.
    if (noEscape) { prob = 0; }
    else if (prob === 0) { prob = (1 << SYM_SHIFT); }
    this.tree[this.numSyms + i] = prob;
    // sum it all up afresh
    this._sumTree();
};
FenwickModel.prototype._sumTree = function() {
    var i;
    // sum it all. (we know we won't overflow)
    for (i=this.numSyms - 1; i > 0; i--) {
        this.tree[i] = this.tree[2*i] + this.tree[2*i + 1];
    }
};

FenwickModel.MAGIC = 'fenw';
/** Simple order-0 compressor, as self-test. */
FenwickModel.compressFile = Util.compressFileHelper(FenwickModel.MAGIC, function(inStream, outStream, fileSize, props, finalByte) {
    var range = new RangeCoder(outStream);
    range.encodeStart(finalByte, 1);
    var model = new FenwickModel(range, (fileSize<0) ? 257 : 256);
    Util.compressWithModel(inStream, fileSize, model);
    range.encodeFinish();
}, true);

/** Simple order-0 decompresser, as self-test. */
FenwickModel.decompressFile = Util.decompressFileHelper(FenwickModel.MAGIC, function(inStream, outStream, fileSize) {
    var range = new RangeCoder(inStream);
    range.decodeStart(true/*already read the final byte*/);
    var model = new FenwickModel(range, (fileSize<0) ? 257 : 256);
    Util.decompressWithModel(outStream, fileSize, model);
    range.decodeFinish();
});

return FenwickModel;
});
