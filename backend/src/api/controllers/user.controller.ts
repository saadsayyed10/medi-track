// backend/src/api/controllers/user.controller.ts

// Import request and response to handle API
import { Request, Response } from "express";

// Import all patient services bundled in one instance
import * as patientService from "../services/user.service";

/*
Register Patient account controller
Method: POST
Endpoint: /api/users/register
*/
export const signUpPatientController = async (req: Request, res: Response) => {
  const { name, email, age, allergies, healthIssues, password } = req.body;
  const data = { name, email, age, allergies, healthIssues, password };

  // Inputs cannot be left null
  if (!data) {
    console.error("All fields are required");
    return res.status(404).json({ error: "All fields are required" });
  }

  // Password validation
  if (!password || password.length < 8) {
    console.error("Password should contain more than 8 characters");
    return res
      .status(400)
      .json({ error: "Password should contain more than 8 characters" });
  }

  try {
    const { token, user } = await patientService.signUpPatientService(data);
    res.status(201).json({ message: "Patient registered", token, user });
    console.log("Patient Registered:\n", JSON.stringify(user));
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

/*
Login Patient account controller
Method: POST
Endpoint: /api/users/login
*/
export const signInPatientController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = { email, password };

  // Inputs cannot be left null
  if (!data) {
    console.error("All fields are required");
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    const { token, user } = await patientService.signInPatientService(data);
    res.status(200).json({ message: "Patient logged in", token, user });
    console.log("Patient logged in:\n", JSON.stringify(user));
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

/*
Fetch Patient account controller
Method: GET
Header: Authorization
Endpoint: /api/users/profile
*/
export const patientAccountController = async (req: Request, res: Response) => {
  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
      console.log("Unauthorized: Cannot fetch as token is not provided");
      return res
        .status(401)
        .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
    }

    const user = await patientService.patientAccountService(
      (req as any).user.id,
    );
    res.status(200).json({ message: "Patient profile fetched", user });
    console.log("Patient profile fetched:\n", JSON.stringify(user));
  } catch (error: any) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
};

/*
Reset/Forgotten password controller
Method: POST
Header: Authorization
Endpoint: /api/users/reset-password
*/
export const resetPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    console.log("Email is required to reset password");
    return res
      .status(404)
      .json({ error: "Email is required to reset password" });
  }

  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
      console.log("Unauthorized: Cannot fetch as token is not provided");
      return res
        .status(401)
        .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
    }

    const { reciepient, password } =
      await patientService.resetPasswordService(email);
    res.status(200).json({
      message: "Password reset successful, email sent",
      reciepient,
      password,
    });
    console.log(`Email: ${reciepient}\nNew password: ${password}`);
  } catch (error: any) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
};

/*
Change password controller
Method: PUT
Header: Authorization
Endpoint: /api/users/change-password
*/
export const changePasswordController = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  // Validity check
  if (!newPassword || newPassword < 8) {
    console.log("Please enter a valid new password");
    return res.status(400).json({ error: "Please enter a valid new password" });
  }

  // All fields are required
  if (!oldPassword) {
    console.log("Make sure old and new passwords are not left empty");
    return res
      .status(404)
      .json({ error: "Make sure old and new passwords are not left empty" });
  }

  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
      console.log("Unauthorized: Cannot fetch as token is not provided");
      return res
        .status(401)
        .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
    }

    const user = await patientService.changePasswordService(
      (req as any).user.id,
      oldPassword,
      newPassword,
    );
    res.status(200).json({
      message: "Password change/update successful",
      user,
    });
    console.log("Password change/update successful");
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
