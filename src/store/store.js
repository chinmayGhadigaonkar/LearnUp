import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import questionSlice from "./slice/questionSlice";
import answerSlice from "./slice/answerSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    answer: answerSlice,
  },
});

export default store;
