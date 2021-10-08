/* Tweaked version of LZJB, using range coder. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./Context1Model','./FenwickModel','./LogDistanceModel','./NoModel','./RangeCoder','./Stream','./Util'],function(Context1Model,FenwickModel,LogDistanceModel,NoModel,RangeCoder,Stream,Util){

var LzjbR = Object.create(null);
LzjbR.MAGIC = 'lzjR';

// Constants was used for compress/decompress function.
var NBBY = 8,
    MATCH_BITS = 6,
    MATCH_MIN = 3,
    MATCH_MAX = ((1 << MATCH_BITS) + (MATCH_MIN - 1)),
    OFFSET_MASK = ((1 << (16 - MATCH_BITS)) - 1),
    LEMPEL_SIZE_BASE = 1024;
var LENGTH_MODEL_CUTOFF = 32;


/**
 * Compress using modified LZJB algorithm.  Instead of using the simple
 * 9-bit literal / 17-bit match format of the original, use a range
 * coder for the literal/match bit and for the offset and length.
 */
LzjbR.compressFile = Util.compressFileHelper(LzjbR.MAGIC, function(inStream, outStream, fileSize, props, finalByte) {
    var sstart, dstart = [], slen,
        src = 0, dst = 0,
        cpy, copymap,
        mlen, offset,
        hash, hp,
        lempel,
        i, j;

    // in an improvement over the original C implementation of LZJB, we expand
    // the hash table to track a number of potential matches, not just the
    // most recent.  This doesn't require any changes to the decoder.
    var LEMPEL_SIZE = LEMPEL_SIZE_BASE;
    var EXPAND = 1; // default to original C impl
    if (typeof(props)==='number') {
        LEMPEL_SIZE *= 2;
        props = Math.max(1, Math.min(9, props)) - 1;
        EXPAND = 1<<Math.floor(props/2);
        if (props&1) EXPAND = Math.round(EXPAND * 1.5);
        if (props >=2 && props <= 4) EXPAND++;
    }

    var encoder = new RangeCoder(outStream);
    encoder.encodeStart(finalByte, 1);

    // use Uint16Array if available (zero-filled)
    lempel = Util.makeU16Buffer(LEMPEL_SIZE * EXPAND);

    var window = Util.makeU8Buffer(OFFSET_MASK+1);
    var windowpos = 0;
    var winput = function(_byte) {
        window[windowpos++] = _byte;
        if (windowpos >= window.length) {
            windowpos = 0;
        }
        return _byte;
    };

    var unbuffer = [];
    var get = function() {
        if (unbuffer.length)
            return unbuffer.pop();
        return inStream.readByte();
    };
    var unget = function(_byte) {
        unbuffer.push(_byte);
    };

    var matchpossibility = [];
    var MATCH = 256;
    var EOF_SYM = 257;
    var noModelFactory = NoModel.factory(encoder);
    var modelFactory = FenwickModel.factory(encoder, 0xFF00, 0x100);
    var literalModel = new Context1Model(modelFactory, 256,
                                         ((fileSize<0) ? EOF_SYM : MATCH) + 1);
    var sparseModelFactory = function(size) {
        if (size <= LENGTH_MODEL_CUTOFF) { return modelFactory(size); }
        return noModelFactory(size);
    };
    var lenModel = new LogDistanceModel((MATCH_MAX-MATCH_MIN)+1, 0,
                                        modelFactory, sparseModelFactory);
    var posModel = new LogDistanceModel(OFFSET_MASK+1, 1,
                                        modelFactory, sparseModelFactory);
    var lastChar = 0x20, lastOffset = 0;
    while (true) {
        var initialPos = windowpos;
        var c1 = get();
        if (c1 === Stream.EOF) break;

        var c2 = get();
        if (c2 === Stream.EOF) {
            literalModel.encode(winput(c1), lastChar); // literal, not a match
            break;
        }
        var c3 = get();
        if (c3 === Stream.EOF) {
            literalModel.encode(winput(c1), lastChar); // literal, not a match
            unget(c2); lastChar = c1;
            continue;
        }

        hash = (c1 << 16) + (c2 << 8) + c3;
        hash ^= (hash >> 9);
        hash += (hash >> 5);
        hash ^= c1;
        hp = (hash & (LEMPEL_SIZE - 1)) * EXPAND;
        matchpossibility.length = 0;
        for (j=0; j<EXPAND; j++) {
            offset = (windowpos - lempel[hp+j]) & OFFSET_MASK;
            cpy = window.length + windowpos - offset;
            var w1 = window[cpy & OFFSET_MASK];
            var w2 = window[(cpy+1) & OFFSET_MASK];
            var w3 = window[(cpy+2) & OFFSET_MASK];
            // if offset is small, we might not have copied the tentative
            // bytes into the window yet.  (Note that offset=0 really means
            // offset=(OFFSET_MASK+1).)
            if (offset==1) { w2 = c1; w3 = c2; }
            else if (offset==2) { w3 = c1; }
            if (c1 === w1 && c2 === w2 && c3 === w3) {
                matchpossibility.push(offset);
            }
        }
        // store this location in the hash, move the others over to make room
        // oldest match drops off
        for (j=EXPAND-1; j>0; j--)
            lempel[hp+j] = lempel[hp+j-1];
        lempel[hp] = windowpos;
        // did we find any matches?
        if (matchpossibility.length === 0) {
            literalModel.encode(winput(c1), lastChar); // literal, not a match
            unget(c3);
            unget(c2);
            lastChar = c1;
        } else {
            literalModel.encode(MATCH, lastChar); // a match!
            // find the longest of the possible matches
            winput(c1); winput(c2); winput(c3); lastChar = c3;
            var c4 = get(), last = matchpossibility[0];
            var base = window.length + windowpos;
            for (mlen = MATCH_MIN; mlen < MATCH_MAX; mlen++, base++) {
                if (c4 === Stream.EOF) break;
                for (j=0; j < matchpossibility.length; ) {
                    var w4 = window[(base - matchpossibility[j]) & OFFSET_MASK];
                    if (c4 !== w4) {
                        last = matchpossibility[j];
                        matchpossibility.splice(j, 1);
                    } else {
                        j++;
                    }
                }
                if (matchpossibility.length===0) break; // no more matches
                winput(c4); lastChar = c4;
                c4 = get();
            }
            if (matchpossibility.length !== 0) {
                // maximum length match, rock on!
                last = matchpossibility[0];
            }
            unget(c4);

            // encode match length
            // XXX we could get a bit more compression if we allowed
            // the length to predict the offset (or vice-versa)
            lenModel.encode(mlen - MATCH_MIN);
            offset = (initialPos - last) & OFFSET_MASK;
            if (offset === lastOffset) {
                posModel.encode(-1); // common case!
            } else {
                posModel.encode(offset);
                lastOffset = offset;
            }
        }
    }
    if (fileSize < 0) {
        literalModel.encode(EOF_SYM, lastChar); // end of file (streaming)
    }
    encoder.encodeFinish();
}, true);

/**
 * Decompress using modified LZJB algorithm.
 */
LzjbR.decompressFile = Util.decompressFileHelper(LzjbR.MAGIC, function(inStream, outStream, outSize) {
    var sstart, dstart = [], slen,
        src = 0, dst = 0,
        cpy, copymap,
        mlen, offset,
        i, c;

    var window = Util.makeU8Buffer(OFFSET_MASK+1);
    var windowpos = 0;

    var decoder = new RangeCoder(inStream);
    decoder.decodeStart(true/* we already read the 'free' byte*/);

    var MATCH = 256;
    var EOF_SYM = 257;
    var noModelFactory = NoModel.factory(decoder);
    var modelFactory = FenwickModel.factory(decoder, 0xFF00, 0x100);
    var literalModel = new Context1Model(modelFactory, 256,
                                         ((outSize<0) ? EOF_SYM : MATCH) + 1);
    var sparseModelFactory = function(size) {
        if (size <= LENGTH_MODEL_CUTOFF) { return modelFactory(size); }
        return noModelFactory(size);
    };
    var lenModel = new LogDistanceModel((MATCH_MAX-MATCH_MIN)+1, 0,
                                        modelFactory, sparseModelFactory);
    var posModel = new LogDistanceModel(OFFSET_MASK+1, 1,
                                        modelFactory, sparseModelFactory);
    var lastChar = 0x20, lastOffset = 0;
    while (outSize !== 0) {
        c = literalModel.decode(lastChar);
        if (c === EOF_SYM) {
            break;
        } else if (c === MATCH) {
            mlen = lenModel.decode() + MATCH_MIN;
            cpy = posModel.decode();
            if (cpy<0) { cpy = lastOffset; }
            else       { lastOffset = cpy; }
            if (outSize >= 0) outSize -= mlen;
            while (--mlen >= 0) {
                c = lastChar = window[windowpos++] = window[cpy++];
                outStream.writeByte(c);
                if (windowpos >= window.length) { windowpos=0; }
                if (cpy >= window.length) { cpy = 0; }
            }
        } else {
            outStream.writeByte(c);
            window[windowpos++] = lastChar = c;
            if (windowpos >= window.length) { windowpos=0; }
            if (outSize >= 0) outSize--;
        }
    }
    decoder.decodeFinish();
});


return LzjbR;
});
