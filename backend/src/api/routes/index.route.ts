// backend/src/api/routes/index.route.ts

// Import library
import { Router } from "express";

// Import routes
import userRouter from "./user.route";

const mainRouter = Router();

// Route: /api/users
mainRouter.use("/users", userRouter);

export default mainRouter;
