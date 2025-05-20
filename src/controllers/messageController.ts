/** @format */

import { Request, Response } from "express";
import { Message } from "../models/messageModel.js";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { receiver, content, tripRequest } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver,
      content,
      tripRequest,
    });

    res.status(201).json(message);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .populate("tripRequest", "destination");

    res.status(200).json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessagesById = async (req: Request, res: Response) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .populate("tripRequest", "destination");

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markMessageAsRead = async (req: Request, res: Response) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.read = true;
    await message.save();

    res.status(200).json({ message: "Message marked as read" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
