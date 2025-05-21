/** @format */

import express from "express";
import {
  createReview,
  getReviewsByAgency,
  getMyReviews,
  deleteReview,
  getAllReviews,
  getReviewById,
} from "../controllers/reviewController.js";

import {
  protect,
  isTraveler,
  isAdmin,
  isAgency,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// traveler routes
router.post("/traveler", isTraveler, createReview);
router.get("/traveler", isTraveler, getMyReviews);
router.delete("/traveler/:id", isTraveler, deleteReview);

// agency routes
router.get("/agency/:id", isAgency, getReviewsByAgency);

// admin routes
router.get("/", isAdmin, getAllReviews);
router.get("/:id", isAdmin, getReviewById);
router.delete("/:id", isAdmin, deleteReview);

export default router;
