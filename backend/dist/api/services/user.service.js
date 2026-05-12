"use strict";
// backend/src/api/services/user.service.ts
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
exports.deletePatientService = exports.updatePatientService = exports.changePasswordService = exports.resetPasswordService = exports.patientAccountService = exports.signInPatientService = exports.signUpPatientService = void 0;
// Import ORM instance to communicate with database
const prisma_orm_1 = __importDefault(require("../../lib/prisma.orm"));
// Import libraries
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
// Import helper functions
const token_1 = require("../../lib/token");
const passwords_mail_1 = require("../../mails/passwords.mail");
// Import error middleware class
const error_middleware_1 = require("../../middleware/error.middleware");
/* Register Patient account service */
const signUpPatientService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_orm_1.default.patients.findUnique({
        where: {
            email: data.email,
        },
    });
    // Check if patient already exists
    if (existing)
        throw new error_middleware_1.AppError("Patient account already exists", 401);
    // Encrypt password
    const hashPassword = yield bcryptjs_1.default.hash(data.password, 10);
    // Instance to register user/patient account
    const user = yield prisma_orm_1.default.patients.create({
        data: {
            name: data.name,
            email: data.email,
            age: data.age,
            allergies: data.allergies,
            allergy_keywords: data.allergiesKeywords,
            health_issues: data.healthIssues,
            health_issues_keywords: data.healthIssuesKeywords,
            password: hashPassword,
        },
    });
    // Generate and assign token to the patient account
    const token = (0, token_1.generateToken)(user.id);
    return { token, user };
});
exports.signUpPatientService = signUpPatientService;
/* Login Patient account service */
const signInPatientService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_orm_1.default.patients.findUnique({
        where: {
            email: data.email,
        },
    });
    // Check if patient doesn't exist
    if (!user)
        throw new error_middleware_1.AppError("Patient account does not exist", 404);
    const isValidPassword = yield bcryptjs_1.default.compare(data.password, user.password);
    // Check if password is incorrect
    if (!isValidPassword)
        throw new error_middleware_1.AppError("Password is incorrect", 401);
    // Generate and assign token to the patient account
    const token = (0, token_1.generateToken)(user.id);
    return { token, user };
});
exports.signInPatientService = signInPatientService;
/* Fetch Patient account service */
const patientAccountService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Password shouldn't been fetched for profile
    const user = yield prisma_orm_1.default.patients.findUnique({
        where: {
            id: userId,
        },
        select: {
            name: true,
            email: true,
            age: true,
            allergies: true,
            health_issues: true,
            created_at: true,
        },
    });
    return { user };
});
exports.patientAccountService = patientAccountService;
/* Reset password service */
const resetPasswordService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_orm_1.default.patients.findUnique({
        where: {
            email,
        },
    });
    // Email should exist in database to reset password
    if (!existing)
        throw new error_middleware_1.AppError("Account does not exist", 404);
    // Converting UUID to a 10 character password
    const newPassword = (0, uuid_1.v4)().slice(0, 10);
    const hashPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    const user = yield prisma_orm_1.default.patients.update({
        where: {
            email,
        },
        data: {
            password: hashPassword,
        },
    });
    // Send new password to patient's email
    yield (0, passwords_mail_1.resetMail)(user.email, newPassword);
    const reciepient = user.email;
    const password = newPassword;
    return { reciepient, password };
});
exports.resetPasswordService = resetPasswordService;
/* Change password service */
const changePasswordService = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_orm_1.default.patients.findUnique({
        where: {
            id: userId,
        },
    });
    const isValidPassword = yield bcryptjs_1.default.compare(data.oldPassword, user === null || user === void 0 ? void 0 : user.password);
    // Check if current password is incorrect
    if (!isValidPassword)
        throw new error_middleware_1.AppError("Current password is incorrect", 400);
    const hashPassword = yield bcryptjs_1.default.hash(data.newPassword, 10);
    // Update to new password
    return yield prisma_orm_1.default.patients.update({
        where: {
            id: userId,
        },
        data: {
            password: hashPassword,
        },
    });
});
exports.changePasswordService = changePasswordService;
/* Register Patient account service */
const updatePatientService = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_orm_1.default.patients.update({
        where: {
            id: userId,
        },
        data: {
            allergy_keywords: data.allergies,
            health_issues_keywords: data.healthIssues,
        },
    });
    const healthIssues = user.health_issues;
    const allergies = user.allergies;
    return { healthIssues, allergies };
});
exports.updatePatientService = updatePatientService;
/* Delete Patient's account service */
const deletePatientService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Permanently delete patient's account
    const user = yield prisma_orm_1.default.patients.delete({
        where: {
            id: userId,
        },
    });
    const name = user.name;
    const email = user.email;
    return { name, email };
});
exports.deletePatientService = deletePatientService;
