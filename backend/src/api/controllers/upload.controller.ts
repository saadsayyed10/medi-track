// backend/src/api/controllers/upload.controller.ts

// Import request and response to handle API
import { Request, Response } from "express";

// Import all upload prescription services bundled in one instance
import * as uploadService from "../services/upload.service";

// Import error middleware class to handle errors appropriately
import { AppError } from "../../middleware/error.middleware";

/*
Upload prescription controller
Method: POST
Header: Authorization
Endpoint: /api/upload/prescription
*/
export const uploadPrescriptionController = async (
  req: Request,
  res: Response,
) => {
  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
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

    const userId = (req as any).user.id;
    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const data = { uploadImage: base64, userId };

    const prescription = await uploadService.uploadPrescriptionService(data);

    return res
      .status(201)
      .json({ message: "Prescription uploaded", prescription });
  } catch (error: any) {
    console.log("Is AppError:", error instanceof AppError);
    console.log("Error name:", error.constructor.name);
    console.log("Error message:", error.message);
    const status = error instanceof AppError ? error.statusCode : 500;
    const message =
      error instanceof AppError ? error.message : "Internal server error";
    return res.status(status).json({ error: message });
  }
};

/*
Fetch all prescription controller
Method: GET
Header: Authorization
Endpoint: /api/upload/prescriptions
*/
export const allPrescriptionController = async (
  req: Request,
  res: Response,
) => {
  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
      console.log("Unauthorized: you must be logged in to upload prescription");
      return res.status(401).json({
        error: "Unauthorized: you must be logged in to upload prescription",
      });
    }
    const userId = (req as any).user.id;

    const prescription = await uploadService.fetchAllPrescriptions(userId);

    return res.status(200).json({ prescription });
  } catch (error: any) {
    console.log("Is AppError:", error instanceof AppError);
    console.log("Error name:", error.constructor.name);
    console.log("Error message:", error.message);
    const status = error instanceof AppError ? error.statusCode : 500;
    const message =
      error instanceof AppError ? error.message : "Internal server error";
    return res.status(status).json({ error: message });
  }
};

/*
Delete all prescription controller
Method: DELETE
Header: Authorization
Endpoint: /api/upload/prescription/delete
*/
export const deleteAllPrescriptionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
      console.log("Unauthorized: you must be logged in to upload prescription");
      return res.status(401).json({
        error: "Unauthorized: you must be logged in to upload prescription",
      });
    }
    const userId = (req as any).user.id;

    const prescription = await uploadService.wipePrescriptionData(userId);

    return res.status(204).json({ prescription });
  } catch (error: any) {
    console.log("Is AppError:", error instanceof AppError);
    console.log("Error name:", error.constructor.name);
    console.log("Error message:", error.message);
    const status = error instanceof AppError ? error.statusCode : 500;
    const message =
      error instanceof AppError ? error.message : "Internal server error";
    return res.status(status).json({ error: message });
  }
};
