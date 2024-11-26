import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const generateAccessToken = async (userId) => {
  try {
    const token = jwt.sign({ _id: userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "5h",
    });
    return token;
  } catch (error) {
    console.log("Error generating access token:", error);
  }
};

export const generateRefreshToken = async (userId) => {
  try {
    const token = jwt.sign({ _id: userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    await User.updateOne(
      { _id: userId },
      {
        refresh_token: token,
      }
    );
    return token;
  } catch (error) {
    console.log("Error generating refresh token or updating user:", error);
  }
};

export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded;
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return decoded;
  } catch (error) {
    console.log("Refresh token verification failed:", error.message);
    return null;
  }
};
