/* Dummy Range Coder, for debugging.
 * This has the same interface as RangeCoder, but just dumps the frequency
 * parameters given to the file.  This helps debug problems with the model
 * driving the range coder.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./RangeCoder','./Util'],function(RangeCoder,Util){
    var Dummy = function(stream) {
        RangeCoder.call(this, stream);
    };
    Dummy.prototype = Object.create(RangeCoder.prototype);
    Dummy.prototype._write8 = function(b) {
        Util.writeUnsignedNumber(this.stream, b);
        this.stream.writeByte(b);
    };
    Dummy.prototype._write16 = function(s) {
        this.stream.writeByte((s >>> 8) & 0xFF);
        this.stream.writeByte(s & 0xFF);
    };
    Dummy.prototype._read8 = function() {
        return this.stream.readByte();
    };
    Dummy.prototype._read16 = function() {
        var hi = this.stream.readByte();
        var lo = this.stream.readByte();
        return (hi<<8) | lo;
    };
    Dummy.prototype.encodeStart = function(c, initlength) {
        this.stream.writeByte(c);
    };
    Dummy.prototype.encodeFreq = function(sy_f, lt_f, tot_f) {
        console.assert(sy_f > 0);
        console.assert(tot_f > 0);
        console.assert(tot_f <= (1<<23));
        if ((sy_f + lt_f) > tot_f) {
            console.error('dummy coder: lt_f + sy_f > tot_f',
                          sy_f, lt_f, tot_f);
        }
        Util.writeUnsignedNumber(this.stream, sy_f);
        Util.writeUnsignedNumber(this.stream, lt_f);
        Util.writeUnsignedNumber(this.stream, tot_f);
    };
    Dummy.prototype.encodeShift = function(sy_f, lt_f, shift) {
        this.encodeFreq(sy_f, lt_f, 1 << shift);
    };
    Dummy.prototype.encodeFinish = function() {
        return 0;
    };
    Dummy.prototype.decodeStart = function(skipInitialRead) {
        return skipInitialRead ? 0 : this.stream.readByte();
    };
    Dummy.prototype.decodeCulFreq = function(tot_f) {
        console.assert(tot_f > 0);
        this.sy_f = Util.readUnsignedNumber(this.stream);
        this.lt_f = Util.readUnsignedNumber(this.stream);
        this.tot_f= Util.readUnsignedNumber(this.stream);
        if (tot_f !== this.tot_f) {
            console.error('decodeCul* wrong total: got', tot_f,
                          'expected', this.tot_f);
        }
        return (this.sy_f>>>1) + this.lt_f;
    };
    Dummy.prototype.decodeCulShift = function(shift) {
        return this.decodeCulFreq(1<<shift);
    };
    Dummy.prototype.decodeUpdate = function(sy_f, lt_f, tot_f) {
        console.assert(sy_f > 0);
        console.assert(tot_f > 0);
        if (sy_f !== this.sy_f ||
            lt_f !== this.lt_f ||
            tot_f!== this.tot_f) {
            console.error('decodeUpdate wrong parameters; got',
                          sy_f, lt_f, tot_f, 'expected',
                          this.sy_f, this.lt_f, this.tot_f);
        }
    };
    Dummy.prototype.decodeFinish = function() {
    };

    return Dummy;
});
