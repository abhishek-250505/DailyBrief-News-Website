import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import rateLimit from "express-rate-limit";

import authRoutes from "./route/authRoute.js";
import newsRoutes from "./route/newsRoute.js";
import bookmarkRoutes from "./route/bookmarkRoutes.js";
import commentRoutes from "./route/commentRoute.js";

const startServer = async () => {
  await connectDB();

  const app = express();
  app.set("trust proxy", 1);

  app.use(cors({
  origin: "https://daily-brief-news-website.vercel.app",
  credentials: true
}));

  app.use(express.json());

  app.get("/ping", (req, res) => {
    res.sendStatus(200);
  });

  //   Rate Limiter for full website
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200,
    message: "Too many requests, please try again later",
  });
   app.use("/api", globalLimiter);

 

  //rate limiter for auth (login/signup)
  const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 10,
    message: "Too many login attempts, try again later",
  });

  app.use("/api/auth", authLimiter, authRoutes);
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
