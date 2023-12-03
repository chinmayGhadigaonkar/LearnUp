import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/Comment.js";

const comment = Router();

comment.get("/getallcomment", getComment);
comment.post("/addcomment", addComment);
comment.delete("/deletecomment/:id", deleteComment);
