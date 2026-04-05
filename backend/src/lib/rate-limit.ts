// backend/src/middleware/rate-limit.middleware.ts

import rateLimit from "express-rate-limit";
import { RateLimitType } from "../types/rate-limit.type";

export const rateLimiter = (option: RateLimitType) => {
  const limiter = rateLimit({
    windowMs: option.windowMs, // Time to cap a limit
    max: option.max, // Number of times to hit an API
    message: option.message, // Message to show after limits are exceeded
  });

  return limiter;
};
