const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
});

const securityMiddleware = [
    helmet(),
    xss(),
    mongoSanitize()
];

module.exports = { securityMiddleware, csrfProtection };