var ZeroX = global.ZeroX;
var zeroex = global.zeroex;

var Events = {

    /**
     * Get all historical logs
     * @func getLogs
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    getLogs: function (req, res, next) {
        zeroex.exchange.getLogsAsync(
            'LogFill',
            { fromBlock: 'earliest', toBlock: 'latest' },
            { maker: '0x5409ed021d9299bf6814279a6a1411a7e866a631' }
        ).then(function (re) {
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log(er);
            return res.send({ state: 'error', error: er });
        });
    },
}

module.exports = Events;