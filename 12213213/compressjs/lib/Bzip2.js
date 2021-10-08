/*
An implementation of Bzip2 de/compression, including the ability to
seek within bzip2 data.

Copyright (C) 2013 C. Scott Ananian
Copyright (C) 2012 Eli Skeggs
Copyright (C) 2011 Kevin Kwok

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, see
http://www.gnu.org/licenses/lgpl-2.1.html

Adapted from node-bzip, copyright 2012 Eli Skeggs.
Adapted from bzip2.js, copyright 2011 Kevin Kwok (antimatter15@gmail.com).

Based on micro-bunzip by Rob Landley (rob@landley.net).

Based on bzip2 decompression code by Julian R Seward (jseward@acm.org),
which also acknowledges contributions by Mike Burrows, David Wheeler,
Peter Fenwick, Alistair Moffat, Radford Neal, Ian H. Witten,
Robert Sedgewick, and Jon L. Bentley.

BWT implementation based on work by Yuta Mori; see BWT.js for details.

bzip2 compression code inspired by https://code.google.com/p/jbzip2
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./freeze','./BitStream','./BWT','./CRC32','./HuffmanAllocator','./Stream','./Util'], function(freeze, BitStream, BWT, CRC32, HuffmanAllocator, Stream, Util) {

var MAX_HUFCODE_BITS = 20;
var MAX_SYMBOLS = 258;
var SYMBOL_RUNA = 0;
var SYMBOL_RUNB = 1;
var MIN_GROUPS = 2;
var MAX_GROUPS = 6;
var GROUP_SIZE = 50;

var WHOLEPI = 0x314159265359; // 48-bit integer
var SQRTPI =  0x177245385090; // 48-bit integer

var EOF = Stream.EOF;

var mtf = function(array, index) {
  var src = array[index], i;
  for (i = index; i > 0; i--) {
    array[i] = array[i-1];
  }
  array[0] = src;
  return src;
};

var Err = {
  OK: 0,
  LAST_BLOCK: -1,
  NOT_BZIP_DATA: -2,
  UNEXPECTED_INPUT_EOF: -3,
  UNEXPECTED_OUTPUT_EOF: -4,
  DATA_ERROR: -5,
  OUT_OF_MEMORY: -6,
  OBSOLETE_INPUT: -7,
  END_OF_BLOCK: -8
};
var ErrorMessages = {};
ErrorMessages[Err.LAST_BLOCK] =            "Bad file checksum";
ErrorMessages[Err.NOT_BZIP_DATA] =         "Not bzip data";
ErrorMessages[Err.UNEXPECTED_INPUT_EOF] =  "Unexpected input EOF";
ErrorMessages[Err.UNEXPECTED_OUTPUT_EOF] = "Unexpected output EOF";
ErrorMessages[Err.DATA_ERROR] =            "Data error";
ErrorMessages[Err.OUT_OF_MEMORY] =         "Out of memory";
ErrorMessages[Err.OBSOLETE_INPUT] = "Obsolete (pre 0.9.5) bzip format not supported.";

var _throw = function(status, optDetail) {
  var msg = ErrorMessages[status] || 'unknown error';
  if (optDetail) { msg += ': '+optDetail; }
  var e = new TypeError(msg);
  e.errorCode = status;
  throw e;
};

var Bunzip = function(inputStream, outputStream) {
  this.writePos = this.writeCurrent = this.writeCount = 0;

  this._start_bunzip(inputStream, outputStream);
};
Bunzip.prototype._init_block = function() {
  var moreBlocks = this._get_next_block();
  if ( !moreBlocks ) {
    this.writeCount = -1;
    return false; /* no more blocks */
  }
  this.blockCRC = new CRC32();
  return true;
};
/* XXX micro-bunzip uses (inputStream, inputBuffer, len) as arguments */
Bunzip.prototype._start_bunzip = function(inputStream, outputStream) {
  /* Ensure that file starts with "BZh['1'-'9']." */
  var buf = Util.makeU8Buffer(4);
  if (inputStream.read(buf, 0, 4) !== 4 ||
      String.fromCharCode(buf[0], buf[1], buf[2]) !== 'BZh')
    _throw(Err.NOT_BZIP_DATA, 'bad magic');

  var level = buf[3] - 0x30;
  if (level < 1 || level > 9)
    _throw(Err.NOT_BZIP_DATA, 'level out of range');

  this.reader = new BitStream(inputStream);

  /* Fourth byte (ascii '1'-'9'), indicates block size in units of 100k of
     uncompressed data.  Allocate intermediate buffer for block. */
  this.dbufSize = 100000 * level;
  this.nextoutput = 0;
  this.outputStream = outputStream;
  this.streamCRC = 0;
};
Bunzip.prototype._get_next_block = function() {
  var i, j, k;
  var reader = this.reader;
  // this is get_next_block() function from micro-bunzip:
  /* Read in header signature and CRC, then validate signature.
     (last block signature means CRC is for whole file, return now) */
  var h = reader.readBits(48);
  if (h === SQRTPI) { // last block
    return false; /* no more blocks */
  }
  if (h !== WHOLEPI)
    _throw(Err.NOT_BZIP_DATA);
  this.targetBlockCRC = reader.readBits(32);
  this.streamCRC = (this.targetBlockCRC ^
                    ((this.streamCRC << 1) | (this.streamCRC>>>31))) >>> 0;
  /* We can add support for blockRandomised if anybody complains.  There was
     some code for this in busybox 1.0.0-pre3, but nobody ever noticed that
     it didn't actually work. */
  if (reader.readBits(1))
    _throw(Err.OBSOLETE_INPUT);
  var origPointer = reader.readBits(24);
  if (origPointer > this.dbufSize)
    _throw(Err.DATA_ERROR, 'initial position out of bounds');
  /* mapping table: if some byte values are never used (encoding things
     like ASCII text), the compression code removes the gaps to have fewer
     symbols to deal with, and writes a sparse bitfield indicating which
     values were present.  We make a translation table to convert the symbols
     back to the corresponding bytes. */
  var t = reader.readBits(16);
  var symToByte = Util.makeU8Buffer(256), symTotal = 0;
  for (i = 0; i < 16; i++) {
    if (t & (1 << (0xF - i))) {
      var o = i * 16;
      k = reader.readBits(16);
      for (j = 0; j < 16; j++)
        if (k & (1 << (0xF - j)))
          symToByte[symTotal++] = o + j;
    }
  }

  /* How many different Huffman coding groups does this block use? */
  var groupCount = reader.readBits(3);
  if (groupCount < MIN_GROUPS || groupCount > MAX_GROUPS)
    _throw(Err.DATA_ERROR);
  /* nSelectors: Every GROUP_SIZE many symbols we select a new Huffman coding
     group.  Read in the group selector list, which is stored as MTF encoded
     bit runs.  (MTF=Move To Front, as each value is used it's moved to the
     start of the list.) */
  var nSelectors = reader.readBits(15);
  if (nSelectors === 0)
    _throw(Err.DATA_ERROR);

  var mtfSymbol = Util.makeU8Buffer(256);
  for (i = 0; i < groupCount; i++)
    mtfSymbol[i] = i;

  var selectors = Util.makeU8Buffer(nSelectors); // was 32768...

  for (i = 0; i < nSelectors; i++) {
    /* Get next value */
    for (j = 0; reader.readBits(1); j++)
      if (j >= groupCount) _throw(Err.DATA_ERROR);
    /* Decode MTF to get the next selector */
    selectors[i] = mtf(mtfSymbol, j);
  }

  /* Read the Huffman coding tables for each group, which code for symTotal
     literal symbols, plus two run symbols (RUNA, RUNB) */
  var symCount = symTotal + 2;
  var groups = [], hufGroup;
  for (j = 0; j < groupCount; j++) {
    var length = Util.makeU8Buffer(symCount), temp = Util.makeU16Buffer(MAX_HUFCODE_BITS + 1);
    /* Read Huffman code lengths for each symbol.  They're stored in
       a way similar to MTF; record a starting value for the first symbol,
       and an offset from the previous value for every symbol after that. */
    t = reader.readBits(5); // lengths
    for (i = 0; i < symCount; i++) {
      for (;;) {
        if (t < 1 || t > MAX_HUFCODE_BITS) _throw(Err.DATA_ERROR);
        /* If first bit is 0, stop.  Else second bit indicates whether
           to increment or decrement the value. */
        if(!reader.readBits(1))
          break;
        if(!reader.readBits(1))
          t++;
        else
          t--;
      }
      length[i] = t;
    }

    /* Find largest and smallest lengths in this group */
    var minLen,  maxLen;
    minLen = maxLen = length[0];
    for (i = 1; i < symCount; i++) {
      if (length[i] > maxLen)
        maxLen = length[i];
      else if (length[i] < minLen)
        minLen = length[i];
    }

    /* Calculate permute[], base[], and limit[] tables from length[].
     *
     * permute[] is the lookup table for converting Huffman coded symbols
     * into decoded symbols.  base[] is the amount to subtract from the
     * value of a Huffman symbol of a given length when using permute[].
     *
     * limit[] indicates the largest numerical value a symbol with a given
     * number of bits can have.  This is how the Huffman codes can vary in
     * length: each code with a value>limit[length] needs another bit.
     */
    hufGroup = {};
    groups.push(hufGroup);
    hufGroup.permute = Util.makeU16Buffer(MAX_SYMBOLS);
    hufGroup.limit = Util.makeU32Buffer(MAX_HUFCODE_BITS + 2);
    hufGroup.base = Util.makeU32Buffer(MAX_HUFCODE_BITS + 1);
    hufGroup.minLen = minLen;
    hufGroup.maxLen = maxLen;
    /* Calculate permute[].  Concurrently, initialize temp[] and limit[]. */
    var pp = 0;
    for (i = minLen; i <= maxLen; i++) {
      temp[i] = hufGroup.limit[i] = 0;
      for (t = 0; t < symCount; t++)
        if (length[t] === i)
          hufGroup.permute[pp++] = t;
    }
    /* Count symbols coded for at each bit length */
    for (i = 0; i < symCount; i++)
      temp[length[i]]++;
    /* Calculate limit[] (the largest symbol-coding value at each bit
     * length, which is (previous limit<<1)+symbols at this level), and
     * base[] (number of symbols to ignore at each bit length, which is
     * limit minus the cumulative count of symbols coded for already). */
    pp = t = 0;
    for (i = minLen; i < maxLen; i++) {
      pp += temp[i];
      /* We read the largest possible symbol size and then unget bits
         after determining how many we need, and those extra bits could
         be set to anything.  (They're noise from future symbols.)  At
         each level we're really only interested in the first few bits,
         so here we set all the trailing to-be-ignored bits to 1 so they
         don't affect the value>limit[length] comparison. */
      hufGroup.limit[i] = pp - 1;
      pp <<= 1;
      t += temp[i];
      hufGroup.base[i + 1] = pp - t;
    }
    hufGroup.limit[maxLen + 1] = Number.MAX_VALUE; /* Sentinel value for reading next sym. */
    hufGroup.limit[maxLen] = pp + temp[maxLen] - 1;
    hufGroup.base[minLen] = 0;
  }
  /* We've finished reading and digesting the block header.  Now read this
     block's Huffman coded symbols from the file and undo the Huffman coding
     and run length encoding, saving the result into dbuf[dbufCount++]=uc */

  /* Initialize symbol occurrence counters and symbol Move To Front table */
  var byteCount = Util.makeU32Buffer(256);
  for (i = 0; i < 256; i++)
    mtfSymbol[i] = i;
  /* Loop through compressed symbols. */
  var runPos = 0, dbufCount = 0, selector = 0, uc;
  var dbuf = this.dbuf = Util.makeU32Buffer(this.dbufSize);
  symCount = 0;
  for (;;) {
    /* Determine which Huffman coding group to use. */
    if (!(symCount--)) {
      symCount = GROUP_SIZE - 1;
      if (selector >= nSelectors) { _throw(Err.DATA_ERROR); }
      hufGroup = groups[selectors[selector++]];
    }
    /* Read next Huffman-coded symbol. */
    i = hufGroup.minLen;
    j = reader.readBits(i);
    for (;;i++) {
      if (i > hufGroup.maxLen) { _throw(Err.DATA_ERROR); }
      if (j <= hufGroup.limit[i])
        break;
      j = (j << 1) | reader.readBits(1);
    }
    /* Huffman decode value to get nextSym (with bounds checking) */
    j -= hufGroup.base[i];
    if (j < 0 || j >= MAX_SYMBOLS) { _throw(Err.DATA_ERROR); }
    var nextSym = hufGroup.permute[j];
    /* We have now decoded the symbol, which indicates either a new literal
       byte, or a repeated run of the most recent literal byte.  First,
       check if nextSym indicates a repeated run, and if so loop collecting
       how many times to repeat the last literal. */
    if (nextSym === SYMBOL_RUNA || nextSym === SYMBOL_RUNB) {
      /* If this is the start of a new run, zero out counter */
      if (!runPos){
        runPos = 1;
        t = 0;
      }
      /* Neat trick that saves 1 symbol: instead of or-ing 0 or 1 at
         each bit position, add 1 or 2 instead.  For example,
         1011 is 1<<0 + 1<<1 + 2<<2.  1010 is 2<<0 + 2<<1 + 1<<2.
         You can make any bit pattern that way using 1 less symbol than
         the basic or 0/1 method (except all bits 0, which would use no
         symbols, but a run of length 0 doesn't mean anything in this
         context).  Thus space is saved. */
      if (nextSym === SYMBOL_RUNA)
        t += runPos;
      else
        t += 2 * runPos;
      runPos <<= 1;
      continue;
    }
    /* When we hit the first non-run symbol after a run, we now know
       how many times to repeat the last literal, so append that many
       copies to our buffer of decoded symbols (dbuf) now.  (The last
       literal used is the one at the head of the mtfSymbol array.) */
    if (runPos){
      runPos = 0;
      if (dbufCount + t > this.dbufSize) { _throw(Err.DATA_ERROR); }
      uc = symToByte[mtfSymbol[0]];
      byteCount[uc] += t;
      while (t--)
        dbuf[dbufCount++] = uc;
    }
    /* Is this the terminating symbol? */
    if (nextSym > symTotal)
      break;
    /* At this point, nextSym indicates a new literal character.  Subtract
       one to get the position in the MTF array at which this literal is
       currently to be found.  (Note that the result can't be -1 or 0,
       because 0 and 1 are RUNA and RUNB.  But another instance of the
       first symbol in the MTF array, position 0, would have been handled
       as part of a run above.  Therefore 1 unused MTF position minus
       2 non-literal nextSym values equals -1.) */
    if (dbufCount >= this.dbufSize) { _throw(Err.DATA_ERROR); }
    i = nextSym - 1;
    uc = mtf(mtfSymbol, i);
    uc = symToByte[uc];
    /* We have our literal byte.  Save it into dbuf. */
    byteCount[uc]++;
    dbuf[dbufCount++] = uc;
  }
  /* At this point, we've read all the Huffman-coded symbols (and repeated
     runs) for this block from the input stream, and decoded them into the
     intermediate buffer.  There are dbufCount many decoded bytes in dbuf[].
     Now undo the Burrows-Wheeler transform on dbuf.
     See http://dogma.net/markn/articles/bwt/bwt.htm
  */
  if (origPointer < 0 || origPointer >= dbufCount) { _throw(Err.DATA_ERROR); }
  /* Turn byteCount into cumulative occurrence counts of 0 to n-1. */
  j = 0;
  for (i = 0; i < 256; i++) {
    k = j + byteCount[i];
    byteCount[i] = j;
    j = k;
  }
  /* Figure out what order dbuf would be in if we sorted it. */
  for (i = 0; i < dbufCount; i++) {
    uc = dbuf[i] & 0xff;
    dbuf[byteCount[uc]] |= (i << 8);
    byteCount[uc]++;
  }
  /* Decode first byte by hand to initialize "previous" byte.  Note that it
     doesn't get output, and if the first three characters are identical
     it doesn't qualify as a run (hence writeRunCountdown=5). */
  var pos = 0, current = 0, run = 0;
  if (dbufCount) {
    pos = dbuf[origPointer];
    current = (pos & 0xff);
    pos >>= 8;
    run = -1;
  }
  this.writePos = pos;
  this.writeCurrent = current;
  this.writeCount = dbufCount;
  this.writeRun = run;

  return true; /* more blocks to come */
};
/* Undo burrows-wheeler transform on intermediate buffer to produce output.
   If start_bunzip was initialized with out_fd=-1, then up to len bytes of
   data are written to outbuf.  Return value is number of bytes written or
   error (all errors are negative numbers).  If out_fd!=-1, outbuf and len
   are ignored, data is written to out_fd and return is RETVAL_OK or error.
*/
Bunzip.prototype._read_bunzip = function(outputBuffer, len) {
    var copies, previous, outbyte;
    /* james@jamestaylor.org: writeCount goes to -1 when the buffer is fully
       decoded, which results in this returning RETVAL_LAST_BLOCK, also
       equal to -1... Confusing, I'm returning 0 here to indicate no
       bytes written into the buffer */
  if (this.writeCount < 0) { return 0; }

  var gotcount = 0;
  var dbuf = this.dbuf, pos = this.writePos, current = this.writeCurrent;
  var dbufCount = this.writeCount, outputsize = this.outputsize;
  var run = this.writeRun;

  while (dbufCount) {
    dbufCount--;
    previous = current;
    pos = dbuf[pos];
    current = pos & 0xff;
    pos >>= 8;
    if (run++ === 3){
      copies = current;
      outbyte = previous;
      current = -1;
    } else {
      copies = 1;
      outbyte = current;
    }
    this.blockCRC.updateCRCRun(outbyte, copies);
    while (copies--) {
      this.outputStream.writeByte(outbyte);
      this.nextoutput++;
    }
    if (current != previous)
      run = 0;
  }
  this.writeCount = dbufCount;
  // check CRC
  if (this.blockCRC.getCRC() !== this.targetBlockCRC) {
    _throw(Err.DATA_ERROR, "Bad block CRC "+
           "(got "+this.blockCRC.getCRC().toString(16)+
           " expected "+this.targetBlockCRC.toString(16)+")");
  }
  return this.nextoutput;
};

/* Static helper functions */
Bunzip.Err = Err;
// 'input' can be a stream or a buffer
// 'output' can be a stream or a buffer or a number (buffer size)
Bunzip.decode = function(input, output, multistream) {
  // make a stream from a buffer, if necessary
  var inputStream = Util.coerceInputStream(input);
  var o = Util.coerceOutputStream(output, output);
  var outputStream = o.stream;

  var bz = new Bunzip(inputStream, outputStream);
  while (true) {
    if ('eof' in inputStream && inputStream.eof()) break;
    if (bz._init_block()) {
      bz._read_bunzip();
    } else {
      var targetStreamCRC = bz.reader.readBits(32);
      if (targetStreamCRC !== bz.streamCRC) {
        _throw(Err.DATA_ERROR, "Bad stream CRC "+
               "(got "+bz.streamCRC.toString(16)+
               " expected "+targetStreamCRC.toString(16)+")");
      }
      if (multistream &&
          'eof' in inputStream &&
          !inputStream.eof()) {
        // note that start_bunzip will also resync the bit reader to next byte
        bz._start_bunzip(inputStream, outputStream);
      } else break;
    }
  }
  return o.retval;
};
Bunzip.decodeBlock = function(input, pos, output) {
  // make a stream from a buffer, if necessary
  var inputStream = Util.coerceInputStream(input);
  var o = Util.coerceOutputStream(output, output);
  var outputStream = o.stream;
  var bz = new Bunzip(inputStream, outputStream);
  bz.reader.seekBit(pos);
  /* Fill the decode buffer for the block */
  var moreBlocks = bz._get_next_block();
  if (moreBlocks) {
    /* Init the CRC for writing */
    bz.blockCRC = new CRC32();

    /* Zero this so the current byte from before the seek is not written */
    bz.writeCopies = 0;

    /* Decompress the block and write to stdout */
    bz._read_bunzip();
    // XXX keep writing?
  }
  return o.retval;
};
/* Reads bzip2 file from stream or buffer `input`, and invoke
 * `callback(position, size)` once for each bzip2 block,
 * where position gives the starting position (in *bits*)
 * and size gives uncompressed size of the block (in *bytes*). */
Bunzip.table = function(input, callback, multistream) {
  // make a stream from a buffer, if necessary
  var inputStream = new Stream();
  inputStream.delegate = Util.coerceInputStream(input);
  inputStream.pos = 0;
  inputStream.readByte = function() {
    this.pos++;
    return this.delegate.readByte();
  };
  inputStream.tell = function() { return this.pos; };
  if (inputStream.delegate.eof) {
    inputStream.eof = inputStream.delegate.eof.bind(inputStream.delegate);
  }
  var outputStream = new Stream();
  outputStream.pos = 0;
  outputStream.writeByte = function() { this.pos++; };

  var bz = new Bunzip(inputStream, outputStream);
  var blockSize = bz.dbufSize;
  while (true) {
    if ('eof' in inputStream && inputStream.eof()) break;

    var position = bz.reader.tellBit();

    if (bz._init_block()) {
      var start = outputStream.pos;
      bz._read_bunzip();
      callback(position, outputStream.pos - start);
    } else {
      var crc = bz.reader.readBits(32); // (but we ignore the crc)
      if (multistream &&
          'eof' in inputStream &&
          !inputStream.eof()) {
        // note that start_bunzip will also resync the bit reader to next byte
        bz._start_bunzip(inputStream, outputStream);
        console.assert(bz.dbufSize === blockSize,
                       "shouldn't change block size within multistream file");
      } else break;
    }
  }
};

// create a Huffman tree from the table of frequencies
var StaticHuffman = function(freq, alphabetSize) {
  // As in BZip2HuffmanStageEncoder.java (from jbzip2):
  // The Huffman allocator needs its input symbol frequencies to be
  // sorted, but we need to return code lengths in the same order as
  // the corresponding frequencies are passed in.
  // The symbol frequency and index are merged into a single array of
  // integers - frequency in the high 23 bits, index in the low 9
  // bits.
  //     2^23 = 8,388,608 which is higher than the maximum possible
  //            frequency for one symbol in a block
  //     2^9 = 512 which is higher than the maximum possible
  //            alphabet size (== 258)
  // Sorting this array simultaneously sorts the frequencies and
  // leaves a lookup that can be used to cheaply invert the sort
  var i, mergedFreq = [];
  for (i=0; i<alphabetSize; i++) {
    mergedFreq[i] = (freq[i] << 9) | i;
  }
  mergedFreq.sort(function(a,b) { return a-b; });
  var sortedFreq = mergedFreq.map(function(v) { return v>>>9; });
  // allocate code lengths in place. (result in sortedFreq array)
  HuffmanAllocator.allocateHuffmanCodeLengths(sortedFreq, MAX_HUFCODE_BITS);
  // reverse the sort to put codes & code lengths in order of input symbols
  this.codeLengths = Util.makeU8Buffer(alphabetSize);
  for (i=0; i<alphabetSize; i++) {
    var sym = mergedFreq[i] & 0x1FF;
    this.codeLengths[sym] = sortedFreq[i];
  }
};
// compute canonical Huffman codes, given code lengths
StaticHuffman.prototype.computeCanonical = function() {
  var alphabetSize = this.codeLengths.length;
  // merge arrays; sort first by length then by symbol.
  var i, merged = [];
  for (i=0; i<alphabetSize; i++) {
    merged[i] = (this.codeLengths[i] << 9) | i;
  }
  merged.sort(function(a,b) { return a-b; });
  // use sorted lengths to assign codes
  this.code = Util.makeU32Buffer(alphabetSize);
  var code = 0, prevLen = 0;
  for (i=0; i<alphabetSize; i++) {
    var curLen = merged[i] >>> 9;
    var sym = merged[i] & 0x1FF;
    console.assert(prevLen <= curLen);
    code <<= (curLen - prevLen);
    this.code[sym] = code++;
    prevLen = curLen;
  }
};
// compute the cost of encoding the given range of symbols w/ this Huffman code
StaticHuffman.prototype.cost = function(array, offset, length) {
  var i, cost = 0;
  for (i=0; i<length; i++) {
    cost += this.codeLengths[array[offset+i]];
  }
  return cost;
};
// emit the bit lengths used by this Huffman code
StaticHuffman.prototype.emit = function(outStream) {
  // write the starting length
  var i, currentLength = this.codeLengths[0];
  outStream.writeBits(5, currentLength);
  for (i=0; i<this.codeLengths.length; i++) {
    var codeLength = this.codeLengths[i];
    var value, delta;
    console.assert(codeLength > 0 && codeLength <= MAX_HUFCODE_BITS);
    if (currentLength < codeLength) {
      value = 2; delta = codeLength - currentLength;
    } else {
      value = 3; delta = currentLength - codeLength;
    }
    while (delta-- > 0) {
      outStream.writeBits(2, value);
    }
    outStream.writeBit(0);
    currentLength = codeLength;
  }
};
// encode the given symbol with this Huffman code
StaticHuffman.prototype.encode = function(outStream, symbol) {
  outStream.writeBits(this.codeLengths[symbol], this.code[symbol]);
};

// read a block for bzip2 compression.
var readBlock = function(inStream, block, length, crc) {
  var pos = 0;
  var lastChar = -1;
  var runLength = 0;
  while (pos < length) {
    if (runLength===4) {
      block[pos++] = 0;
      if (pos >= length) { break; }
    }
    var ch = inStream.readByte();
    if (ch === EOF) {
      break;
    }
    crc.updateCRC(ch);
    if (ch !== lastChar) {
      lastChar = ch;
      runLength = 1;
    } else {
      runLength++;
      if (runLength > 4) {
        if (runLength < 256) {
          block[pos-1]++;
          continue;
        } else {
          runLength = 1;
        }
      }
    }
    block[pos++] = ch;
  }
  return pos;
};

// divide the input into groups at most GROUP_SIZE symbols long.
// assign each group to the Huffman table which compresses it best.
var assignSelectors = function(selectors, groups, input) {
  var i, j, k;
  for (i=0, k=0; i<input.length; i+=GROUP_SIZE) {
    var groupSize = Math.min(GROUP_SIZE, input.length - i);
    var best = 0, bestCost = groups[0].cost(input, i, groupSize);
    for (j=1; j<groups.length; j++) {
      var groupCost = groups[j].cost(input, i, groupSize);
      if (groupCost < bestCost) {
        best = j; bestCost = groupCost;
      }
    }
    selectors[k++] = best;
  }
};
var optimizeHuffmanGroups = function(groups, targetGroups, input,
                                     selectors, alphabetSize) {
  // until we've got "targetGroups" Huffman codes, pick the Huffman code which
  // matches the largest # of groups and split it by picking the groups
  // which require more than the median number of bits to encode.
  // then recompute frequencies and reassign Huffman codes.
  var i, j, k, groupCounts = [];
  while (groups.length < targetGroups) {
    assignSelectors(selectors, groups, input);
    // which code gets used the most?
    for (i=0; i<groups.length; i++) { groupCounts[i] = 0; }
    for (i=0; i<selectors.length; i++) {
      groupCounts[selectors[i]]++;
    }
    var which = groupCounts.indexOf(Math.max.apply(Math, groupCounts));
    // ok, let's look at the size of those blocks
    var splits = [];
    for (i=0, j=0; i<selectors.length; i++) {
      if (selectors[i] !== which) { continue; }
      var start = i*GROUP_SIZE;
      var end = Math.min(start + GROUP_SIZE, input.length);
      splits.push({index: i, cost:groups[which].cost(input, start, end-start)});
    }
    // find the median.  there are O(n) algorithms to do this, but we'll
    // be lazy and use a full O(n ln n) sort.
    splits.sort(function(s1, s2) { return s1.cost - s2.cost; });
    // assign the groups in the top half to the "new" selector
    for (i=(splits.length>>>1); i<splits.length; i++) {
      selectors[splits[i].index] = groups.length;
    }
    groups.push(null);
    // recompute frequencies
    var freq = [], f;
    for (i=0; i<groups.length; i++) {
      f = freq[i] = [];
      for (j=0; j<alphabetSize; j++) { f[j] = 0; }
    }
    for (i=0, j=0; i<input.length; ) {
      f = freq[selectors[j++]];
      for (k=0; k<GROUP_SIZE && i<input.length; k++) {
        f[input[i++]]++;
      }
    }
    // reconstruct Huffman codes
    for (i=0; i<groups.length; i++) {
      groups[i] = new StaticHuffman(freq[i], alphabetSize);
    }
  }
};

var compressBlock = function(block, length, outStream) {
  var c, i, j, k;
  // do BWT transform
  var U = Util.makeU8Buffer(length);
  var pidx = BWT.bwtransform2(block, U, length, 256);
  outStream.writeBit(0); // not randomized
  outStream.writeBits(24, pidx);
  // track values used; write bitmap
  var used = [], compact = [];
  for (i=0; i<length; i++) {
    c = block[i];
    used[c] = true;
    compact[c>>>4] = true;
  }
  for (i=0; i<16; i++) {
    outStream.writeBit(!!compact[i]);
  }
  for (i=0; i<16; i++) {
    if (compact[i]) {
      for (j=0; j<16; j++) {
        outStream.writeBit(!!used[(i<<4)|j]);
      }
    }
  }
  var alphabetSize = 0;
  for (i=0; i<256; i++) {
    if (used[i]) {
      alphabetSize++;
    }
  }
  // now MTF and RLE/2 encoding, while tracking symbol statistics.
  // output can be one longer than length, because we include the
  // end-of-block character at the end. Similarly, we need a U16
  // array because the end-of-block character can be 256.
  var A = Util.makeU16Buffer(length+1);
  var endOfBlock = alphabetSize + 1;
  var freq = [];
  for (i=0; i<=endOfBlock; i++) { freq[i] = 0; }
  var M = Util.makeU8Buffer(alphabetSize);
  for (i=0, j=0; i<256; i++) {
    if (used[i]) { M[j++] = i; }
  }
  used = null; compact = null;
  var pos = 0, runLength = 0;
  var emit = function(c) {
    A[pos++] = c;
    freq[c]++;
  };
  var emitLastRun = function() {
    while (runLength !== 0) {
      if (runLength & 1) {
        emit(0); // RUNA
        runLength -= 1;
      } else {
        emit(1); // RUNB
        runLength -= 2;
      }
      runLength >>>= 1;
    }
  };
  for (i=0; i<U.length; i++) {
    c = U[i];
    // look for C in M
    for (j=0; j<alphabetSize; j++) {
      if (M[j]===c) { break; }
    }
    console.assert(j!==alphabetSize);
    // shift MTF array
    mtf(M, j);
    // emit j
    if (j===0) {
      runLength++;
    } else {
      emitLastRun();
      emit(j+1);
      runLength = 0;
    }
  }
  emitLastRun();
  emit(endOfBlock); // end of block symbol
  A = A.subarray(0, pos);
  // now A[0...pos) has the encoded output, and freq[0-alphabetSize] has the
  // frequencies.  Use these to construct Huffman tables.
  // the canonical bzip2 encoder does some complicated optimization
  // to attempt to select the best tables.  We're going to simplify things:
  // (unless the block is very short) we're always going to create MAX_GROUPS
  // tables; 1 based on global frequencies, and the rest based on dividing the
  // block into MAX_GROUPS-1 pieces.
  var groups = [];
  var targetGroups; // how many Huffman groups should we create?
  // look at length of MTF-encoded block to pick a good number of groups
  if (pos >= 2400) { targetGroups = 6; }
  else if (pos >= 1200) { targetGroups = 5; }
  else if (pos >= 600) { targetGroups = 4; }
  else if (pos >= 200) { targetGroups = 3; }
  else { targetGroups = 2; }
  // start with two Huffman groups: one with the global frequencies, and
  // a second with a flat frequency distribution (which is also the smallest
  // possible Huffman table to encode, which is handy to prevent excessive
  // bloat if the input file size is very small)
  groups.push(new StaticHuffman(freq, endOfBlock+1));
  for (i=0; i<=endOfBlock; i++) { freq[i] = 1; }
  groups.push(new StaticHuffman(freq, endOfBlock+1));
  freq = null;
  // Now optimize the Huffman groups!  this is a black art.
  // we probably don't want to waste too much time on it, though.
  var selectors = Util.makeU8Buffer(Math.ceil(pos / GROUP_SIZE));
  optimizeHuffmanGroups(groups, targetGroups, A, selectors, endOfBlock+1);
  assignSelectors(selectors, groups, A);

  // okay, let's start writing out our Huffman tables
  console.assert(groups.length >= MIN_GROUPS && groups.length <= MAX_GROUPS);
  outStream.writeBits(3, groups.length);
  // and write out the best selector for each group
  outStream.writeBits(15, selectors.length);
  for (i=0; i<groups.length; i++) { M[i] = i; } // initialize MTF table.
  for (i=0; i<selectors.length; i++) {
    var s = selectors[i];
    // find selector in MTF list
    for (j=0; j<groups.length; j++) { if (M[j]===s) { break; } }
    console.assert(j<groups.length);
    mtf(M, j);
    // emit 'j' as a unary number
    for (;j>0; j--) {
      outStream.writeBit(1);
    }
    outStream.writeBit(0);
  }
  // okay, now emit the Huffman tables in order.
  for (i=0; i<groups.length; i++) {
    groups[i].emit(outStream);
    groups[i].computeCanonical(); // get ready for next step while we're at it
  }
  // okay, now (finally!) emit the actual data!
  for (i=0, k=0; i<pos; ) {
    var huff = groups[selectors[k++]];
    for (j=0; j<GROUP_SIZE && i<pos; j++) {
      huff.encode(outStream, A[i++]);
    }
  }
  // done.
};

var Bzip2 = Object.create(null);
Bzip2.compressFile = function(inStream, outStream, props) {
  inStream = Util.coerceInputStream(inStream);
  var o = Util.coerceOutputStream(outStream, outStream);
  outStream = new BitStream(o.stream);

  var blockSizeMultiplier = 9;
  if (typeof(props)==='number') {
    blockSizeMultiplier = props;
  }
  if (blockSizeMultiplier < 1 || blockSizeMultiplier > 9) {
    throw new Error('Invalid block size multiplier');
  }

  var blockSize = blockSizeMultiplier * 100000;
  // the C implementation always writes at least length-19 characters,
  // but it reads ahead enough that if the last character written was part
  // of a run, it writes out the full run.
  // That's really annoying to implement.
  // So instead just subtract 19 from the blockSize; in most cases (unless
  // there's a run at the end of the block) this will yield block divisions
  // matching the C implementation.
  blockSize -= 19;

  // write file magic
  outStream.writeByte('B'.charCodeAt(0));
  outStream.writeByte('Z'.charCodeAt(0));
  outStream.writeByte('h'.charCodeAt(0)); // Huffman-coded bzip
  outStream.writeByte('0'.charCodeAt(0) + blockSizeMultiplier);

  // allocate a buffer for the block
  var block = Util.makeU8Buffer(blockSize);
  var streamCRC = 0;
  var length;

  do {
    var crc = new CRC32();
    length = readBlock(inStream, block, blockSize, crc);
    if (length > 0) {
      streamCRC = (((streamCRC << 1) | (streamCRC>>>31)) ^ crc.getCRC()) >>> 0;
      outStream.writeBits(48, WHOLEPI);
      outStream.writeBits(32, crc.getCRC());
      compressBlock(block, length, outStream);
    }
  } while (length === blockSize);

  // finish up
  outStream.writeBits(48, SQRTPI);
  outStream.writeBits(32, streamCRC);
  outStream.flush(); // get the last bits flushed out
  return o.retval;
};

Bzip2.decompressFile = Bunzip.decode;
Bzip2.decompressBlock = Bunzip.decodeBlock;
Bzip2.table = Bunzip.table;

return Bzip2;
});
