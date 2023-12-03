import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import questionSlice from "./slice/questionSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
  },
});

export default store;
