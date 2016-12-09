/**
 * Created by dominic on 21/11/16.
 * A Class of Pure Functions 
 */
'use strict';
class _default {

    /**
     * Default Equal cB fucntion
     * @param a
     * @param b
     * @returns {boolean}
     */
    equals(a, b, _prop) {
        if (!_prop)
            return a == b;
        else if (a.hasOwnProperty(_prop) && b.hasOwnProperty(_prop)) {
            return a[_prop] == b[_prop];
        }
        else
            return false;
    }

    compare(a, b, _prop) {
        if (!_prop)
            return a < b;
        else if (a.hasOwnProperty(_prop) && b.hasOwnProperty(_prop)) {
            return a[_prop] < b[_prop];
        }
        else
            return false;
    }

    lessThanEquals(a, b, _prop) {
        if (!_prop)
            return a <= b;
        else if (a.hasOwnProperty(_prop) && b.hasOwnProperty(_prop)) {
            return a[_prop] <= b[_prop];
        }
        else
            return false;
    }

    greaterThanEquals(a, b, _prop) {
        if (!_prop)
            return a >= b;
        else if (a.hasOwnProperty(_prop) && b.hasOwnProperty(_prop)) {
            return a[_prop] >= b[_prop];
        }
        else
            return false;
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length <= 0;
    }

    isFunction(func) {
        return (typeof func) === 'function';
    }

    isUndefined(obj) {
        return obj === undefined;
    }

    isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }

    return(value) {
        value.__proto__ = this.__proto__;
        return value;
    }


}

module.exports = _default;
