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
  const user = await prisma.patients.findUnique({
    where: {
      id: data.userId,
    },
  });
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
    email: user?.email,
  });

  const content = res.data.ocr.lines;

  return { content, prescription };
};

/* Fetch all upload prescriptions service */

/* Delete prescription service */
