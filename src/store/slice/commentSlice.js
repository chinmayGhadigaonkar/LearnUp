import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const comment = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    status: " idle ",
  },
  extraReducers: (builder) => {
    builder.addCase(GetComment.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(GetComment.fulfilled, (state, action) => {
      state.comments = action.payload;

      state.status = STATUSES.IDLE;
    });
    builder.addCase(GetComment.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
    builder.addCase(AddComment.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(AddComment.fulfilled, (state, action) => {
      state.comments = action.payload;

      state.status = STATUSES.IDLE;
    });
    builder.addCase(AddComment.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
  },
});

const GetAllComment = createAsyncThunk("GetComments", async (id) => {
  try {
    console.log(id);
    const res = await FetchRequest.get(`comments/getallcomment/${id}`);
    const { success, comments } = res.data;

    if (success) {
      // console.log(comments);

      setComment(comments);
      // toast.success("Comment added successfully");
      return;
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
      return;
    }
  } catch (error) {
    console.log(error);
  }
});
