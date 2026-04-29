// backend/src/api/routes/chat.route.ts

// Import library
import { Router } from "express";

// Import all controllers bundled in one instance
import * as chatController from "../controllers/chat.controller";

// Import middleware to secure and authorize APIs
import { protectAuth } from "../../middleware/auth.middleware";

const chatRouter = Router();

// Route to chat with MedAI
chatRouter.post("/", protectAuth, chatController.chatWithMedAIController);

// Route to fetch all chats
chatRouter.get(
  "/all",
  protectAuth,
  chatController.fetchAllChatsForPatientController,
);

export default chatRouter;
