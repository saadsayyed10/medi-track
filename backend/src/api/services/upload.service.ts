// backend/src/api/services/upload.service.ts

// Import ORM instance to communicate with database
import prisma from "../../lib/prisma.orm";

// Import types
import { UploadPrescription } from "../../types/upload.type";

/* Upload prescription service */
export const uploadPrescriptionService = async (data: UploadPrescription) => {
  const prescription = await prisma.prescriptions.create({
    data: {
      uploaded_image: data.uploadImage,
      patients_id: data.userId,
    },
  });

  return prescription;
};

/* Fetch all upload prescriptions service */

/* Delete prescription service */
