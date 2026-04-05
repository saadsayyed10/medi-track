// backend/src/api/services/user.service.ts

// Import libraries
import prisma from "../../lib/prisma.orm";
import bcryptjs from "bcryptjs";

// Import files
import { type SignUpType, SignInType } from "../../types/user.type";
import { generateToken } from "../../lib/token";
import { v4 } from "uuid";
import { resetMail } from "../../mails/passwords.mail.";

/* Register Patient account service */
export const signUpPatientService = async (data: SignUpType) => {
  const existing = await prisma.patient.findUnique({
    where: {
      email: data.email,
    },
  });

  // Check if patient already exists
  if (existing) throw new Error("Patient accound already exists");

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
  if (!user) throw new Error("Patient accound does not exist");

  const isValidPassword = await bcryptjs.compare(data.password, user.password);

  // Check if password is incorrect
  if (!isValidPassword) throw new Error("Password is incorrect");

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
  if (!existing) throw new Error("Account does not exist");

  // Converting UUID to a 10 character password
  const newPassword = v4().slice(0, 10);

  const user = await prisma.patient.update({
    where: {
      email,
    },
    data: {
      password: newPassword,
    },
  });

  // Send new password to patient's email
  await resetMail(user.email, user.password);

  const reciepient = user.email;
  const password = user.password;

  return { reciepient, password };
};
