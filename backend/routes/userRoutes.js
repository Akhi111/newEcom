import express from "express";
import {
  forgotPassword,
  updatePassword,
  updateUser,
  verifyForgotPasswordOtp,
} from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/updateUser", authMiddleware, updateUser);
route.put("/updatePassword", authMiddleware, updatePassword);
route.put("/forgotPassword", forgotPassword);
route.put("/verifyForgotPasswordOtp", verifyForgotPasswordOtp);

export default route;
