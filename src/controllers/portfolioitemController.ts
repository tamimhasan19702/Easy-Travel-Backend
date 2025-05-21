/** @format */

import { PortfolioItem } from "../models/portfolioItemModel.js";
import { Request, Response } from "express";

export const createPortfolioItem = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, images } = req.body;

    const portfolioItem = await PortfolioItem.create({
      agency: req.user._id,
      title,
      description,
      images,
    });

    res.status(201).json(portfolioItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPortfolioItems = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const items = await PortfolioItem.find({ agency: req.user._id });
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPortfolioItemsById = async (req: Request, res: Response) => {
  try {
    const item = await PortfolioItem.findById(req.params.id);

    if (!item || item.agency.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ message: "Portfolio item not found" });
    }

    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePortfolioItem = async (req: Request, res: Response) => {
  try {
    const item = await PortfolioItem.findByIdAndDelete(req.params.id);

    if (!item || item.agency.toString() !== req.user?._id.toString()) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Portfolio item deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
