// backend/src/api/routes/index.route.ts

// Import library
import { Router } from "express";

// Import routes from files
import userRouter from "./user.route";
import uploadRouter from "./upload.route";
import chatRouter from "./chat.route";

const mainRouter = Router();

// Route: /api/users
mainRouter.use("/users", userRouter);

// Route: /api/upload
mainRouter.use("/upload", uploadRouter);

// Route: /api/chat
mainRouter.use("/chat", chatRouter);

export default mainRouter;
