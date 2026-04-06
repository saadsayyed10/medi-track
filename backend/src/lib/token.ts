// backend/src/lib/token.ts

import jwt from "jsonwebtoken";
// import { type GenerateTokenType } from "../types/user.type";
import { ENV } from "../config/env.config";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, ENV.JWT_SECRET!, { expiresIn: "7d" });
};
