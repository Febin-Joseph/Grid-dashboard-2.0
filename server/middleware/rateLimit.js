const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: { message: 'Too many login attempts, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
    validate: {
        xForwardedForHeader: false
    },
    keyGenerator: (req) => req.ip
});

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    message: { message: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
    validate: {
        xForwardedForHeader: false
    },
    keyGenerator: (req) => req.ip
});

module.exports = { authLimiter, apiLimiter };