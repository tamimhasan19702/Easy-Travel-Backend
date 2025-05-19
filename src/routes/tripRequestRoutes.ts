/** @format */

import express from "express";
import {
  createTripRequest,
  getAllTripRequests,
  getTripRequestById,
  updateTripRequest,
  deleteTripReuest,
  getTripRequestsByTraveler,
} from "../controllers/tripRequestController.js";
import {
  protect,
  isAdmin,
  isAgency,
  isTraveler,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// agency routes
router.get("/agency", protect, isAgency, getAllTripRequests);

//traveler routes
router.post("/traveler", protect, isTraveler, createTripRequest);
router.get("/traveler", protect, isTraveler, getTripRequestsByTraveler);
router.put("/traveler/:id", protect, isTraveler, updateTripRequest);
// admin routes

router.get("/", protect, isAdmin, getAllTripRequests);
router.get("/:id", protect, isAdmin, getTripRequestById);
router.put("/:id", protect, isAdmin, updateTripRequest);
router.delete("/:id", protect, isAdmin, deleteTripReuest);

export default router;
