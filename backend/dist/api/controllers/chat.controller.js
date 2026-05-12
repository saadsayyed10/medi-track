"use strict";
// backend/src/api/controllers/chat.controller.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllChatsForPatientController = exports.chatWithMedAIController = void 0;
// Import all chat services bundled in one instance
const chatServices = __importStar(require("../services/chat.service"));
const error_middleware_1 = require("../../middleware/error.middleware");
/*
Chat with MedAI controller
Method: POST
Header: Authorization
Endpoint: /api/chat
*/
const chatWithMedAIController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: you must be logged in to upload prescription");
            return res.status(401).json({
                error: "Unauthorized: you must be logged in to upload prescription",
            });
        }
        const userId = req.user.id;
        const { question } = req.body;
        // All fields are required
        const data = { userId, question };
        if (!data) {
            console.log("Please login and enter a question");
            return res.status(401).json({
                error: "Please login and enter a question",
            });
        }
        const chat = yield chatServices.chatWithMedAIService(data);
        res.status(201).json({ chat });
    }
    catch (error) {
        console.log("Is AppError:", error instanceof error_middleware_1.AppError);
        console.log("Error name:", error.constructor.name);
        console.log("Error message:", error.message);
        const status = error instanceof error_middleware_1.AppError ? error.statusCode : 500;
        const message = error instanceof error_middleware_1.AppError ? error.message : "Internal server error";
        return res.status(status).json({ error: message });
    }
});
exports.chatWithMedAIController = chatWithMedAIController;
/*
Fetch all chats per patient controller
Method: GET
Header: Authorization
Endpoint: /api/chat/all
*/
const fetchAllChatsForPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: you must be logged in to upload prescription");
            return res.status(401).json({
                error: "Unauthorized: you must be logged in to upload prescription",
            });
        }
        const userId = req.user.id;
        const chats = yield chatServices.fetchAllChatsForPatientService(userId);
        res.status(200).json({ chats });
    }
    catch (error) {
        console.log("Is AppError:", error instanceof error_middleware_1.AppError);
        console.log("Error name:", error.constructor.name);
        console.log("Error message:", error.message);
        const status = error instanceof error_middleware_1.AppError ? error.statusCode : 400;
        const message = error instanceof error_middleware_1.AppError ? error.message : "Bad request";
        return res.status(status).json({ error: message });
    }
});
exports.fetchAllChatsForPatientController = fetchAllChatsForPatientController;
