import mongoose from "mongoose";

// Schema for Likes
const LikeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Question", "Answer"],
      required: true,
    },
    typeId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

// Ensuring a user can like a question or an answer only once
LikeSchema.index({ user: 1, type: 1, typeId: 1 }, { unique: true });

const Like = new mongoose.model("Like", LikeSchema);

export default Like;
