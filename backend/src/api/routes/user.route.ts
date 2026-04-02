// backend/src/api/routes/user.route.ts

// Import library
import { Router } from "express";

// Import all controllers bundled in one instance
import * as userController from "../controllers/user.controller";

const userRouter = Router();

// Route to register patient account
userRouter.post("/register", userController.signUpPatientController);

// Route to login patient account
userRouter.post("/login", userController.signInPatientController);

export default userRouter;
