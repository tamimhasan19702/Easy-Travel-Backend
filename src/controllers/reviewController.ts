/** @format */
import { Request, Response } from "express";
import { Review } from "../models/reviewModel.js";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { agency, rating, comment } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingReview = await Review.findOne({
      reviewer: req.user._id,
      agency,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this agency" });
    }

    const review = await Review.create({
      reviewer: req.user._id,
      agency,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyReviews = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const reviews = await Review.find({ reviewer: req.user._id }).populate(
      "agency",
      "name"
    );
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByAgency = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ agency: req.params.id }).populate(
      "reviewer",
      "name"
    );
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!review || review.reviewer.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Review not found or unauthorized" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
