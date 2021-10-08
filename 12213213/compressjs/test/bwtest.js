/* BWT test, for BWT module.
 * Ported from bwtest.java from https://sites.google.com/site/yuta256/sais
 * See lib/BWT.js for more details on provenance.
 */
var assert = require('assert');
var fs = require('fs');
var BWT = require('../').BWT;
var Util = require('../lib/Util');

var testFile = function(filename, verbose) {
    var T = fs.readFileSync('test/'+filename+'.ref');
    var n = T.length, i;
    if (verbose) { console.log('File', filename+'.ref', n, 'bytes....'); }

    /** Allocate 5n bytes of memory */
    T = Util.arraycopy(Util.makeU8Buffer(n), T);
    var U = Util.makeU8Buffer(n);
    var V = Util.makeU8Buffer(n);
    var A = Util.makeS32Buffer(n);

    /** Construct the BWT */
    var start = Date.now();
    var pidx = BWT.bwtransform(T, U, A, n, 256);
    var finish = Date.now();
    if (verbose) { console.log((finish - start)/1000, 'seconds'); }

    if (verbose) { console.log('unbwtcheck...'); }
    BWT.unbwtransform(U, V, A, n, pidx);
    for (i=0; i<n; i++) {
        assert.ok(T[i] === V[i],
                  'mismatch at', i,': ',T[i],'!=',V[i]);
    }
    if (verbose) { console.log('Done.'); }

    T = null; U = null; V = null; A = null;
};

describe('BWT transform', function() {
    var testcases = [
    {
        description: "Stack overflow example",
        input:  "bcababa",
        output: "cbbaaab",
        index:  5
    },{
        description: "Alphabet",
        input:  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        output: "ZABCDEFGHIJKLMNOPQRSTUVWXY",
        index: 0
    },{
        description: "Reversed alphabet",
        input:  "ZYXWVUTSRQPONMLKJIHGFEDCBA",
        output: "BCDEFGHIJKLMNOPQRSTUVWXYZA",
        index: 25
    },{
        description: "Wikipedia example.",
        input:  'SIX.MIXED.PIXIES.SIFT.SIXTY.PIXIE.DUST.BOXES',
        output: 'TEXYDST.E.IXIXIXXSSMPPS.B..E.S.EUSFXDIIOIIIT',
        index: 29
    },{
        description: "jbzip2 test case",
        input: ("Mary had a little lamb, its fleece was white as snow" +
                "Mary had a little lamb, its fleece was white as snow" +
                "Mary had a little lamb, its fleece was white as snow" +
                "Mary had a little lamb, its fleece was white as snow" +
                "Mary had a little lamb, its fleece was white as snow" +
                "Mary had a little lamb, its fleece was white as snow" +
                "Mary had a little lamb, its fleece was white as snow" +
                "Mary had a little lamb, its fleece was white as snow" +
                // break symmetry so we can distinguish rotations
                "Nary had a little lamb, its fleece was white as snow"),
        output: ("dddddddddeeeeeeeeesssssssssyyyyyyyyy,,,,,,,,,eeeeeeeeeaaaaaaaaassssssssseeeeeeeeesss" +
                 "ssssssbbbbbbbbbwwwwwwwww         hhhhhhhhhlllllllllNMMMMMMMM         wwwwwwwwwmmmmmm" +
                 "mmmeeeeeeeeeaaaaaaaaatttttttttlllllllllccccccccceeeeeeeeelllllllll                  " +
                 "wwwwwwwwwhhhhhhhhh         lllllllll         tttttttttfffffffff         aaaaaaaaasss" +
                 "ssssssnnnnnnnnnaaaaaaaaatttttttttaaaaaaaaaaaaaaaaaa         iiiiiiiiitttttttttiiiiii" +
                 "iiiiiiiiiiiiooooooooo                  rrrrrrrrr"),
        index: 99
    }];

    testcases.forEach(function(t) {
        it('should correctly sort '+t.description, function() {
            var T = new Buffer(t.input, 'ascii');
            var U = new Buffer(T.length);
            var pidx = BWT.bwtransform2(T, U, T.length, 256);
            var s2 = U.toString('ascii');
            assert.equal(s2, t.output);
            assert.equal(pidx, t.index);
        });
    });

    ['sample0', 'sample1', 'sample2', 'sample3', 'sample4', 'sample5'].forEach(function(f) {
        it('should correctly round-trip '+f, function() {
            this.timeout(0); // no timeout -- these can take a while.
            testFile(f, false);
        });
    });
});
