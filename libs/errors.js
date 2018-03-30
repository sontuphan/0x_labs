const INVALID_ADDRESS = 'The address must be lowercase.'
const INVALID_NUMBER = 'Type of variable must be numerical.'
const CANNOT_SIGN = 'Cannot sign.'

Errors = function () { }

Errors.invalidAddress = function () {
    throw new Error(INVALID_ADDRESS);
}

Errors.invalidNumber = function () {
    throw new Error(INVALID_NUMBER);
}

Errors.cannotSign = function () {
    throw new Error(CANNOT_SIGN);
}

module.exports = Errors;