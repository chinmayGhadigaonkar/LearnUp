import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchRequest from "../../utils/FetchRequest";
import { toast } from "react-toastify";
const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answer: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllAnswer.pending, (state) => {
      state.status = STATUSES.LOADING;
    }),
      builder.addCase(GetAllAnswer.fulfilled, (state, action) => {
        state.answer = action.payload;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(GetAllAnswer.rejected, (state) => {
        state.status = STATUSES.ERROR;
      }),
      builder.addCase(AddAnswer.pending, (state) => {
        state.status = STATUSES.LOADING;
      }),
      builder.addCase(AddAnswer.fulfilled, (state, action) => {
        state.answer = [...state.answer, action.payload];
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(AddAnswer.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const GetAllAnswer = createAsyncThunk("/GetAllAnswer", async (id) => {
  try {
    const option = JSON.stringify({
      _id: id,
    });
    const res = await FetchRequest.post("answer/getanswer", option);
    const { success, answer } = res.data;
    console.log(answer);

    if (success) {
      return answer;
    }
  } catch (error) {
    console.log(error);
  }
});

export const AddAnswer = createAsyncThunk("/Addanswer", async (data) => {
  try {
    const { questionId, answers } = data;
    const option = JSON.stringify({
      questionId: questionId,
      answer: answers,
    });
    const res = await FetchRequest.post("answer/addanswer", option);
    const { success, answer } = res.data;
    // console.log(answer);

    if (success) {
      toast.success("Your answer added successfully");
      return answer;
    }
  } catch (error) {
    console.log(error);
  }
});

export const answerLike = createAsyncThunk("/CreateQuestion", async (id) => {
  try {
    const res = await FetchRequest.put(`answer/answerlikes/${id}`);
    const { success, saveLike, msg } = res.data;

    if (success) {
      toast.success(msg);
      return saveLike;
    } else {
      toast.error(msg);
    }
  } catch (error) {
    console.log(error);
  }
});

export const answerDisLike = createAsyncThunk(
  "/LikeDisQuestion",
  async (id) => {
    try {
      const res = await FetchRequest.put(`answer/answerdislikes/${id}`);
      const { success, saveLike, msg } = res.data;

      if (success) {
        toast.success(msg);
        return saveLike;
      } else {
        toast.error(msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
);
export const {} = answerSlice.actions;
export default answerSlice.reducer;
