/* A simple bzip-like BWT compressor with a range encoder; written as a
 * self-test of the BWT package. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./freeze','./BWT','./DefSumModel','./FenwickModel','./LogDistanceModel','./NoModel','./RangeCoder','./Stream','./Util'], function(freeze, BWT, DefSumModel, FenwickModel, LogDistanceModel, NoModel, RangeCoder, Stream, Util) {
    var EOF = Stream.EOF;

    var F_PROB_MAX  = 0xFF00;
    var F_PROB_INCR = 0x0100;

    BWTC = Object.create(null);
    BWTC.MAGIC = "bwtc";
    BWTC.compressFile = Util.compressFileHelper(BWTC.MAGIC, function(input, output, size, props, finalByte) {
        var encoder = new RangeCoder(output);
        encoder.encodeStart(finalByte, 1);

        var blockSize = 9;
        if (typeof(props)==='number' && props >= 1 && props <= 9) {
            blockSize = props;
        }
        encoder.encodeByte(blockSize);
        var fast = (blockSize <= 5);
        blockSize *= 100000;

        var block = Util.makeU8Buffer(blockSize);
        var readBlock = function() {
            var pos;
            for (pos=0; pos < blockSize; ) {
                var ch = input.readByte();
                if (ch < 0) { break; }
                block[pos++] = ch;
            }
            return pos;
        };
        var U = Util.makeU8Buffer(blockSize);
        var A = Util.makeS32Buffer(blockSize);
        var M = Util.makeU8Buffer(256); // move to front array
        var bitModelFactory = NoModel.factory(encoder);
        var lenModel = new LogDistanceModel(blockSize, 0,
                                            bitModelFactory,
                                            bitModelFactory);
        var length, b, c, pidx, i, j;
        do {
            length = readBlock();
            if (length === 0) { break; }
            // indicate that there's another block comin'
            // and encode the length of the block if necessary
            if (length === block.length) {
                encoder.encodeFreq(1, 0, 3); // "full size block"
                b = block;
            } else {
                encoder.encodeFreq(1, 1, 3); // "short block"
                lenModel.encode(length);
                b = block.subarray(0, length);
            }
            pidx = BWT.bwtransform(b, U, A, length, 256);
            lenModel.encode(pidx); // starting index
            // encode the alphabet subset used
            var useTree = Util.makeU16Buffer(512);
            for (i=0; i<length; i++) {
                c = U[i];
                useTree[256+c] = 1;
            }
            for (i=255; i>0; i--) { // sum all the way up the tree
                useTree[i] = useTree[2*i] + useTree[2*i + 1];
            }
            useTree[0] = 1; // sentinel
            for (i=1; i<512; i++) {
                var parent = i>>>1;
                var full = 1 << (9-Util.fls(i));
                if (useTree[parent] === 0 || useTree[parent] === (full*2)) {
                    /* already known full/empty */
                } else if (i >= 256) {
                    encoder.encodeBit(useTree[i]); // leaf node
                } else {
                    var v = useTree[i];
                    v = (v===0) ? 0 : (v===full) ? 2 : 1;
                    encoder.encodeFreq(1, v, 3);
                }
            }
            // remap symbols to this subset
            var alphabetSize = 0;
            for (i=0; i<256; i++) {
                if (useTree[256+i]) { // symbol in use
                    M[alphabetSize++] = i;
                }
            }
            useTree = null;
            // MTF encoding of U
            for (i=0; i<length; i++) {
                c = U[i];
                for (j=0; j<alphabetSize; j++) {
                    if (M[j] === c) {
                        break;
                    }
                }
                console.assert(j<alphabetSize);
                U[i] = j;
                // move to front
                for (; j>0; j--) {
                    M[j] = M[j-1];
                }
                M[0] = c;
            }
            // RLE/range encoding
            var model = new FenwickModel(encoder, alphabetSize+1,
                                         F_PROB_MAX, F_PROB_INCR);
            if (fast) { model = new DefSumModel(encoder, alphabetSize+1); }
            var runLength = 0;
            var emitLastRun = function() {
                // binary encode runs of zeros
                while (runLength !== 0) {
                    if (runLength&1) {
                        model.encode(0); // RUNA
                        runLength-=1;
                    } else {
                        model.encode(1); // RUNB
                        runLength-=2;
                    }
                    runLength >>>= 1;
                }
            };
            for (i=0; i<length; i++) {
                c = U[i];
                if (c === 0) {
                    runLength++;
                } else {
                    emitLastRun();
                    model.encode(c+1);
                    // reset for next
                    runLength = 0;
                }
            }
            emitLastRun();
            // done with this block!
        } while (length === block.length);

        encoder.encodeFreq(1, 2, 3); // "no more blocks"
        encoder.encodeFinish();
    }, true);

    BWTC.decompressFile = Util.decompressFileHelper(BWTC.MAGIC, function(input, output, size) {
        var decoder = new RangeCoder(input);
        decoder.decodeStart(true/* already read the extra byte */);
        var blockSize = decoder.decodeByte();
        console.assert(blockSize >= 1 && blockSize <= 9);
        var fast = (blockSize <= 5);
        blockSize *= 100000;

        var block = Util.makeU8Buffer(blockSize);
        var U = Util.makeU8Buffer(blockSize);
        var A = Util.makeS32Buffer(blockSize);
        var M = Util.makeU8Buffer(256); // move to front array
        var bitModelFactory = NoModel.factory(decoder);
        var lenModel = new LogDistanceModel(blockSize, 0,
                                            bitModelFactory,
                                            bitModelFactory);
        var b, length, i, j, c;
        while (true) {
            var blockIndicator = decoder.decodeCulFreq(3);
            decoder.decodeUpdate(1, blockIndicator, 3);
            if (blockIndicator === 0) { // full-length block
                length = blockSize;
                b = block;
            } else if (blockIndicator === 1) { // short block
                length = lenModel.decode();
                b = block.subarray(0, length);
            } else if (blockIndicator === 2) { // all done, no more blocks
                break;
            }
            // read starting index for unBWT
            var pidx = lenModel.decode();
            // decode the alphabet subset used
            var useTree = Util.makeU16Buffer(512);
            useTree[0] = 1; // sentinel
            for (i=1; i<512; i++) {
                var parent = i>>>1;
                var full = 1 << (9-Util.fls(i));
                if (useTree[parent] === 0 || useTree[parent] === (full*2)) {
                    /* already known full/empty */
                    useTree[i] = useTree[parent] >>> 1;
                } else if (i >= 256) {
                    useTree[i] = decoder.decodeBit(); // leaf node
                } else {
                    var v = decoder.decodeCulFreq(3);
                    decoder.decodeUpdate(1, v, 3);
                    useTree[i] = (v===2) ? full : v;
                }
            }
            // remap symbols to this subset
            var alphabetSize = 0;
            for (i=0; i<256; i++) {
                if (useTree[256+i]) { // symbol in use
                    M[alphabetSize++] = i;
                }
            }
            useTree = null;
            // RLE/range decoding
            var model = new FenwickModel(decoder, alphabetSize+1,
                                         F_PROB_MAX, F_PROB_INCR);
            if (fast) { model = new DefSumModel(decoder, alphabetSize+1, true);}
            var val = 1; // repeat count
            for (i=0; i<length; ) {
                c = model.decode();
                if (c===0) {
                    for (j=0; j<val; j++) { b[i++] = 0; }
                    val *= 2;
                } else if (c===1) {
                    for (j=0; j<val; j++) { b[i++] = 0; b[i++] = 0; }
                    val *= 2;
                } else {
                    val = 1;
                    b[i++] = c-1;
                }
            }
            // MTF decode
            for (i=0; i<length; i++) {
                j = b[i];
                b[i] = c = M[j];
                // move to front
                for (; j>0; j--) {
                    M[j] = M[j-1];
                }
                M[0] = c;
            }
            // unBWT
            BWT.unbwtransform(block, U, A, length, pidx);
            // emit!
            output.write(U, 0, length);
        }
        decoder.decodeFinish();
    });

    return BWTC;
});
