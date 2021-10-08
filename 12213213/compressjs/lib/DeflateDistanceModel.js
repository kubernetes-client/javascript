/** Distance model used by gzip/deflate.
 *  Encodes distances starting at 0 (for deflate compatibility, subtract
 *  one from distance to encode).
 *  Uses ~32-entry model to predict ln2(distance) (more-or-less) and then
 *  encodes a few more bits for the actual distance. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./Util'],function(Util){

    // lengthBitsModelFactory will be called with arguments 2, 4, 8, 16, etc
    // and must return an appropriate model or coder.
    var DeflateDistanceModel = function(size, extraStates,
                                        lgDistanceModelFactory,
                                        lengthBitsModelFactory) {
        var i;
        var bits = Util.fls(size-1);
        this.extraStates = +extraStates || 0;
        this.lgDistanceModel = lgDistanceModelFactory(2*bits + extraStates);
        // this.distanceModel[n] used for distances which are n-bits long,
        // but only n-2 bits are encoded: the top bit is known to be one,
        // and the next bit is encoded by the lgDistanceModel.
        this.distanceModel = [];
        for (i=3 ; i <= bits; i++) {
            var numBits = i - 2;
            this.distanceModel[i] = lengthBitsModelFactory(1<<numBits);
        }
    };
    /* you can give this model arguments between 0 and (size-1), or else
       a negative argument which is one of the 'extra states'. */
    DeflateDistanceModel.prototype.encode = function(distance) {
        if (distance < 4) { // small distance or an 'extra state'
            this.lgDistanceModel.encode(distance + this.extraStates);
            return;
        }
        var lgDistance = Util.fls(distance);
        console.assert(distance & (1<<(lgDistance-1))); // top bit is set
        console.assert(lgDistance >= 3);
        var nextBit = (distance & (1 << (lgDistance-2))) ? 1 : 0;
        var l = 4 + ((lgDistance-3)*2) + nextBit;
        this.lgDistanceModel.encode(l + this.extraStates);
        // now encode the rest of the bits.
        var rest = distance & ((1 << (lgDistance-2)) - 1);
        this.distanceModel[lgDistance].encode(rest);
    };
    DeflateDistanceModel.prototype.decode = function() {
        var l = this.lgDistanceModel.decode() - this.extraStates;
        if (l < 4) {
            return l; // this is a small distance or an 'extra state'
        }
        var nextBit = (l&1);
        var lgDistance = ((l-4) >>> 1) + 3;
        var rest = this.distanceModel[lgDistance].decode();
        return ((2+nextBit) << (lgDistance-2)) + rest;
    };
    return DeflateDistanceModel;
});
