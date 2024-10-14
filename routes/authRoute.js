import express from "express";
import {
  registerUser,
  loginUser,
  forgetpasswordController,
  updateUserController,
} from "../controllers/registerUserControllers.js";
import { isAdmin, loginTokenCheck } from "./../middlewares/authMiddleWare.js";

//ROUTER
const router = express.Router();

//Routing to register user
router.post("/register", registerUser);

//routing to login user
router.post("/login", loginUser);

//forget password route
router.post("/forget-password", forgetpasswordController);

//update user profile
router.put("/edit-profile", loginTokenCheck, updateUserController);

//user orders
//router.get("/orders", loginTokenCheck, getOrderController);

//protected route
router.get("/user-auth", loginTokenCheck, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//admin auth protected route
router.get("/admin-auth", loginTokenCheck, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

export default router;
