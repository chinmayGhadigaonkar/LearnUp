import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchRequest from "../../utils/FetchRequest";
const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const comment = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    status: " idle ",
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllComment.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(GetAllComment.fulfilled, (state, action) => {
      state.comments = action.payload;

      state.status = STATUSES.IDLE;
    });
    builder.addCase(GetAllComment.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
    builder.addCase(AddComment.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(AddComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);

      state.status = STATUSES.IDLE;
    });
    builder.addCase(AddComment.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
  },
});

export const GetAllComment = createAsyncThunk("/GetComments", async (id) => {
  try {
    // console.log(id);
    const res = await FetchRequest.get(`comments/getallcomment/${id}`);
    const { success, comments } = res.data;

    if (success) {
      console.log(comments);
      return comments;
    }
  } catch (error) {
    console.log(error);
  }
});

export const AddComment = createAsyncThunk("/AddComment", async (data) => {
  try {
    const res = await FetchRequest.post("comments/addcomment", data);
    const { success, comment } = res.data;
    console.log(comment);

    if (success) {
      toast.success("Comment added successfully");
      return comment;
    }
  } catch (error) {
    toast.error("An error occurred");
    console.log(error);
  }
});

export const {} = comment.actions;
export default comment.reducer;
