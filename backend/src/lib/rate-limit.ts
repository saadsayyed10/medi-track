// backend/src/middleware/rate-limit.middleware.ts

import rateLimit from "express-rate-limit";
import { RateLimitType } from "../types/rate-limit.type";

export const rateLimiter = (option: RateLimitType) => {
  const limiter = rateLimit({
    windowMs: option.windowMs,
    max: option.max,
    message: option.message,
  });

  return limiter;
};
