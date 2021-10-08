/* Suffix-sort test, for BWT module.
 * Ported from suftest.java from https://sites.google.com/site/yuta256/sais
 * See lib/BWT.js for more details on provenance.
 */
var assert = require('assert');
var fs = require('fs');
var BWT = require('../').BWT;
var Util = require('../lib/Util');

var sufcheck = function(T, SA, n, verbose) {
    var C = [];
    var i, p, q, t;
    var c;
    var log = function() {
        if (verbose) { console.log.apply(console, arguments); }
    };

    log('sufcheck:');
    if (n === 0) {
        log('Done.');
        return 0;
    }

    /** Check arguments */
    if ((!T) || (!SA) || (n < 0)) {
        assert.ok(false, 'Invalid arguments', !!T, !!SA, n);
        return -1;
    }

    /* Check range: [0..n-1] */
    for (i=0; i<n; i++) {
        if ((SA[i] < 0) || (n <= SA[i])) {
            assert.ok(false, 'Out of the range [0,', (n-1), ']:',
                      '  SA[',i,']=', SA[i]);
            return -2;
        }
    }

    /* Check first characters. */
    for (i=1; i<n; i++) {
        if (T[SA[i - 1]] > T[SA[i]]) {
            assert.ok(false, 'Suffixes in wrong order:',
                      '  T[SA[',i-1,']=',SA[i-1],']=',T[SA[i-1]],
                      '> T[SA[',i  ,']=',SA[i  ],']=',T[SA[i]]);
            return -3;
        }
    }

    /* check suffixes */
    for (i=0; i<256; i++) { C[i] = 0; }
    for (i=0; i<n; i++) { ++C[T[i]]; }
    for (i=0, p=0; i < 256; i++) {
        t = C[i];
        C[i] = p;
        p += t;
    }

    q = C[T[n-1]];
    C[T[n-1]] += 1;
    for (i=0; i<n; i++) {
        p = SA[i];
        if (p > 0) {
            c = T[--p];
            t = C[c];
        } else {
            c = T[p = n-1];
            t = q;
        }
        if ((t < 0) || (p !== SA[t])) {
            assert.ok(false, 'Suffixes in wrong position:',
                      '  SA[',t,']=',(t>=0) ? SA[t] : -1,' or',
                      '  SA[',i,']=',SA[i]);
            return -4;
        }
        if (t !== q) {
            ++C[c];
            if ((n <= C[c]) || (T[SA[C[c]]] !== c)) { C[c] = -1; }
        }
    }
    C = null;
    log('Done.');
    return 0;
};

var testFile = function(filename, verbose) {
    var T = fs.readFileSync('test/'+filename+'.ref');
    var n = T.length;
    if (verbose) { console.log('File', filename+'.ref', n, 'bytes....'); }

    /** Allocate 5n bytes of memory */
    T = Util.arraycopy(Util.makeU8Buffer(n), T);
    var SA = Util.makeS32Buffer(n);

    /** Construct the suffix array */
    var start = Date.now();
    BWT.suffixsort(T, SA, n, 256);
    var finish = Date.now();
    if (verbose) { console.log((finish - start)/1000, 'seconds'); }

    /** Check the suffix array. */
    var ok = sufcheck(T, SA, n, verbose);
    assert.ok(ok === 0);

    T = null;
    SA = null;
};

describe('BWT suffix sort', function() {
    ['sample0', 'sample1', 'sample2', 'sample3', 'sample4', 'sample5'].forEach(function(f) {
        it('should correctly sort '+f, function() {
            this.timeout(0); // no timeout -- these can take a while.
            testFile(f, false);
        });
    });
});
