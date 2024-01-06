import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    blogId: {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Please provide a content"],
      minlength: [3, " Please provide a content least 3 characters"],
    },
  },
  { timestamps: true },
);

commentSchema.index({ author: 1, blog: 1 }, { unique: true });

const Comment = new mongoose.model("Comment", commentSchema);
export default Comment;
