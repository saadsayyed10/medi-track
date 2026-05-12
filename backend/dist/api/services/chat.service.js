"use strict";
// backend/src/api/services/chat.service.ts
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
exports.fetchAllChatsForPatientService = exports.chatWithMedAIService = void 0;
// Import ORM instance
const prisma_orm_1 = __importDefault(require("../../lib/prisma.orm"));
// Import helper configs, libs and functions
const axios_1 = __importDefault(require("axios"));
const env_config_1 = require("../../config/env.config");
const chatWithMedAIService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_orm_1.default.patients.findUnique({
        where: {
            id: data.userId,
        },
    });
    const question = data.question;
    const res = yield axios_1.default.post(`${env_config_1.ENV.AI_URL}/chat`, {
        email: user === null || user === void 0 ? void 0 : user.email,
        question,
    });
    const answer = res.data.answer;
    const chat = yield prisma_orm_1.default.chats.create({
        data: {
            patients_id: data.userId,
            question: question,
            answer: answer,
        },
    });
    return chat;
});
exports.chatWithMedAIService = chatWithMedAIService;
const fetchAllChatsForPatientService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_orm_1.default.chats.findMany({
        where: {
            patients_id: patientId,
        },
    });
});
exports.fetchAllChatsForPatientService = fetchAllChatsForPatientService;
