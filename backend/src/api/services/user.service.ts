// backend/src/api/services/user.service.ts

// Import
import prisma from "../../lib/prisma.orm";
import bcryptjs from "bcryptjs";

import { type SignUpType } from "../../types/user.type";
import { generateToken } from "../../lib/token";

/* Register Patient account service */
export const signUpPatient = async (data: SignUpType) => {
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
