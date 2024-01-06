import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComment,
  getCommentSingleBlog,
} from "../controllers/Comment.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const commentRoutes = Router();

commentRoutes
  .get("/getallcomment", getComment)
  .get("/getallcomment/:id", getCommentSingleBlog);
commentRoutes.post("/addcomment", authMiddleware, addComment);
commentRoutes.delete("/deletecomment/:id", authMiddleware, deleteComment);

export default commentRoutes;
