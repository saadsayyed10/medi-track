// backend/src/config/env.config.ts

import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || "sameoldtreva",
};
