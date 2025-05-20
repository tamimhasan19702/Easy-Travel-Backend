/** @format */

import { Request, Response } from "express";
import { Notification } from "../models/notificationModel.js";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { user, type, message } = req.body;

    const notification = await Notification.create({ user, type, message });

    res.status(201).json(notification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotificationsByUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: error.message });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const nortification = await Notification.findById(req.params.id);

    if (!nortification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    nortification.isRead = true;
    await nortification.save();

    res.json(nortification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.deleteOne();
    res.json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
