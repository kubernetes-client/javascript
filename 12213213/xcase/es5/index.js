'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function isLower(char) {
  return char >= 0x61 /* 'a' */ && char <= 0x7a /* 'z' */;
}

function isUpper(char) {
  return char >= 0x41 /* 'A' */ && char <= 0x5a /* 'Z' */;
}

function isDigit(char) {
  return char >= 0x30 /* '0' */ && char <= 0x39 /* '9' */;
}

function toUpper(char) {
  return char - 0x20;
}

function toUpperSafe(char) {
  if (isLower(char)) {
    return char - 0x20;
  }
  return char;
}

function toLower(char) {
  return char + 0x20;
}

function camelize$1(str, separator) {
  var firstChar = str.charCodeAt(0);
  if (isDigit(firstChar) || isUpper(firstChar) || firstChar == separator) {
    return str;
  }
  var out = [];
  var changed = false;
  if (isUpper(firstChar)) {
    changed = true;
    out.push(toLower(firstChar));
  } else {
    out.push(firstChar);
  }

  var length = str.length;
  for (var i = 1; i < length; ++i) {
    var c = str.charCodeAt(i);
    if (c === separator) {
      changed = true;
      c = str.charCodeAt(++i);
      if (isNaN(c)) {
        return str;
      }
      out.push(toUpperSafe(c));
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
}

function decamelize$1(str, separator) {
  var firstChar = str.charCodeAt(0);
  if (!isLower(firstChar)) {
    return str;
  }
  var length = str.length;
  var changed = false;
  var out = [];
  for (var i = 0; i < length; ++i) {
    var c = str.charCodeAt(i);
    if (isUpper(c)) {
      out.push(separator);
      out.push(toLower(c));
      changed = true;
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
}

function pascalize$1(str, separator) {
  var firstChar = str.charCodeAt(0);
  if (isDigit(firstChar) || firstChar == separator) {
    return str;
  }
  var length = str.length;
  var changed = false;
  var out = [];
  for (var i = 0; i < length; ++i) {
    var c = str.charCodeAt(i);
    if (c === separator) {
      changed = true;
      c = str.charCodeAt(++i);
      if (isNaN(c)) {
        return str;
      }
      out.push(toUpperSafe(c));
    } else if (i === 0 && isLower(c)) {
      changed = true;
      out.push(toUpper(c));
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
}

function depascalize$1(str, separator) {
  var firstChar = str.charCodeAt(0);
  if (!isUpper(firstChar)) {
    return str;
  }
  var length = str.length;
  var changed = false;
  var out = [];
  for (var i = 0; i < length; ++i) {
    var c = str.charCodeAt(i);
    if (isUpper(c)) {
      if (i > 0) {
        out.push(separator);
      }
      out.push(toLower(c));
      changed = true;
    } else {
      out.push(c);
    }
  }
  return changed ? String.fromCharCode.apply(undefined, out) : str;
}

function shouldProcessValue(value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && !(value instanceof Date) && !(value instanceof Function);
}

function processKeys(obj, fun, opts) {
  var obj2 = void 0;
  if (obj instanceof Array) {
    obj2 = [];
  } else {
    if (typeof obj.prototype !== 'undefined') {
      // return non-plain object unchanged
      return obj;
    }
    obj2 = {};
  }
  for (var key in obj) {
    var value = obj[key];
    if (typeof key === 'string') key = fun(key, opts && opts.separator);
    if (shouldProcessValue(value)) {
      obj2[key] = processKeys(value, fun, opts);
    } else {
      obj2[key] = value;
    }
  }
  return obj2;
}

function processKeysInPlace(obj, fun, opts) {
  var keys = Object.keys(obj);
  for (var idx = 0; idx < keys.length; ++idx) {
    var key = keys[idx];
    var value = obj[key];
    var newKey = fun(key, opts && opts.separator);
    if (newKey !== key) {
      delete obj[key];
    }
    if (shouldProcessValue(value)) {
      obj[newKey] = processKeys(value, fun, opts);
    } else {
      obj[newKey] = value;
    }
  }
  return obj;
}

function camelize$$1(str, separator) {
  return camelize$1(str, separator && separator.charCodeAt(0) || 0x5f /* _ */);
}

function decamelize$$1(str, separator) {
  return decamelize$1(str, separator && separator.charCodeAt(0) || 0x5f /* _ */);
}

function pascalize$$1(str, separator) {
  return pascalize$1(str, separator && separator.charCodeAt(0) || 0x5f /* _ */);
}

function depascalize$$1(str, separator) {
  return depascalize$1(str, separator && separator.charCodeAt(0) || 0x5f /* _ */);
}

function camelizeKeys(obj, opts) {
  opts = opts || {};
  if (!shouldProcessValue(obj)) return obj;
  if (opts.inPlace) return processKeysInPlace(obj, camelize$$1, opts);
  return processKeys(obj, camelize$$1, opts);
}

function decamelizeKeys(obj, opts) {
  opts = opts || {};
  if (!shouldProcessValue(obj)) return obj;
  if (opts.inPlace) return processKeysInPlace(obj, decamelize$$1, opts);
  return processKeys(obj, decamelize$$1, opts);
}

function pascalizeKeys(obj, opts) {
  opts = opts || {};
  if (!shouldProcessValue(obj)) return obj;
  if (opts.inPlace) return processKeysInPlace(obj, pascalize$$1, opts);
  return processKeys(obj, pascalize$$1, opts);
}

function depascalizeKeys(obj, opts) {
  opts = opts || {};
  if (!shouldProcessValue(obj)) return obj;
  if (opts.inPlace) return processKeysInPlace(obj, depascalize$$1, opts);
  return processKeys(obj, depascalize$$1, opts);
}

exports.camelize = camelize$$1;
exports.decamelize = decamelize$$1;
exports.pascalize = pascalize$$1;
exports.depascalize = depascalize$$1;
exports.camelizeKeys = camelizeKeys;
exports.decamelizeKeys = decamelizeKeys;
exports.pascalizeKeys = pascalizeKeys;
exports.depascalizeKeys = depascalizeKeys;
