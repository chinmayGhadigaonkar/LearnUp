import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchRequest from "../../utils/FetchRequest";
import { toast } from "react-toastify";
const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const singleQuestionSlice = createSlice({
  name: "singlequestion",
  initialState: {
    question: [],
    status: " idle ",
  },
  extraReducers: (builder) => {
    builder.addCase(getSingleQuestion.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(getSingleQuestion.fulfilled, (state, action) => {
      state.question = action.payload;

      state.status = STATUSES.IDLE;
    });
    builder.addCase(getSingleQuestion.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
    builder.addCase(questionLike.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(questionLike.fulfilled, (state, action) => {
      const { likes, dislikes, likeById, dislikeById } = action.payload;

      state.question = {
        ...state.question,
        likes,
        dislikes,
        likeById,
        dislikeById,
      };

      state.status = STATUSES.IDLE;
    });
    builder.addCase(questionLike.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
    builder.addCase(questionDisLike.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(questionDisLike.fulfilled, (state, action) => {
      const { likes, dislikes, likeById, dislikeById } = action.payload;

      state.question = {
        ...state.question,
        likes,
        dislikes,
        likeById,
        dislikeById,
      };
      state.question = action.payload;

      state.status = STATUSES.IDLE;
    });
    builder.addCase(questionDisLike.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
  },
});

export const getSingleQuestion = createAsyncThunk(
  "GetSingleQuestion",
  async (id) => {
    try {
      const res = await FetchRequest.get(`question/getquestion/${id}`);
      const { success, question } = res.data;
      console.log(question);

      if (success) {
        return question;
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const questionLike = createAsyncThunk("/LikeQuestion", async (id) => {
  try {
    const res = await FetchRequest.put(`question/questionlikes/${id}`);
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

export const questionDisLike = createAsyncThunk(
  "/LikeDisQuestion",
  async (id) => {
    try {
      const res = await FetchRequest.put(`question/questiondislikes/${id}`);
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

export const {} = singleQuestionSlice.actions;
export default singleQuestionSlice.reducer;
