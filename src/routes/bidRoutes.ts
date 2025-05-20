/** @format */

import express from "express";

import {
  createBid,
  getAllBids,
  getBidById,
  getBidByUser,
  updateBid,
  deleteBid,
} from "../controllers/bidController.js";
import {
  protect,
  isAdmin,
  isAgency,
  isTraveler,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// agency routes
router.post("/agency", isAgency, createBid);
router.get("/agency", isAgency, getBidByUser);
router.get("/agency/:id", isAgency, getBidById);
router.put("/agency/:id", isAgency, updateBid);
router.delete("/agency/:id", isAgency, deleteBid);

//traveler routes
router.get("/traveler", isTraveler, getAllBids);
router.get("/traveler/:id", isTraveler, getBidById);

// admin routes
router.get("/", isAdmin, getAllBids);
router.get("/:id", isAdmin, getBidById);
router.put("/:id", isAdmin, updateBid);
router.delete("/:id", isAdmin, deleteBid);

export default router;
