import express from "express";
import {
  forgotPassword,
  updatePassword,
  updateUser,
} from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/updateUser", authMiddleware, updateUser);
route.put("/updatePassword", authMiddleware, updatePassword);
route.post("/forgotPassword", forgotPassword);

export default route;
