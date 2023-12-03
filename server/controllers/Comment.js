import Comment from "../models/comments.js";
import expressAsyncHandler from "express-async-handler";

export const getComment = expressAsyncHandler(async (req, res) => {
  const Comments = await Comment.find();

  res.status(200).json({ success: true, Comments });
});

export const addComment = expressAsyncHandler(async (req, res) => {
  const newCommentData = {
    author: req.user._id,
    ...req.body,
  };

  const newComment = await Comment.create(newCommentData);
  res.status(201).json(newComment);
});

export const deleteComment = expressAsyncHandler(async (req, res) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.id);
  if (!deletedComment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.status(200).json({ message: "Comment deleted successfully" });
});
