"use strict";
module.exports = exports = function(src) {
  return function(){
    const cb = arguments[arguments.length-1];
    const dataProc = function(data){
      cb(null, data);
    };
    const errProc = function(err) {
      cb(err, null);
    };
    var evalString = "src(";
    for (var index = 0; index < arguments.length - 1; index++) {
      evalString = evalString + ("arguments[" + index + "], ") ;
    }
    evalString = evalString + "dataProc, errProc);";
    return eval(evalString);
  };
};
