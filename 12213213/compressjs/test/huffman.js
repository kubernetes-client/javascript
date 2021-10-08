/* Test of huffman allocator, borrowed from jbzip2. */
var assert = require("assert");
var HuffmanAllocator = require("../lib/HuffmanAllocator");

/**
 * Fibonacci sequence
 */
var fibonacci = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987,
    1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393,
    196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887,
    9227465, 14930352
];

describe("HuffmanAllocator tests", function() {
    it("should work with a 1-element frequency table", function() {
        var expectedLengths = [ 1 ];
        var frequencies = [ 1 ];
        HuffmanAllocator.allocateHuffmanCodeLengths (frequencies, 32);
        assert.deepEqual(expectedLengths, frequencies);
    });
    it("should work with a 2-element frequency table", function() {
        var expectedLengths = [ 1, 1 ];
        var frequencies = [ 1, 1 ];
        HuffmanAllocator.allocateHuffmanCodeLengths (frequencies, 32);
        assert.deepEqual(expectedLengths, frequencies);
    });
    it("should handle a mix of output lengths", function() {
        var expectedLengths = [ 3, 3, 2, 2, 2 ];
        var frequencies =     [ 1, 1, 1, 1, 1 ];
        HuffmanAllocator.allocateHuffmanCodeLengths (frequencies, 32);
        assert.deepEqual(expectedLengths, frequencies);
    });
    it("should handle boundary conditions w/ 3-bit limit", function() {
        var expectedLengths = [ 3, 3, 3, 3, 2, 2 ];
        var frequencies =     [ 0, 0, 1, 1, 1, 1 ];
        HuffmanAllocator.allocateHuffmanCodeLengths (frequencies, 3);
        assert.deepEqual(expectedLengths, frequencies);
    });
    it("should handle 36-element fibonacci frequency sequence", function() {
        var expectedLengths = [
            20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
            20, 20, 20, 19, 19, 18, 17, 16, 16, 14, 13, 12, 11,
            10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        ];
        var frequencies = fibonacci.slice(0, 36);
        HuffmanAllocator.allocateHuffmanCodeLengths (frequencies, 20);
        assert.deepEqual(expectedLengths, frequencies);
    });
    it("should handle 22-element fibonacci frequency sequence", function() {
        var expectedLengths = [
            20, 20, 19, 19, 19, 17, 16, 15, 14, 13, 12, 11, 10,
            9, 8, 7, 6, 5, 4, 3, 2, 1
        ];
        var frequencies = fibonacci.slice(0, 22);
        HuffmanAllocator.allocateHuffmanCodeLengths (frequencies, 20);
        assert.deepEqual(expectedLengths, frequencies);
    });
    it("should handle 21-element fibonacci frequency sequence", function() {
        var expectedLengths = [
            20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9,
            8, 7, 6, 5, 4, 3, 2, 1
        ];
        var frequencies = fibonacci.slice(0, 21);
        HuffmanAllocator.allocateHuffmanCodeLengths (frequencies, 20);
        assert.deepEqual(expectedLengths, frequencies);
    });
    it("should handle 36-element fibonacci frequency sequence w/ 6-bit limit", function() {
        var expectedLengths = [
            6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
            6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 4, 3, 2
        ];
        var frequencies = fibonacci.slice(0, 36);
        HuffmanAllocator.allocateHuffmanCodeLengths (frequencies, 6);
        assert.deepEqual(expectedLengths, frequencies);
    });
});
