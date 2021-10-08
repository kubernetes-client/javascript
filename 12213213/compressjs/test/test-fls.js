/* quick test for Util.fls(), since I added a new "fast" implementation. */
var assert = require("assert");
var Util = require('../lib/Util');

var slowFLS = function(n) {
    var bits = 0;
    while (n >>> bits) {
        bits++;
        console.assert(bits < 32);
    }
    return bits;
};

describe('find last (bit) set test', function() {
    it('should match its documentation', function() {
        assert.equal(Util.fls(0), 0);
        assert.equal(Util.fls(1), 1);
        assert.equal(Util.fls(2), 2);
        assert.equal(Util.fls(3), 2);
        assert.equal(Util.fls(4), 3);
    });
    it('should be consistent with slow FLS implementation', function() {
        var i;
        for (i=0; i<258; i++) {
            assert.equal(Util.fls(i), slowFLS(i), i);
        }
        for (i=1; i < 31; i++) {
            var n = (1 << i);
            assert.equal(Util.fls(n-2), slowFLS(n-2), n-2);
            assert.equal(Util.fls(n-1), slowFLS(n-1), n-1);
            assert.equal(Util.fls(n  ), slowFLS(n  ), n  );
            assert.equal(Util.fls(n+1), slowFLS(n+1), n+1);
            assert.equal(Util.fls(n+2), slowFLS(n+2), n+2);
        }
    });
    it('should work even with numbers greater than 0x7FFFFFFF', function() {
        assert.equal(Util.fls(      0x7FFFFFFF), 31);
        assert.equal(Util.fls(      0xFFFFFFFF), 32);
        assert.equal(Util.fls(     0x1FFFFFFFF), 33);
        assert.equal(Util.fls(     0xFFFFFFFFF), 36);
        assert.equal(Util.fls(    0xFFFFFFFFFF), 40);
        assert.equal(Util.fls(   0xFFFFFFFFFFF), 44);
        assert.equal(Util.fls(  0xFFFFFFFFFFFF), 48);
        assert.equal(Util.fls( 0xFFFFFFFFFFFFF), 52);
        assert.equal(Util.fls(0x1FFFFFFFFFFFFF), 53);
        assert.equal(Util.fls(0x20000000000000), 54); // int max for javascript
    });
});
