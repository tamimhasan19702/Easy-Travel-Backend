/** @format */

import { Request, Response } from "express";
import { TripRequest } from "../models/tripRequestModel.js";

export const createTripRequest = async (req: Request, res: Response) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      budget,
      numberOfPeople,
      specialRequirements,
    } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    const tripRequest = new TripRequest({
      destination,
      startDate,
      endDate,
      budget,
      numberOfPeople,
      specialRequirements,
      traveler: req.user._id,
    });

    await tripRequest.save();

    res.status(201).json(tripRequest);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTripRequests = async (req: Request, res: Response) => {
  try {
    const tripRequests = await TripRequest.find().populate(
      "traveler",
      "name email"
    );
    res.status(200).json(tripRequests);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getTripRequestsByTraveler = async (
  req: Request,
  res: Response
) => {
  try {
    const tripRequests = await TripRequest.find({
      traveler: req.user?._id,
    }).populate("traveler", "name email");
    res.status(200).json(tripRequests);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getTripRequestById = async (req: Request, res: Response) => {
  try {
    const tripRequest = await TripRequest.findById(req.params.id).populate(
      "traveler",
      "name email"
    );
    if (!tripRequest) {
      return res.status(404).json({ message: "Trip request not found" });
    }
    res.status(200).json(tripRequest);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const updateTripRequest = async (req: Request, res: Response) => {
  try {
    const tripRequest = await TripRequest.findById(req.params.id);

    if (!tripRequest) {
      return res.status(404).json({ message: "Trip request not found" });
    }

    Object.assign(tripRequest, req.body);

    const updatedTripRequest = await tripRequest.save();

    res.status(200).json(updatedTripRequest);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const deleteTripRequest = async (req: Request, res: Response) => {
  try {
    const tripRequest = await TripRequest.findById(req.params.id);
    if (!tripRequest) {
      return res.status(404).json({ message: "Trip request not found" });
    }

    if (
      tripRequest.traveler.toString() !== req.user?._id.toString() &&
      req.user?.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await tripRequest.deleteOne();

    res.status(200).json({ message: "Trip request deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
