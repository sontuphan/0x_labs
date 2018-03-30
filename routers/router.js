var express = require('express');
var router = express.Router();

var supporter = require('./../controllers/supporter.controller');
var account = require('./../controllers/account.controller');
var tx = require('./../controllers/tx.controller');
var events = require('./../controllers/events.controller');


/**
 * GET API
 */

router.get('/get-account-list', account.getAccountList);
router.get('/get-salt', supporter.getSalt);
router.get('/create-order', tx.createSampleOrder);
router.get('/get-logs', events.getLogs);


/**
 * POST API
 */

router.post('/get-order-hash', tx.getOrderHash);
router.post('/sign-order-hash', tx.signOrderHash);
router.post('/validate-signature', tx.validateSignature);
router.post('/get-balance', account.getBalance);
router.post('/set-allowance', account.setAllowance);
router.post('/get-allowance', account.getAllowance);
router.post('/fill-order', account.fillOrder);


module.exports = router;