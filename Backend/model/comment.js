
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  newsId: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", commentSchema);