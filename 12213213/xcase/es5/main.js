'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function (algorithms) {
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

  var iface = {
    camelize: function camelize(str, separator) {
      return algorithms.camelize(str, separator && separator.charCodeAt(0) || 0x5f /* _ */);
    },
    decamelize: function decamelize(str, separator) {
      return algorithms.decamelize(str, separator && separator.charCodeAt(0) || 0x5f /* _ */);
    },
    pascalize: function pascalize(str, separator) {
      return algorithms.pascalize(str, separator && separator.charCodeAt(0) || 0x5f /* _ */);
    },
    depascalize: function depascalize(str, separator) {
      return algorithms.depascalize(str, separator && separator.charCodeAt(0) || 0x5f /* _ */);
    },
    camelizeKeys: function camelizeKeys(obj, opts) {
      opts = opts || {};
      if (!shouldProcessValue(obj)) return obj;
      if (opts.inPlace) return processKeysInPlace(obj, iface.camelize, opts);
      return processKeys(obj, iface.camelize, opts);
    },
    decamelizeKeys: function decamelizeKeys(obj, opts) {
      opts = opts || {};
      if (!shouldProcessValue(obj)) return obj;
      if (opts.inPlace) return processKeysInPlace(obj, iface.decamelize, opts);
      return processKeys(obj, iface.decamelize, opts);
    },
    pascalizeKeys: function pascalizeKeys(obj, opts) {
      opts = opts || {};
      if (!shouldProcessValue(obj)) return obj;
      if (opts.inPlace) return processKeysInPlace(obj, iface.pascalize, opts);
      return processKeys(obj, iface.pascalize, opts);
    },
    depascalizeKeys: function depascalizeKeys(obj, opts) {
      opts = opts || {};
      if (!shouldProcessValue(obj)) return obj;
      if (opts.inPlace) return processKeysInPlace(obj, iface.depascalize, opts);
      return processKeys(obj, iface.depascalize, opts);
    }
  };
  return iface;
};