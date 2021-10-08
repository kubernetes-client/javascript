/** Particularly simple-minded implementation of PPM compression. */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./RangeCoder','./Util'], function(RangeCoder,Util) {

  var MAX_CONTEXT = 5;
  var LOG_WINDOW_SIZE = 18;
  var WINDOW_SIZE = 1 << LOG_WINDOW_SIZE;

  var Window = function() {
    this.buffer = Util.makeU8Buffer(WINDOW_SIZE);
    this.pos = 0;
    this.firstPass = true;
    for (var i=0; i<MAX_CONTEXT; i++) {
      this.put('cSaCsA'.charCodeAt(i%6));
    }
  };
  Window.prototype.put = function(_byte) {
    this.buffer[this.pos++] = _byte;
    if (this.pos >= WINDOW_SIZE) { this.pos = 0; this.firstPass = false; }
    return _byte;
  };
  Window.prototype.get = function(pos) {
    return this.buffer[pos & (WINDOW_SIZE-1)];
  };
  // the context ending just before 'pos'
  Window.prototype.context = function(pos, n) {
    var c = [], i;
    pos = (pos - n) & (WINDOW_SIZE-1);
    for (i=0; i<n; i++) {
      c.push(this.buffer[pos++]);
      if (pos >= WINDOW_SIZE) { pos = 0; }
    }
    return String.fromCharCode.apply(String, c);
  };

  var DMM_INCREMENT = 0x100, DMM_MAX_PROB = 0xFF00;

  var PPM = function(coder, size) {
    this.window = new Window();
    this.contexts = Object.create(null);
    // brain-dead '-1' context, using full exclusion
    var Cm1Context = function() { };
    Cm1Context.prototype.encode = function(symbol, exclude) {
      var i, lt_f = 0;
      for (i=0; i<symbol; i++) {
        if (!exclude[i]) {
          lt_f++;
        }
      }
      var tot_f = size - exclude.total;
      coder.encodeFreq(1, lt_f, tot_f);
    };
    Cm1Context.prototype.decode = function(exclude) {
      var i, symbol, lt_f;
      var tot_f = size - exclude.total;
      symbol = lt_f = coder.decodeCulFreq(tot_f);
      for (i=0; i<=symbol; i++) {
        if (exclude[i]) {
          symbol++;
        }
      }
      coder.decodeUpdate(1, lt_f, tot_f);
      return symbol;
    };
    this.cm1coder = new Cm1Context();

    var DenseMTFModel = function() {
      this.sym = [size];
      this.prob= [0, DMM_INCREMENT];
      this.refcount = 0;
    };
    DenseMTFModel.prototype._rescale = function() {
      var seenSyms = this.sym.length;
      var i, j, total=0;
      var noEscape = true;
      for(i=0, j=0; i<seenSyms; i++) {
        var sym = this.sym[i];
        var sy_f = this.prob[i+1] - this.prob[i];
        sy_f >>>= 1;
        if (sy_f > 0) {
          if (sym === size) {
            noEscape = false;
          }
          this.sym[j] = sym;
          this.prob[j++] = total;
          total += sy_f;
        }
      }
      this.prob[j] = total;
      seenSyms = this.sym.length = j;
      this.prob.length = seenSyms + 1;
      // don't allow escape to go to zero prob if we still need it
      if (noEscape && seenSyms < size) {
        total = this._update(size/*escape*/, seenSyms/*at end*/, 0, 1);
      }
      return total;
    };
    DenseMTFModel.prototype.update = function(symbol, incr) {
      // find symbol
      var i=0;
      for (i=0; i<this.sym.length; i++) {
        if (this.sym[i] === symbol) {
          return this._update(symbol, i, this.prob[i+1] - this.prob[i], incr);
        }
      }
      // symbol escaped
      return this._update(symbol, i, 0, incr);
    };
    DenseMTFModel.prototype._update = function(symbol, index, sy_f, incr) {
      var seenSyms = this.sym.length;
      var i, j, tot_f;
      // move this symbol to the end
      for (j=index; j<seenSyms-1; j++) {
        this.sym[j] = this.sym[j+1];
        this.prob[j] = this.prob[j+1] - sy_f;
      }
      // "method D" -- if we add a new escaped symbol, escape & the symbol
      // both increase by 1/2.
      if (index < seenSyms) {
        this.sym[j] = symbol;
        this.prob[j] = this.prob[j+1] - sy_f;
        // increase frequency for this symbol, and total freq at same time
        this.prob[seenSyms] = tot_f =
          this.prob[seenSyms] + incr;
      } else { // add to the end
        tot_f = this.prob[seenSyms];
        this.sym[index] = symbol;
        this.prob[index] = tot_f;
        tot_f += incr;
        this.prob[++seenSyms] = tot_f;
        // remove probability of escape if table just filled up
        if (this.sym.length > size) {
          for (i=0; i<seenSyms; i++) {
            if (size === this.sym[i]) {
              // found it.
              this._update(size, i, this.prob[i+1] - this.prob[i], -1);
              this.sym.length--;
              this.prob.length--;
              tot_f = this.prob[this.prob.length-1];
            }
          }
        }
      }
      if (tot_f >= DMM_MAX_PROB) { tot_f = this._rescale(); }
      return tot_f;
    };
    DenseMTFModel.prototype.encode = function(symbol, exclude) {
      // look for symbol, from most-recent to oldest
      var i, j, sy_f, lt_f, tot_f, seenSyms = this.sym.length;
      var ex_seen = 0, ex_lt_f = 0, ex_tot_f = 0, ex_sy_f;
      for (i=seenSyms-1; i>=0; i--) {
        lt_f = this.prob[i];
        sy_f = this.prob[i + 1] - lt_f;
        if (symbol === this.sym[i]) {
          // ok, found it.
          // count up the rest of the probabilities
          for (j=i-1; j>=0 && ex_seen < exclude.total; j--) {
            if (exclude[this.sym[j]]) {
              ex_seen += 1;
              ex_sy_f = this.prob[j+1] - this.prob[j];
              ex_lt_f += ex_sy_f;
              ex_tot_f += ex_sy_f;
            }
          }
          tot_f = this.prob[seenSyms];
          // adjust by excluded symbols
          lt_f -= ex_lt_f;
          tot_f -= ex_tot_f;
          coder.encodeFreq(sy_f, lt_f, tot_f);
          if (symbol === size) { // only update table for escapes
            this._update(symbol, i, sy_f, DMM_INCREMENT/2);
            return false; // escape.
          } // otherwise we'll do update later
          return true; // encoded character!
        } else if (exclude[this.sym[i]]) {
          ex_seen += 1;
          ex_tot_f += sy_f;
        }
      }
      // couldn't find this symbol.  encode as escape.
      this.encode(size, exclude);
      // add symbols to exclusion table
      console.assert(this.sym[this.sym.length-1] === size);//escape
      for (i=0; i<this.sym.length-1; i++) {
        if (!exclude[this.sym[i]]) {
          exclude[this.sym[i]] = true;
          exclude.total++;
        }
      }
    };
    DenseMTFModel.prototype.decode = function(exclude) {
      var seenSyms = this.sym.length;
      var tot_f = this.prob[seenSyms];
      var ex_seen = 0, ex_lt_f = 0, ex_tot_f = 0, ex_sy_f;
      var i;
      for (i=seenSyms-1; i>=0 && ex_seen < exclude.total; i--) {
        if (exclude[this.sym[i]]) {
          ex_seen += 1;
          ex_tot_f += this.prob[i+1] - this.prob[i];
        }
      }
      var prob = coder.decodeCulFreq(tot_f - ex_tot_f) + ex_tot_f;
      // we're expecting to find the probability near the "most recent" side
      // of our array
      ex_lt_f = ex_tot_f;
      for (i=seenSyms-1; i>=0; i--) {
        if (exclude[this.sym[i]]) {
          ex_sy_f = this.prob[i+1] - this.prob[i];
          ex_lt_f -= ex_sy_f;
          prob -= ex_sy_f;
        } else if (this.prob[i] <= prob /*&& prob < this.prob[i+1]*/)
          break;
      }
      console.assert(i>=0);
      var symbol = this.sym[i];
      var lt_f = this.prob[i];
      var sy_f = this.prob[i + 1] - lt_f;
      coder.decodeUpdate(sy_f, lt_f - ex_lt_f, tot_f - ex_tot_f);
      // defer update
      if (symbol < size) { return symbol; }
      // an escape
      this._update(symbol, i, sy_f, DMM_INCREMENT/2);
      // add symbols to exclusion table
      console.assert(this.sym[this.sym.length-1] === size);//escape
      for (i=0; i<this.sym.length-1; i++) {
        if (!exclude[this.sym[i]]) {
          exclude[this.sym[i]] = true;
          exclude.total++;
        }
      }
      return -1;
    };
    this.newContext = function(initialSymbol) {
      return new DenseMTFModel();
    };
    this.newExclude = function() {
      var result = Object.create(null);
      result.total = 0; // no excluded symbols (yet)
      return result;
    };
    // set up some initial contexts
    (function() {
      var i, j;
      for (i=0; i<MAX_CONTEXT; i++) {
        for (j=0; j<=i; j++) {
          var cc = this.window.context(j+((MAX_CONTEXT-1)-i), j);
          if (!this.contexts[cc]) { this.contexts[cc] = this.newContext(); }
          this.contexts[cc].refcount++;
        }
      }
    }).call(this);
  };
  PPM.prototype.update = function(symbol, contextString, matchLevel) {
    // slide up the contexts, updating them
    var model, c, cc;
    for (c=0; c <= MAX_CONTEXT; c++) {
      cc = contextString.slice(MAX_CONTEXT - c);
      model = this.contexts[cc];
      if (!model) {
        model = this.contexts[cc] = this.newContext();
      }
      if (c >= matchLevel) {
        // only update useful contexts
        model.update(symbol, DMM_INCREMENT / 2);
      }
      // refcount all contexts, whether used/updated or not
      model.refcount++;
    }
    // now garbage-collect old contexts
    contextString = this.window.context(this.window.pos + MAX_CONTEXT,
                                        MAX_CONTEXT);
    var firstPass = this.window.firstPass;
    for (c=MAX_CONTEXT; c>=0 && !firstPass; c--) {
      cc = contextString.slice(0, c);
      model = this.contexts[cc];
      console.assert(model);
      if ((--model.refcount) <= 0) {
        console.assert(cc !== ''); // don't allow context-0 to be gc'ed!
        delete this.contexts[cc];
      }
    }
    // ok, advance window.
    this.window.put(symbol);
  };
  PPM.prototype.decode = function() {
    var contextString = this.window.context(this.window.pos, MAX_CONTEXT);
    var exclude = this.newExclude();
    var model, c, cc, symbol;
    for (c=MAX_CONTEXT; c>=0; c--) {
      cc = contextString.slice(MAX_CONTEXT - c);
      model = this.contexts[cc];
      if (model) {
        symbol = model.decode(exclude);
        if (symbol >= 0) {
          this.update(symbol, contextString, c);
          return symbol;
        }
      }
    }
    // still no match, fall back to context -1
    symbol = this.cm1coder.decode(exclude);
    this.update(symbol, contextString, c);
    return symbol;
  };
  PPM.prototype.encode = function(symbol) {
    var contextString = this.window.context(this.window.pos, MAX_CONTEXT);
    var exclude = this.newExclude();
    var c;
    for (c=MAX_CONTEXT; c>=0; c--) {
      var cc = contextString.slice(MAX_CONTEXT - c);
      var model = this.contexts[cc];
      if (model) {
        var success = model.encode(symbol, exclude);
        if (success) {
          this.update(symbol, contextString, c);
          return;
        }
      }
    }
    // fall back to context -1 (but still use exclusion table)
    this.cm1coder.encode(symbol, exclude);
    this.update(symbol, contextString, c);
    return;
  };

  PPM.MAGIC = 'ppm2';
  PPM.compressFile = Util.compressFileHelper(PPM.MAGIC, function(inStream, outStream, fileSize, props, finalByte) {
    var range = new RangeCoder(outStream);
    range.encodeStart(finalByte, 1);
    var model = new PPM(range, (fileSize<0) ? 257 : 256);
    Util.compressWithModel(inStream, fileSize, model);
    range.encodeFinish();
  }, true);
  PPM.decompressFile = Util.decompressFileHelper(PPM.MAGIC, function(inStream, outStream, fileSize) {
    var range = new RangeCoder(inStream);
    range.decodeStart(true/*we already read the 'free' byte*/);
    var model = new PPM(range, (fileSize<0) ? 257 : 256);
    Util.decompressWithModel(outStream, fileSize, model);
    range.decodeFinish();
  });

  return PPM;
});
