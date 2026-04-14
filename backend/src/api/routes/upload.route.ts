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
  "/upload/prescription",
  protectAuth,
  uploadController.uploadPrescriptionController,
);

export default uploadRouter;
