import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
// import cors from "cors";
import connectDB from "./config/db.js";

// express call
const app = express();

// middlewares
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();
const PORT = process.env.PORT || 8080;

//server listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
