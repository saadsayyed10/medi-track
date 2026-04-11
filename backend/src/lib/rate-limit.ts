// backend/src/middleware/rate-limit.middleware.ts

// Import library
import rateLimit from "express-rate-limit";

// Import type safety
import { type RateLimitType } from "../types/rate-limit.type";

export const rateLimiter = (option: RateLimitType) => {
  const limiter = rateLimit({
    windowMs: option.windowMs, // Time to cap a limit
    max: option.max, // Number of times to hit an API
    message: option.message, // Message to show after limits are exceeded
    keyGenerator: option.keyGenerator, // Rate limit per email
  });

  return limiter;
};
