"use strict";
// backend/src/api/controllers/upload.controller.ts
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
exports.deleteAllPrescriptionsController = exports.allPrescriptionController = exports.uploadPrescriptionController = void 0;
// Import all upload prescription services bundled in one instance
const uploadService = __importStar(require("../services/upload.service"));
// Import error middleware class to handle errors appropriately
const error_middleware_1 = require("../../middleware/error.middleware");
/*
Upload prescription controller
Method: POST
Header: Authorization
Endpoint: /api/upload/prescription
*/
const uploadPrescriptionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: you must be logged in to upload prescription");
            return res.status(401).json({
                error: "Unauthorized: you must be logged in to upload prescription",
            });
        }
        if (!req.file) {
            return res
                .status(404)
                .json({ error: "Please upload prescription image to continue" });
        }
        const userId = req.user.id;
        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const data = { uploadImage: base64, userId };
        const prescription = yield uploadService.uploadPrescriptionService(data);
        return res
            .status(201)
            .json({ message: "Prescription uploaded", prescription });
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
exports.uploadPrescriptionController = uploadPrescriptionController;
/*
Fetch all prescription controller
Method: GET
Header: Authorization
Endpoint: /api/upload/prescriptions
*/
const allPrescriptionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: you must be logged in to upload prescription");
            return res.status(401).json({
                error: "Unauthorized: you must be logged in to upload prescription",
            });
        }
        const userId = req.user.id;
        const prescription = yield uploadService.fetchAllPrescriptions(userId);
        return res.status(200).json({ prescription });
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
exports.allPrescriptionController = allPrescriptionController;
/*
Delete all prescription controller
Method: DELETE
Header: Authorization
Endpoint: /api/upload/prescription/delete
*/
const deleteAllPrescriptionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If user is not authorized, abort request
        if (!req.user) {
            console.log("Unauthorized: you must be logged in to upload prescription");
            return res.status(401).json({
                error: "Unauthorized: you must be logged in to upload prescription",
            });
        }
        const userId = req.user.id;
        const prescription = yield uploadService.wipePrescriptionData(userId);
        return res.status(204).json({ prescription });
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
exports.deleteAllPrescriptionsController = deleteAllPrescriptionsController;
