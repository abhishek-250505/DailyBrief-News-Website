
import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId: String,
  title: String,
  url: String,
  image: String,
  description: String,
  author: String,
  source: String,
  content: String,
  publishedAt: String,
});

export default mongoose.model("Bookmark", bookmarkSchema);