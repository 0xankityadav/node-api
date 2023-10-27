import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(404).json({
      succes: fasle,
      message: "User already exists",
    });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPass });
  sendCookie(res, user, "Registered Successfully", 201);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  sendCookie(res, user, "Login Successfull!", 200);
};

export const logoutUser = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};

export const getUserDetails = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
