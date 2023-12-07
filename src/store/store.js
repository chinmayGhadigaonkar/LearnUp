import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import questionSlice from "./slice/questionSlice";
import answerSlice from "./slice/answerSlice";
import blogSlice from "./slice/blogSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    answer: answerSlice,
    blog: blogSlice,
  },
});

export default store;
