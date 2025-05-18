/** @format */

import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  tripRequest: mongoose.Types.ObjectId;
  amount: number;
  paymentMethod: "card" | "bank" | "paypal" | "wallet";
  status: "pending" | "success" | "failed" | "refunded";
  transactionDate: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tripRequest: {
      type: Schema.Types.ObjectId,
      ref: "TripRequest",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "bank", "paypal", "wallet"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Transaction: Model<ITransaction> = mongoose.model(
  "Transaction",
  transactionSchema
);
