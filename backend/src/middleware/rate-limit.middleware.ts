// backend/src/middleware/rate-limit.middleware.ts

// Import helper function
import { rateLimiter } from "../lib/rate-limit";

export const resetPasswordEmailLimiter = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2, // 2 times
  message:
    "You can only send 2 request per hour to reset password, try again after an hour",
});
