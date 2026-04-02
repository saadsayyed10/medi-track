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
Endpoint: /api/users/lgoin
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
    res.status(201).json({ message: "Patient logged in", token, user });
    console.log("Patient logged in:\n", JSON.stringify(user));
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
