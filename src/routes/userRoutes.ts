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

router.use(protect);

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Agency routes
router.get("/agency/profile/:id", isAgency, getUserById);
router.put("/agency/profile/:id", isAgency, updateUser);

// Traveler routes
router.get("/traveler/profile/:id", isTraveler, getUserById);
router.put("/traveler/profile/:id", isTraveler, updateUser);

// Admin routes
router.get("/", isAdmin, getAllUsers);
router.get("/:id", isAdmin, getUserById);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

export default router;
