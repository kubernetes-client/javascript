/* Range Coder.  Inspired by rangecod.c from rngcod13.zip from
 *    http://www.compressconsult.com/rangecoder/
 * This JavaScript version is:
 *    Copyright (c) 2013 C. Scott Ananian.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([],function(){

    // Uses 32-bit integer math.  Hopefully the JavaScript runtime figures
    // that out. ;)
    // see https://github.com/kripken/emscripten/wiki/LLVM-Types-in-JavaScript
    // for some hints on doing 32-bit unsigned match in JavaScript.
    // One key is the use of ">>>0" to change a signed result to unsigned.
    var CODE_BITS = 32;
    var Top_value = Math.pow(2, CODE_BITS-1);
    var SHIFT_BITS = (CODE_BITS - 9);
    var EXTRA_BITS = ((CODE_BITS-2) % 8 + 1);
    var Bottom_value = (Top_value >>> 8);

    var MAX_INT = Math.pow(2, CODE_BITS) - 1;

    /* it is highly recommended that the total frequency count is less  */
    /* than 1 << 19 to minimize rounding effects.                       */
    /* the total frequency count MUST be less than 1<<23                */


    var RangeCoder = function(stream) {
        this.low = 0; /* low end of interval */
        this.range = Top_value; /* length of interval */
        this.buffer = 0; /* buffer for input/output */
        this.help = 0; /* bytes_to_follow / intermediate value */
        this.bytecount = 0; /* counter for output bytes */
        this.stream = stream;
    };

    /* Do the normalization before we need a defined state, instead of
     * after messing it up.  This simplifies starting and ending. */
    var enc_normalize = function(rc, outputStream) {
        while (rc.range <= Bottom_value) { /* do we need renormalization? */
            if (rc.low < (0xFF << SHIFT_BITS)) {//no carry possible, so output
                outputStream.writeByte(rc.buffer);
                for (; rc.help; rc.help--)
                    outputStream.writeByte(0xFF);
                rc.buffer = (rc.low >>> SHIFT_BITS) & 0xFF;
            } else if (rc.low & Top_value) { /* carry now, no future carry */
                outputStream.writeByte(rc.buffer+1);
                for (; rc.help; rc.help--)
                    outputStream.writeByte(0x00);
                rc.buffer = (rc.low >>> SHIFT_BITS) & 0xFF;
            } else {
                rc.help++;
                if (rc.help > MAX_INT)
                    throw new Error("Too many bytes outstanding, "+
                                    "file too large!");
            }
            rc.range = (rc.range << 8) >>> 0;/*ensure result remains positive*/
            rc.low = ((rc.low << 8) & (Top_value - 1)) >>> 0; /* unsigned */
            rc.bytecount++;
        }
    };

    /* Start the encoder                                         */
    /* c is written as the first byte in the datastream.
     * one could do w/o, but then you have an additional if per output byte */
    RangeCoder.prototype.encodeStart = function(c, initlength) {
        this.low = 0;
        this.range = Top_value;
        this.buffer = c;
        this.help = 0;
        this.bytecount = initlength;
    };

   /* Encode a symbol using frequencies                         */
    /* rc is the range coder to be used                          */
    /* sy_f is the interval length (frequency of the symbol)     */
    /* lt_f is the lower end (frequency sum of < symbols)        */
    /* tot_f is the total interval length (total frequency sum)  */
    /* or (faster): tot_f = (code_value)1<<shift                             */
    RangeCoder.prototype.encodeFreq = function(sy_f, lt_f, tot_f) {
        enc_normalize(this, this.stream);
        var r = (this.range / tot_f) >>> 0; // note coercion to integer
        var tmp = r * lt_f;
        this.low += tmp;
        if ((lt_f + sy_f) < tot_f) {
            this.range = r * sy_f;
        } else {
            this.range -= tmp;
        }
    };
    RangeCoder.prototype.encodeShift = function(sy_f, lt_f, shift) {
        enc_normalize(this, this.stream);
        var r = this.range >>> shift;
        var tmp = r * lt_f;
        this.low += tmp;
        if ((lt_f + sy_f) >>> shift) {
            this.range -= tmp;
        } else {
            this.range = r * sy_f;
        }
    };
    /* Encode a bit w/o modelling. */
    RangeCoder.prototype.encodeBit = function(b) {
        this.encodeShift(1, b?1:0, 1);
    };
    /* Encode a byte w/o modelling. */
    RangeCoder.prototype.encodeByte = function(b) {
        this.encodeShift(1, b, 8);
    };
    /* Encode a short w/o modelling. */
    RangeCoder.prototype.encodeShort = function(s) {
        this.encodeShift(1, s, 16);
    };

    /* Finish encoding                                           */
    /* returns number of bytes written                           */
    RangeCoder.prototype.encodeFinish = function() {
        var outputStream = this.stream;
        enc_normalize(this, outputStream);
        this.bytecount += 5;
        var tmp = this.low >>> SHIFT_BITS;
        if ((this.low & (Bottom_value-1)) >= ((this.bytecount&0xFFFFFF)>>>1)) {
            tmp++;
        }
        if (tmp > 0xFF) { /* we have a carry */
            outputStream.writeByte(this.buffer + 1);
            for (; this.help; this.help--)
                outputStream.writeByte(0x00);
        } else { /* no carry */
            outputStream.writeByte(this.buffer);
            for (; this.help; this.help--)
                outputStream.writeByte(0xFF);
        }
        outputStream.writeByte(tmp & 0xFF);
        // XXX: i'm pretty sure these could be three arbitrary bytes
        //      they are consumed by the decoder at the end
        outputStream.writeByte((this.bytecount >>> 16) & 0xFF);
        outputStream.writeByte((this.bytecount >>>  8) & 0xFF);
        outputStream.writeByte((this.bytecount       ) & 0xFF);
        return this.bytecount;
    };

    /* Start the decoder; you need to provide the *second* byte from the
     * datastream. (The first byte was provided to startEncoding and is
     * ignored by the decoder.)
     */
    RangeCoder.prototype.decodeStart = function(skipInitialRead) {
        var c = skipInitialRead ? 0 : this.stream.readByte();
        if (typeof(c) !== 'number' || c < 0) {
            return c; // EOF
        }
        this.buffer = this.stream.readByte();
        this.low = this.buffer >>> (8 - EXTRA_BITS);
        this.range = 1 << EXTRA_BITS;
        return c;
    };

    var dec_normalize = function(rc, inputStream) {
        while (rc.range <= Bottom_value) {
            rc.low = (rc.low << 8) | ((rc.buffer << EXTRA_BITS) & 0xFF);
            /* rc.low could be negative here; don't fix it quite yet */
            rc.buffer = inputStream.readByte();
            rc.low |= rc.buffer >>> (8-EXTRA_BITS);
            rc.low = rc.low >>> 0; /* fix it now */
            rc.range = (rc.range << 8) >>> 0; /* ensure stays positive */
        }
    };

    /* Calculate cumulative frequency for next symbol. Does NO update!*/
    /* rc is the range coder to be used                          */
    /* tot_f is the total frequency                              */
    /* or: totf is (code_value)1<<shift                                      */
    /* returns the <= cumulative frequency                         */
    RangeCoder.prototype.decodeCulFreq = function(tot_f) {
        dec_normalize(this, this.stream);
        this.help = (this.range / tot_f) >>> 0; // note coercion to integer
        var tmp = (this.low / this.help) >>> 0; // again
        return (tmp >= tot_f ? tot_f-1 : tmp);
    };
    RangeCoder.prototype.decodeCulShift = function(shift) {
        dec_normalize(this, this.stream);
        this.help = this.range >>> shift;
        var tmp = (this.low / this.help) >>> 0; // coercion to unsigned
        // shift is less than 31, so shift below will remain positive
        return ((tmp>>>shift) ? (1<<shift)-1 : tmp);
    };

    /* Update decoding state                                     */
    /* rc is the range coder to be used                          */
    /* sy_f is the interval length (frequency of the symbol)     */
    /* lt_f is the lower end (frequency sum of < symbols)        */
    /* tot_f is the total interval length (total frequency sum)  */
    RangeCoder.prototype.decodeUpdate = function(sy_f, lt_f, tot_f) {
        var tmp = this.help * lt_f; // should not overflow!
        this.low -= tmp;
        if (lt_f + sy_f < tot_f) {
            this.range = (this.help * sy_f);
        } else {
            this.range -= tmp;
        }
    };

    /* Decode a bit w/o modelling. */
    RangeCoder.prototype.decodeBit = function() {
        var tmp = this.decodeCulShift(1);
        this.decodeUpdate(1, tmp, 1<<1);
        return tmp;
    };
    /* decode a byte w/o modelling */
    RangeCoder.prototype.decodeByte = function() {
        var tmp = this.decodeCulShift(8);
        this.decodeUpdate(1, tmp, 1<<8);
        return tmp;
    };
    /* decode a short w/o modelling */
    RangeCoder.prototype.decodeShort = function() {
        var tmp = this.decodeCulShift(16);
        this.decodeUpdate(1, tmp, 1<<16);
        return tmp;
    };

    /* Finish decoding */
    RangeCoder.prototype.decodeFinish = function() {
        /* normalize to use up all bytes */
        dec_normalize(this, this.stream);
    };

    /** Utility functions */

    // bitstream interface
    RangeCoder.prototype.writeBit = RangeCoder.prototype.encodeBit;
    RangeCoder.prototype.readBit = RangeCoder.prototype.decodeBit;

    // stream interface
    RangeCoder.prototype.writeByte = RangeCoder.prototype.encodeByte;
    RangeCoder.prototype.readByte = RangeCoder.prototype.decodeByte;

    return RangeCoder;
});
