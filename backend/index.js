import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import colors from "colors";
import { connectToDB } from "./db/connectToBD.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());

const PORT = process.env.PORT || 5000;

//Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

connectToDB().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`⚙️ Server is running on Port: ${PORT}`.black.bgYellow);
  });
});
