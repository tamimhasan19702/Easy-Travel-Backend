/** @format */

import express from "express";
import userRoutes from "./userRoutes.js";
import tripRequestRoutes from "./tripRequestRoutes.js";
import bidRoutes from "./bidRoutes.js";
import messageRoutes from "./messageRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import disputeRoutes from "./disputeRoutes.js";
import adminSettingRoutes from "./adminSettingRoutes.js";
import portfolioItemRoutes from "./portfolioItemRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/trip-requests", tripRequestRoutes);
router.use("/bids", bidRoutes);
router.use("/messages", messageRoutes);
router.use("/notifications", notificationRoutes);
router.use("/disputes", disputeRoutes);
router.use("/admin-settings", adminSettingRoutes);
router.use("/portfolio-items", portfolioItemRoutes);

export default router;
