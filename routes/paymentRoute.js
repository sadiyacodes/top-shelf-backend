import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/paymentController.js";
import { loginTokenCheck } from "../middlewares/authMiddleWare.js";

const router = express.Router();

//payment route
router.post("/checkout", loginTokenCheck, checkout);

//payment Verification route
router.post("/paymentVerification", loginTokenCheck, paymentVerification);

export default router;
