import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.ObjectId,
      ref: "Questions",
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Answer = new mongoose.model("Answer", AnswerSchema);
export default Answer;
