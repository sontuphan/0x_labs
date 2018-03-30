var ZeroX = global.ZeroX;
var zeroex = global.zeroex;
var utils = require('./../libs/utils');

var ModelOrder = require('./../model/order');

var Account = {

    /**
     * Get the account list
     * @func getAccountList
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    getAccountList: function (req, res, next) {
        zeroex.getAvailableAddressesAsync().then(function (re) {
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log(er)
            return res.send({ state: 'error', data: er });
        });
    },

    /**
     * Get balance (The number of token)
     * @func getBalance
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    getBalance: function (req, res, next) {
        var contract = req.body.contract;
        var owner = req.body.owner;

        contract = utils.lowerCase(contract);
        owner = utils.lowerCase(owner);

        if (!contract || !owner) {
            return res.send({ state: 'error', error: 'Lack of inputs' });
        }

        zeroex.token.getBalanceAsync(contract, owner).then(function (re) {
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log(er)
            return res.send({ state: 'error', data: er });
        });
    },

    /**
     * Set allowance
     * @func setAllowance
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    setAllowance: function (req, res, next) {
        var contract = req.body.contract;
        var owner = req.body.owner;
        var amount = req.body.amount;

        contract = utils.lowerCase(contract);
        owner = utils.lowerCase(owner);
        amount = utils.bigNumber(amount);

        if (!contract || !owner || !amount) {
            return res.send({ state: 'error', error: 'Lack of inputs' });
        }

        zeroex.token.setProxyAllowanceAsync(contract, owner, amount).then(function (re) {
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log(er)
            return res.send({ state: 'error', data: er });
        });
    },

    /**
     * Get allowance
     * @func getAllowance
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    getAllowance: function (req, res, next) {
        var contract = req.body.contract;
        var owner = req.body.owner;

        contract = utils.lowerCase(contract);
        owner = utils.lowerCase(owner);

        if (!contract || !owner) {
            return res.send({ state: 'error', error: 'Lack of inputs' });
        }

        zeroex.token.getProxyAllowanceAsync(contract, owner).then(function (re) {
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log(er)
            return res.send({ state: 'error', data: er });
        });
    },

    /**
     * Fill order
     * @func fillOrder
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    fillOrder: function (req, res, next) {
        var order = req.body.order;
        var taker = req.body.taker;
        var amount = req.body.amount;

        order = utils.JSONparse(order);
        taker = utils.lowerCase(taker);
        amount = utils.bigNumber(amount);

        if (!order || !taker || !amount) {
            return res.send({ state: 'error', error: 'Lack of inputs' });
        }

        var signedOrder = new ModelOrder(order);
        zeroex.exchange.fillOrderAsync(signedOrder, amount, true, taker).then(function (re) {
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log(er)
            return res.send({ state: 'error', data: er });
        });
    },
}

module.exports = Account;