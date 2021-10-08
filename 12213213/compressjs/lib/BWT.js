/** Burrows-Wheeler transform, computed with the Induced Sorting Suffix Array
 *  construction mechanism (sais).  Code is a port of:
 *    https://sites.google.com/site/yuta256/sais
 *  which is:
 *    Copyright (c) 2008-2010 Yuta Mori All Rights Reserved.
 *  and licensed under an MIT/X11 license.  I generally looked at both
 *  the C and the Java implementations to guide my work.
 *
 * This JavaScript port is:
 *    Copyright (c) 2013 C. Scott Ananian
 * and licensed under GPLv2; see the README at the top level of this package.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./freeze', './Util'], function(freeze, Util) {
    var ASSERT = console.assert.bind(console);

    // we're dispensing with the "arbitrary alphabet" stuff of the source
    // and just using Uint8Arrays.

    /** Find the start or end of each bucket. */
    var getCounts = function(T, C, n, k) {
        var i;
        for (i = 0; i < k; i++) { C[i] = 0; }
        for (i = 0; i < n; i++) { C[T[i]]++; }
    };
    var getBuckets = function(C, B, k, end) {
        var i, sum = 0;
        if (end) {
            for (i = 0; i < k; i++) { sum += C[i]; B[i] = sum; }
        } else {
            for (i = 0; i < k; i++) { sum += C[i]; B[i] = sum - C[i]; }
        }
    };

    /** Sort all type LMS suffixes */
    var LMSsort = function(T, SA, C, B, n, k) {
        var b, i, j;
        var c0, c1;
        /* compute SAl */
        if (C === B) { getCounts(T, C, n, k); }
        getBuckets(C, B, k, false); /* find starts of buckets */
        j = n - 1;
        b = B[c1 = T[j]];
        j--;
        SA[b++] = (T[j] < c1) ? ~j : j;
        for (i = 0; i < n; i++) {
            if ((j = SA[i]) > 0) {
                ASSERT(T[j] >= T[j+1]);
                if ((c0 = T[j]) !== c1) { B[c1] = b; b = B[c1 = c0]; }
                ASSERT(i < b);
                j--;
                SA[b++] = (T[j] < c1) ? ~j : j;
                SA[i] = 0;
            } else if (j < 0) {
                SA[i] = ~j;
            }
        }
        /* compute SAs */
        if (C === B) { getCounts(T, C, n, k); }
        getBuckets(C, B, k, 1); /* find ends of buckets */
        for (i = n-1, b = B[c1 = 0]; i >= 0; i--) {
            if ((j = SA[i]) > 0) {
                ASSERT(T[j] <= T[j+1]);
                if ((c0 = T[j]) !== c1) { B[c1] = b; b = B[c1 = c0]; }
                ASSERT(b <= i);
                j--;
                SA[--b] = (T[j] > c1) ? ~(j+1) : j;
                SA[i] = 0;
            }
        }
    };

    var LMSpostproc = function(T, SA, n, m) {
        var i, j, p, q, plen, qlen, name;
        var c0, c1;
        var diff;

        /* compact all the sorted substrings into the first m items of SA
         * 2*m must not be larger than n (provable) */
        ASSERT(n > 0);
        for (i = 0; (p = SA[i]) < 0; i++) { SA[i] = ~p; ASSERT((i+1) < n); }
        if (i < m) {
            for (j = i, i++; ; i++) {
                ASSERT(i < n);
                if ((p = SA[i]) < 0) {
                    SA[j++] = ~p; SA[i] = 0;
                    if (j === m) { break; }
                }
            }
        }

        /* store the length of all substrings */
        c0 = T[i = j = n - 1];
        do { c1 = c0; } while ( ((--i) >= 0 ) && ((c0=T[i]) >= c1) );
        for (; i >= 0; ) {
            do { c1 = c0; } while ( ((--i) >= 0 ) && ((c0=T[i]) <= c1) );
            if (i >= 0) {
                SA[m + ((i + 1) >>> 1)] = j - i; j = i + 1;
                do { c1 = c0; } while ( ((--i) >= 0 ) && ((c0=T[i]) >= c1) );
            }
        }

        /* find the lexicographic names of all substrings */
        for (i = 0, name = 0, q = n, qlen = 0; i < m; i++) {
            p = SA[i]; plen = SA[m + (p >>> 1)]; diff = true;
            if ((plen === qlen) && ((q + plen) < n)) {
                for (j = 0; (j < plen) && (T[p + j] === T[q + j]); ) { j++; }
                if (j === plen) { diff = false; }
            }
            if (diff) { name++; q = p; qlen = plen; }
            SA[m + (p >>> 1)] = name;
        }

        return name;
    };

    /* compute SA and BWT */
    var induceSA = function(T, SA, C, B, n, k) {
        var b, i, j;
        var c0, c1;
        /* compute SAl */
        if (C === B) { getCounts(T, C, n, k); }
        getBuckets(C, B, k, false); /* find starts of buckets */
        j = n - 1;
        b = B[c1 = T[j]];
        SA[b++] = ((j > 0) && (T[j-1] < c1)) ? ~j : j;
        for (i = 0; i < n; i++) {
            j = SA[i]; SA[i] = ~j;
            if (j > 0) {
                j--;
                ASSERT( T[j] >= T[j + 1] );
                if ((c0 = T[j]) !== c1) { B[c1]  = b; b = B[c1=c0]; }
                ASSERT( i < b );
                SA[b++] = ((j > 0) && (T[j-1] < c1)) ? ~j : j;
            }
        }
        /* compute SAs */
        if (C === B) { getCounts(T, C, n, k); }
        getBuckets(C, B, k, true); /* find ends of buckets */
        for (i = n-1, b = B[c1 = 0]; i >= 0; i--) {
            if ((j = SA[i]) > 0) {
                j--;
                ASSERT( T[j] <= T[j + 1] );
                if ((c0 = T[j]) !== c1) { B[c1] = b; b = B[c1 = c0]; }
                ASSERT( b <= i );
                SA[--b] = ((j === 0) || (T[j - 1] > c1)) ? ~j : j;
            } else {
                SA[i] = ~j;
            }
        }
    };

    var computeBWT = function(T, SA, C, B, n, k) {
        var b, i, j, pidx = -1;
        var c0, c1;
        /* compute SAl */
        if (C === B) { getCounts(T, C, n, k); }
        getBuckets(C, B, k, false); /* find starts of buckets */
        j = n - 1;
        b = B[c1 = T[j]];
        SA[b++] = ((j > 0) && (T[j - 1] < c1)) ? ~j : j;
        for (i = 0; i < n; i++) {
            if ((j=SA[i]) > 0) {
                j--;
                ASSERT( T[j] >= T[j+1] );
                SA[i] = ~(c0 = T[j]);
                if (c0 !== c1) { B[c1] = b; b = B[c1 = c0]; }
                ASSERT( i < b );
                SA[b++] = ((j > 0) && (T[j - 1] < c1)) ? ~j : j;
            } else if (j !== 0) {
                SA[i] = ~j;
            }
        }
        /* compute SAs */
        if (C === B) { getCounts(T, C, n, k); }
        getBuckets(C, B, k, true); /* find ends of buckets */
        for (i = n-1, b = B[c1 = 0]; i >= 0; i--) {
            if ((j = SA[i]) > 0) {
                j--;
                ASSERT( T[j] <= T[j+1] );
                SA[i] = c0 = T[j];
                if (c0 !== c1) { B[c1] = b; b = B[c1 = c0]; }
                ASSERT( b <= i );
                SA[--b] = ((j > 0) && (T[j-1] > c1)) ? (~T[j-1]) : j;
            } else if (j !== 0) {
                SA[i] = ~j;
            } else {
                pidx = i;
            }
        }
        return pidx;
    };

    /* find the suffix array SA of T[0..n-1] in {0..k-1}^n
       use a working space (excluding T and SA) of at most 2n+O(1) for a
       constant alphabet */
    var SA_IS = function(T, SA, fs, n, k, isbwt) {
        var C, B, RA;
        var i, j, b, c, m, p, q, name, pidx = 0, newfs;
        var c0, c1;
        var flags = 0;

        // allocate temporary storage [CSA]
        if (k <= 256) {
            C = Util.makeS32Buffer(k);
            if (k <= fs) { B = SA.subarray(n + fs - k); flags = 1; }
            else { B = Util.makeS32Buffer(k); flags = 3; }
        } else if (k <= fs) {
            C = SA.subarray(n + fs - k);
            if (k <= (fs - k)) { B = SA.subarray(n + fs - k * 2); flags = 0; }
            else if (k <= 1024) { B = Util.makeS32Buffer(k); flags = 2; }
            else { B = C; flags = 8; }
        } else {
            C = B = Util.makeS32Buffer(k);
            flags = 4 | 8;
        }

        /* stage 1: reduce the problem by at least 1/2
           sort all the LMS-substrings */
        getCounts(T, C, n, k);
        getBuckets(C, B, k, true); /* find ends of buckets */
        for (i = 0; i < n; i++) { SA[i] = 0; }
        b = -1; i = n - 1; j = n; m = 0; c0 = T[n - 1];
        do { c1 = c0; } while ((--i >= 0) && ((c0 = T[i]) >= c1));
        for (; i >= 0 ;) {
            do { c1 = c0; } while ((--i >= 0) && ((c0 = T[i]) <= c1));
            if ( i >= 0 ) {
                if ( b >= 0 ) { SA[b] = j; }
                b = --B[c1];
                j = i;
                ++m;
                do { c1 = c0; } while ((--i >= 0) && ((c0 = T[i]) >= c1));
            }
        }

        if (m > 1) {
            LMSsort(T, SA, C, B, n, k);
            name = LMSpostproc(T, SA, n, m);
        } else if (m === 1) {
            SA[b] = j + 1;
            name = 1;
        } else {
            name = 0;
        }

        /* stage 2: solve the reduced problem
           recurse if names are not yet unique */
        if(name < m) {
            if((flags & 4) !== 0) { C = null; B = null; }
            if((flags & 2) !== 0) { B = null; }
            newfs = (n + fs) - (m * 2);
            if((flags & (1 | 4 | 8)) === 0) {
                if((k + name) <= newfs) { newfs -= k; }
                else { flags |= 8; }
            }
            ASSERT( (n >>> 1) <= (newfs + m) );
            for (i = m + (n >>> 1) - 1, j = m * 2 + newfs - 1; m <= i; i--) {
                if(SA[i] !== 0) { SA[j--] = SA[i] - 1; }
            }
            RA = SA.subarray(m + newfs);
            SA_IS(RA, SA, newfs, m, name, false);
            RA = null;

            i = n - 1; j = m * 2 - 1; c0 = T[n - 1];
            do { c1 = c0; } while ((--i >= 0) && ((c0 = T[i]) >= c1));
            for (; i >= 0 ;) {
                do { c1 = c0; } while ((--i >= 0) && ((c0 = T[i]) <= c1));
                if ( i >= 0 ) {
                    SA[j--] = i + 1;
                    do { c1 = c0; } while ((--i >= 0) && ((c0 = T[i]) >= c1));
                }
            }

            for (i = 0; i < m; i++) { SA[i] = SA[m + SA[i]]; }
            if((flags & 4) !== 0) { C = B = Util.makeS32Buffer(k); }
            if((flags & 2) !== 0) { B = Util.makeS32Buffer(k); }
        }

        /* stage 3: induce the result for the original problem */
        if((flags & 8) !== 0) { getCounts(T, C, n, k); }
        /* put all left-most S characters into their buckets */
        if (m > 1) {
            getBuckets(C, B, k, true); /* find ends of buckets */
            i = m - 1; j = n; p = SA[m - 1]; c1 = T[p];
            do {
                q = B[c0 = c1];
                while (q < j) { SA[--j] = 0; }
                do {
                    SA[--j] = p;
                    if(--i < 0) { break; }
                    p = SA[i];
                } while((c1 = T[p]) === c0);
            } while (i >= 0 );
            while ( j > 0 ) { SA[--j] = 0; }
        }
        if (!isbwt) { induceSA(T, SA, C, B, n, k); }
        else { pidx = computeBWT(T, SA, C, B, n, k); }
        C = null; B = null;
        return pidx;
    };

    var BWT = Object.create(null);
    /** SA should be a Int32Array (signed!); T can be any typed array.
     *  alphabetSize is optional if T is an Uint8Array or Uint16Array. */
    BWT.suffixsort = function(T, SA, n, alphabetSize) {
        ASSERT( T && SA && T.length >= n && SA.length >= n );
        if (n <= 1) {
            if (n === 1) { SA[0] = 0; }
            return 0;
        }
        if (!alphabetSize) {
            if (T.BYTES_PER_ELEMENT === 1) { alphabetSize = 256; }
            else if (T.BYTES_PER_ELEMENT === 2) { alphabetSize = 65536; }
            else throw new Error('Need to specify alphabetSize');
        }
        ASSERT( alphabetSize > 0 );
        if (T.BYTES_PER_ELEMENT) {
            ASSERT( alphabetSize <= (1 << (T.BYTES_PER_ELEMENT*8) ) );
        }
        return SA_IS(T, SA, 0, n, alphabetSize, false);
    };
    /** Burrows-Wheeler Transform.
        A should be Int32Array (signed!); T can be any typed array.
        U is the same type as T (it is used for output).
        alphabetSize is optional if T is an Uint8Array or Uint16Array.
        ASSUMES STRING IS TERMINATED WITH AN EOF CHARACTER.
    */
    BWT.bwtransform = function(T, U, A, n, alphabetSize) {
        var i, pidx;
        ASSERT( T && U && A );
        ASSERT( T.length >= n && U.length >= n && A.length >= n );
        if (n <= 1) {
            if (n === 1) { U[0] = T[0]; }
            return n;
        }
        if (!alphabetSize) {
            if (T.BYTES_PER_ELEMENT === 1) { alphabetSize = 256; }
            else if (T.BYTES_PER_ELEMENT === 2) { alphabetSize = 65536; }
            else throw new Error('Need to specify alphabetSize');
        }
        ASSERT( alphabetSize > 0 );
        if (T.BYTES_PER_ELEMENT) {
            ASSERT( alphabetSize <= (1 << (T.BYTES_PER_ELEMENT*8) ) );
        }
        pidx = SA_IS(T, A, 0, n, alphabetSize, true);
        U[0] = T[n - 1];
        for (i = 0; i < pidx ; i++) { U[i + 1] = A[i]; }
        for (i += 1; i < n; i++) { U[i] = A[i]; }
        return pidx + 1;
    };
    /** Reverses transform above. (ASSUMED STRING IS TERMINATED WITH EOF.) */
    BWT.unbwtransform = function(T, U, LF, n, pidx) {
        var C = Util.makeU32Buffer(256);
        var i, t;
        for (i=0; i<256; i++) { C[i] = 0; }
        for (i=0; i<n; i++) { LF[i] = C[T[i]]++; }
        for (i=0, t=0; i<256; i++) { t += C[i]; C[i] = t - C[i]; }
        for (i=n-1, t=0; i>=0; i--) {
            t = LF[t] + C[U[i]=T[t]];
            t += (t<pidx) ? 1 : 0;
        }
        C = null;
    };

    /** Burrows-Wheeler Transform.
        A should be Int32Array (signed!); T can be any typed array.
        U is the same type as T (it is used for output).
        alphabetSize is optional if T is an Uint8Array or Uint16Array.
        ASSUMES STRING IS CYCLIC.
        (XXX: this is twice as inefficient as I'd like! [CSA])
    */
    BWT.bwtransform2 = function(T, U, n, alphabetSize) {
        var i, j, pidx = 0;
        ASSERT( T && U );
        ASSERT( T.length >= n && U.length >= n );
        if (n <= 1) {
            if (n === 1) { U[0] = T[0]; }
            return 0;
        }
        if (!alphabetSize) {
            if (T.BYTES_PER_ELEMENT === 1) { alphabetSize = 256; }
            else if (T.BYTES_PER_ELEMENT === 2) { alphabetSize = 65536; }
            else throw new Error('Need to specify alphabetSize');
        }
        ASSERT( alphabetSize > 0 );
        if (T.BYTES_PER_ELEMENT) {
            ASSERT( alphabetSize <= (1 << (T.BYTES_PER_ELEMENT*8) ) );
        }
        // double length of T
        var TT;
        if (T.length >= n*2) {
            TT = T; // do it in place if possible
        } else if (alphabetSize <= 256) {
            TT = Util.makeU8Buffer(n*2);
        } else if (alphabetSize <= 65536) {
            TT = Util.makeU16Buffer(n*2);
        } else {
            TT = Util.makeU32Buffer(n*2);
        }
        if (TT!==T) {
            for (i=0; i<n; i++) { TT[i] = T[i]; }
        }
        for (i=0; i<n; i++) { TT[n+i] = TT[i]; }
        // sort doubled string
        var A = Util.makeS32Buffer(n*2);
        SA_IS(TT, A, 0, n*2, alphabetSize, false);
        for (i=0, j=0; i<2*n; i++) {
            var s = A[i];
            if (s < n) {
                if (s === 0) { pidx = j; }
                if (--s < 0) { s = n-1; }
                U[j++] = T[s];
            }
        }
        ASSERT(j===n);
        return pidx;
    };

    return freeze(BWT);
});
