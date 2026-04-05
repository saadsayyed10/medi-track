// backend/src/mails/passwords.mail.ts

// Import library
import { v4 } from "uuid";

// Import helper function send emails
import { ENV } from "../config/env.config";
import { transporter } from "../lib/nodemailer";

// Mail to reset password
export const resetMail = async (email: string) => {
  // Converting UUID to a 10 character password
  const newPassword = v4().slice(0, 10);

  await transporter.sendMail({
    from: ENV.EMAIL_USER,
    to: email,
    subject: "Your password has been reset",
    text: `Your new password is: ${newPassword}`,
  });
};
