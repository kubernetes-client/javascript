/* Some basic utilities, used in a number of places. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./freeze','./Stream'],function(freeze, Stream) {
    var Util = Object.create(null);

    var EOF = Stream.EOF;

    /* Take a buffer, array, or stream, and return an input stream. */
    Util.coerceInputStream = function(input, forceRead) {
        if (!('readByte' in input)) {
            var buffer = input;
            input = new Stream();
            input.size = buffer.length;
            input.pos = 0;
            input.readByte = function() {
                if (this.pos >= this.size) { return EOF; }
                return buffer[this.pos++];
            };
            input.read = function(buf, bufOffset, length) {
                var bytesRead = 0;
                while (bytesRead < length && this.pos < buffer.length) {
                    buf[bufOffset++] = buffer[this.pos++];
                    bytesRead++;
                }
                return bytesRead;
            };
            input.seek = function(pos) { this.pos = pos; };
            input.tell = function() { return this.pos; };
            input.eof = function() { return this.pos >= buffer.length; };
        } else if (forceRead && !('read' in input)) {
            // wrap input if it doesn't implement read
            var s = input;
            input = new Stream();
            input.readByte = function() {
                var ch = s.readByte();
                if (ch === EOF) { this._eof = true; }
                return ch;
            };
            if ('size' in s) { input.size = s.size; }
            if ('seek' in s) {
                input.seek = function(pos) {
                    s.seek(pos); // may throw if s doesn't implement seek
                    this._eof = false;
                };
            }
            if ('tell' in s) {
                input.tell = s.tell.bind(s);
            }
        }
        return input;
    };

    var BufferStream = function(buffer, resizeOk) {
        this.buffer = buffer;
        this.resizeOk = resizeOk;
        this.pos = 0;
    };
    BufferStream.prototype = Object.create(Stream.prototype);
    BufferStream.prototype.writeByte = function(_byte) {
        if (this.resizeOk && this.pos >= this.buffer.length) {
            var newBuffer = Util.makeU8Buffer(this.buffer.length * 2);
            newBuffer.set(this.buffer);
            this.buffer = newBuffer;
        }
        this.buffer[this.pos++] = _byte;
    };
    BufferStream.prototype.getBuffer = function() {
        // trim buffer if needed
        if (this.pos !== this.buffer.length) {
            if (!this.resizeOk)
                throw new TypeError('outputsize does not match decoded input');
            var newBuffer = Util.makeU8Buffer(this.pos);
            newBuffer.set(this.buffer.subarray(0, this.pos));
            this.buffer = newBuffer;
        }
        return this.buffer;
    };

    /* Take a stream (or not) and an (optional) size, and return an
     * output stream.  Return an object with a 'retval' field equal to
     * the output stream (if that was given) or else a pointer at the
     * internal Uint8Array/buffer/array; and a 'stream' field equal to
     * an output stream to use.
     */
    Util.coerceOutputStream = function(output, size) {
        var r = { stream: output, retval: output };
        if (output) {
            if (typeof(output)==='object' && 'writeByte' in output) {
                return r; /* leave output alone */
            } else if (typeof(size) === 'number') {
                console.assert(size >= 0);
                r.stream = new BufferStream(Util.makeU8Buffer(size), false);
            } else { // output is a buffer
                r.stream = new BufferStream(output, false);
            }
        } else {
            r.stream = new BufferStream(Util.makeU8Buffer(16384), true);
        }
        Object.defineProperty(r, 'retval', {
            get: r.stream.getBuffer.bind(r.stream)
        });
        return r;
    };

    Util.compressFileHelper = function(magic, guts, suppressFinalByte) {
        return function(inStream, outStream, props) {
            inStream = Util.coerceInputStream(inStream);
            var o = Util.coerceOutputStream(outStream, outStream);
            outStream = o.stream;

            // write the magic number to identify this file type
            // (it better be ASCII, we're not doing utf-8 conversion)
            var i;
            for (i=0; i<magic.length; i++) {
                outStream.writeByte(magic.charCodeAt(i));
            }

            // if we know the size, write it
            var fileSize;
            if ('size' in inStream && inStream.size >= 0) {
                fileSize = inStream.size;
            } else {
                fileSize = -1; // size unknown
            }
            if (suppressFinalByte) {
                var tmpOutput = Util.coerceOutputStream([]);
                Util.writeUnsignedNumber(tmpOutput.stream, fileSize + 1);
                tmpOutput = tmpOutput.retval;
                for (i=0; i<tmpOutput.length-1; i++) {
                    outStream.writeByte(tmpOutput[i]);
                }
                suppressFinalByte = tmpOutput[tmpOutput.length-1];
            } else {
                Util.writeUnsignedNumber(outStream, fileSize + 1);
            }

            // call the guts to do the real compression
            guts(inStream, outStream, fileSize, props, suppressFinalByte);

            return o.retval;
        };
    };
    Util.decompressFileHelper = function(magic, guts) {
        return function(inStream, outStream) {
            inStream = Util.coerceInputStream(inStream);

            // read the magic number to confirm this file type
            // (it better be ASCII, we're not doing utf-8 conversion)
            var i;
            for (i=0; i<magic.length; i++) {
                if (magic.charCodeAt(i) !== inStream.readByte()) {
                    throw new Error("Bad magic");
                }
            }

            // read the file size & create an appropriate output stream/buffer
            var fileSize = Util.readUnsignedNumber(inStream) - 1;
            var o = Util.coerceOutputStream(outStream, fileSize);
            outStream = o.stream;

            // call the guts to do the real decompression
            guts(inStream, outStream, fileSize);

            return o.retval;
        };
    };
    // a helper for simple self-test of model encode
    Util.compressWithModel = function(inStream, fileSize, model) {
        var inSize = 0;
        while (inSize !== fileSize) {
            var ch = inStream.readByte();
            if (ch === EOF) {
                model.encode(256); // end of stream;
                break;
            }
            model.encode(ch);
            inSize++;
        }
    };
    // a helper for simple self-test of model decode
    Util.decompressWithModel = function(outStream, fileSize, model) {
        var outSize = 0;
        while (outSize !== fileSize) {
            var ch = model.decode();
            if (ch === 256) {
                break; // end of stream;
            }
            outStream.writeByte(ch);
            outSize++;
        }
    };

    /** Write a number using a self-delimiting big-endian encoding. */
    Util.writeUnsignedNumber = function(output, n) {
        console.assert(n >= 0);
        var bytes = [], i;
        do {
            bytes.push(n & 0x7F);
            // use division instead of shift to allow encoding numbers up to
            // 2^53
            n = Math.floor( n / 128 );
        } while (n !== 0);
        bytes[0] |= 0x80; // mark end of encoding.
        for (i=bytes.length-1; i>=0; i--) {
            output.writeByte(bytes[i]); // write in big-endian order
        }
        return output;
    };

    /** Read a number using a self-delimiting big-endian encoding. */
    Util.readUnsignedNumber = function(input) {
        var n = 0, c;
        while (true) {
            c = input.readByte();
            if (c&0x80) { n += (c&0x7F); break; }
            // using + and * instead of << allows decoding numbers up to 2^53
            n = (n + c) * 128;
        }
        return n;
    };

    // Compatibility thunks for Buffer/TypedArray constructors.

    var zerofill = function(a) {
        for (var i = 0, len = a.length; i < len; i++) {
            a[i] = 0;
        }
        return a;
    };

    var fallbackarray = function(size) {
        return zerofill(new Array(size));
    };

    // Node 0.11.6 - 0.11.10ish don't properly zero fill typed arrays.
    // See https://github.com/joyent/node/issues/6664
    // Try to detect and workaround the bug.
    var ensureZeroed = function id(a) { return a; };
    if ((typeof(process) !== 'undefined') &&
        Array.prototype.some.call(new Uint32Array(128), function(x) {
            return x !== 0;
        })) {
        //console.warn('Working around broken TypedArray');
        ensureZeroed = zerofill;
    }

    /** Portable 8-bit unsigned buffer. */
    Util.makeU8Buffer = (typeof(Uint8Array) !== 'undefined') ? function(size) {
        // Uint8Array ought to be  automatically zero-filled
        return ensureZeroed(new Uint8Array(size));
    } : (typeof(Buffer) !== 'undefined') ? function(size) {
        var b = new Buffer(size);
        b.fill(0);
        return b;
    } : fallbackarray;

    /** Portable 16-bit unsigned buffer. */
    Util.makeU16Buffer = (typeof(Uint16Array) !== 'undefined') ? function(size) {
        // Uint16Array ought to be  automatically zero-filled
        return ensureZeroed(new Uint16Array(size));
    } : fallbackarray;

    /** Portable 32-bit unsigned buffer. */
    Util.makeU32Buffer = (typeof(Uint32Array) !== 'undefined') ? function(size) {
        // Uint32Array ought to be  automatically zero-filled
        return ensureZeroed(new Uint32Array(size));
    } : fallbackarray;

    /** Portable 32-bit signed buffer. */
    Util.makeS32Buffer = (typeof(Int32Array) !== 'undefined') ? function(size) {
        // Int32Array ought to be  automatically zero-filled
        return ensureZeroed(new Int32Array(size));
    } : fallbackarray;

    Util.arraycopy = function(dst, src) {
        console.assert(dst.length >= src.length);
        for (var i = 0, len = src.length; i < len ; i++) {
            dst[i] = src[i];
        }
        return dst;
    };

    /** Highest bit set in a byte. */
    var bytemsb = [
        0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8 /* 256 */
    ];
    console.assert(bytemsb.length===0x100);
    /** Find last set (most significant bit).
     *  @return the last bit set in the argument.
     *          <code>fls(0)==0</code> and <code>fls(1)==1</code>. */
    var fls = Util.fls = function(v) {
        console.assert(v>=0);
        if (v > 0xFFFFFFFF) { // use floating-point mojo
            return 32 + fls(Math.floor(v / 0x100000000));
        }
        if ( (v & 0xFFFF0000) !== 0) {
            if ( (v & 0xFF000000) !== 0) {
                return 24 + bytemsb[(v>>>24) & 0xFF];
            } else {
                return 16 + bytemsb[v>>>16];
            }
        } else if ( (v & 0x0000FF00) !== 0) {
            return 8 + bytemsb[v>>>8];
        } else {
            return bytemsb[v];
        }
    };
    /** Returns ceil(log2(n)) */
    Util.log2c = function(v) {
        return (v===0)?-1:fls(v-1);
    };

    return freeze(Util); // ensure constants are recognized as such.
});
