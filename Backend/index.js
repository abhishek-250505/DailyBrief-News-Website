import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./route/authRoute.js";
import newsRoutes from "./route/newsRoute.js";
import bookmarkRoutes from "./route/bookmarkRoutes.js";
import commentRoutes from "./route/commentRoute.js";

const startServer = async () => {
  await connectDB();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/news", newsRoutes);
  app.use("/api/bookmark", bookmarkRoutes);
  app.use("/api/comment", commentRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});