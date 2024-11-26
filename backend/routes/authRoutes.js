import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  uploadAvatar,
} from "../controller/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/logout", authMiddleware, logoutUser);
route.put(
  "/uploadAvatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

export default route;
