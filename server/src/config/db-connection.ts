import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING as string;
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
