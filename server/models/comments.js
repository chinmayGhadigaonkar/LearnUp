import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Blog",
    },
    content: {
      type: String,
      required: [true, "Please provide a content"],
      minlength: [3, " Please provide a content least 3 characters"],
    },
  },
  { timestamps: true },
);

const Comment = new mongoose.model("Comment", commentSchema);
export default Comment;
