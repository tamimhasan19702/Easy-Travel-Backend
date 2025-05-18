/** @format */

import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITripRequest extends Document {
  traveler: mongoose.Types.ObjectId;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  numberOfPeople: number;
  specialRequirements?: string;
  status: "open" | "accepted" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const tripRequestSchema = new Schema<ITripRequest>(
  {
    traveler: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    specialRequirements: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "accepted", "completed", "cancelled"],
      default: "open",
    },
  },
  { timestamps: true }
);

export const TripRequest: Model<ITripRequest> = mongoose.model(
  "TripRequest",
  tripRequestSchema
);
