// backend/src/api/services/user.service.ts

// Import libraries
import prisma from "../../lib/prisma.orm";
import bcryptjs from "bcryptjs";
import { v4 } from "uuid";

// Import types
import {
  type SignUpType,
  AllergyAndHealthUpdateType,
  ChangePasswordType,
  SignInType,
} from "../../types/user.type";

// Import helper functions
import { generateToken } from "../../lib/token";
import { resetMail } from "../../mails/passwords.mail.";

// Import error middleware class
import { AppError } from "../../middleware/error.middleware";

/* Register Patient account service */
export const signUpPatientService = async (data: SignUpType) => {
  const existing = await prisma.patient.findUnique({
    where: {
      email: data.email,
    },
  });

  // Check if patient already exists
  if (existing) throw new AppError("Patient accound already exists", 401);

  // Encrypt password
  const hashPassword = await bcryptjs.hash(data.password, 10);

  // Instance to register user/patient account
  const user = await prisma.patient.create({
    data: {
      name: data.name,
      email: data.email,
      age: data.age,
      allergies: data.allergies,
      health_issues: data.healthIssues,
      password: hashPassword,
    },
  });

  // Generate and assign token to the patient account
  const token = generateToken(user.id);

  return { token, user };
};

/* Login Patient account service */
export const signInPatientService = async (data: SignInType) => {
  const user = await prisma.patient.findUnique({
    where: {
      email: data.email,
    },
  });

  // Check if patient doesn't exist
  if (!user) throw new AppError("Patient accound does not exist", 404);

  const isValidPassword = await bcryptjs.compare(data.password, user.password);

  // Check if password is incorrect
  if (!isValidPassword) throw new AppError("Password is incorrect", 401);

  // Generate and assign token to the patient account
  const token = generateToken(user.id);

  return { token, user };
};

/* Fetch Patient account service */
export const patientAccountService = async (userId: string) => {
  // Password shouldn't been fetched for profile
  const user = await prisma.patient.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      age: true,
      allergies: true,
      health_issues: true,
      created_at: true,
    },
  });

  return { user };
};

/* Reset password service */
export const resetPasswordService = async (email: string) => {
  const existing = await prisma.patient.findUnique({
    where: {
      email,
    },
  });

  // Email should exist in database to reset password
  if (!existing) throw new AppError("Account does not exist", 404);

  // Converting UUID to a 10 character password
  const newPassword = v4().slice(0, 10);

  const hashPassword = await bcryptjs.hash(newPassword, 10);

  const user = await prisma.patient.update({
    where: {
      email,
    },
    data: {
      password: hashPassword,
    },
  });

  // Send new password to patient's email
  await resetMail(user.email, newPassword);

  const reciepient = user.email;
  const password = newPassword;

  return { reciepient, password };
};

/* Change password service */
export const changePasswordService = async (
  userId: string,
  data: ChangePasswordType,
) => {
  const user = await prisma.patient.findUnique({
    where: {
      id: userId,
    },
  });

  const isValidPassword = await bcryptjs.compare(
    data.oldPassword,
    user?.password!,
  );

  // Check if current password is incorrect
  if (!isValidPassword)
    throw new AppError("Current password is incorrect", 400);

  const hashPassword = await bcryptjs.hash(data.newPassword, 10);

  // Update to new password
  return await prisma.patient.update({
    where: {
      id: userId,
    },
    data: {
      password: hashPassword,
    },
  });
};

/* Register Patient account service */
export const updatePatientService = async (
  userId: string,
  data: AllergyAndHealthUpdateType,
) => {
  const user = await prisma.patient.update({
    where: {
      id: userId,
    },
    data: {
      allergies: data.allergies,
      health_issues: data.healthIssues,
    },
  });

  const healthIssues = user.health_issues;
  const allergies = user.allergies;

  return { healthIssues, allergies };
};

/* Delete Patient's account service */
export const deletePatientService = async (userId: string) => {
  // Permanently delete patient's account
  const user = await prisma.patient.delete({
    where: {
      id: userId,
    },
  });

  const name = user.name;
  const email = user.email;

  return { name, email };
};
