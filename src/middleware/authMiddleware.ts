/** @format */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { IUser } from "../models/userModel.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};

export const isAgency = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "agency") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Agency only." });
  }
};

export const isTraveler = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "traveler") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Traveler only." });
  }
};
