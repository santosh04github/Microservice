import express from "express";
import { registerUser, loginUser,  changePassword } from "../controllers/authController.js";

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);
router.post("/change-password", changePassword); 

export default router;
