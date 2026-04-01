// routes/newsRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = req.query.category || "general";
    const country = req.query.country || "us";
    const query = req.query.q || "";
    const pageSize = req.query.pageSize || 100;
    const page = req.query.page || 1;

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

    const response = await axios.get(endpoint);

    res.json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ msg: "Error fetching news" });
  }
});

export default router;