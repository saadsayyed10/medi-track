"use strict";
// backend/src/mails/passwords.mail.ts
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
exports.resetMail = void 0;
// Import values from env
const env_config_1 = require("../config/env.config");
// Import helper function send emails
const nodemailer_1 = require("../lib/nodemailer");
// Mail to reset password
const resetMail = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    yield nodemailer_1.transporter.sendMail({
        from: env_config_1.ENV.EMAIL_USER,
        to: email,
        subject: "Your password has been reset",
        text: `Your new password is: ${newPassword}`,
    });
});
exports.resetMail = resetMail;
