/** @format */

import { Request, Response } from "express";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
