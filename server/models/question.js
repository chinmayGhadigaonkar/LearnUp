import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "ClerkAuth",
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    tags: [
      {
        type: [String],
        require: true, // Assuming tags are strings
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Question = new mongoose.model("Questions", QuestionSchema);
export default Question;
