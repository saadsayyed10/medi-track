"use strict";
// backend/src/api/services/upload.service.ts
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
exports.wipePrescriptionData = exports.fetchAllPrescriptions = exports.uploadPrescriptionService = void 0;
// Import ORM instance to communicate with database
const axios_1 = __importDefault(require("axios"));
const env_config_1 = require("../../config/env.config");
const cloudinary_1 = __importDefault(require("../../lib/cloudinary"));
const prisma_orm_1 = __importDefault(require("../../lib/prisma.orm"));
/* Upload prescription service */
const uploadPrescriptionService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_orm_1.default.patients.findUnique({
        where: {
            id: data.userId,
        },
    });
    const uploadResponse = yield cloudinary_1.default.uploader.upload(data.uploadImage);
    const imageUrl = uploadResponse.secure_url;
    const prescription = yield prisma_orm_1.default.prescriptions.create({
        data: {
            uploaded_image: imageUrl,
            patients_id: data.userId,
        },
    });
    const res = yield axios_1.default.post(`${env_config_1.ENV.AI_URL}/upload-prescription`, {
        imageUrl,
        email: user === null || user === void 0 ? void 0 : user.email,
    });
    const content = res.data.ocr.lines;
    return { content, prescription };
});
exports.uploadPrescriptionService = uploadPrescriptionService;
/* Fetch all upload prescriptions service */
const fetchAllPrescriptions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_orm_1.default.prescriptions.findMany({
        where: {
            patients_id: userId,
        },
        select: {
            uploaded_image: true,
        },
    });
});
exports.fetchAllPrescriptions = fetchAllPrescriptions;
/* Delete all prescription service */
const wipePrescriptionData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield prisma_orm_1.default.patients.findUnique({
        where: {
            id: userId,
        },
    });
    const res = yield axios_1.default.delete(`${env_config_1.ENV.AI_URL}/delete-prescription`, {
        params: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const prescription = yield prisma_orm_1.default.prescriptions.findMany({
        where: {
            patients_id: userId,
        },
    });
    for (const p of prescription) {
        const publicId = (_a = p.uploaded_image.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        yield cloudinary_1.default.uploader.destroy(publicId);
    }
    const deletedPrescription = res.data;
    return deletedPrescription;
});
exports.wipePrescriptionData = wipePrescriptionData;
