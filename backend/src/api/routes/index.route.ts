// backend/src/api/routes/index.route.ts

// Import library
import { Router } from "express";

// Import routes from files
import userRouter from "./user.route";
import uploadRouter from "./upload.route";

const mainRouter = Router();

// Route: /api/users
mainRouter.use("/users", userRouter);

// Route: /api/upload
mainRouter.use("/upload", uploadRouter);

export default mainRouter;
