import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/news";
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI not set: using default local MongoDB at mongodb://127.0.0.1:27017/news");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;