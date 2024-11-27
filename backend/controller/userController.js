import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "../utils/generateOpt.js";
import { forgotPasswordTemplate } from "../utils/forgotPasswordTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

//UpdateUser Controller

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware
    const { name, mobile } = req.body;
    if (!(name || mobile)) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    //! Check if the name is being updated and if it already exists. ------Also need to add unique: true in model.------
    // if (name && name !== user.name) {
    //   const existingUser = await User.findOne({ name: name });
    //   if (existingUser) {
    //     return res
    //       .status(400)
    //       .json({ status: false, message: "Username is already taken." });
    //   }
    // }

    const updatedUser = {
      name: name || user.name,
      mobile: mobile || user.mobile,
    };
    await User.findByIdAndUpdate(userId, updatedUser, { new: true });
    res.status(201).json({
      status: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json(
        { status: false, message: "Internal server error.", error },
        error.message
      );
  }
};

//UpdatePassword Controller

export const updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!(email || oldPassword || newPassword)) {
      return res.status(404).json({
        status: false,
        message: "All fields are required",
      });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({
        status: false,
        message: "Password must be atleast be 8 characters",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    //Check old password is correct or not
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res
        .status(400)
        .json({ status: false, message: "Incorrect old password" });
    }
    //hash NewPasswrod
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//ForgotPassword Controller -----can use without login------

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email not found", error: true });
    }
    const otp = generateOtp();

    const expireTimeOtp = new Date(new Date().getTime() + 10 * 60 * 1000); //10min

    const updateOtpExpireTimeOtp = await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTimeOtp).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Blinkit",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    res
      .status(201)
      .json({ status: true, message: "Check email for OTP", error: false });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Verify ForgotPassword otp Controller

export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!(email && otp)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter your Email and OTP." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email not available" });
    }

    const currentTime = new Date().toISOString();
    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        status: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        status: false,
        message: "Incorrect OTP. Please try again or request a new one.",
      });
    }

    //if otp is not expire
    //if otp === user.forgot_password_otp

    return res
      .status(200)
      .json({ status: true, message: "OTP verified successfully." });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//ResetPassword Controller

export const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!(email && oldPassword && newPassword && confirmPassword)) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are require." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email not exists." });
    }
    // Check if oldPassword matches the stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Old password is incorrect.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "New password and confirm password are not same.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
