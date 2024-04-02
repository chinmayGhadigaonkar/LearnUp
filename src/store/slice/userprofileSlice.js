import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchRequest from "../../utils/FetchRequest";
import { toast } from "react-toastify";

const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};
const profileSlice = createSlice({
  name: "profileuser ",
  initialState: {
    user: null,
    questions: [],
    answer: [],
    blog: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    }),
      builder.addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(getProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      }),
      builder.addCase(getProfileQuestion.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      }),
      builder.addCase(getProfileQuestion.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(getProfileQuestion.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      }),
      builder.addCase(getProfileAnswer.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      }),
      builder.addCase(getProfileAnswer.fulfilled, (state, action) => {
        state.answer = action.payload;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(getProfileAnswer.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      }),
      builder.addCase(getProfileBlog.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      }),
      builder.addCase(getProfileBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(getProfileBlog.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });

    builder.addCase(deleteQuestion.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    }),
      builder.addCase(deleteQuestion.fulfilled, (state, action) => {
        const newArr = state.questions.filter(
          (question) => question._id !== action.payload._id,
        );

        state.questions = newArr;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(deleteQuestion.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      }),
      builder.addCase(deleteAnswer.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      }),
      builder.addCase(deleteAnswer.fulfilled, (state, action) => {
        const newArr = state.answer.filter(
          (answer) => answer._id !== action.payload._id,
        );
        state.answer = newArr;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(deleteAnswer.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      }),
      builder.addCase(deleteBlog.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      }),
      builder.addCase(deleteBlog.fulfilled, (state, action) => {
        const newArr = state.blog.filter(
          (blog) => blog._id !== action.payload._id,
        );
        state.blog = newArr;
        state.status = STATUSES.IDLE;
      }),
      builder.addCase(deleteBlog.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
    builder.addCase(updateProfile.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    }),
      builder.addCase(updateProfile.fulfilled, (state, action) => {
        // console.log(action.payload.bio);
        // state.user = action.payload;
        state.user[0].bio = action.payload.bio;

        state.status = STATUSES.IDLE;
      }),
      builder.addCase(updateProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const getProfile = createAsyncThunk("profile/getProfile", async (id) => {
  try {
    const res = await FetchRequest.get("/profile/getprofile");
    const { profile } = res.data;
    return profile;
  } catch (error) {
    console.log(error);
  }
});

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async () => {
    try {
      const res = await FetchRequest.post("profile/createprofile");
      const { profile } = res.data;
      console.log(profile);
      return profile;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data) => {
    try {
      const res = await FetchRequest.put("/profile/editprofile", data);
      const { profile } = res.data;
      if (!profile) {
        toast.error("Profile not updated");
      }
      toast.success("Profile updated successfully");
      return profile;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getProfileQuestion = createAsyncThunk(
  "profile/getProfileQuestion ",
  async () => {
    try {
      const res = await FetchRequest.get(`/question/getuserquestion`);
      const { question } = res.data;

      return question;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteQuestion = createAsyncThunk(
  "profile/deleteQuestion",
  async (id) => {
    try {
      const res = await FetchRequest.delete(`/question/deletequestion/${id}`);
      const { success, question } = res.data;
      if (!success) {
        toast.error("Question not deleted");
      } else {
        toast.success("Question deleted successfully");
        return question;
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteBlog = createAsyncThunk("profile/deleteBlog", async (id) => {
  try {
    const res = await FetchRequest.delete(`/blog/deleteblog/${id}`);
    const { success, blog } = res.data;
    if (!success) {
      toast.error("Blog not deleted");
    } else {
      toast.success("Blog deleted successfully");
      return blog;
    }
  } catch (error) {
    console.log(error);
  }
});

export const deleteAnswer = createAsyncThunk(
  "profile/deleteAnswer",
  async (id) => {
    try {
      const res = await FetchRequest.delete(`/answer/deleteanswer/${id}`);
      const { success, answer } = res.data;
      if (!success) {
        toast.error("Answer not deleted");
      } else {
        toast.success("Answer deleted successfully");
        return answer;
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const getProfileAnswer = createAsyncThunk(
  "profile/getProfileAnswer",
  async () => {
    try {
      const res = await FetchRequest.get("/answer/getuseranswer");
      const { success, answer } = res.data;
      if (!success) {
        toast.error("answers Not found");
      }
      console.log(answer);
      return answer;
    } catch (err) {
      console.error(err.message);
    }
  },
);

export const getProfileBlog = createAsyncThunk(
  "profile/getProfileBlog",
  async () => {
    try {
      const res = await FetchRequest.get(`/blog/getuserblog`);
      const { blog } = res.data;

      return blog;
    } catch (error) {
      console.log(error);
    }
  },
);

export const {} = profileSlice.actions;
export default profileSlice.reducer;
