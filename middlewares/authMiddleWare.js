import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protecting routes on basis of token check
export const loginTokenCheck = (req, res, next) => {
  try {
    const token = req?.headers?.authorization;
    const getVerification = JWT.verify(token, process.env.JWT_SECRET);
    //Confirming that the request gets the id
    req.user = getVerification;
    console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized User" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    //getting user id
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized User" });
    } else {
      next();
    }
  } catch (error) {}
};
