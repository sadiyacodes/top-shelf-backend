import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
  const DB_URL = process.env.MONGO_URL;
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(`Connected to mongo db database ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
