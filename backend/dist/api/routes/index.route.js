"use strict";
// backend/src/api/routes/index.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import library
const express_1 = require("express");
// Import routes from files
const user_route_1 = __importDefault(require("./user.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
const chat_route_1 = __importDefault(require("./chat.route"));
const mainRouter = (0, express_1.Router)();
// Route: /api/users
mainRouter.use("/users", user_route_1.default);
// Route: /api/upload
mainRouter.use("/upload", upload_route_1.default);
// Route: /api/chat
mainRouter.use("/chat", chat_route_1.default);
exports.default = mainRouter;
