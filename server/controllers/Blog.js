import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blog.js";

export const getallblog = expressAsyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  res.status(200).json({ success: true, blogs });
});

export const getoneblog = expressAsyncHandler(async (req, res) => {
  const blogs = await Blog.findById(req.params.id);

  res.status(200).json({ success: true, blogs });
});

export const addblog = expressAsyncHandler(async (req, res) => {
  const { title, content, image, readtime } = req.body;

  const blogs = await Blog.create({
    author: req.user._id,
    title: title,
    content: content,
    image: image,
    readtime: readtime,
  });

  res
    .status(200)
    .json({ success: true, blogs, msg: "your blog is successfully post " });
});

export const editblog = expressAsyncHandler(async (req, res) => {
  const findBlog = await Blog.find({
    user: req.user._id,
    _id: req.params.id,
  });
  if (!findBlog) {
    res.status(404).json({ success: false, msg: "No such Blog in database " });
    return;
  }

  const data = req.body;

  const updateBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true },
  );

  res.status(200).json({
    success: true,
    updateBlog,
    msg: "your blog is successfully post ",
  });
});

export const deleteBlog = expressAsyncHandler(async (req, res) => {});
