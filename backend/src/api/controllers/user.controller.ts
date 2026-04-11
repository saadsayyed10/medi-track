// backend/src/api/controllers/user.controller.ts

// Import request and response to handle API
import { Request, Response } from "express";

// Import all patient services bundled in one instance
import * as patientService from "../services/user.service";

// Import error middleware class
import { AppError } from "../../middleware/error.middleware";

/*
Register Patient account controller
Method: POST
Endpoint: /api/users/register
*/
export const signUpPatientController = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    age,
    allergies,
    allergiesKeywords,
    healthIssues,
    healthIssuesKeywords,
  } = req.body;
  const data = {
    name,
    email,
    password,
    age,
    allergies,
    allergiesKeywords,
    healthIssues,
    healthIssuesKeywords,
  };

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
    console.log("Is AppError:", error instanceof AppError);
    console.log("Error name:", error.constructor.name);
    console.log("Error message:", error.message);
    const status = error instanceof AppError ? error.statusCode : 400;
    const message = error instanceof AppError ? error.message : "Bad request";
    return res.status(status).json({ error: message });
  }
};

/*
Reset/Forgotten password controller
Method: PATCH
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
    console.log("Is AppError:", error instanceof AppError);
    console.log("Error name:", error.constructor.name);
    console.log("Error message:", error.message);
    const status = error instanceof AppError ? error.statusCode : 400;
    const message = error instanceof AppError ? error.message : "Bad request";
    return res.status(status).json({ error: message });
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

  const data = { oldPassword, newPassword };

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
      data,
    );
    res.status(200).json({
      message: "Password change/update successful",
      user,
    });
    console.log("Password change/update successful");
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
Update patient's allegies and health issues controller
Method: PUT
Header: Authorization
Endpoint: /api/users/update
*/
export const updatePatientController = async (req: Request, res: Response) => {
  const { allergies, healthIssues } = req.body;
  const data = { allergies, healthIssues };

  // All fields are required
  if (!data) {
    console.log("Allergies and Health issues cannot be left null");
    return res
      .status(404)
      .json({ error: "Allergies and Health issues cannot be left null" });
  }

  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
      console.log("Unauthorized: Cannot fetch as token is not provided");
      return res
        .status(401)
        .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
    }

    const { allergies, healthIssues } =
      await patientService.updatePatientService((req as any).user.id, data);
    res.status(200).json({
      message: "Updated patient allergies and health issues",
      allergies,
      healthIssues,
    });
    console.log(
      `Updated patient allergies and health issues:\n${JSON.stringify(allergies)}\n${JSON.stringify(healthIssues)}`,
    );
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
Delete Patient's account controller
Method: DELETE
Header: Authorization
Endpoint: /api/users/delete
*/
export const deletePatientController = async (req: Request, res: Response) => {
  try {
    // If user is not authorized, abort request
    if (!(req as any).user!) {
      console.log("Unauthorized: Cannot fetch as token is not provided");
      return res
        .status(401)
        .json({ error: "Unauthorized: Cannot fetch as token is not provided" });
    }

    const { name, email } = await patientService.deletePatientService(
      (req as any).user.id,
    );
    res.status(200).json({
      message: `Patient - ${name} with email:${email} account deletion successful`,
    });
    console.log(
      `Patient - ${name} with email:${email} account deletion successful`,
    );
  } catch (error: any) {
    console.log("Is AppError:", error instanceof AppError);
    console.log("Error name:", error.constructor.name);
    console.log("Error message:", error.message);
    const status = error instanceof AppError ? error.statusCode : 400;
    const message = error instanceof AppError ? error.message : "Bad request";
    return res.status(status).json({ error: message });
  }
};
