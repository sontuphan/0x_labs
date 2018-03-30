var ZeroX = global.ZeroX;
var zeroex = global.zeroex;

var constants = require('./../libs/constants');
var errors = require('./../libs/errors');
var utils = require('./../libs/utils');

var Order = function (order) {
    this.ecSignature = order.ecSignature || null;
    this.exchangeContractAddress = '0xb69e673309512a9d726f87304c6984054f87a93b';
    this.expirationUnixTimestampSec = utils.bigNumber(order.expirationUnixTimestampSec) || utils.bigNumber(Math.floor(Number(new Date()) / 1000) + 24 * 60 * 60);
    this.feeRecipient = utils.lowerCase(order.feeRecipient) || constants.NULL_ADDRESS;
    this.maker = utils.lowerCase(order.maker) || constants.NULL_ADDRESS;
    this.makerFee = utils.bigNumber(0);
    this.makerTokenAddress = utils.lowerCase(order.makerTokenAddress) || utils.lowerCase(order.maker) || constants.NULL_ADDRESS;
    this.makerTokenAmount = utils.bigNumber(order.makerTokenAmount);
    this.salt = utils.bigNumber(order.salt);
    this.taker = utils.lowerCase(order.taker) || constants.NULL_ADDRESS;
    this.takerFee = utils.bigNumber(0);
    this.takerTokenAddress = utils.lowerCase(order.takerTokenAddress) || utils.lowerCase(order.maker) || constants.NULL_ADDRESS;
    this.takerTokenAmount = utils.bigNumber(order.takerTokenAmount);
}

Order.prototype.setMaker = function (maker) {
    if (!maker) return null;
    maker = utils.lowerCase(maker);
    if (!maker) return errors.invalidAddress();
    this.maker = maker;
}

Order.prototype.setTaker = function (taker) {
    if (!taker) return null;
    taker = utils.lowerCase(taker);
    if (!taker) return errors.invalidAddress();
    this.taker = taker;
}

Order.prototype.setMakerTokenAddress = function (address) {
    if (!address) return null;
    address = utils.lowerCase(address);
    if (!address) return errors.invalidAddress();
    this.makerTokenAddress = address;
}

Order.prototype.setTakerTokenAddress = function (address) {
    if (!address) return null;
    address = utils.lowerCase(address);
    if (!address) return errors.invalidAddress();
    this.takerTokenAddress = address;
}

Order.prototype.setMakerTokenAmount = function (amount) {
    if (!amount) return null;
    amount = utils.bigNumber(amount);
    if (!amount) return errors.invalidNumber();
    this.makerTokenAmount = amount;
}

Order.prototype.setTakerTokenAmount = function (amount) {
    if (!amount) return null;
    amount = utils.bigNumber(amount);
    if (!amount) return errors.invalidNumber();
    this.takerTokenAmount = amount;
}

Order.prototype.setSalt = function (salt) {
    if (!salt) return null;
    salt = utils.bigNumber(salt);
    if (!salt) return errors.invalidNumber();
    this.salt = salt;
}

Order.prototype.setECSignature = function () {
    var order = this;
    return new Promise((resolve, reject) => {
        var orderHash = ZeroX.ZeroEx.getOrderHashHex(order);
        zeroex.signOrderHashAsync(orderHash, order.maker).then(function (re) {
            order.ecSignature = re;
            return resolve(re);
        }).catch(function (er) {
            return reject(er);
        });
    });
}

module.exports = Order;