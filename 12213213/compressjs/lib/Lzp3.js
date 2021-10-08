/* Implementation of LZP3(ish), with an adaptive Huffman code or a range
 * coder (instead of LZP3's original static Huffman code).
 * See: http://www.cbloom.com/papers/lzp.pdf
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./BitStream', './Context1Model', './DefSumModel', './FenwickModel', './Huffman', './LogDistanceModel', './NoModel', './RangeCoder', './Stream', './Util'],function(BitStream, Context1Model, DefSumModel, FenwickModel, Huffman, LogDistanceModel, NoModel, RangeCoder, Stream, Util){

var Lzp3 = Object.create(null);
Lzp3.MAGIC = 'lzp3';

// use Huffman coder (fast) or else use range coder (slow)
var USE_HUFFMAN_CODE = false;
// use deferred-sum model, which is supposed to be faster (but compresses worse)
var USE_DEFSUM = false;
// when to give up attempting to model the length
var LENGTH_MODEL_CUTOFF = 256;
var MODEL_MAX_PROB = 0xFF00;
var MODEL_INCREMENT = 0x100;

// Constants was used for compress/decompress function.
var CTXT4_TABLE_SIZE = 1 << 16;
var CTXT3_TABLE_SIZE = 1 << 12;
var CTXT2_TABLE_SIZE = 1 << 16;
var CONTEXT_LEN = 4;
var LOG_WINDOW_SIZE = 20;
var WINDOW_SIZE = 1 << LOG_WINDOW_SIZE;
var MAX_MATCH_LEN = WINDOW_SIZE-1;
var MATCH_LEN_CONTEXTS = 16;

var MAX32 = 0xFFFFFFFF;
var MAX24 = 0x00FFFFFF;
var MAX16 = 0x0000FFFF;
var MAX8  = 0x000000FF;


var Window = function(maxSize) {
  this.buffer = Util.makeU8Buffer(Math.min(maxSize+4, WINDOW_SIZE));
  this.pos = 0;
  // context-4 hash table.
  this.ctxt4 = Util.makeU32Buffer(CTXT4_TABLE_SIZE);
  // context-3 hash table
  this.ctxt3 = Util.makeU32Buffer(CTXT3_TABLE_SIZE);
  // context-2 table (not really a hash any more)
  this.ctxt2 = Util.makeU32Buffer(CTXT2_TABLE_SIZE);
  // initial context
  this.put(0x63); this.put(0x53); this.put(0x61); this.put(0x20);
};
Window.prototype.put = function(_byte) {
  this.buffer[this.pos++] = _byte;
  if (this.pos >= WINDOW_SIZE) { this.pos = 0; }
  return _byte;
};
Window.prototype.get = function(pos) {
  return this.buffer[pos & (WINDOW_SIZE-1)];
};
Window.prototype.context = function(pos, n) {
  var c = 0, i;
  pos = (pos - n) & (WINDOW_SIZE-1);
  for (i=0; i<n; i++) {
    c = (c << 8) | this.buffer[pos++];
    if (pos >= WINDOW_SIZE) { pos = 0; }
  }
  return c;
};
// if matchLen !== 0, update the index; otherwise get index value.
Window.prototype.getIndex = function(s, matchLen) {
  var c = this.context(s, 4);
  // compute context hashes
  var h4 = ((c>>>15) ^ c) & (CTXT4_TABLE_SIZE-1);
  var h3 = ((c>>>11) ^ c) & (CTXT3_TABLE_SIZE-1);
  var h2 = c & MAX16;
  // check order-4 context
  var p = 0, checkc;
  // only do context confirmation if matchLen==0 (that is, if we're not just
  // doing an update)
  if (matchLen===0) {
    p = this.ctxt4[h4];
    if (p !== 0 && c !== this.context(p-1, 4)) {
      p = 0; // context confirmation failed
    }
    if (p === 0) {
      // check order-3 context
      p = this.ctxt3[h3];
      if (p !== 0 && (c & MAX24) !== this.context(p-1, 3)) {
        p = 0; // context confirmation failed
      }
      if (p === 0) {
        // check order-2 context
        p = this.ctxt2[h2];
        if (p !== 0 && (c && MAX16) !== this.context(p-1, 2)) {
          p = 0; // context confirmation failed
        }
      }
    }
  }
  // update context index
  if (matchLen) { matchLen--; }
  this.ctxt4[h4] = this.ctxt3[h3] = this.ctxt2[h2] =
    (s | (matchLen << LOG_WINDOW_SIZE)) + 1;
  // return lookup result.
  return p;
};

/**
 * Compress using modified LZP3 algorithm.  Instead of using static
 * Huffman coding, we use an adaptive Huffman code or range encoding.
 */
Lzp3.compressFile = Util.compressFileHelper(Lzp3.MAGIC, function(inStream, outStream, fileSize, props) {
  // sliding window & hash table
  var window = new Window( (fileSize>=0) ? fileSize : WINDOW_SIZE );

  var coderFactory, sparseCoderFactory, flush;

  if (USE_HUFFMAN_CODE) {
    // Huffman contexts
    outStream.writeByte(0x80); // mark that this is Huffman coded.
    var bitstream = new BitStream(outStream);
    flush = bitstream.flush.bind(bitstream);
    coderFactory = Huffman.factory(bitstream, MAX16);
    sparseCoderFactory = NoModel.factory(bitstream);

  } else { // range encoder
    var range = new RangeCoder(outStream);
    range.encodeStart(0x00, 0); // 0x00 == range encoded

    coderFactory = FenwickModel.factory(range, MODEL_MAX_PROB, MODEL_INCREMENT);
    if (USE_DEFSUM) {
      coderFactory = DefSumModel.factory(range, false /* encoder */);
    }
    // switch sparseCoderFactory to a NoModel when size > cutoff
    var noCoderFactory = NoModel.factory(range);
    sparseCoderFactory = function(size) {
      if (size > LENGTH_MODEL_CUTOFF) {
        return noCoderFactory(size);
      }
      return coderFactory(size);
    };
    flush = function() { range.encodeFinish(); };
  }

  var huffLiteral= new Context1Model(coderFactory, 256,
                                     (fileSize<0) ? 257 : 256);
  var huffLen = [], i;
  for (i=0; i<MATCH_LEN_CONTEXTS; i++) {
    huffLen[i] = new LogDistanceModel(MAX_MATCH_LEN+1, 1,
                                      coderFactory, sparseCoderFactory);
  }

  var inSize = 0, s, matchContext = 0;
  while (inSize !== fileSize) {
    var ch = inStream.readByte();
    s = window.pos;
    var p = window.getIndex(s, 0);
    if (p !== 0) {
      // great, a match! how long is it?
      p--; // p=0 is used for 'not here'. p=1 really means WINDOW_SIZE
      var prevMatchLen = (p >>> LOG_WINDOW_SIZE) + 1;
      var matchLen = 0;
      while (window.get(p + matchLen) === ch && matchLen < MAX_MATCH_LEN) {
        matchLen++;
        window.put(ch);
        ch = inStream.readByte();
      }
      // code match length; match len = 0 means "literal"
      // use "extra state" -1 to mean "same as previous match length"
      if (prevMatchLen===matchLen) {
        huffLen[matchContext&(MATCH_LEN_CONTEXTS-1)].encode(-1);
      } else {
        huffLen[matchContext&(MATCH_LEN_CONTEXTS-1)].encode(matchLen);
      }
      // update hash with this match
      window.getIndex(s, matchLen);
      inSize += matchLen;
      matchContext <<= 1;
      if (matchLen > 0) { matchContext |= 1; }
      // XXX: LZMA uses a special "delta match" context here if matchLen==0
      // XXX: it also uses the offset as context for the length (or vice-versa)
    }
    // always encode a literal after a match
    var context1 = window.get(window.pos-1);
    if (ch===Stream.EOF) {
      if (fileSize < 0) {
        huffLiteral.encode(256, context1);
      }
      break;
    }
    huffLiteral.encode(ch, context1);
    window.put(ch);
    inSize++;
  }
  if (flush) flush();
});

/**
 * Decompress using modified LZP3 algorithm.
 */
Lzp3.decompressFile = Util.decompressFileHelper(Lzp3.MAGIC, function(inStream, outStream, fileSize) {
  var flags = inStream.readByte();
  var use_huffman_code = !!(flags & 0x80);

  // sliding window & hash table
  var window = new Window( (fileSize>=0) ? fileSize : WINDOW_SIZE );

  var coderFactory, sparseCoderFactory, finish;

  if (use_huffman_code) {
    // Huffman contexts
    var bitstream = new BitStream(inStream);
    coderFactory = Huffman.factory(bitstream, MAX16);
    sparseCoderFactory = NoModel.factory(bitstream);
  } else { // range encoder
    var range = new RangeCoder(inStream);
    range.decodeStart(true/* skip initial read */);
    coderFactory = FenwickModel.factory(range, MODEL_MAX_PROB, MODEL_INCREMENT);
    if (USE_DEFSUM) {
      coderFactory = DefSumModel.factory(range, true /* decoder */);
    }
    // switch sparseCoderFactory to a NoModel when size > cutoff
    var noCoderFactory = NoModel.factory(range);
    sparseCoderFactory = function(size) {
      if (size > LENGTH_MODEL_CUTOFF) {
        return noCoderFactory(size);
      }
      return coderFactory(size);
    };
    finish = function() { range.decodeFinish(); };
  }

  var huffLiteral= new Context1Model(coderFactory, 256,
                                     (fileSize<0) ? 257 : 256);
  var huffLen = [], i;
  for (i=0; i<MATCH_LEN_CONTEXTS; i++) {
    huffLen[i] = new LogDistanceModel(MAX_MATCH_LEN+1, 1,
                                      coderFactory, sparseCoderFactory);
  }

  var s, ch, outSize = 0, matchContext = 0;
  while (outSize !== fileSize) {
    s = window.pos;
    var p = window.getIndex(s, 0);
    if (p !== 0) {
      p--; // p=0 is used for 'not here'. p=1 really means WINDOW_SIZE
      var prevMatchLen = (p >>> LOG_WINDOW_SIZE) + 1;
      var matchLen = huffLen[matchContext&(MATCH_LEN_CONTEXTS-1)].decode();
      if (matchLen < 0) { matchLen = prevMatchLen; }
      // copy characters!
      for (i=0; i<matchLen; i++) {
        ch = window.get(p + i);
        outStream.writeByte(window.put(ch));
      }
      window.getIndex(s, matchLen);
      outSize += matchLen;
      matchContext <<= 1;
      if (matchLen > 0) matchContext |= 1;
    }
    // literal always follows match (or failed match)
    if (outSize === fileSize) {
      break; // EOF
    }
    var context1 = window.get(window.pos-1);
    ch = huffLiteral.decode(context1);
    if (ch === 256) {
      break; // EOF
    }
    outStream.writeByte(window.put(ch));
    outSize++;
  }
  if (finish) finish();
});


return Lzp3;
});
