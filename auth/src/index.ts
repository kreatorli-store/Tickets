import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  if (!process.env.JWT_KEY || !process.env.SALT_FACTORY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.SALT_FACTORY) {
    throw new Error("SALT_KEY must be defined");
  }
  if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI must be defined")
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb 🎯");
  } catch (err) {
    console.error(err);
    return;
  }

  app.listen(3001, () => {
    console.log("Auth: Listening on port 3001 🚀");
  });
};

start();
