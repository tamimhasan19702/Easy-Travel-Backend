/** @format */

import mongoose, { Document, Schema, Model } from "mongoose";

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  tripRequest?: mongoose.Types.ObjectId;
  timestamp: Date;
  read: boolean;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tripRequest: {
      type: Schema.Types.ObjectId,
      ref: "TripRequest",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: false }
);

export const Message: Model<IMessage> = mongoose.model(
  "Message",
  messageSchema
);
