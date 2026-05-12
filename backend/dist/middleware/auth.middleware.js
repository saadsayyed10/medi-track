"use strict";
// backend/src/middleware/auth.middleware.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectAuth = void 0;
// Import libraries and instances to protect API endpoints
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const prisma_orm_1 = __importDefault(require("../lib/prisma.orm"));
const protectAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header("Authorization");
        // Throw error if headers are invalid or missing
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.ENV.JWT_SECRET);
        const user = yield prisma_orm_1.default.patients.findUnique({
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
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
});
exports.protectAuth = protectAuth;
