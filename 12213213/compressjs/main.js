if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./lib/freeze','./lib/BitStream','./lib/Stream','./lib/BWT','./lib/Context1Model','./lib/DefSumModel','./lib/FenwickModel','./lib/MTFModel','./lib/NoModel','./lib/Huffman','./lib/RangeCoder','./lib/BWTC','./lib/Bzip2','./lib/Dmc','./lib/Lzjb','./lib/LzjbR','./lib/Lzp3','./lib/PPM','./lib/Simple'], function(freeze,BitStream,Stream,BWT,Context1Model,DefSumModel,FenwickModel,MTFModel,NoModel,Huffman,RangeCoder,BWTC,Bzip2,Dmc,Lzjb,LzjbR,Lzp3,PPM,Simple) {
    'use strict';
    return freeze({
        version: "0.0.1",
        // APIs
        BitStream: BitStream,
        Stream: Stream,
        // transforms
        BWT: BWT,
        // models and coder
        Context1Model: Context1Model,
        DefSumModel: DefSumModel,
        FenwickModel: FenwickModel,
        MTFModel: MTFModel,
        NoModel: NoModel,
        Huffman: Huffman,
        RangeCoder: RangeCoder,
        // compression methods
        BWTC: BWTC,
        Bzip2: Bzip2,
        Dmc: Dmc,
        Lzjb: Lzjb,
        LzjbR: LzjbR,
        Lzp3: Lzp3,
        PPM: PPM,
        Simple: Simple
    });
});
