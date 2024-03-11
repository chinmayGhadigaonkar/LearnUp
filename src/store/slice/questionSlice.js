import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchRequest from "../../utils/FetchRequest";
import { toast } from "react-toastify";
const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    status: " idle ",
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllQuestion.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(GetAllQuestion.fulfilled, (state, action) => {
      state.questions = action.payload;

      state.status = STATUSES.IDLE;
    });
    builder.addCase(GetAllQuestion.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
    builder.addCase(CreateQuestion.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(CreateQuestion.fulfilled, (state, action) => {
      state.questions = action.payload;

      state.status = STATUSES.IDLE;
    });
    builder.addCase(CreateQuestion.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
  },
});

export const GetAllQuestion = createAsyncThunk("/GetAllQuestion", async () => {
  try {
    const res = await FetchRequest.get("question/getallquestion");
    const { success, questions } = res.data;

    if (success) {
      return questions;
    }
  } catch (error) {
    console.log(error);
  }
});

export const CreateQuestion = createAsyncThunk(
  "/CreateQuestion",
  async (question, { dispatch }) => {
    const { title, description, tags } = question;
    const option = JSON.stringify({
      title: title[0],
      description: description,
      tags: tags,
    });

    try {
      const res = await FetchRequest.post("question/addquestion", option);
      const { msg, success, questions } = res.data;
      console.log(questions);
      if (success) {
        toast.success("Question added successfully");

        return questions;
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const DeleteQuestion = createAsyncThunk(
  "/DeleteQuestion",
  async (id) => {
    try {
      const res = await FetchRequest.delete(`question/deletequestion/${id}`);
      const { success, msg } = res.data;

      if (success) {
        toast.success("Question deleted successfully");
      } else {
        toast.error(msg);
      }
    } catch (error) {
      console.log(error);
    }
  },
);

// export const questionLike = createAsyncThunk("/LikeQuestion", async (id) => {
//   try {
//     const res = await FetchRequest.put(`question/questionlikes/${id}`);
//     const { success, saveLike } = res.data;

//     if (success) {
//       toast.success("You successfully liked a question.");
//       return saveLike;
//     } else {
//       toast.error(msg);
//     }
//     if (success) {
//       return questions;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const questionDisLike = createAsyncThunk(
//   "/LikeDisQuestion",
//   async (id) => {
//     try {
//       const res = await FetchRequest.put(`question/questiondislikes/${id}`);
//       const { success, saveLike, msg } = res.data;

//       if (success) {
//         toast.success("You successfully disliked a question.");
//         return saveLike;
//       } else {
//         toast.error(msg);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },
// );

export const {} = questionSlice.actions;
export default questionSlice.reducer;
