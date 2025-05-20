/** @format */

import express from "express";
import userRoutes from "./userRoutes.js";
import tripRequestRoutes from "./tripRequestRoutes.js";
import bidRoutes from "./bidRoutes.js";
import messageRoutes from "./messageRoutes.js";
import notificationRoutes from "./notificationRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/trip-requests", tripRequestRoutes);
router.use("/bids", bidRoutes);
router.use("/messages", messageRoutes);
router.use("/notifications", notificationRoutes);

export default router;
