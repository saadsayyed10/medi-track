// backend/src/types/rate-limit.type.ts

import { Request } from "express";

// Used in backend/src/middleware/rate-limit.middleware.ts
export type RateLimitType = {
  windowMs: number;
  max: number;
  message: string;
  keyGenerator?: (req: Request) => string;
};
