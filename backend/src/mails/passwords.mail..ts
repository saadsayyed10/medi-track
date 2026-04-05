// backend/src/mails/passwords.mail.ts

// Import values from env
import { ENV } from "../config/env.config";

// Import helper function send emails
import { transporter } from "../lib/nodemailer";

// Mail to reset password
export const resetMail = async (email: string, newPassword: string) => {
  await transporter.sendMail({
    from: ENV.EMAIL_USER,
    to: email,
    subject: "Your password has been reset",
    text: `Your new password is: ${newPassword}`,
  });
};
