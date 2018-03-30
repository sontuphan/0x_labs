var ZeroX = global.ZeroX;
var zeroex = global.zeroex;

var errors = require('./../libs/errors');
var util = require('./../libs/utils');

var ModelOrder = require('./../model/order');


var Tx = {

    /**
     * Create a sample order
     * @func createSampleOrder
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    createSampleOrder: function (req, res, next) {
        var salt = ZeroX.ZeroEx.generatePseudoRandomSalt();

        var order = new ModelOrder({
            maker: '0x5409ed021d9299bf6814279a6a1411a7e866a631',
            makerTokenAddress: '0x25b8fe1de9daf8ba351890744ff28cf7dfa8f5e3',
            makerTokenAmount: 2,
            salt: salt,
            takerTokenAddress: '0x48bacb9266a570d521063ef5dd96e61686dbe788',
            takerTokenAmount: 2
        });

        order.setECSignature().then(function (re) {
            return res.send({ state: 'success', data: order });
        }).catch(function (er) {
            console.log(er);
            return res.send({ state: 'error', error: er });
        });
    },

    /**
     * Get order hash
     * @func getOrderHash
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    getOrderHash: function (req, res, next) {
        var order = req.body.order;

        order = util.JSONparse(order);

        if (!order) {
            return res.send({ state: 'error', error: 'Lack of inputs' });
        }

        var orderHash = ZeroX.ZeroEx.getOrderHashHex(order);
        return res.send({ state: 'success', data: re });
    },

    /**
     * Sign order hash
     * @func signOrderHash
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    signOrderHash: function (req, res, next) {
        var orderHash = req.body.orderHash;
        var owner = req.body.owner;

        orderHash = util.lowerCase(orderHash);
        owner = util.lowerCase(owner);

        if (!orderHash || !owner) {
            return res.send({ state: 'error', error: 'Lack of inputs' });
        }

        zeroex.signOrderHashAsync(orderHash, owner).then(function (re) {
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log(er)
            return res.send({ state: 'error', error: er });
        });
    },

    /**
     * Validate signature
     * @func validateSignature
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    validateSignature: function (req, res, next) {
        var data = req.body.data;
        var signature = req.body.signature;
        var address = req.body.address;

        if (!data || !signature || !address) {
            return res.send({ state: 'error', error: 'Lack of inputs' });
        }

        try {
            var re = ZeroX.ZeroEx.isValidSignature(data, JSON.parse(signature), address);
            return res.send({ state: 'success', data: re });
        } catch (er) {
            console.log(er)
            return res.send({ state: 'error', error: er });
        }
    },
}

module.exports = Tx;