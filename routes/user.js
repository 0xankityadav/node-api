import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  logoutUser,
  getUserDetails,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/profile", isAuthenticated, getUserDetails);

export default router;
