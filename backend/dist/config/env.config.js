"use strict";
// backend/src/config/env.config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv/config");
exports.ENV = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "sameoldtreva",
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    CLOUDINARY_CLOUD: process.env.CLOUDINARY_CLOUD,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    AI_URL: process.env.AI_URL,
};
