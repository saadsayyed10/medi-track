// backend/src/middleware/auth.middleware.ts

// Import libraries and instances to protect API endpoints
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env.config";
import prisma from "../lib/prisma.orm";

interface Decoded extends JwtPayload {
  userId: string;
}

export const protectAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.header("Authorization");

    // Throw error if headers are invalid or missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ENV.JWT_SECRET!) as Decoded;

    const user = await prisma.patient.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    // Throw error if token is not provided
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: token not provided" });
    }

    // Throw error if user is not tagged with token
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};
