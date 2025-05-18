/** @format */

import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBid extends Document {
  tripRequest: mongoose.Types.ObjectId;
  agency: mongoose.Types.ObjectId;
  proposedBudget: number;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const bidSchema = new Schema<IBid>(
  {
    tripRequest: {
      type: Schema.Types.ObjectId,
      ref: "TripRequest",
      required: true,
    },
    agency: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    proposedBudget: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Bid: Model<IBid> = mongoose.model("Bid", bidSchema);
