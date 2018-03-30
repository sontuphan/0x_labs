var env = process.env.NODE_ENV;

/**
 * Development configuration
 */
var development = {
    url: 'http://localhost:8545'
}

/**
 * Production configuration
 */
var production = {
    url: 'http://localhost:8545'
}

/**
 * Export module
 */
var config = {
    development: development,
    production: production
};
module.exports = { provider: config[env] };