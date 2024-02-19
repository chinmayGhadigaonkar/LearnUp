import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import questionSlice from "./slice/questionSlice";
import answerSlice from "./slice/answerSlice";
import blogSlice from "./slice/blogSlice";
import SingleQuestionSlice from "./slice/SingleQuestionSlice";
import commentSlice from "./slice/commentSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    answer: answerSlice,
    blog: blogSlice,
    comment: commentSlice,
    singleQuestion: SingleQuestionSlice,
  },
});

export default store;
