import jwt from "jsonwebtoken";
import { type GenerateToken } from "../types/user.type";
import { ENV } from "../config/env.config";

export const generateToken = (userId: GenerateToken) => {
  return jwt.sign({ userId }, ENV.JWT_SECRET!, { expiresIn: "7d" });
};
