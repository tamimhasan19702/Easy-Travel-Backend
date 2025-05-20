/** @format */

import express from "express";
import {
  createNotification,
  getNotifications,
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import {
  protect,
  isAdmin,
  isAgency,
  isTraveler,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

//agency routes
router.post("/agency", isAgency, createNotification);
router.get("/agency", isAgency, getNotifications);
router.get("/agency/:id", isAgency, getNotificationsByUser);
router.put("/agency/:id/read", isAgency, markNotificationAsRead);
router.delete("/agency/:id", isAgency, deleteNotification);

//traveler routes
router.post("/traveler", isTraveler, createNotification);
router.get("/traveler", isTraveler, getNotifications);
router.get("/traveler/:id", isTraveler, getNotificationsByUser);
router.put("/traveler/:id/read", isTraveler, markNotificationAsRead);
router.delete("/traveler/:id", isTraveler, deleteNotification);

//admin routes
router.post("/", isAdmin, createNotification);
router.get("/", isAdmin, getNotifications);
router.get("/:id", isAdmin, getNotificationsByUser);
router.put("/:id/read", isAdmin, markNotificationAsRead);
router.delete("/:id", isAdmin, deleteNotification);

export default router;
