// import middleware here
const validateNewUser = require('./authCheck');
const loginLogger = require('./loginLogger');

module.exports = {
    validateNewUser : validateNewUser,
    loginLogger : loginLogger
}