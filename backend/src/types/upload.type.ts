// backend/src/types/upload.type.ts

// Used in backend/src/api/services/upload.service.ts
export type UploadPrescription = {
  uploadImage: string;
  userId: string; // JWT
};
