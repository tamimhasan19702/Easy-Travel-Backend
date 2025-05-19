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
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { json } from "stream/consumers";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Agency routes
router.get("/agency/profile/:id", protect, getUserById);
router.put("/agency/profile/:id", protect, updateUser);

// Traveler routes
router.get("/traveler/profile/:id", protect, getUserById);
router.put("/traveler/profile/:id", protect, updateUser);

// Admin routes
router.get("/", protect, isAdmin, getAllUsers);
router.get("/:id", protect, isAdmin, getUserById);
router.put("/:id", protect, isAdmin, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
