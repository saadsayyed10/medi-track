"use strict";
// backend/src/middleware/rate-limit.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordEmailLimiter = void 0;
// Import helper function
const rate_limit_1 = require("../lib/rate-limit");
exports.resetPasswordEmailLimiter = (0, rate_limit_1.rateLimiter)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 2, // 2 times
    message: "You can only send 2 request per hour to reset password, try again after an hour",
});
