// backend/src/api/routes/upload.route.ts

// Import library
import { Router } from "express";

// Import all controllers bundled in one instance
import * as uploadController from "../controllers/upload.controller";

// Import middleware to secure and authorize APIs
import { protectAuth } from "../../middleware/auth.middleware";
import multer from "multer";

const uploadRouter = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/heic"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, jpeg, png, and heic images are allowed"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10mb
});

// Route to upload prescription
uploadRouter.post(
  "/prescription",
  protectAuth,
  upload.single("prescription"),
  uploadController.uploadPrescriptionController,
);

// Route to fetch all prescription
uploadRouter.get(
  "/prescriptions",
  protectAuth,
  uploadController.allPrescriptionController,
);

// Route to delete all prescription
uploadRouter.delete(
  "/delete",
  protectAuth,
  uploadController.allPrescriptionController,
);

export default uploadRouter;
