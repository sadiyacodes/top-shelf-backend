import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import JWT from "jsonwebtoken";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";

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

const PORT = process.env.PORT || 8080;

// server Listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
