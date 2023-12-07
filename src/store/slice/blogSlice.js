import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchRequest from "../../utils/FetchRequest";
import { toast } from "react-toastify";
const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllBlog.pending, (state) => {
      state.status = STATUSES.LOADING;
    }),
      builder.addCase(GetAllBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(GetAllBlog.rejected, (state) => {
        state.status = STATUSES.ERROR;
      }),
      builder.addCase(AddBlog.pending, (state) => {
        state.status = STATUSES.LOADING;
      }),
      builder.addCase(AddBlog.fulfilled, (state, action) => {
        state.blogs = [...state.blogs, action.payload];
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(AddBlog.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const GetAllBlog = createAsyncThunk("/GetAllBlog", async () => {
  try {
    const res = await FetchRequest.get("blog/getallblog");
    const { success, blogs } = res.data;

    // console.log(blogs);
    if (success) {
      return blogs;
    }
  } catch (error) {
    console.log(error);
  }
});

export const GetSingleBlog = createAsyncThunk("/GetSingleBlog", async (id) => {
  try {
    const res = await FetchRequest.get(`blog/getblog/${id}`);
    const { success, blogs } = res.data;

    console.log(blogs);
    if (success) {
      return blogs;
    }
  } catch (error) {
    console.log(error);
  }
});
export const AddBlog = createAsyncThunk("/AddBlog", async (data) => {
  try {
    const { title, content, image, readtime } = data;
    const option = JSON.stringify({
      title: title,
      content: content,
      image: image,
      readtime: readtime,
    });
    const res = await FetchRequest.post("blog/addblog", option);
    const { success, blogs } = res.data;
    // console.log(blogs);

    if (success) {
      toast.success("Your Blog added successfully");
      return blogs;
    }
  } catch (error) {
    console.log(error);
  }
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
