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
  const user = await prisma.patients.findUnique({
    where: {
      id: userId,
    },
  });

  const res = await axios.delete(`${ENV.AI_URL}/delete-prescription`, {
    params: {
      email: user?.email,
    },
  });

  const prescription = await prisma.prescriptions.findMany({
    where: {
      patients_id: userId,
    },
  });

  for (const p of prescription) {
    const publicId = p.uploaded_image.split("/").pop()?.split(".")[0];
    await cloudinary.uploader.destroy(publicId!);
  }

  const deletedPrescription = res.data;

  await prisma.prescriptions.deleteMany({
    where: {
      patients_id: userId,
    },
  });

  return deletedPrescription;
};
