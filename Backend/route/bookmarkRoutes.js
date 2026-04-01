
import express from "express";
import Bookmark from "../model/Bookmark.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ msg: "Bookmark url is required." });
  }

  const existingBookmark = await Bookmark.findOne({ userId: req.user, url });
  if (existingBookmark) {
    return res.json(existingBookmark);
  }

  const bookmark = await Bookmark.create({
    userId: req.user,
    ...req.body,
  });

  res.json(bookmark);
});

router.get("/", auth, async (req, res) => {
  const data = await Bookmark.find({ userId: req.user });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  const bookmark = await Bookmark.findOneAndDelete({
    _id: req.params.id,
    userId: req.user,
  });

  if (!bookmark) {
    return res.status(404).json({ msg: "Bookmark not found." });
  }

  res.json({ msg: "Bookmark removed.", id: bookmark._id });
});

export default router;