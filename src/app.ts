/** @format */

import express from "express";
import { PORT } from "./config/index.js";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from "cors";
import morgan from "morgan";
import allRoutes from "./routes/allRoutes.js";

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", allRoutes);

// Health check or root route
app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
