/** @format */

import { Request, Response } from "express";
import { Dispute } from "../models/disputeModel.js";

export const createDispute = async (req: Request, res: Response) => {
  try {
    const { TripRequest, description } = req.body;
    const raisedBy = req.user;

    const dispute = await Dispute.create({
      TripRequest,
      raisedBy,
      description,
    });

    res.status(201).json(dispute);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDisputes = async (req: Request, res: Response) => {
  try {
    const disputes = await Dispute.find()
      .populate("tripRequest", "-password")
      .populate("raisedBy", "name email");
    res.status(200).json(disputes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyDisputes = async (req: Request, res: Response) => {
  try {
    const disputes = await Dispute.find({ raisedBy: req.user }).populate(
      "tripRequest"
    );
    res.status(200).json(disputes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDisputeById = async (req: Request, res: Response) => {
  try {
    const dispute = await Dispute.findById(req.params.id)
      .populate("tripRequest", "-password")
      .populate("raisedBy", "name email");

    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    res.status(200).json(dispute);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDisputeStatus = async (req: Request, res: Response) => {
  try {
    const { status, resolutionMessage } = req.body;
    const dispute = await Dispute.findById(req.params.id);

    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    dispute.status = status || dispute.status;
    if (resolutionMessage) dispute.resolutionMessage = resolutionMessage;

    const updatedDispute = await dispute.save();
    res.status(200).json(updatedDispute);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDispute = async (req: Request, res: Response) => {
  try {
    const dispute = await Dispute.findByIdAndDelete(req.params.id);
    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }
    res.status(200).json({ message: "Dispute deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
