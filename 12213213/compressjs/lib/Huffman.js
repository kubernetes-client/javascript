/* Adaptive Huffman code, using Vitter's algorithm ported from
 * vitter.c at http://code.google.com/p/compression-code/downloads/list
 * The original code was placed in the public domain, and so I
 * also place this JavaScript port in the public domain.
 *   -- C. Scott Ananian <cscott@cscott.net>, 2013
 * ps. some truly grotty C code in the originally, faithfully ported to
 *     evil comma-operator-using, assignment-in-if-condition JavaScript.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./BitStream','./Util'],function(BitStream,Util) {
//  This code is adapted from Professor Vitter's
//  article, Design and Analysis of Dynamic Huffman Codes,
//  which appeared in JACM October 1987

//  A design trade-off has been made to simplify the
//  code:  a node's block is determined dynamically,
//  and the implicit tree structure is maintained,
//  e.g. explicit node numbers are also implicit.

//  Dynamic Huffman table weight ranking
//  is maintained per Professor Vitter's
//  invariant (*) for algorithm FGK:

//  leaves precede internal nodes of the
//  same weight in a non-decreasing ranking
//  of weights using implicit node numbers:

//  1) leaves slide over internal nodes, internal nodes
//  swap over groups of leaves, leaves are swapped
//  into group leader position, but two internal
//  nodes never change positions relative
//  to one another.

//  2) weights are incremented by 2:
//  leaves always have even weight values;
//  internal nodes always have odd values.

//  3) even node numbers are always right children;
//  odd numbers are left children in the tree.

//  node 2 * HuffSize - 1 is always the tree root;
//  node HuffEsc is the escape node;

//  the tree is initialized by creating an
//  escape node as the root.

//  each new leaf symbol is paired with a new escape
//  node into the previous escape node in the tree,
//  until the last symbol which takes over the
//  tree position of the escape node, and
//  HuffEsc is left at zero.

//  overall table size: 2 * HuffSize

//  huff_init(alphabet_size, potential symbols used)
//  huff_encode(next_symbol)
//  next_symbol = huff_decode()

//  huff_scale(by_bits) -- scale weights and re-balance tree

var HTable = function(up, down, symbol, weight) {
    this.up = up; // next node up the tree
    this.down = down; // pair of down nodes
    this.symbol = symbol;       // node symbol value
    this.weight = weight;       // node weight
};
HTable.prototype.clone = function() {
  return new HTable(this.up, this.down, this.symbol, this.weight);
};
HTable.prototype.set = function(htable) {
  this.up = htable.up;
  this.down = htable.down;
  this.symbol = htable.symbol;
  this.weight = htable.weight;
};

//  initialize an adaptive coder
//  for alphabet size, and count
//  of nodes to be used
var Huffman = function(size, root, bitstream, max_weight) {
  var i;
  //  default: all alphabet symbols are used

  console.assert(size && typeof(size)==='number');
  if( !root || root > size )
      root = size;

  //  create the initial escape node
  //  at the tree root

  if ( root <<= 1 ) {
      root--;
  }

  // create root+1 htables (coding table)
  // XXX this could be views on a backing Uint32 array?
  this.table = [];
  for (i=0; i<=root; i++) {
    this.table[i] = new HTable(0,0,0,0);
  }

  // this.map => mapping for symbols to nodes
  this.map = [];
  // this.size => the alphabet size
  if( this.size = size ) {
    for (i=0; i<size; i++) {
      this.map[i] = 0;
    }
  }

  // this.esc  => the current tree height
  // this.root => the root of the tree
  this.esc = this.root = root;

  if (bitstream) {
    this.readBit = bitstream.readBit.bind(bitstream);
    this.writeBit = bitstream.writeBit.bind(bitstream);
  }
  this.max_weight = max_weight; // may be null or undefined
}
// factory interface
Huffman.factory = function(bitstream, max_weight) {
  return function(size) {
    return new Huffman(size, size, bitstream, max_weight);
  };
};


// split escape node to incorporate new symbol

Huffman.prototype.split = function(symbol) {
  var pair, node;

  //  is the tree already full???

  if( pair = this.esc ) {
    this.esc--;
  } else {
    console.assert(false);
    return 0;
  }

  //  if this is the last symbol, it moves into
  //  the escape node's old position, and
  //  this.esc is set to zero.

  //  otherwise, the escape node is promoted to
  //  parent a new escape node and the new symbol.

  if( node = this.esc ) {
    this.table[pair].down = node;
    this.table[pair].weight = 1;
    this.table[node].up = pair;
    this.esc--;
  } else {
    pair = 0;
    node = 1;
  }

  //  initialize the new symbol node

  this.table[node].symbol = symbol;
  this.table[node].weight = 0;
  this.table[node].down = 0;
  this.map[symbol] = node;

  //  initialize a new escape node.

  this.table[this.esc].weight = 0;
  this.table[this.esc].down = 0;
  this.table[this.esc].up = pair;
  return node;
};

//  swap leaf to group leader position
//  return symbol's new node

Huffman.prototype.leader = function(node) {
  var weight = this.table[node].weight;
  var leader = node, prev, symbol;

  while( weight === this.table[leader + 1].weight ) {
    leader++;
  }

  if( leader === node ) {
    return node;
  }

  // swap the leaf nodes

  symbol = this.table[node].symbol;
  prev = this.table[leader].symbol;

  this.table[leader].symbol = symbol;
  this.table[node].symbol = prev;
  this.map[symbol] = leader;
  this.map[prev] = node;
  return leader;
};

//  slide internal node up over all leaves of equal weight;
//  or exchange leaf with next smaller weight internal node

//  return node's new position

Huffman.prototype.slide = function(node) {
  var next = node;
  var swap;

  swap = this.table[next++].clone();

  // if we're sliding an internal node, find the
  // highest possible leaf to exchange with

  if( swap.weight & 1 ) {
    while( swap.weight > this.table[next + 1].weight ) {
      next++;
    }
  }

  //  swap the two nodes

  this.table[node].set(this.table[next]);
  this.table[next].set(swap);

  this.table[next].up = this.table[node].up;
  this.table[node].up = swap.up;

  //  repair the symbol map and tree structure

  if( swap.weight & 1 ) {
    this.table[swap.down].up = next;
    this.table[swap.down - 1].up = next;
    this.map[this.table[node].symbol] = node;
  } else {
    this.table[this.table[node].down - 1].up = node;
    this.table[this.table[node].down].up = node;
    this.map[swap.symbol] = next;
  }

  return next;
};

//  increment symbol weight and re balance the tree.

Huffman.prototype.increment = function(node) {
  var up;

  //  obviate swapping a parent with its child:
  //    increment the leaf and proceed
  //    directly to its parent.

  //  otherwise, promote leaf to group leader position in the tree

  if( this.table[node].up === node + 1 ) {
    this.table[node].weight += 2;
    node++;
  } else {
    node = this.leader (node);
  }

  //  increase the weight of each node and slide
  //  over any smaller weights ahead of it
  //  until reaching the root

  //  internal nodes work upwards from
  //  their initial positions; while
  //  symbol nodes slide over first,
  //  then work up from their final
  //  positions.

  while( this.table[node].weight += 2, up = this.table[node].up ) {
    while( this.table[node].weight > this.table[node + 1].weight ) {
        node = this.slide (node);
    }

    if( this.table[node].weight & 1 ) {
        node = up;
    } else {
        node = this.table[node].up;
    }
  }

  /* Re-scale if necessary. */
  if (this.max_weight) {
    if (this.table[this.root].weight >= this.max_weight) {
      this.scale(1);
    }
  }
};

//  scale all weights and re-balance the tree

//  zero weight nodes are removed from the tree
//  by sliding them out the left of the rank list

Huffman.prototype.scale = function(bits) {
  var node = this.esc, weight, prev;

  //  work up the tree from the escape node
  //  scaling weights by the value of bits

  while( ++node <= this.root ) {
    //  recompute the weight of internal nodes;
    //  slide down and out any unused ones

    if( this.table[node].weight & 1 ) {
      if( weight = this.table[this.table[node].down].weight & ~1 ) {
        weight += this.table[this.table[node].down - 1].weight | 1;
      }

      //  remove zero weight leaves by incrementing HuffEsc
      //  and removing them from the symbol map.  take care

    } else if( !(weight = this.table[node].weight >> bits & ~1) ) {
      if( this.map[this.table[node].symbol] = 0, this.esc++ ) {
        this.esc++;
      }
    }

    // slide the scaled node back down over any
    // previous nodes with larger weights

    this.table[node].weight = weight;
    prev = node;

    while( weight < this.table[--prev].weight ) {
      this.slide(prev);
    }
  }

  // prepare a new escape node

  this.table[this.esc].down = 0;
};

//  send the bits for an escaped symbol

Huffman.prototype.sendid = function(symbol) {
  var empty = 0, max;

  //  count the number of empty symbols
  //  before the symbol in the table

  while( symbol-- ) {
    if( !this.map[symbol] ) {
      empty++;
    }
  }

  //  send LSB of this count first, using
  //  as many bits as are required for
  //  the maximum possible count

  if( max = this.size - Math.floor((this.root - this.esc) / 2) - 1 ) {
    do {
      this.writeBit(empty & 1);
      empty >>= 1;
    } while( max >>= 1 );
  }
};

//  encode the next symbol

Huffman.prototype.encode = function(symbol) {
  var emit = 1, bit;
  var up, idx, node;

  if( symbol < this.size ) {
    node = this.map[symbol];
  } else {
    console.assert(false);
    return;
  }

  //  for a new symbol, direct the receiver to the escape node
  //  but refuse input if table is already full.

  if( !(idx = node) ) {
    if( !(idx = this.esc) ) {
      return;
    }
  }

  //  accumulate the code bits by
  //  working up the tree from
  //  the node to the root

  while( up = this.table[idx].up ) {
    emit <<= 1; emit |= idx & 1; idx = up;
  }

  //  send the code, root selector bit first

  while( bit = emit & 1, emit >>= 1 ) {
    this.writeBit(bit);
  }

  //  send identification and incorporate
  //  new symbols into the tree

  if( !node ) {
    this.sendid(symbol);
    node = this.split(symbol);
  }

  //  adjust and re-balance the tree

  this.increment(node);
};

//  read the identification bits
//  for an escaped symbol

Huffman.prototype.readid = function() {
  var empty = 0, bit = 1, max, symbol;

  //  receive the symbol, LSB first, reading
  //  only the number of bits necessary to
  //  transmit the maximum possible symbol value

  if( max = this.size - Math.floor((this.root - this.esc) / 2) - 1 ) {
    do {
      empty |= this.readBit() ? bit : 0;
      bit <<= 1;
    } while( max >>= 1 );
  }

  //  the count is of unmapped symbols
  //  in the table before the new one

  for( symbol = 0; symbol < this.size; symbol++ ) {
    if( !this.map[symbol] ) {
      if( !empty-- ) {
        return symbol;
      }
    }
  }

  //  oops!  our count is too big, either due
  //  to a bit error, or a short node count
  //  given to huff_init.

  console.assert(false);
  return 0;
};

//  decode the next symbol

Huffman.prototype.decode = function() {
  var node = this.root;
  var symbol, down;

  //  work down the tree from the root
  //  until reaching either a leaf
  //  or the escape node.  A one
  //  bit means go left, a zero
  //  means go right.

  while( down = this.table[node].down ) {
    if( this.readBit() ) {
      node = down - 1;  // the left child precedes the right child
    } else {
      node = down;
    }
  }

  //  sent to the escape node???
  //  refuse to add to a full tree

  if( node === this.esc ) {
    if( this.esc ) {
      symbol = this.readid ();
      node = this.split (symbol);
    } else {
      console.assert(false);
      return 0;
    }
  } else {
    symbol = this.table[node].symbol;
  }

  //  increment weights and re-balance
  //  the coding tree

  this.increment (node);
  return symbol;
};

// stand alone compressor, mostly for testing
Huffman.MAGIC = 'huff';
Huffman.compressFile = Util.compressFileHelper(Huffman.MAGIC, function(input, output, size, props) {
  var bitstream = new BitStream(output);

  var alphabetSize = 256;
  if (size < 0) { alphabetSize++; }
  var huff = new Huffman(257, alphabetSize, bitstream, 8191);
  Util.compressWithModel(input, size, huff);
  bitstream.flush();
});

// stand alone decompresser, again for testing
Huffman.decompressFile = Util.decompressFileHelper(Huffman.MAGIC, function(input, output, size) {
  var bitstream = new BitStream(input);

  var alphabetSize = 256;
  if (size < 0) { alphabetSize++; }
  var huff = new Huffman(257, alphabetSize, bitstream, 8191);
  Util.decompressWithModel(output, size, huff);
});

return Huffman;
});
