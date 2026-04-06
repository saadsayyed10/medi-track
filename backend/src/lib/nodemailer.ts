// backend/src/lib/nodemailer.ts

// Import library to create a transporter to send email
import nodemailer from "nodemailer";
import { ENV } from "../config/env.config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASSWORD,
  },
});
