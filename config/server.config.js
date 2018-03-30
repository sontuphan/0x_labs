var env = process.env.NODE_ENV;

/**
 * Development configuration
 */
var development = {
    domain: 'http://localhost:3000',
    ip: 'http://localhost',
    port: '3000'
}

/**
 * Production configuration
 */
var production = {
    domain: 'http://192.168.2.189:3000',
    ip: 'http://192.168.2.189',
    port: '3000'
}

/**
 * Export module
 */
var config = {
    development: development,
    production: production
};
module.exports = { server: config[env] };