/** @format */

import express from "express";
import {
  createPortfolioItem,
  getMyPortfolioItems,
  getPortfolioItemsById,
  deletePortfolioItem,
} from "../controllers/portfolioitemController.js";
import { protect, isAgency } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, isAgency);

router.post("/", createPortfolioItem);
router.get("/", getMyPortfolioItems);
router.get("/:id", getPortfolioItemsById);
router.delete("/:id", deletePortfolioItem);

export default router;
