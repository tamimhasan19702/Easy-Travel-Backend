/** @format */

import express from "express";
import {
  createOrUpdateSetting,
  getAllSettings,
  deleteSetting,
  getSettingByKey,
} from "../controllers/adminSettingController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(isAdmin);

router.post("/", createOrUpdateSetting);
router.get("/", getAllSettings);
router.get("/:key", getSettingByKey);
router.delete("/:key", deleteSetting);

export default router;
