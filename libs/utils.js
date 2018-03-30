var BigNumber = require('bignumber.js');

var Utils = function () { }

Utils.lowerCase = function (s) {
    if (!s || typeof s !== 'string') return null;
    return s.toLowerCase();
}

Utils.bigNumber = function (n) {
    try {
        return new BigNumber(n);
    } catch (er) {
        return null;
    }
}

Utils.JSONparse = function (o) {
    try {
        var r = JSON.parse(o);
        return r;
    } catch (e) {
        console.log(e)
        return null;
    }
}

module.exports = Utils;