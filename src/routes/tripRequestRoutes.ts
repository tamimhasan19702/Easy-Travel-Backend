/** @format */

import express from "express";
import {
  createTripRequest,
  getAllTripRequests,
  getTripRequestById,
  updateTripRequest,
  deleteTripRequest,
  getTripRequestsByTraveler,
} from "../controllers/tripRequestController.js";
import {
  protect,
  isAdmin,
  isAgency,
  isTraveler,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// agency routes
router.get("/agency", isAgency, getAllTripRequests);

//traveler routes
router.post("/traveler", isTraveler, createTripRequest);
router.get("/traveler", isTraveler, getTripRequestsByTraveler);
router.put("/traveler/:id", isTraveler, updateTripRequest);
// admin routes

router.get("/", isAdmin, getAllTripRequests);
router.get("/:id", isAdmin, getTripRequestById);
router.put("/:id", isAdmin, updateTripRequest);
router.delete("/:id", isAdmin, deleteTripRequest);

export default router;
