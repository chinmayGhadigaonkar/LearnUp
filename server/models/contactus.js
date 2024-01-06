const QuestionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "ClerkAuth",
      require: true,
    },
    name: {
      type: string,
      require: true,
    },
    message: {
      type: string,
      require: true,
    },
  },
  { timestamps: true },
);
