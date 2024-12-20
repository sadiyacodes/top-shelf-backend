import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";
import Razorpay from "razorpay";

// express call
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Database connection
connectDB();

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api", paymentRoute);

//getting api key for the razorpay
app.get("/api/getkey", (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
});

//get server status
app.get("/api/status", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const PORT = process.env.PORT || 8080;

// server Listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
