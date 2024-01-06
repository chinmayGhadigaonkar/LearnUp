import Comment from "../models/comments.js";
import expressAsyncHandler from "express-async-handler";

const hasUserCommented = async (userId, blogId) => {
  const existingComment = await Comment.findOne({
    author: userId,
    blog: blogId,
  });

  return existingComment;
};

export const getComment = expressAsyncHandler(async (req, res) => {
  const comments = await Comment.find();

  res.status(200).json({ success: true, comments });
});

export const getCommentSingleBlog = expressAsyncHandler(async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.id });

  res.status(200).json({ success: true, comments });
});

export const addComment = expressAsyncHandler(async (req, res) => {
  const newCommentData = {
    user: req.user._id,
    blogId: req.body.blogId,
    content: req.body.content,
  };

  const userHasCommented = await hasUserCommented(
    newCommentData.user,
    newCommentData.blogId,
  );

  if (userHasCommented) {
    return res.status(400).json({
      success: false,
      message: "You have already commented on this blog.",
    });
  }

  const newComment = await Comment.create(newCommentData);
  res.status(201).json({ success: true, comment: newComment });
});

export const deleteComment = expressAsyncHandler(async (req, res) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.id);
  if (!deletedComment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.status(200).json({ message: "Comment deleted successfully" });
});
