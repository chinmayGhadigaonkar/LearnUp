import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
      minlength: [4, "Please provide a title least 4 characters "],
    },
    content: {
      type: String,
      required: [true, "Please a provide a content "],
      minlength: [10, "Please provide a content least 10 characters "],
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    readtime: {
      type: Number,
      default: 3,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Blog = new mongoose.model("Blog", BlogSchema);
export default Blog;
