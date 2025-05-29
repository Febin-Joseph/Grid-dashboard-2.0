const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const securityMiddleware = [
    helmet(),
    xss(),
    mongoSanitize()
];

module.exports = { securityMiddleware };