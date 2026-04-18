// backend/src/api/services/upload.service.ts

// Import ORM instance to communicate with database
import axios from "axios";
import { ENV } from "../../config/env.config";
import cloudinary from "../../lib/cloudinary";
import prisma from "../../lib/prisma.orm";

// Import types
import { UploadPrescription } from "../../types/upload.type";

/* Upload prescription service */
export const uploadPrescriptionService = async (data: UploadPrescription) => {
  const uploadResponse = await cloudinary.uploader.upload(data.uploadImage);
  const imageUrl = uploadResponse.secure_url;

  const prescription = await prisma.prescriptions.create({
    data: {
      uploaded_image: imageUrl,
      patients_id: data.userId,
    },
  });

  const res = await axios.post(`${ENV.AI_URL}/upload-prescription`, {
    imageUrl,
    userId: data.userId,
  });

  const content = res.data.ocr.lines;

  return { content, prescription };
};

/* Fetch all upload prescriptions service */
export const fetchAllPrescriptions = async (userId: string) => {
  return await prisma.prescriptions.findMany({
    where: {
      patients_id: userId,
    },
    select: {
      uploaded_image: true,
    },
  });
};

/* Delete all prescription service */
export const wipePrescriptionData = async (userId: string) => {
  return await prisma.prescriptions.deleteMany({
    where: {
      patients_id: userId,
    },
  });
};
