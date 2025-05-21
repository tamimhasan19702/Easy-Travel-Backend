/** @format */

import { Request, Response } from "express";
import { AdminSetting } from "../models/adminSettingModel.js";

export const createOrUpdateSetting = async (req: Request, res: Response) => {
  try {
    const { settingKey, settingValue } = req.body;

    let setting = await AdminSetting.findOne({ settingKey });

    if (setting) {
      setting.settingValue = settingValue;
      setting = await setting.save();
    } else {
      setting = await AdminSetting.create({ settingKey, settingValue });
    }

    res.status(201).json(setting);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSettings = async (req: Request, res: Response) => {
  try {
    const settings = await AdminSetting.find();
    res.status(200).json(settings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSettingByKey = async (req: Request, res: Response) => {
  try {
    const setting = await AdminSetting.findOne({ settingKey: req.params.key });

    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }

    res.status(200).json(setting);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSetting = async (req: Request, res: Response) => {
  try {
    const setting = await AdminSetting.findByIdAndDelete({
      settingKey: req.params.key,
    });

    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }

    res.status(200).json({ message: "Setting deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
