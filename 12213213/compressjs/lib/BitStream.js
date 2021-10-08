/** Big-Endian Bit Stream, implemented on top of a (normal byte) stream. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./Stream'],function(Stream) {

    var BitStream = function(stream) {
        (function() {
            var bufferByte = 0x100; // private var for readers
            this.readBit = function() {
                if ((bufferByte & 0xFF) === 0) {
                    var ch = stream.readByte();
                    if (ch === Stream.EOF) {
                        this._eof = true;
                        return ch; /* !!! */
                    }
                    bufferByte = (ch << 1) | 1;
                }
                var bit = (bufferByte & 0x100) ? 1 : 0;
                bufferByte <<= 1;
                return bit;
            };
            // seekable iff the provided stream is
            this.seekBit = function(pos) {
                var n_byte = pos >>> 3;
                var n_bit = pos - (n_byte*8);
                this.seek(n_byte);
                this._eof = false;
                this.readBits(n_bit);
            };
            this.tellBit = function() {
                var pos = stream.tell() * 8;
                var b = bufferByte;
                while ((b & 0xFF) !== 0) {
                    pos--;
                    b <<= 1;
                }
                return pos;
            };
            // implement byte stream interface as well.
            this.readByte = function() {
                if ((bufferByte & 0xFF) === 0) {
                    return stream.readByte();
                }
                return this.readBits(8);
            };
            this.seek = function(pos) {
                stream.seek(pos);
                bufferByte = 0x100;
            };
        }).call(this);
        (function() {
            var bufferByte = 1; // private var for writers
            this.writeBit = function(b) {
                bufferByte <<= 1;
                if (b) { bufferByte |= 1; }
                if (bufferByte & 0x100) {
                    stream.writeByte(bufferByte & 0xFF);
                    bufferByte = 1;
                }
            };
            // implement byte stream interface as well
            this.writeByte = function(_byte) {
                if (bufferByte===1) {
                    stream.writeByte(_byte);
                } else {
                    stream.writeBits(8, _byte);
                }
            };
            this.flush = function() {
                while (bufferByte !== 1) {
                    this.writeBit(0);
                }
                if (stream.flush) { stream.flush(); }
            };
        }).call(this);
    };
    // inherit read/write methods from Stream.
    BitStream.EOF = Stream.EOF;
    BitStream.prototype = Object.create(Stream.prototype);
    // bit chunk read/write
    BitStream.prototype.readBits = function(n) {
        var i, r = 0, b;
        if (n > 31) {
            r = this.readBits(n-16)*0x10000; // fp multiply, not shift
            return r + this.readBits(16);
        }
        for (i = 0; i < n; i++) {
            r <<= 1; // this could make a negative value if n>31
            // bits read past EOF are all zeros!
            if (this.readBit() > 0) { r++; }
        }
        return r;
    };
    BitStream.prototype.writeBits = function(n, value) {
        if (n > 32) {
            var low = (value & 0xFFFF);
            var high = (value - low) / (0x10000); // fp division, not shift
            this.writeBits(n-16, high);
            this.writeBits(16, low);
            return;
        }
        var i;
        for (i = n-1; i >= 0; i--) {
            this.writeBit( (value >>> i) & 1 );
        }
    };

    return BitStream;
});
