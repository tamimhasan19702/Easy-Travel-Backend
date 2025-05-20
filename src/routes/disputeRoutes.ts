/** @format */

import express from "express";
import {
  createDispute,
  getAllDisputes,
  getMyDisputes,
  getDisputeById,
  updateDisputeStatus,
  deleteDispute,
} from "../controllers/disputeController.js";
import {
  protect,
  isAdmin,
  isAgency,
  isTraveler,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// traveler routes
router.post("/traveler", isTraveler, createDispute);
router.get("/traveler", isTraveler, getMyDisputes);
router.get("/traveler/:id", isTraveler, getDisputeById);

// agency routes
router.post("/agency", isAgency, createDispute);
router.get("/agency", isAgency, getMyDisputes);
router.get("/agency/:id", isAgency, getDisputeById);

// admin routes
router.get("/", isAdmin, getAllDisputes);
router.get("/:id", isAdmin, getDisputeById);
router.put("/:id", isAdmin, updateDisputeStatus);
router.delete("/:id", isAdmin, deleteDispute);

export default router;
