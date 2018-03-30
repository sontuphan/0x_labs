var express = require('express');
var cors = require('cors');

var Web3 = require('web3');
var bodyParser = require('body-parser');
var ZeroX = require('0x.js');


var env = process.env.NODE_ENV;
var config = require('./config/config');

/**
 * Constructors
 */
var app = express();
var provider = new Web3.providers.HttpProvider(config.provider.url);
var zeroex = new ZeroX.ZeroEx(provider);

/**
 * Middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Global variables
 */
global.env = env;
global.config = config;
global.ZeroX = ZeroX;
global.zeroex = zeroex;

/**
 * Routers
 */
var router = require('./routers/router');
app.use('/', router);

/**
 * Initializing server
 */
app.listen(config.server.port, function () {
    console.log('Server is listening on port', config.server.port);
});