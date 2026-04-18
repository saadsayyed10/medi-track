// backend/src/api/routes/upload.route.ts

// Import library
import { Router } from "express";

// Import all controllers bundled in one instance
import * as uploadController from "../controllers/upload.controller";

// Import middleware to secure and authorize APIs
import { protectAuth } from "../../middleware/auth.middleware";

const uploadRouter = Router();

// Route to upload prescription
uploadRouter.post(
  "/prescription",
  protectAuth,
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
