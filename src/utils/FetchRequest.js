import axios from "axios";
import { VITE_BACKEND_URL } from "./BackendUrl";

const FetchRequest = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
    "auth-token": JSON.parse(localStorage.getItem("auth-token"))
      ? JSON.parse(localStorage.getItem("auth-token"))
      : "",
  },
  credentials: "include",
});

export default FetchRequest;
