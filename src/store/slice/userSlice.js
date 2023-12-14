import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchRequest from "../../utils/FetchRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("auth-token")
      ? localStorage.getItem("auth-token")
      : null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("auth-token", JSON.stringify(action.payload));
    },
    removeUser(state, action) {
      state.user = null;
      localStorage.removeItem("auth-token");
    },
  },
});

export const LoginUser = createAsyncThunk(
  "/login",
  async (credential, { dispatch }) => {
    const { email, password } = credential;
    const option = JSON.stringify({
      email: email[0],
      password: password[0],
    });

    try {
      const res = await FetchRequest.post("auth/loginuser", option);
      const { msg, success, token } = res.data;
      if (success) {
        dispatch(setUser(token));
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  },
);

export const createUser = createAsyncThunk(
  "/createUser",
  async (credential, { dispatch }) => {
    const { name, email, password } = credential;
    const option = JSON.stringify({
      name: name[0],
      email: email[0],
      password: password[0],
    });

    try {
      const res = await FetchRequest.post("auth/createuser", option);
      const { msg, success } = res.data;
      if (success) {
        toast.success("Registration successfully completed");
        return success;
      } else {
        toast.error(msg);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  },
);

export const createClerkUser = createAsyncThunk(
  "/createUser",
  async (credential, { dispatch }) => {
    const { userId, fullname, username, email } = credential;
    const option = JSON.stringify({
      userId: userId,
      fullname: fullname,
      username: username,
      email: email,
    });

    try {
      const res = await FetchRequest.post("clerkauth/adduser", option);
      const { msg, success } = res.data;
      if (success) {
        toast.success("Registration successfully completed");
        return success;
      } else {
        toast.error(msg);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  },
);

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
