/** @format */

import { Request, Response } from "express";
import { Bid } from "../models/bidModel.js";

export const createBid = async (req: Request, res: Response) => {
  try {
    const { tripRequest, proposedBudget, message } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bid = await Bid.create({
      tripRequest,
      agency: req.user._id,
      proposedBudget,
      message,
    });

    res.status(201).json(bid);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBids = async (_req: Request, res: Response) => {
  try {
    const bids = await Bid.find().populate("tripRequest agency", "-password");
    res.status(200).json(bids);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBidByUser = async (req: Request, res: Response) => {
  try {
    const bids = await Bid.find({ agency: req.user?._id }).populate(
      "tripRequest agency",
      "-password"
    );
    res.status(200).json(bids);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBidById = async (req: Request, res: Response) => {
  try {
    const bid = await Bid.findById(req.params.id).populate(
      "tripRequest agency",
      "-password"
    );

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    res.status(200).json(bid);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBid = async (req: Request, res: Response) => {
  try {
    const { proposedBudget, message, status } = req.body;

    const bid = await Bid.findById(req.params.id);

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    if (String(bid.agency) !== String(req.user?._id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this bid" });
    }

    bid.proposedBudget = proposedBudget || bid.proposedBudget;
    bid.message = message || bid.message;
    bid.status = status || bid.status;

    const updatedBid = await bid.save();
    res.status(200).json(updatedBid);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBid = async (req: Request, res: Response) => {
  try {
    const bid = await Bid.findById(req.params.id);

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    if (
      String(bid.agency) !== String(req.user?._id) &&
      req.user?.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this bid" });
    }

    await bid.deleteOne();

    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
