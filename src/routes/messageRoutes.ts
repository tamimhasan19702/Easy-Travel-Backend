/** @format */

import express from "express";
import {
  createMessage,
  getMessages,
  getMessagesById,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/messageController.js";
import {
  protect,
  isAdmin,
  isAgency,
  isTraveler,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

//agency routes
router.post("/agency", isAgency, createMessage);
router.get("/agency", isAgency, getMessages);
router.get("/agency/:id", isAgency, getMessagesById);
router.put("/agency/:id/read", isAgency, markMessageAsRead);
router.delete("/agency/:id", isAgency, deleteMessage);

//traveler routes
router.post("/traveler/", isTraveler, createMessage);
router.get("/traveler", isTraveler, getMessages);
router.get("/traveler/:id", isTraveler, getMessagesById);
router.put("/traveler/:id/read", isTraveler, markMessageAsRead);
router.delete("/traveler/:id", isTraveler, deleteMessage);

//admin routes
router.get("/", isAdmin, getMessages);
router.get("/:id", isAdmin, getMessagesById);
router.put("/:id/read", isAdmin, markMessageAsRead);
router.delete("/:id", isAdmin, deleteMessage);

export default router;
