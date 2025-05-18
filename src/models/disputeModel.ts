/** @format */

import mongoose, { Schema, Document } from "mongoose";

interface DisputeDocument extends Document {
  tripRequest: mongoose.Schema.Types.ObjectId;
  raisedBy: mongoose.Schema.Types.ObjectId;
  description: string;
  status: "open" | "resolved" | "closed";
  resolutionMessage?: string;
  createdAt: Date;
}

const disputeSchema = new Schema<DisputeDocument>(
  {
    tripRequest: {
      type: Schema.Types.ObjectId,
      ref: "TripRequest",
      required: true,
    },
    raisedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "resolved", "closed"],
      default: "open",
    },
    resolutionMessage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<DisputeDocument>("Dispute", disputeSchema);
