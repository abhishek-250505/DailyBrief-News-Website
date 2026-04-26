import express from "express";
import axios from "axios";
import redisClient from "../config/redis.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = req.query.category || "general";
    const country = req.query.country || "us";
    const query = req.query.q || "";
    const pageSize = req.query.pageSize || 100;
    const page = req.query.page || 1;

    //  UNIQUE CACHE KEY
    const cacheKey = `news:${category}:${country}:${query}:${page}`;

    //  1. CHECK CACHE
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      // console.log(" Serving from Redis");
      return res.json(JSON.parse(cachedData));
    }

    //  2. BUILD API
    const params = new URLSearchParams();
    const useEverything = Boolean(query);

    if (useEverything) {
      params.append("q", query);
      params.append("language", req.query.language || "en");
    } else {
      if (country) params.append("country", country);
      if (category) params.append("category", category);
    }

    params.append("pageSize", pageSize);
    params.append("page", page);

    const endpoint = useEverything
      ? `https://newsapi.org/v2/everything?${params.toString()}&apiKey=${process.env.NEWS_API_KEY}`
      : `https://newsapi.org/v2/top-headlines?${params.toString()}&apiKey=${process.env.NEWS_API_KEY}`;

    // console.log(" Fetching from API");

    const response = await axios.get(endpoint, {
      timeout: 8000
    });

    const data = response.data;

    // 3. STORE IN REDIS
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));

    res.json(data);

  } catch (err) {
    // console.error(" ERROR:", err?.response?.data || err.message);

    //  fallback safe response
    res.status(200).json({
      articles: []
    });
  }
});

export default router;