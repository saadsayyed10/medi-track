"use strict";
// backend/src/api/controllers/user.controller.ts
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
exports.deletePatientController = exports.updatePatientController = exports.changePasswordController = exports.resetPasswordController = exports.patientAccountController = exports.signInPatientController = exports.signUpPatientController = void 0;
// Import all patient services bundled in one instance
const patientService = __importStar(require("../services/user.service"));
// Import error middleware class to handle errors appropriately
const error_middleware_1 = require("../../middleware/error.middleware");
/*
Register Patient account controller
Method: POST
Endpoint: /api/users/register
*/
const signUpPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, age, allergies, allergiesKeywords, healthIssues, healthIssuesKeywords, } = req.body;
    const data = {
        name,
        email,
        password,
        age,
        allergies,
        allergiesKeywords,
        healthIssues,
        healthIssuesKeywords,
    };
    // Inputs cannot be left null
    if (!data) {
        console.error("All fields are required");
        return res.status(404).json({ error: "All fields are required" });
    }
    // Password validation
    if (!password || password.length < 8) {
        console.error("Password should contain more than 8 characters");
        return res
            .status(400)
            .json({ error: "Password should contain more than 8 characters" });
    }
    try {
        const { token, user } = yield patientService.signUpPatientService(data);
        res.status(201).json({ message: "Patient registered", token, user });
        console.log("Patient Registered:\n", JSON.stringify(user));
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
exports.signUpPatientController = signUpPatientController;
/*
Login Patient account controller
Method: POST
Endpoint: /api/users/login
*/
const signInPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const data = { email, password };
    // Inputs cannot be left null
    if (!data) {
        console.error("All fields are required");
        return res.status(404).json({ error: "All fields are required" });
    }
    try {
        const { token, user } = yield patientService.signInPatientService(data);
        res.status(200).json({ message: "Patient logged in", token, user });
        console.log("Patient logged in:\n", JSON.stringify(user));
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
exports.signInPatientController = signInPatientController;
/*
Fetch Patient account controller
Method: GET
Header: Authorization
Endpoint: /api/users/profile
*/
const patientAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: Cannot fetch as token is not provided");
            return res
                .status(401)
                .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
        }
        const user = yield patientService.patientAccountService(req.user.id);
        res.status(200).json({ message: "Patient profile fetched", user });
        console.log("Patient profile fetched:\n", JSON.stringify(user));
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
exports.patientAccountController = patientAccountController;
/*
Reset/Forgotten password controller
Method: PATCH
Header: Authorization
Endpoint: /api/users/reset-password
*/
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        console.log("Email is required to reset password");
        return res
            .status(404)
            .json({ error: "Email is required to reset password" });
    }
    try {
        const { reciepient, password } = yield patientService.resetPasswordService(email);
        res.status(200).json({
            message: "Password reset successful, email sent",
            reciepient,
            password,
        });
        console.log(`Email: ${reciepient}\nNew password: ${password}`);
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
exports.resetPasswordController = resetPasswordController;
/*
Change password controller
Method: PUT
Header: Authorization
Endpoint: /api/users/change-password
*/
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    // Validity check
    if (!newPassword || newPassword < 8) {
        console.log("Please enter a valid new password");
        return res.status(400).json({ error: "Please enter a valid new password" });
    }
    // All fields are required
    if (!oldPassword) {
        console.log("Make sure old and new passwords are not left empty");
        return res
            .status(404)
            .json({ error: "Make sure old and new passwords are not left empty" });
    }
    const data = { oldPassword, newPassword };
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: Cannot fetch as token is not provided");
            return res
                .status(401)
                .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
        }
        const user = yield patientService.changePasswordService(req.user.id, data);
        res.status(200).json({
            message: "Password change/update successful",
            user,
        });
        console.log("Password change/update successful");
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
exports.changePasswordController = changePasswordController;
/*
Update patient's allegies and health issues controller
Method: PUT
Header: Authorization
Endpoint: /api/users/update
*/
const updatePatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { allergies, healthIssues } = req.body;
    const data = { allergies, healthIssues };
    // All fields are required
    if (!data) {
        console.log("Allergies and Health issues cannot be left null");
        return res
            .status(404)
            .json({ error: "Allergies and Health issues cannot be left null" });
    }
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: Cannot fetch as token is not provided");
            return res
                .status(401)
                .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
        }
        const { allergies, healthIssues } = yield patientService.updatePatientService(req.user.id, data);
        res.status(200).json({
            message: "Updated patient allergies and health issues",
            allergies,
            healthIssues,
        });
        console.log(`Updated patient allergies and health issues:\n${JSON.stringify(allergies)}\n${JSON.stringify(healthIssues)}`);
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
exports.updatePatientController = updatePatientController;
/*
Delete Patient's account controller
Method: DELETE
Header: Authorization
Endpoint: /api/users/delete
*/
const deletePatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: Cannot fetch as token is not provided");
            return res
                .status(401)
                .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
        }
        const { name, email } = yield patientService.deletePatientService(req.user.id);
        res.status(200).json({
            message: `Patient - ${name} with email:${email} account deletion successful`,
        });
        console.log(`Patient - ${name} with email:${email} account deletion successful`);
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
exports.deletePatientController = deletePatientController;
