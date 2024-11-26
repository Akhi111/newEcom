import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtTokens.js";
import uploadImageCloudinary from "../utils/cloudinary.js";
import { sendEmail } from "../utils/sendEmail.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import dotenv from "dotenv";

dotenv.config();

//Register Controller

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name || email || password)) {
      return res
        .status(404)
        .json({ status: false, message: "All fields are required" });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists with same Email. Try with another Email",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        status: false,
        message: "Password must be atleast 8 characters",
      });
    }

    const validEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmailFormat.test(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email format" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from Blinkit",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    //Select all fields except the password in response
    const userResponse = await User.findById(newUser._id).select("-password");

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      userResponse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", error });
  }
};

//Login Controller

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      return res
        .status(404)
        .json({ status: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not exists. Invalid credentials",
      });
    }

    if (user.status !== "Active") {
      return res
        .status(400)
        .json({ status: false, message: "Contact to Admin" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(404)
        .json({ status: false, message: "Incorrect email or password" });
    }
    user.password = undefined;

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.status(201).json({
      status: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json(
        { status: false, message: "Intrnal server error", error },
        error.message
      );
  }
};

//Logout Controller

export const logoutUser = async (req, res) => {
  try {
    const userId = req.userId; //Coming from middleware ( req.userId = decode )
    if (!userId) {
      return res
        .status(400)
        .json({ status: false, message: "User Id missing" });
    }
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    //with the help of this user remove refreshToken from the database.
    // Find and update user to clear the refresh token.

    const removeRfreshToken = await User.findByIdAndUpdate(
      userId,
      {
        refresh_token: "",
      },
      { new: true }
    );

    return res.status(201).json({
      status: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error, // Include only the error message here
    });
  }
};

//Upload user Avatar

export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId; //auth middleware
    const image = req.file; // multer middleware

    const upload = await uploadImageCloudinary(image);

    const updatedUser = await User.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return res.status(200).json({
      status: true,
      message: "File uploaded successfully",
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
