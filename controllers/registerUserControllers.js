import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//import { Payment } from "../models/paymentModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, answer } = req.body;

    if (!name) {
      return res.send({ message: "Please enter a name" });
    }
    if (!email) {
      return res.send({ message: "Please enter an email" });
    }
    if (!password) {
      return res.send({ message: "Please enter a password" });
    }
    if (!answer) {
      return res.send({ message: "Please answer the security question" });
    }

    //existing user check
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: `${email} Already registered, Please log in`,
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name,
      email,
      answer,
      password: hashedPassword,
      address: "",
    }).save();

    res.status(200).send({
      success: true,
      message: "User saved successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error creating new user. try again",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //value validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid Login Credentials" });
    }

    //check user
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    //compare password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(403).send({
        success: false,
        message: "Incorrect Password",
      });
    }
    //token creation
    const token = await JWT?.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Successfully Logged in",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `${error.message}`,
    });
  }
};

//FORGET PASSWORD controller

export const forgetpasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: " Email is required",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "Please enter your New Password ",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "Please answer the security question ",
      });
    }

    //checking if user exist and the answer is correct
    const user = await userModel.findOne({ email, answer });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "Invalid email or security answer ",
      });
    }

    const hashed = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, {
      password: hashed,
    });

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { name, phone, address, auth } = req.body;

    if (!auth) {
      return res.status(400).send({
        message: "Invalid request auth field is missing in request",
      });
    }

    if (!auth?.user) {
      return res.status(400).send({
        message: "Invalid request user field is missing in request",
      });
    }

    if (!auth?.user?._id) {
      return res.status(400).send({
        message: "Invalid request _id field is missing in request",
      });
    }

    const userUpdatedDetail = await userModel.findByIdAndUpdate(
      auth?.user?._id,
      {
        name: name || auth?.user?.name,
        email: auth?.user?.email,
        phone: phone || auth?.user?.phone,
        address: address || auth?.user?.address,
        password: auth?.user?.password,
        answer: auth?.user?.answer,
      },
      {
        new: true,
      }
    );
    res.status(201).send({
      success: true,
      message: "User updated successfully",
      userUpdatedDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      messsage: "Something went wrong while updating",
      error,
    });
  }
};

// export const getOrderController = async (req, res) => {
//   try {
//     const orderDetail = await Payment.find({});
//   } catch (error) {
//     console.log(error);
//   }
// };
