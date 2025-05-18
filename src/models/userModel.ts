/** @format */

import mongoose, { Document, Schema, Model, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "traveler" | "agency" | "admin";
  contactNumber?: string;
  profileImage?: string;
  isVerified: boolean;
  bio?: string;
  license?: string;
  accountStatus: "active" | "suspended" | "deleted";
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["traveler", "agency", "admin"],
      default: "traveler",
    },

    contactNumber: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    license: {
      type: String,
    },
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err as any);
  }
});

userSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
