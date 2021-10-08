/** Simple (log n)(n) distance model. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./Util'],function(Util){

    // lengthBitsModelFactory will be called with arguments 2, 4, 8, 16, etc
    // and must return an appropriate model or coder.
    var LogDistanceModel = function(size, extraStates,
                                    lgDistanceModelFactory,
                                    lengthBitsModelFactory) {
        var i;
        var bits = Util.fls(size-1);
        this.extraStates = +extraStates || 0;
        this.lgDistanceModel = lgDistanceModelFactory(1 + bits + extraStates);
        // this.distanceModel[n] used for distances which are n-bits long,
        // but only n-1 bits are encoded: the top bit is known to be one.
        this.distanceModel = [];
        for (i=2 ; i <= bits; i++) {
            var numBits = i - 1;
            this.distanceModel[i] = lengthBitsModelFactory(1<<numBits);
        }
    };
    /* you can give this model arguments between 0 and (size-1), or else
       a negative argument which is one of the 'extra states'. */
    LogDistanceModel.prototype.encode = function(distance) {
        if (distance < 2) { // small distance or an 'extra state'
            this.lgDistanceModel.encode(distance + this.extraStates);
            return;
        }
        var lgDistance = Util.fls(distance);
        console.assert(distance & (1<<(lgDistance-1))); // top bit is set
        console.assert(lgDistance >= 2);
        this.lgDistanceModel.encode(lgDistance + this.extraStates);
        // now encode the rest of the bits.
        var rest = distance & ((1 << (lgDistance-1)) - 1);
        this.distanceModel[lgDistance].encode(rest);
    };
    LogDistanceModel.prototype.decode = function() {
        var lgDistance = this.lgDistanceModel.decode() - this.extraStates;
        if (lgDistance < 2) {
            return lgDistance; // this is a small distance or an 'extra state'
        }
        var rest = this.distanceModel[lgDistance].decode();
        return (1 << (lgDistance-1)) + rest;
    };
    return LogDistanceModel;
});
