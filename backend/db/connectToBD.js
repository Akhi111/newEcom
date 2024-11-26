import mongoose from "mongoose";
import colors from "colors";

export const connectToDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Successfully✅".bgGreen.black);
  } catch (error) {
    console.log("Failed to connnect DB❌".bgRed.black, error.message);
  }
};
