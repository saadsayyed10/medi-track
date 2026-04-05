// backend/src/middleware/rate-limit.middleware.ts

import { rateLimiter } from "../lib/rate-limit";

export const resetPasswordEmailLimiter = rateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 2,
  message:
    "You can only send 2 request per hour to reset password, try again after an hour",
});
