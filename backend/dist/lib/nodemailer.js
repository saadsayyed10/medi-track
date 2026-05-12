"use strict";
// backend/src/lib/nodemailer.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
// Import library to create a transporter to send email
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = require("../config/env.config");
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: env_config_1.ENV.EMAIL_USER,
        pass: env_config_1.ENV.EMAIL_PASSWORD,
    },
});
