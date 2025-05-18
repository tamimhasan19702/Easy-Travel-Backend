/** @format */

import mongoose, { Schema, Document } from "mongoose";

interface PortfolioItemDocument extends Document {
  agency: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  images: string[];
  createdAt: Date;
}

const portfolioItemSchema = new Schema<PortfolioItemDocument>(
  {
    agency: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, trim: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<PortfolioItemDocument>(
  "PortfolioItem",
  portfolioItemSchema
);
