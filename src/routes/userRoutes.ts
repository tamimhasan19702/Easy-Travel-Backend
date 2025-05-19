/** @format */

import express from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";
import {
  protect,
  isAdmin,
  isAgency,
  isTraveler,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Agency routes
router.get("/agency/profile/:id", protect, isAgency, getUserById);
router.put("/agency/profile/:id", protect, isAgency, updateUser);

// Traveler routes
router.get("/traveler/profile/:id", protect, isTraveler, getUserById);
router.put("/traveler/profile/:id", protect, isTraveler, updateUser);

// Admin routes
router.get("/", protect, isAdmin, getAllUsers);
router.get("/:id", protect, isAdmin, getUserById);
router.put("/:id", protect, isAdmin, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
