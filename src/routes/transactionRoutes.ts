/** @format */

import express from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  getMyTransactions,
  updateTransactionStatus,
  deleteTransaction,
} from "../controllers/transectionController.js";
import {
  protect,
  isAdmin,
  isTraveler,
  isAgency,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// traveler routes
router.post("/traveler", isTraveler, createTransaction);
router.get("/traveler", isTraveler, getMyTransactions);
router.get("/traveler/:id", isTraveler, getTransactionById);

//admin
router.get("/", isAdmin, getAllTransactions);
router.get("/:id", isAdmin, getTransactionById);
router.put("/:id/status", isAdmin, updateTransactionStatus);
router.delete("/:id", isAdmin, deleteTransaction);

export default router;
