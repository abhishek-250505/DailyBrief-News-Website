
import express from "express";
import Comment from "../model/comment.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();
//comment added in database 
router.post("/", auth, async (req, res) => {
  const comment = await Comment.create({
    userId: req.user,
    ...req.body,
  });

  res.json(comment);
});
//get comment of news article
router.get("/:newsId", async (req, res) => {
  const newsId = decodeURIComponent(req.params.newsId);

  const comments = await Comment.find({ newsId })
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  const formatted = comments.map((comment) => ({
    _id: comment._id,
    userId:
      comment.userId?._id?.toString?.() ||
      comment.userId?.toString?.() ||
      null,
    userName: comment.userId?.name || "Anonymous",
    userEmail: comment.userId?.email || "",
    text: comment.text,
    createdAt: comment.createdAt,
  }));

  res.json(formatted);
});

// delete comment
router.delete("/:id", auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ msg: "Comment not found" });
  if (comment.userId.toString() !== req.user) {
    return res.status(403).json({ msg: "Not authorized to delete this comment" });
  }

  await comment.deleteOne();
  res.json({ msg: "Comment deleted" });
});

export default router;