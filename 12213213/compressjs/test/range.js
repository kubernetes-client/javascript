/* Range Coder tests */
var assert = require("assert");
var compressjs = require('../');
var Util = require('../lib/Util');

describe('basic range coder operation', function() {
    var buffer = Util.makeU8Buffer(8);
    var outStream = {
        pos: 0,
        writeByte: function(b) { buffer[this.pos++] = b; }
    };
    var inStream = {
        pos: 0,
        readByte: function() { return buffer[this.pos++]; }
    };

    var encoder = new compressjs.RangeCoder(outStream);
    encoder.encodeStart(0xCA, 0);
    // encode a two bits: 0 1
    encoder.encodeFreq(1, 0, 2);
    encoder.encodeFreq(1, 1, 2);
    // encode a byte
    encoder.encodeByte(0xFE);
    // encode a short
    encoder.encodeShort(0xBABE);
    // done!
    var size = encoder.encodeFinish();
    it('should return the correct number of bytes', function() {
        assert.equal(size, outStream.pos);
    });

    // for debugging it's sometimes nice to see the output bytes
    //console.log(new Buffer(buffer).slice(0,outStream.pos).toString('hex'));

    // now let's verify we can get all that stuff out again.
    var decoder = new compressjs.RangeCoder(inStream);
    it('should have the right header byte', function() {
        var header = decoder.decodeStart();
        assert.equal(header, 0xCA);
    });
    it('should encode bits correctly', function() {
        var b1 = decoder.decodeCulFreq(2);
        decoder.decodeUpdate(1, b1, 2);
        assert.equal(b1, 0);

        var b2 = decoder.decodeCulFreq(2);
        decoder.decodeUpdate(1, b2, 2);
        assert.equal(b2, 1);
    });
    it('should encode bytes correctly', function() {
        var b = decoder.decodeByte();
        assert.equal(b, 0xFE);
    });
    it('should encode shorts correctly', function() {
        var s = decoder.decodeShort();
        assert.equal(s, 0xBABE);
    });
    it('should finish up', function() {
        // this is in a test case to ensure it's executed in the correct
        // order (after the previous it() calls)
        decoder.decodeFinish();
        // no bytes left over
        assert.equal(outStream.pos, inStream.pos);
    });
});

describe('verify range coder clean up', function() {
    // make sure that we consume all the bits we emit, even if there
    // are odd numbers left over at the end.
    var bits = [];
    while (bits.length <= 33) {
        bits.push(bits.length);
    }
    bits.forEach(function(bits) {
        it('should cleanly consume '+bits+' bits', function() {
            var buffer = Util.makeU8Buffer(16);
            var outStream = {
                pos: 0,
                writeByte: function(b) { buffer[this.pos++] = b; }
            };
            var inStream = {
                pos: 0,
                readByte: function() { return buffer[this.pos++]; }
            };

            var encoder = new compressjs.RangeCoder(outStream);
            encoder.encodeStart(bits, 0);
            // encode a series of alternating 2/3-bits.
            //  --> # bits = 2 * (1 - ((this freq) / (total freq)))
            var i, val;
            for (i=0; i<bits; i++) {
                val = (i&1);
                encoder.encodeFreq(2, val, 3);
            }
            // done!
            var size = encoder.encodeFinish();
            assert.equal(size, outStream.pos);

            // for debugging it's sometimes nice to see the output bytes
            //console.log(new Buffer(buffer).slice(0,outStream.pos).
            //            toString('hex'));

            // now let's verify we can get all that stuff out again.
            var decoder = new compressjs.RangeCoder(inStream);
            var header = decoder.decodeStart();
            assert.equal(header, bits);
            for (i=0; i<bits; i++) {
                val = (i&1);
                var b = decoder.decodeCulFreq(3);
                // decode culmulative frequency based on the prob distrib
                // we were given.
                if (val===0) { b = (b < 2) ? 0 : 1; }
                else         { b = (b >= 1) ? 1 : 0; }
                decoder.decodeUpdate(2, val, 3);
                assert.equal(b, val);
            }
            decoder.decodeFinish();
            // no bytes left over
            assert.equal(outStream.pos, inStream.pos);
            //console.log('for', bits, 'uses', outStream.pos, 'bytes');
        });
    });
});
