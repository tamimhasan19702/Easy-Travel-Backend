/** @format */

import mongoose, { Schema, Document } from "mongoose";

interface AdminSettingDocument extends Document {
  settingKey: string;
  settingValue: string | boolean | number;
}

const adminSettingSchema = new Schema<AdminSettingDocument>(
  {
    settingKey: {
      type: String,
      required: true,
      unique: true,
    },
    settingValue: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export const AdminSetting = mongoose.model<AdminSettingDocument>(
  "AdminSetting",
  adminSettingSchema
);
