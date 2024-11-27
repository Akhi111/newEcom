import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Change this to the email service you are using (e.g., Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email address
      to: sendTo, // Recipient's email address
      subject: subject, // Subject line
      html: html, // HTML body (your OTP template)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
