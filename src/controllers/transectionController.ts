/** @format */

import { Request, Response } from "express";
import { Transaction } from "../models/transactionModel.js";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { tripRequest, amount, paymentMethod } = req.body;

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    if (!tripRequest || !amount || !paymentMethod) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const transection = await Transaction.create({
      user: req.user._id,
      tripRequest,
      amount,
      paymentMethod,
    });

    res.status(201).json(transection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({})
      .populate("user", "name email")
      .populate("tripRequest");
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTransactions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await Transaction.find({ user: req.user._id })
      .populate("user", "name email")
      .populate("tripRequest");

    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("user", "name email")
      .populate("tripRequest");

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (
      req.user.role !== "admin" &&
      transaction.user.toString() !== req.user._id.toString()
    ) {
      res.status(403);
      throw new Error("Not authorized to access this transaction");
    }

    res.status(200).json(transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    transaction.status = status || transaction.status;
    const updated = await transaction.save();

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
