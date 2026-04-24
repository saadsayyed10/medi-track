// backend/src/api/controllers/chat.controller.ts

// Import request and response to handle API
import { Request, Response } from "express";

// Import all chat services bundled in one instance
import * as chatServices from "../services/chat.service";
import { AppError } from "../../middleware/error.middleware";

/*
Chat with MedAI controller
Method: POST
Header: Authorization
Endpoint: /api/chat
*/
export const chatWithMedAIController = async (req: Request, res: Response) => {
  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
      console.log("Unauthorized: you must be logged in to upload prescription");
      return res.status(401).json({
        error: "Unauthorized: you must be logged in to upload prescription",
      });
    }
    const userId = (req as any).user.id;
    const { question } = req.body;

    // All fields are required
    const data = { userId, question };
    if (!data) {
      console.log("Please login and enter a question");
      return res.status(401).json({
        error: "Please login and enter a question",
      });
    }

    const chat = await chatServices.chatWithMedAIService(data);
    res.status(201).json({ chat });
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
