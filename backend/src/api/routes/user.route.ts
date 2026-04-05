// backend/src/api/routes/user.route.ts

// Import library
import { Router } from "express";

// Import all controllers bundled in one instance
import * as userController from "../controllers/user.controller";
import { protectAuth } from "../../middleware/auth.middleware";
import { resetPasswordEmailLimiter } from "../../middleware/rate-limit.middleware";

const userRouter = Router();

// Route to register patient account
userRouter.post("/register", userController.signUpPatientController);

// Route to login patient account
userRouter.post("/login", userController.signInPatientController);

// Route to fetch patient account (token needed)
userRouter.get(
  "/profile",
  protectAuth,
  userController.patientAccountController,
);

// Route to reset patient's forgotten account password (token needed)
userRouter.post(
  "/reset-password",
  resetPasswordEmailLimiter,
  protectAuth,
  userController.resetPasswordController,
);

// Route to change patient's account password (token needed)
userRouter.put(
  "/change-password",
  protectAuth,
  userController.changePasswordController,
);

export default userRouter;
