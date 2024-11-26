import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { verifyEmailTemplate } from "./verifyEmailTemplate.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Change this to the email service you are using (e.g., Gmail, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    // user: "ultrongaming125@gmail.com", // Your email address
    // pass: "tuontpqwydauuygq", // Your email password or App password if using Gmail
  },
});

export const sendEmail = async ({ sendTo, subject, name, html, url }) => {
  try {
    const htmlContent = await verifyEmailTemplate({ name, url });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email address
      to: sendTo, // Recipient's email address
      subject: subject, // Subject line
      html: htmlContent, // HTML body (your OTP template)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
