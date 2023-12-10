import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blog.js";
import getDataURI from "../utils/dataUrl.js";
import cloudinary from "cloudinary";

export const getallblog = expressAsyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  res.status(200).json({ success: true, blogs });
});

export const getoneblog = expressAsyncHandler(async (req, res) => {
  const blogs = await Blog.findById(req.params.id);

  res.status(200).json({ success: true, blogs });
});

export const addblog = expressAsyncHandler(async (req, res) => {
  const { title, content, readtime } = req.body;
  const files = req.file;
  let image = "";
  let imageUrl = "";

  image = getDataURI(files);

  const cloud = await cloudinary.v2.uploader.upload(image.content);
  imageUrl = cloud.url;
  console.log(imageUrl);

  const blogs = await Blog.create({
    author: req.user._id,
    title: title,
    content: content,
    image: imageUrl,
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

// Api not tested

export const blogLikes = expressAsyncHandler(async (req, res) => {
  const findBlog = await Blog.findById(req.params.id);

  // Check if findBlog array is empty
  if (findBlog.length === 0) {
    return res
      .status(404)
      .json({ success: false, msg: "No such Blog in database " });
  }

  const data = findBlog.likes + 1;

  const Blogs = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: { likes: data } },
    { new: true },
  );

  res.status(200).json({
    success: true,
    Blogs,
    msg: "Your Blog is updated successfully",
  });
});

export const blogdisLikes = expressAsyncHandler(async (req, res) => {
  const findBlog = await Blog.findById(req.params.id);

  // Check if findBlog array is empty
  if (findBlog.length === 0) {
    return res
      .status(404)
      .json({ success: false, msg: "No such Blog in database " });
  }

  const data = findBlog.likes - 1;

  const Blogs = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: { likes: data } },
    { new: true },
  );

  res.status(200).json({
    success: true,
    Blogs,
    msg: "Your Blog is updated successfully",
  });
});

export const deleteBlog = expressAsyncHandler(async (req, res) => {});
