/** @format */

import express from "express";
import { PORT } from "./config/index.js";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: any, res: any) => {
  res.send("Home Page ");
});

connectDB();

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
