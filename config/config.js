var server = require('./server.config');
var provider = require('./provider.config');

var config = Object.assign(server, provider);
module.exports = config;