"use strict";
// backend/src/middleware/rate-limit.middleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
// Import library
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rateLimiter = (option) => {
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: option.windowMs, // Time to cap a limit
        max: option.max, // Number of times to hit an API
        message: option.message, // Message to show after limits are exceeded
    });
    return limiter;
};
exports.rateLimiter = rateLimiter;
